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

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Could not connect to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
  }
});

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
        seo_title TEXT NOT NULL DEFAULT '',
        seo_description TEXT NOT NULL DEFAULT '',
        seo_keywords TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
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
  try { await db.execAsync(`ALTER TABLE blogs ADD COLUMN seo_title TEXT NOT NULL DEFAULT ''`); } catch (e) { }
  try { await db.execAsync(`ALTER TABLE blogs ADD COLUMN seo_description TEXT NOT NULL DEFAULT ''`); } catch (e) { }
  try { await db.execAsync(`ALTER TABLE blogs ADD COLUMN seo_keywords TEXT NOT NULL DEFAULT ''`); } catch (e) { }

  // Seed Settings
  const settingsCount = await db.getAsync('SELECT COUNT(*) as count FROM settings');
  if (settingsCount.count === 0) {
    const defaultSettings = [
      { k: 'site_title', v: 'Gen-Z IITian | We transform You into genz iitians' },
      { k: 'site_description', v: 'Leading education platform for IIT Madras BS degree aspirants.' },
      { k: 'site_keywords', v: 'IIT Madras, BS Degree, Qualifier, Data Science, Aero' },
      { k: 'og_image', v: 'https://app.genziitian.in/og-image.jpg' },
      { k: 'ga_id', v: '' },
      { k: 'fb_pixel', v: '' }
    ];
    for (const s of defaultSettings) {
      await db.runAsync(`INSERT INTO settings (key, value) VALUES (?, ?)`, [s.k, s.v]);
    }
  }

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

  // Seed Resources
  const resourceCount = await db.getAsync('SELECT COUNT(*) as count FROM resources');
  if (resourceCount.count === 0) {
    const resources = [
      // Stats I
      { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 12 (Gagneet Kaur)", d: "Full course folder by Gagneet Kaur", url: "https://drive.google.com/drive/folders/1CJksev6YYSduDrZxNk997DMxzwQphz1I" },
      { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 12 (Palash)", d: "Complete course notes from Palash", url: "https://drive.google.com/file/d/1XnZOjJPpBNUn3lk-7ynCgT-AIjTL9AK_/view?usp=sharing" },
      { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 10 (P.V. Shabarish)", d: "Structured notes for first 10 weeks", url: "https://drive.google.com/file/d/1WvHq5pTt4lD5zwj7N_BByfDqFtxI6b4t/view?usp=sharing" },
      { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 9 (Anonymous)", d: "Detailed notes covering weeks 1-9", url: "https://drive.google.com/file/d/1qFplfEds6Ij9hon8vMhe6WErmoApS1mO/view?usp=sharing" },

      // English 1
      { l: "Foundation", s: "English 1", t: "note", st: "", title: "English 1 Resource Folder", d: "Collection of study materials", url: "https://drive.google.com/drive/folders/1YJhK2hSn-gK128HgQd2OZnOb_IsP8ziD" },
      { l: "Foundation", s: "English 1", t: "note", st: "", title: "English 1 Master Notes", d: "Comprehensive notes for English 1", url: "https://drive.google.com/file/d/18w-ECQbOfreuBfuV4cwudyQBDWuXBt6z/view?usp=sharing" },

      // CT
      { l: "Foundation", s: "CT", t: "note", st: "", title: "CT Complete Notes (Part 1)", d: "Computational Thinking core concepts", url: "https://drive.google.com/file/d/1RP9PPtHSdmF2BCcl5H7p0pkxiQ1_8olb/view?usp=sharing" },
      { l: "Foundation", s: "CT", t: "note", st: "", title: "CT Complete Notes (Part 2)", d: "Logic and algorithm notes", url: "https://drive.google.com/file/d/1ONSILLrGO2lWVUTt__q3gLkGe-Cf8QJf/view?usp=sharing" },

      // Maths II
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 1 - 8 (Kunal Chaturvedi)", d: "Mid-term coverage by Kunal", url: "https://drive.google.com/file/d/1zeSiEapQ99JwQRPcEoLBIKyB0mUoWY70/view" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 1 - 3 (Aditya Dwivedi)", d: "Early weeks by Aditya", url: "https://drive.google.com/file/d/1WxTb8fLGh3UEwNBGCvU6AIUJaHQRfR2l/view?usp=drivesdk" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 4 - 5 (Aditya Dwivedi)", d: "Mid-term topics by Aditya", url: "https://drive.google.com/file/d/1V5jwnwtvtEvInCrJT_8MSHN-oNaK1ZAR/view?usp=sharing" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 6 - 7 (Aditya Dwivedi)", d: "Latter half topics by Aditya", url: "https://drive.google.com/file/d/11TdYvF77pVEkV7P2jnZiL2bVEtSLocET/view" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 8 - 9 (Aditya Dwivedi)", d: "Advanced topics by Aditya", url: "https://drive.google.com/file/d/140wSEVwwtE-vHTFOJA7ukWAbqTMRG0Fd/view" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 10 (Aditya Dwivedi)", d: "Week 10 specialized notes", url: "https://drive.google.com/file/d/14oq3nswJDts1MO8BeEHxxbT6m1oRHOL-/view" },
      { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 11 (Aditya Dwivedi)", d: "Week 11 specialized notes", url: "https://drive.google.com/file/d/14wMdZiI_9XtwjweAeej5NWWsKWxpSdos/view" },

      // Stats II
      { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II: Notes by IIT Madras", d: "Official resource folder", url: "https://drive.google.com/drive/folders/15I3rfd3kpBztpr3BzfDmZsskW0eDrmVV" },
      { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II: Week 1 - 8 (Aditya Dwivedi)", d: "Comprehensive notes by Aditya", url: "https://drive.google.com/file/d/1zgiiWg49h15RHPfo6hwnRFJrvVgWN7LR/view" },
      { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II Week 0 - X (Gagneet Kaur)", d: "Full course folder by Gagneet", url: "https://drive.google.com/drive/folders/1h6c_c8d9vpmSE5SDqD86oFO_iS7ma0bu" },
      { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Important Formulae and Results", d: "Quick reference sheet for Stats II", url: "https://drive.google.com/file/d/1-SnNxImOcEO4OVHZJ7BItej3_Ho1FzJ6/view" },

      // English II
      { l: "Foundation", s: "English 2", t: "note", st: "", title: "English II: Week 1 - 6 (Gagneet Kaur)", d: "Folder by Gagneet Kaur", url: "https://drive.google.com/drive/folders/1jqtSTdj1tuIGTYvJcwY6WvnZ6eMU2RKa" },
      { l: "Foundation", s: "English 2", t: "note", st: "", title: "English II: Week 1 - 9 (Arushi)", d: "Notes by Arushi", url: "https://drive.google.com/file/d/12jWLWQuHuY8kWws_nLAEByqfF1efEmqT/view" },

      // Python
      { l: "Foundation", s: "Python", t: "note", st: "", title: "Python: Week 1 - 12 (Gagneet Kaur)", d: "Complete course folder", url: "https://drive.google.com/drive/folders/1rnfvDDCXLEaaFx7ziipikqNYUEcuewlv" },
      { l: "Foundation", s: "Python", t: "note", st: "", title: "Revision Notes (Venu Madhav)", d: "Exam-oriented revision notes", url: "https://drive.google.com/file/d/1N6e8avbu2Gu-tczm7d1nyIlsD6z1l6Zd/view" },
      { l: "Foundation", s: "Python", t: "note", st: "", title: "Cheetsheet (Shashwat)", d: "Essential commands and syntax", url: "https://drive.google.com/file/d/1LW0vJiIvbsnzL16KQNgsg07hLkOC9eVF/view" },

      // Maths I
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1 - 10 (Gagneet Kaur)", d: "Comprehensive notes", url: "https://drive.google.com/file/d/1XblPLzfSM7OIETPAvc8DeoqPqZa6RiLm/view" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1 - 12 (Palash)", d: "Full course notes from Palash", url: "https://drive.google.com/file/d/1jVkRBoz8ToI3x4HTPc7ggVTbAcG2idiB/view" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 7 - 9 (Aditya Dwivedi)", d: "Mid-course notes by Aditya", url: "https://drive.google.com/file/d/1U-LyyHiqCGhUXWXbw9Oqy8v7KXhsVHs5/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 9 - 12 (Aditya Dwivedi)", d: "Advanced topics weeks 9-12", url: "https://drive.google.com/file/d/1TaOkuJqb_EH9PzE5rddiD-bFhfUk2QpS/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1 - 3 (P.V. Shabarish)", d: "Foundational weeks notes", url: "https://drive.google.com/file/d/1rQT_W7xyksAtowNskrIfo5BkYgiSiAN0/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 7 - 9 (Nikhilesh)", d: "Alternative mid-course notes", url: "https://drive.google.com/file/d/1rOuNEEgWXF2ASYZ747OwqA4ollVHnYsL/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1 - 4 (Visist Thallam)", d: "First 4 weeks coverage", url: "https://drive.google.com/file/d/1O47UH-AkPSAGHpLtnIOPrKUrDz-h6dHf/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 2 - 6 (A Venu)", d: "Core concepts weeks 2-6", url: "https://drive.google.com/file/d/1zv9_Gwuv1AZiQUFyS0ol7a8l5d2Yd2Vs/view?usp=sharing" },
      { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1 - 10 (Puneet Prasar)", d: "Detailed notes by Puneet", url: "https://drive.google.com/file/d/1xI1I4REWIQXRDh5zq1W2GhVp-NHYDwKz/view?usp=drivesdk" },
      { l: "Foundation", s: "Maths 1", t: "pyq", st: "End Term", title: "Maths 1 Previous Term Papers", d: "Collection of past term papers", url: "https://drive.google.com/drive/folders/11DlKwFWEM_l6SiVLGmW_VnW0kWNQMmxB?usp=sharing" }
    ];
    for (const r of resources) {
      await db.runAsync(`INSERT INTO resources (level, subject, resource_type, sub_type, title, description, url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [r.l, r.s, r.t, r.st, r.title, r.d, r.url]);
    }
  }
};

init().catch(console.error);

export default db;
