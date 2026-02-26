import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'data', 'admin.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Helper to run queries as promises
db.runAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err);
    else resolve({ lastID: this.lastID, changes: this.changes });
  });
});

db.allAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

db.getAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

db.execAsync = (sql) => new Promise((resolve, reject) => {
  db.exec(sql, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

// Initialize Tables
const init = async () => {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        image TEXT NOT NULL DEFAULT '',
        date TEXT NOT NULL DEFAULT '',
        read_time TEXT NOT NULL DEFAULT '5 min read',
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT NOT NULL,
        subject TEXT NOT NULL,
        resource_type TEXT NOT NULL DEFAULT 'note',
        sub_type TEXT NOT NULL DEFAULT '',
        title TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        url TEXT NOT NULL DEFAULT '',
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS widgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL DEFAULT '',
        image TEXT NOT NULL DEFAULT '',
        link TEXT NOT NULL DEFAULT '',
        position INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

  // Migrations
  try { await db.execAsync(`ALTER TABLE blogs ADD COLUMN slug TEXT NOT NULL DEFAULT ''`); } catch (e) { }
  try { await db.execAsync(`ALTER TABLE resources ADD COLUMN sub_type TEXT NOT NULL DEFAULT ''`); } catch (e) { }
  try { await db.execAsync(`ALTER TABLE resources ADD COLUMN description TEXT NOT NULL DEFAULT ''`); } catch (e) { }

  // Seed Blogs
  const blogCount = await db.getAsync('SELECT COUNT(*) as count FROM blogs');
  if (blogCount.count === 0) {
    const blogs = [
      { title: "How to Crack IIT Madras Qualifier Exam in First Attempt", slug: "how-to-crack-iit-madras-qualifier", category: "Exam Prep", content: "A comprehensive guide to clearing your IIT Madras qualifier exam on the first try.", image: "https://picsum.photos/seed/blog1/600/400", date: "Oct 12, 2024", read_time: "5 min read" },
      { title: "Top 5 Programming Languages to Learn in 2025", slug: "top-5-programming-languages-2025", category: "Career", content: "Explore the most in-demand programming languages.", image: "https://picsum.photos/seed/blog2/600/400", date: "Oct 15, 2024", read_time: "5 min read" },
    ];
    for (const b of blogs) {
      await db.runAsync(`INSERT INTO blogs (title, slug, category, content, image, date, read_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [b.title, b.slug, b.category, b.content, b.image, b.date, b.read_time]);
    }
  }

  // Seed Widgets
  const widgetCount = await db.getAsync('SELECT COUNT(*) as count FROM widgets');
  if (widgetCount.count === 0) {
    await db.runAsync(`INSERT INTO widgets (title, image, link, position) VALUES (?, ?, ?, ?)`, ['IIT Madras BS Degree - Enroll Now', 'https://picsum.photos/seed/widget1/400/500', 'https://example.com/enroll', 1]);
    await db.runAsync(`INSERT INTO widgets (title, image, link, position) VALUES (?, ?, ?, ?)`, ['Free Python Course', 'https://picsum.photos/seed/widget2/400/500', 'https://example.com/python', 2]);
  }

  // Seed Resources (Basic)
  const resourceCount = await db.getAsync('SELECT COUNT(*) as count FROM resources');
  if (resourceCount.count === 0) {
    const resources = [
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-10 (Gagneet Kaur)", d: "Comprehensive notes", url: "https://drive.google.com/file/d/1XblPLzfSM7OIETPAvc8DeoqPqZa6RiLm/view" },
      { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 12 (Gagneet Kaur)", d: "Full course folder", url: "https://drive.google.com/drive/folders/1CJksev6YYSduDrZxNk997DMxzwQphz1I" }
    ];
    for (const r of resources) {
      await db.runAsync(`INSERT INTO resources (level, subject, resource_type, sub_type, title, description, url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [r.l, r.s, r.t, r.st, r.title, r.d, r.url]);
    }
  }
};

init().catch(console.error);

export default db;
