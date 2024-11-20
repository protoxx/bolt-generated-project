import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { redis, CACHE_KEYS, CACHE_TTL } from '@/lib/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const cacheKey = CACHE_KEYS.TOOL(id)
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData))
    }

    const tool = await prisma.tool.findUnique({
      where: { id },
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
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    await redis.setex(cacheKey, CACHE_TTL.TOOL, JSON.stringify(tool))

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await req.json()

    const tool = await prisma.tool.update({
      where: { id },
      data: body,
    })

    // Invalidate caches
    await Promise.all([
      redis.del(CACHE_KEYS.TOOL(id)),
      redis.del(`${CACHE_KEYS.TOOLS}:*`),
    ])

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    await prisma.tool.delete({
      where: { id },
    })

    // Invalidate caches
    await Promise.all([
      redis.del(CACHE_KEYS.TOOL(id)),
      redis.del(`${CACHE_KEYS.TOOLS}:*`),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
