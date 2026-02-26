import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import db from './db';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'genz@2025';

const sessions = new Map<string, { user: string; expires: number }>();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// ========== AUTH ==========

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    const token = authHeader.slice(7);
    const session = sessions.get(token);
    if (!session || session.expires < Date.now()) { sessions.delete(token); return res.status(401).json({ error: 'Session expired' }); }
    next();
}

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = crypto.randomBytes(32).toString('hex');
        sessions.set(token, { user: username, expires: Date.now() + 24 * 60 * 60 * 1000 });
        return res.json({ token, message: 'Login successful' });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) sessions.delete(authHeader.slice(7));
    res.json({ message: 'Logged out' });
});

app.get('/api/auth/check', authMiddleware, (req, res) => {
    res.json({ authenticated: true });
});

// ========== PUBLIC API ==========

app.get('/api/blogs', (req, res) => {
    const blogs = db.prepare('SELECT * FROM blogs WHERE published = 1 ORDER BY id DESC').all();
    res.json(blogs);
});

app.get('/api/blogs/:slug', (req, res) => {
    const blog = db.prepare('SELECT * FROM blogs WHERE slug = ? AND published = 1').get(req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
});

// Get all published resources (with optional filters)
app.get('/api/resources', (req, res) => {
    const { level, subject, type } = req.query;
    let query = 'SELECT * FROM resources WHERE published = 1';
    const params: string[] = [];
    if (level) { query += ' AND level = ?'; params.push(level as string); }
    if (subject) { query += ' AND subject = ?'; params.push(subject as string); }
    if (type) { query += ' AND resource_type = ?'; params.push(type as string); }
    query += ' ORDER BY level, subject, resource_type, sub_type, id';
    res.json(db.prepare(query).all(...params));
});

// Get distinct subjects for a level
app.get('/api/resources/subjects', (req, res) => {
    const { level } = req.query;
    let query = 'SELECT DISTINCT level, subject FROM resources WHERE published = 1';
    const params: string[] = [];
    if (level) { query += ' AND level = ?'; params.push(level as string); }
    query += ' ORDER BY level, subject';
    res.json(db.prepare(query).all(...params));
});

// ========== ADMIN API ==========

// --- BLOGS ---
app.get('/api/admin/blogs', authMiddleware, (req, res) => {
    res.json(db.prepare('SELECT * FROM blogs ORDER BY id DESC').all());
});

app.get('/api/admin/blogs/:id', authMiddleware, (req, res) => {
    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
});

app.post('/api/admin/blogs', authMiddleware, (req, res) => {
    const { title, slug, category, content, image, date, read_time, published } = req.body;
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const result = db.prepare(`INSERT INTO blogs (title, slug, category, content, image, date, read_time, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(title || '', finalSlug, category || '', content || '', image || '', date || '', read_time || '5 min read', published ?? 1);
    res.json({ id: result.lastInsertRowid, message: 'Blog created' });
});

app.put('/api/admin/blogs/:id', authMiddleware, (req, res) => {
    const { title, slug, category, content, image, date, read_time, published } = req.body;
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    db.prepare(`UPDATE blogs SET title=?, slug=?, category=?, content=?, image=?, date=?, read_time=?, published=?, updated_at=datetime('now') WHERE id=?`)
        .run(title, finalSlug, category, content, image, date, read_time, published ?? 1, req.params.id);
    res.json({ message: 'Blog updated' });
});

app.delete('/api/admin/blogs/:id', authMiddleware, (req, res) => {
    db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
    res.json({ message: 'Blog deleted' });
});

// --- RESOURCES ---
app.get('/api/admin/resources', authMiddleware, (req, res) => {
    res.json(db.prepare('SELECT * FROM resources ORDER BY level, subject, resource_type, sub_type, id DESC').all());
});

app.post('/api/admin/resources', authMiddleware, (req, res) => {
    const { level, subject, resource_type, sub_type, title, description, url, published } = req.body;
    const result = db.prepare(`INSERT INTO resources (level, subject, resource_type, sub_type, title, description, url, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(level || '', subject || '', resource_type || 'note', sub_type || '', title || '', description || '', url || '', published ?? 1);
    res.json({ id: result.lastInsertRowid, message: 'Resource created' });
});

app.put('/api/admin/resources/:id', authMiddleware, (req, res) => {
    const { level, subject, resource_type, sub_type, title, description, url, published } = req.body;
    db.prepare(`UPDATE resources SET level=?, subject=?, resource_type=?, sub_type=?, title=?, description=?, url=?, published=?, updated_at=datetime('now') WHERE id=?`)
        .run(level, subject, resource_type, sub_type || '', title, description || '', url, published ?? 1, req.params.id);
    res.json({ message: 'Resource updated' });
});

app.delete('/api/admin/resources/:id', authMiddleware, (req, res) => {
    db.prepare('DELETE FROM resources WHERE id = ?').run(req.params.id);
    res.json({ message: 'Resource deleted' });
});

// --- WIDGETS ---
// Public
app.get('/api/widgets', (req, res) => {
    res.json(db.prepare('SELECT * FROM widgets WHERE published = 1 ORDER BY position ASC').all());
});

// Admin
app.get('/api/admin/widgets', authMiddleware, (req, res) => {
    res.json(db.prepare('SELECT * FROM widgets ORDER BY position ASC').all());
});

app.post('/api/admin/widgets', authMiddleware, (req, res) => {
    const { title, image, link, position, published } = req.body;
    const result = db.prepare(`INSERT INTO widgets (title, image, link, position, published) VALUES (?, ?, ?, ?, ?)`)
        .run(title || '', image || '', link || '', position || 0, published ?? 1);
    res.json({ id: result.lastInsertRowid, message: 'Widget created' });
});

app.put('/api/admin/widgets/:id', authMiddleware, (req, res) => {
    const { title, image, link, position, published } = req.body;
    db.prepare(`UPDATE widgets SET title=?, image=?, link=?, position=?, published=?, updated_at=datetime('now') WHERE id=?`)
        .run(title, image, link, position || 0, published ?? 1, req.params.id);
    res.json({ message: 'Widget updated' });
});

app.delete('/api/admin/widgets/:id', authMiddleware, (req, res) => {
    db.prepare('DELETE FROM widgets WHERE id = ?').run(req.params.id);
    res.json({ message: 'Widget deleted' });
});

// --- CATCH-ALL FOR FRONTEND ---
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/admin')) {
        res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    }
});

// ========== START ==========

app.listen(PORT, () => {
    console.log(`\n  🔐 Admin Panel running at: http://localhost:${PORT}/admin`);
    console.log(`  📡 API running at: http://localhost:${PORT}/api\n`);
    console.log(`  Admin Login: ${ADMIN_USER} / ${ADMIN_PASS}\n`);
});

