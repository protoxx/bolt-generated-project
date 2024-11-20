import Database from 'better-sqlite3'

const db = new Database('aitools.db')

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    website TEXT,
    category TEXT,
    pricing TEXT,
    image_url TEXT,
    features TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    tool_id TEXT,
    rating INTEGER,
    comment TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tool_id) REFERENCES tools(id)
  );

  CREATE TABLE IF NOT EXISTS favorites (
    user_id TEXT,
    tool_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tool_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tool_id) REFERENCES tools(id)
  );
`)

export const queries = {
  // User queries
  createUser: db.prepare(`
    INSERT INTO users (id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `),

  getUserByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),

  getUserById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),

  // Tool queries
  getAllTools: db.prepare(`
    SELECT * FROM tools
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `),

  getToolById: db.prepare(`
    SELECT * FROM tools WHERE id = ?
  `),

  createTool: db.prepare(`
    INSERT INTO tools (id, name, description, website, category, pricing, image_url, features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),

  updateTool: db.prepare(`
    UPDATE tools
    SET name = ?, description = ?, website = ?, category = ?, pricing = ?, image_url = ?, features = ?
    WHERE id = ?
  `),

  deleteTool: db.prepare(`
    DELETE FROM tools WHERE id = ?
  `),

  // Review queries
  getToolReviews: db.prepare(`
    SELECT r.*, u.name as user_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.tool_id = ? AND r.status = 'approved'
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `),

  createReview: db.prepare(`
    INSERT INTO reviews (id, user_id, tool_id, rating, comment)
    VALUES (?, ?, ?, ?, ?)
  `),

  // Favorites queries
  addFavorite: db.prepare(`
    INSERT INTO favorites (user_id, tool_id)
    VALUES (?, ?)
  `),

  removeFavorite: db.prepare(`
    DELETE FROM favorites
    WHERE user_id = ? AND tool_id = ?
  `),

  getUserFavorites: db.prepare(`
    SELECT t.*
    FROM favorites f
    JOIN tools t ON f.tool_id = t.id
    WHERE f.user_id = ?
  `)
}

export default db
