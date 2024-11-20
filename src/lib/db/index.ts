import Database from 'better-sqlite3'

const db = new Database(':memory:') // Using in-memory database for WebContainer

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    website TEXT NOT NULL,
    category TEXT NOT NULL,
    pricing TEXT,
    image_url TEXT,
    features TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    tool_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`)

// Database queries
export const dbQueries = {
  tools: {
    getAll: db.prepare(`
      SELECT t.*, 
             COUNT(DISTINCT r.id) as review_count,
             AVG(r.rating) as average_rating
      FROM tools t
      LEFT JOIN reviews r ON t.id = r.tool_id
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `),

    getById: db.prepare(`
      SELECT * FROM tools WHERE id = ?
    `),

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

    delete: db.prepare(`
      DELETE FROM tools WHERE id = ?
    `)
  },

  users: {
    getAll: db.prepare(`
      SELECT * FROM users ORDER BY created_at DESC
    `),

    getById: db.prepare(`
      SELECT * FROM users WHERE id = ?
    `),

    getByEmail: db.prepare(`
      SELECT * FROM users WHERE email = ?
    `),

    create: db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `),

    updateRole: db.prepare(`
      UPDATE users SET role = ? WHERE id = ?
    `),

    delete: db.prepare(`
      DELETE FROM users WHERE id = ?
    `)
  },

  reviews: {
    getAll: db.prepare(`
      SELECT r.*, t.name as tool_name, u.name as user_name
      FROM reviews r
      JOIN tools t ON r.tool_id = t.id
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `),

    getByTool: db.prepare(`
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.tool_id = ?
      ORDER BY r.created_at DESC
    `),

    create: db.prepare(`
      INSERT INTO reviews (id, tool_id, user_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
    `),

    updateStatus: db.prepare(`
      UPDATE reviews SET status = ? WHERE id = ?
    `),

    delete: db.prepare(`
      DELETE FROM reviews WHERE id = ?
    `)
  }
}

export default db
