import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

// Initialize database
const db = new Database('aitools.db')

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Load and execute schema
const schema = fs.readFileSync(
  path.join(process.cwd(), 'src/lib/db/schema.sql'),
  'utf8'
)
db.exec(schema)

// Prepared statements for tools
export const toolQueries = {
  create: db.prepare(`
    INSERT INTO tools (id, name, description, website, category, pricing, image_url, features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),

  update: db.prepare(`
    UPDATE tools
    SET name = ?, description = ?, website = ?, category = ?, 
        pricing = ?, image_url = ?, features = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),

  delete: db.prepare('DELETE FROM tools WHERE id = ?'),

  getById: db.prepare(`
    SELECT t.*, 
           COUNT(DISTINCT r.id) as review_count,
           AVG(r.rating) as average_rating,
           COUNT(DISTINCT f.user_id) as favorite_count
    FROM tools t
    LEFT JOIN reviews r ON t.id = r.tool_id AND r.status = 'approved'
    LEFT JOIN favorites f ON t.id = f.tool_id
    WHERE t.id = ?
    GROUP BY t.id
  `),

  getAll: db.prepare(`
    SELECT t.*, 
           COUNT(DISTINCT r.id) as review_count,
           AVG(r.rating) as average_rating,
           COUNT(DISTINCT f.user_id) as favorite_count
    FROM tools t
    LEFT JOIN reviews r ON t.id = r.tool_id AND r.status = 'approved'
    LEFT JOIN favorites f ON t.id = f.tool_id
    GROUP BY t.id
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
  `),

  search: db.prepare(`
    SELECT t.*, 
           COUNT(DISTINCT r.id) as review_count,
           AVG(r.rating) as average_rating
    FROM tools t
    LEFT JOIN reviews r ON t.id = r.tool_id AND r.status = 'approved'
    WHERE t.name LIKE ? OR t.description LIKE ?
    GROUP BY t.id
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
  `),

  getByCategory: db.prepare(`
    SELECT t.*, 
           COUNT(DISTINCT r.id) as review_count,
           AVG(r.rating) as average_rating
    FROM tools t
    LEFT JOIN reviews r ON t.id = r.tool_id AND r.status = 'approved'
    WHERE t.category = ?
    GROUP BY t.id
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
  `)
}

// Prepared statements for reviews
export const reviewQueries = {
  create: db.prepare(`
    INSERT INTO reviews (id, tool_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?, ?)
  `),

  update: db.prepare(`
    UPDATE reviews
    SET rating = ?, comment = ?
    WHERE id = ? AND user_id = ?
  `),

  updateStatus: db.prepare(`
    UPDATE reviews
    SET status = ?
    WHERE id = ?
  `),

  getByTool: db.prepare(`
    SELECT r.*, u.name as user_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.tool_id = ? AND r.status = 'approved'
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `),

  getByUser: db.prepare(`
    SELECT r.*, t.name as tool_name
    FROM reviews r
    JOIN tools t ON r.tool_id = t.id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `)
}

// Prepared statements for users
export const userQueries = {
  create: db.prepare(`
    INSERT INTO users (id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `),

  update: db.prepare(`
    UPDATE users
    SET name = ?, email = ?
    WHERE id = ?
  `),

  getByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  
  getById: db.prepare('SELECT * FROM users WHERE id = ?'),

  addFavorite: db.prepare(`
    INSERT INTO favorites (user_id, tool_id)
    VALUES (?, ?)
  `),

  removeFavorite: db.prepare(`
    DELETE FROM favorites
    WHERE user_id = ? AND tool_id = ?
  `),

  getFavorites: db.prepare(`
    SELECT t.*
    FROM favorites f
    JOIN tools t ON f.tool_id = t.id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `)
}

// Helper function to run queries with pagination
export const paginate = (
  query: any,
  page: number = 1,
  limit: number = 10,
  ...params: any[]
) => {
  const offset = (page - 1) * limit
  return query.all(...params, limit, offset)
}

// Helper function to get total count for pagination
export const getTotal = (table: string, condition?: string, params?: any[]) => {
  const sql = `SELECT COUNT(*) as total FROM ${table} ${condition || ''}`
  return db.prepare(sql).get(...(params || [])).total
}

export default db
