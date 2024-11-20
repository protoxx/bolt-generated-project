import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { redis, CACHE_KEYS, CACHE_TTL } from '@/lib/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const toolSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10),
  website: z.string().url(),
  category: z.string(),
  pricing: z.object({}).optional(),
  imageUrl: z.string().url().optional(),
  features: z.array(z.string()).optional(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const cacheKey = `${CACHE_KEYS.TOOLS}:${category || ''}:${search || ''}:${page}:${limit}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData))
    }

    const where = {
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const [tools, total] = await Promise.all([
      prisma.tool.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            where: {
              status: 'APPROVED',
            },
          },
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      }),
      prisma.tool.count({ where }),
    ])

    const response = {
      tools,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }

    await redis.setex(cacheKey, CACHE_TTL.TOOLS, JSON.stringify(response))

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = toolSchema.parse(body)

    const tool = await prisma.tool.create({
      data: validatedData,
    })

    // Invalidate tools cache
    const keys = await redis.keys(`${CACHE_KEYS.TOOLS}:*`)
    if (keys.length) {
      await redis.del(keys)
    }

    return NextResponse.json(tool, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
