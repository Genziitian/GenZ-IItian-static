import Database from 'better-sqlite3';
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

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
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
`);

// Migrations for existing databases
try { db.exec(`ALTER TABLE blogs ADD COLUMN slug TEXT NOT NULL DEFAULT ''`); } catch { }
try { db.exec(`ALTER TABLE resources ADD COLUMN sub_type TEXT NOT NULL DEFAULT ''`); } catch { }
try { db.exec(`ALTER TABLE resources ADD COLUMN description TEXT NOT NULL DEFAULT ''`); } catch { }

// Seed blogs
const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get();
if (blogCount.count === 0) {
  const ins = db.prepare(`INSERT INTO blogs (title, slug, category, content, image, date, read_time) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const blogs = [
    { title: "How to Crack IIT Madras Qualifier Exam in First Attempt", slug: "how-to-crack-iit-madras-qualifier", category: "Exam Prep", content: "A comprehensive guide to clearing your IIT Madras qualifier exam on the first try.\n\n## Study Strategy\nStart early and create a structured study plan.\n\n## Time Management\nAllocate specific hours each day for preparation.\n\n## Practice Tests\nTake regular mock tests to assess your preparation.", image: "https://picsum.photos/seed/blog1/600/400", date: "Oct 12, 2024", read_time: "5 min read" },
    { title: "Top 5 Programming Languages to Learn in 2025", slug: "top-5-programming-languages-2025", category: "Career", content: "Explore the most in-demand programming languages.\n\n## 1. Python\nDominates in AI and data science.\n\n## 2. JavaScript\nEssential for web development.\n\n## 3. Rust\nGrowing for systems programming.\n\n## 4. Go\nIdeal for cloud infrastructure.\n\n## 5. TypeScript\nType safety for JS applications.", image: "https://picsum.photos/seed/blog2/600/400", date: "Oct 15, 2024", read_time: "5 min read" },
    { title: "Balancing Online Degree with a Full-Time Job", slug: "balancing-online-degree-full-time-job", category: "Productivity", content: "Tips for managing your online degree alongside work.\n\n## Set Clear Boundaries\nDefine specific study hours.\n\n## Leverage Weekends\nUse weekends for deep learning.\n\n## Stay Connected\nJoin study groups for motivation.", image: "https://picsum.photos/seed/blog3/600/400", date: "Oct 18, 2024", read_time: "5 min read" },
    { title: "Understanding Data Structures and Algorithms", slug: "understanding-dsa", category: "Computer Science", content: "A beginner-friendly introduction to DSA.\n\n## Key Data Structures\n- Arrays and Linked Lists\n- Stacks and Queues\n- Trees and Graphs\n\n## Essential Algorithms\n- Sorting\n- Searching\n- Graph Traversal", image: "https://picsum.photos/seed/blog4/600/400", date: "Oct 20, 2024", read_time: "5 min read" },
    { title: "Why Open Source Contributions Matter", slug: "why-open-source-contributions-matter", category: "Career", content: "How open source can accelerate your career.\n\n## Build Your Portfolio\nProof of your coding abilities.\n\n## Learn From the Best\nCollaborate with experienced developers.\n\n## Networking\nConnect with potential employers.", image: "https://picsum.photos/seed/blog5/600/400", date: "Oct 22, 2024", read_time: "5 min read" },
    { title: "Mastering Python for Data Science", slug: "mastering-python-data-science", category: "Programming", content: "A roadmap for Python in data science.\n\n## Key Libraries\n- NumPy\n- Pandas\n- Matplotlib\n- Scikit-learn\n\n## Practice Projects\nBuild real projects to apply your knowledge.", image: "https://picsum.photos/seed/blog6/600/400", date: "Oct 25, 2024", read_time: "5 min read" },
  ];
  for (const b of blogs) ins.run(b.title, b.slug, b.category, b.content, b.image, b.date, b.read_time);
}

// Seed resources
const resourceCount = db.prepare('SELECT COUNT(*) as count FROM resources').get();
if (resourceCount.count === 0) {
  const ins = db.prepare(`INSERT INTO resources (level, subject, resource_type, sub_type, title, description, url) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const resources = [
    // === QUALIFIER - Maths 1 ===
    { l: "Qualifier", s: "Maths 1", t: "note", st: "", title: "Maths 1 Complete Notes", d: "Comprehensive notes covering all topics", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "note", st: "", title: "Maths 1 Short Notes", d: "Quick revision notes for last-minute prep", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "note", st: "", title: "Maths 1 Important Formulas", d: "All essential formulas in one place", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "pyq", st: "Quiz 1", title: "Maths 1 Quiz 1 PYQ - Sep 2024", d: "Previous year Quiz 1 questions with solutions", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "pyq", st: "Quiz 1", title: "Maths 1 Quiz 1 PYQ - May 2024", d: "Previous year Quiz 1 questions", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "pyq", st: "Quiz 2", title: "Maths 1 Quiz 2 PYQ - Sep 2024", d: "Previous year Quiz 2 questions with solutions", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "pyq", st: "Quiz 2", title: "Maths 1 Quiz 2 PYQ - May 2024", d: "Previous year Quiz 2 questions", url: "#" },
    { l: "Qualifier", s: "Maths 1", t: "pyq", st: "End Term", title: "Maths 1 End Term PYQ - Sep 2024", d: "Previous year end term exam questions", url: "#" },
    // === FOUNDATION - Maths 1 Notes ===
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-10 (Gagneet Kaur)", d: "Comprehensive notes covering weeks 1 to 10", url: "https://drive.google.com/file/d/1XblPLzfSM7OIETPAvc8DeoqPqZa6RiLm/view" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-12 (Palash)", d: "Full course notes from Palash", url: "https://drive.google.com/file/d/1jVkRBoz8ToI3x4HTPc7ggVTbAcG2idiB/view" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 7-9 (Aditya Dwivedi)", d: "Mid-course notes by Aditya Dwivedi", url: "https://drive.google.com/file/d/1U-LyyHiqCGhUXWXbw9Oqy8v7KXhsVHs5/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 9-12 (Aditya Dwivedi)", d: "Advanced topics weeks 9 to 12", url: "https://drive.google.com/file/d/1TaOkuJqb_EH9PzE5rddiD-bFhfUk2QpS/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-3 (P.V. Shabarish)", d: "Foundational weeks notes", url: "https://drive.google.com/file/d/1rQT_W7xyksAtowNskrIfo5BkYgiSiAN0/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 7-9 (Nikhilesh)", d: "Alternative mid-course notes", url: "https://drive.google.com/file/d/1rOuNEEgWXF2ASYZ747OwqA4ollVHnYsL/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-4 (Visist Thallam)", d: "First 4 weeks coverage", url: "https://drive.google.com/file/d/1O47UH-AkPSAGHpLtnIOPrKUrDz-h6dHf/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 2-6 (A Venu)", d: "Core concepts weeks 2 to 6", url: "https://drive.google.com/file/d/1zv9_Gwuv1AZiQUFyS0ol7a8l5d2Yd2Vs/view?usp=sharing" },
    { l: "Foundation", s: "Maths 1", t: "note", st: "", title: "Maths I: Week 1-10 (Puneet Prasar)", d: "Detailed notes covering most of the course", url: "https://drive.google.com/file/d/1xI1I4REWIQXRDh5zq1W2GhVp-NHYDwKz/view?usp=drivesdk" },
    { l: "Foundation", s: "Maths 1", t: "pyq", st: "End Term", title: "Maths 1 Previous Term Papers", d: "Collection of past term papers", url: "https://drive.google.com/drive/folders/11DlKwFWEM_l6SiVLGmW_VnW0kWNQMmxB?usp=sharing" },

    // === FOUNDATION - Stats 1 ===
    { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 12 (Gagneet Kaur)", d: "Full course folder by Gagneet Kaur", url: "https://drive.google.com/drive/folders/1CJksev6YYSduDrZxNk997DMxzwQphz1I" },
    { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 12 (Palash)", d: "Complete course notes from Palash", url: "https://drive.google.com/file/d/1XnZOjJPpBNUn3lk-7ynCgT-AIjTL9AK_/view?usp=sharing" },
    { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 10 (P.V. Shabarish)", d: "Structured notes for first 10 weeks", url: "https://drive.google.com/file/d/1WvHq5pTt4lD5zwj7N_BByfDqFtxI6b4t/view?usp=sharing" },
    { l: "Foundation", s: "Stats 1", t: "note", st: "", title: "Stats I: Week 1 - 9 (Anonymous)", d: "Detailed notes covering weeks 1-9", url: "https://drive.google.com/file/d/1qFplfEds6Ij9hon8vMhe6WErmoApS1mO/view?usp=sharing" },

    // === FOUNDATION - CT ===
    { l: "Foundation", s: "CT", t: "note", st: "", title: "CT Complete Notes (Part 1)", d: "Computational Thinking core concepts", url: "https://drive.google.com/file/d/1RP9PPtHSdmF2BCcl5H7p0pkxiQ1_8olb/view?usp=sharing" },
    { l: "Foundation", s: "CT", t: "note", st: "", title: "CT Complete Notes (Part 2)", d: "Logic and algorithm notes", url: "https://drive.google.com/file/d/1ONSILLrGO2lWVUTt__q3gLkGe-Cf8QJf/view?usp=sharing" },

    // === FOUNDATION - English 1 ===
    { l: "Foundation", s: "English 1", t: "note", st: "", title: "English 1 Resource Folder", d: "Collection of study materials for English 1", url: "https://drive.google.com/drive/folders/1YJhK2hSn-gK128HgQd2OZnOb_IsP8ziD" },
    { l: "Foundation", s: "English 1", t: "note", st: "", title: "English 1 Master Notes", d: "Comprehensive notes for English 1", url: "https://drive.google.com/file/d/18w-ECQbOfreuBfuV4cwudyQBDWuXBt6z/view?usp=sharing" },

    // === FOUNDATION - Maths 2 ===
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 1 - 8 (Kunal Chaturvedi)", d: "Mid-term coverage by Kunal", url: "https://drive.google.com/file/d/1zeSiEapQ99JwQRPcEoLBIKyB0mUoWY70/view" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 1 - 3 (Aditya Dwivedi)", d: "Early weeks by Aditya", url: "https://drive.google.com/file/d/1WxTb8fLGh3UEwNBGCvU6AIUJaHQRfR2l/view?usp=drivesdk" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 4 - 5 (Aditya Dwivedi)", d: "Mid-term topics by Aditya", url: "https://drive.google.com/file/d/1V5jwnwtvtEvInCrJT_8MSHN-oNaK1ZAR/view?usp=sharing" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 6 - 7 (Aditya Dwivedi)", d: "Latter half topics by Aditya", url: "https://drive.google.com/file/d/11TdYvF77pVEkV7P2jnZiL2bVEtSLocET/view" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 8 - 9 (Aditya Dwivedi)", d: "Advanced topics by Aditya", url: "https://drive.google.com/file/d/140wSEVwwtE-vHTFOJA7ukWAbqTMRG0Fd/view" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 10 (Aditya Dwivedi)", d: "Week 10 specialized notes", url: "https://drive.google.com/file/d/14oq3nswJDts1MO8BeEHxxbT6m1oRHOL-/view" },
    { l: "Foundation", s: "Maths 2", t: "note", st: "", title: "Maths II: Week 11 (Aditya Dwivedi)", d: "Week 11 specialized notes", url: "https://drive.google.com/file/d/14wMdZiI_9XtwjweAeej5NWWsKWxpSdos/view" },

    // === FOUNDATION - Stats 2 ===
    { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II: Notes by IIT Madras", d: "Official resource folder", url: "https://drive.google.com/drive/folders/15I3rfd3kpBztpr3BzfDmZsskW0eDrmVV" },
    { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II: Week 1 - 8 (Aditya Dwivedi)", d: "Comprehensive notes by Aditya", url: "https://drive.google.com/file/d/1zgiiWg49h15RHPfo6hwnRFJrvVgWN7LR/view" },
    { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Stats II Week 0 - X (Gagneet Kaur)", d: "Full course folder by Gagneet", url: "https://drive.google.com/drive/folders/1h6c_c8d9vpmSE5SDqD86oFO_iS7ma0bu" },
    { l: "Foundation", s: "Stats 2", t: "note", st: "", title: "Important Formulae and Results", d: "Quick reference sheet for Stats II", url: "https://drive.google.com/file/d/1-SnNxImOcEO4OVHZJ7BItej3_Ho1FzJ6/view" },

    // === FOUNDATION - Python ===
    { l: "Foundation", s: "Python", t: "note", st: "", title: "Python: Week 1 - 12 (Gagneet Kaur)", d: "Complete course folder", url: "https://drive.google.com/drive/folders/1rnfvDDCXLEaaFx7ziipikqNYUEcuewlv" },
    { l: "Foundation", s: "Python", t: "note", st: "", title: "Revision Notes (Venu Madhav)", d: "Exam-oriented revision notes", url: "https://drive.google.com/file/d/1N6e8avbu2Gu-tczm7d1nyIlsD6z1l6Zd/view" },
    { l: "Foundation", s: "Python", t: "note", st: "", title: "Cheetsheet (Shashwat)", d: "Essential commands and syntax", url: "https://drive.google.com/file/d/1LW0vJiIvbsnzL16KQNgsg07hLkOC9eVF/view" },

    // === FOUNDATION - English 2 ===
    { l: "Foundation", s: "English 2", t: "note", st: "", title: "English II: Week 1 - 6 (Gagneet Kaur)", d: "Folder by Gagneet Kaur", url: "https://drive.google.com/drive/folders/1jqtSTdj1tuIGTYvJcwY6WvnZ6eMU2RKa" },
    { l: "Foundation", s: "English 2", t: "note", st: "", title: "English II: Week 1 - 9 (Arushi)", d: "Notes by Arushi", url: "https://drive.google.com/file/d/12jWLWQuHuY8kWws_nLAEByqfF1efEmqT/view" },

    // === DIPLOMA - DBMS ===
    { l: "Diploma", s: "DBMS", t: "note", st: "", title: "DBMS Complete Notes", d: "SQL, normalization, ER diagrams", url: "#" },
    { l: "Diploma", s: "DBMS", t: "pyq", st: "Quiz 1", title: "DBMS Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },
    { l: "Diploma", s: "DBMS", t: "pyq", st: "OPPE 1", title: "DBMS OPPE 1 PYQ - Sep 2024", d: "Online practical exam", url: "#" },
    { l: "Diploma", s: "DBMS", t: "pyq", st: "End Term", title: "DBMS End Term PYQ - Sep 2024", d: "Previous year end term questions", url: "#" },

    // === DIPLOMA - PDSA ===
    { l: "Diploma", s: "PDSA", t: "note", st: "", title: "PDSA Complete Notes", d: "Algorithms, complexity analysis", url: "#" },
    { l: "Diploma", s: "PDSA", t: "pyq", st: "Quiz 1", title: "PDSA Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },
    { l: "Diploma", s: "PDSA", t: "pyq", st: "End Term", title: "PDSA End Term PYQ - Sep 2024", d: "Previous year end term", url: "#" },

    // === DIPLOMA - MLF ===
    { l: "Diploma", s: "MLF", t: "note", st: "", title: "MLF Complete Notes", d: "Machine Learning Foundations", url: "#" },
    { l: "Diploma", s: "MLF", t: "pyq", st: "Quiz 1", title: "MLF Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },
    { l: "Diploma", s: "MLF", t: "pyq", st: "End Term", title: "MLF End Term PYQ - Sep 2024", d: "Previous year end term", url: "#" },

    // === DIPLOMA - BDM ===
    { l: "Diploma", s: "BDM", t: "note", st: "", title: "BDM Complete Notes", d: "Business Data Management", url: "#" },
    { l: "Diploma", s: "BDM", t: "pyq", st: "Quiz 1", title: "BDM Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },

    // === DIPLOMA - MLT ===
    { l: "Diploma", s: "MLT", t: "note", st: "", title: "MLT Complete Notes", d: "Machine Learning Techniques", url: "#" },
    { l: "Diploma", s: "MLT", t: "pyq", st: "Quiz 1", title: "MLT Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },

    // === DIPLOMA - MLP ===
    { l: "Diploma", s: "MLP", t: "note", st: "", title: "MLP Complete Notes", d: "Machine Learning Practice", url: "#" },

    // === DIPLOMA - TDS ===
    { l: "Diploma", s: "TDS", t: "note", st: "", title: "TDS Complete Notes", d: "Tools in Data Science", url: "#" },

    // === DIPLOMA - Java ===
    { l: "Diploma", s: "Java", t: "note", st: "", title: "Java Complete Notes", d: "Java Programming", url: "#" },
    { l: "Diploma", s: "Java", t: "pyq", st: "Quiz 1", title: "Java Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },
    { l: "Diploma", s: "Java", t: "pyq", st: "End Term", title: "Java End Term PYQ - Sep 2024", d: "Previous year end term", url: "#" },

    // === DIPLOMA - MAD 1 ===
    { l: "Diploma", s: "MAD 1", t: "note", st: "", title: "MAD 1 Complete Notes", d: "Modern Application Development 1", url: "#" },
    { l: "Diploma", s: "MAD 1", t: "pyq", st: "Quiz 1", title: "MAD 1 Quiz 1 PYQ - Sep 2024", d: "Previous year questions", url: "#" },

    // === DIPLOMA - MAD 2 ===
    { l: "Diploma", s: "MAD 2", t: "note", st: "", title: "MAD 2 Complete Notes", d: "Modern Application Development 2", url: "#" },

    // === DIPLOMA - BA ===
    { l: "Diploma", s: "BA", t: "note", st: "", title: "BA Complete Notes", d: "Business Analytics", url: "#" },

    // === DIPLOMA - Deep Learning & Gen AI ===
    { l: "Diploma", s: "Deep Learning & Gen AI", t: "note", st: "", title: "Deep Learning Complete Notes", d: "Deep Learning and Generative AI", url: "#" },

    // === DIPLOMA - System Commands ===
    { l: "Diploma", s: "System Commands", t: "note", st: "", title: "System Commands Complete Notes", d: "Linux system commands and shell scripting", url: "#" },
  ];
  for (const r of resources) ins.run(r.l, r.s, r.t, r.st, r.title, r.d, r.url);
}

// ====== WIDGETS ======
db.exec(`
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

const widgetCount = db.prepare('SELECT COUNT(*) as count FROM widgets').get();
if (widgetCount.count === 0) {
  const ins = db.prepare(`INSERT INTO widgets (title, image, link, position) VALUES (?, ?, ?, ?)`);
  ins.run('IIT Madras BS Degree - Enroll Now', 'https://picsum.photos/seed/widget1/400/500', 'https://example.com/enroll', 1);
  ins.run('Free Python Course', 'https://picsum.photos/seed/widget2/400/500', 'https://example.com/python', 2);
  ins.run('CGPA Calculator Tool', 'https://picsum.photos/seed/widget3/400/500', 'https://example.com/cgpa', 3);
}

export default db;
