-- Core entries table for all data types
CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  tags TEXT,
  data TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- RPG profile for gamification
CREATE TABLE IF NOT EXISTS rpg_profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Future notes for time capsule feature  
CREATE TABLE IF NOT EXISTS future_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  deliver_at DATETIME NOT NULL,
  delivered BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_entries_type ON entries(type);
CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at);
CREATE INDEX IF NOT EXISTS idx_future_notes_deliver_at ON future_notes(deliver_at);
CREATE INDEX IF NOT EXISTS idx_future_notes_delivered ON future_notes(delivered);