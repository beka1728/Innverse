import * as SQLite from 'expo-sqlite';
import { Entry, RPGProfile, FutureNote, EntryType } from '../types';

// Initialize database
const db = SQLite.openDatabase('innerverse.db');

// Initialize database schema
export const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Create entries table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            title TEXT,
            content TEXT,
            tags TEXT,
            data TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Create RPG profile table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS rpg_profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level INTEGER DEFAULT 1,
            xp INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Create future notes table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS future_notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            deliver_at DATETIME NOT NULL,
            delivered BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Create indexes
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_entries_type ON entries(type);');
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at);');
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_future_notes_deliver_at ON future_notes(deliver_at);');

        // Initialize RPG profile if it doesn't exist
        tx.executeSql('INSERT INTO rpg_profile (level, xp, streak) SELECT 1, 0, 0 WHERE NOT EXISTS (SELECT 1 FROM rpg_profile);');
      },
      (error) => reject(error),
      () => resolve()
    );
  });
};

// Entry operations
export const createEntry = (type: EntryType, title?: string, content?: string, tags?: string[], data?: any): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO entries (type, title, content, tags, data) VALUES (?, ?, ?, ?, ?)',
        [type, title || null, content || null, tags ? JSON.stringify(tags) : null, data ? JSON.stringify(data) : null],
        (_, result) => resolve(result.insertId!),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const getEntries = (type?: EntryType, limit?: number): Promise<Entry[]> => {
  return new Promise((resolve, reject) => {
    const query = type 
      ? 'SELECT * FROM entries WHERE type = ? ORDER BY created_at DESC' + (limit ? ` LIMIT ${limit}` : '')
      : 'SELECT * FROM entries ORDER BY created_at DESC' + (limit ? ` LIMIT ${limit}` : '');
    
    const params = type ? [type] : [];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => {
          const entries: Entry[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            entries.push({
              ...row,
              tags: row.tags ? JSON.parse(row.tags) : [],
              data: row.data ? JSON.parse(row.data) : null,
            });
          }
          resolve(entries);
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const deleteEntry = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM entries WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

// RPG Profile operations
export const getRPGProfile = (): Promise<RPGProfile> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM rpg_profile LIMIT 1',
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0));
          } else {
            resolve({ id: 1, level: 1, xp: 0, streak: 0 });
          }
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const updateRPGProfile = (level: number, xp: number, streak: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE rpg_profile SET level = ?, xp = ?, streak = ? WHERE id = 1',
        [level, xp, streak],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

// Future Notes operations
export const createFutureNote = (title: string, body: string, deliverAt: Date): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO future_notes (title, body, deliver_at) VALUES (?, ?, ?)',
        [title, body, deliverAt.toISOString()],
        (_, result) => resolve(result.insertId!),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const getFutureNotes = (): Promise<FutureNote[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM future_notes WHERE delivered = 0 AND deliver_at <= datetime("now") ORDER BY deliver_at ASC',
        [],
        (_, result) => {
          const notes: FutureNote[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            notes.push(result.rows.item(i));
          }
          resolve(notes);
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const markNoteDelivered = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE future_notes SET delivered = 1 WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export default db;