import { db } from "../database.js";
import { record_not_found_error } from "../errors/record_not_found_error.js";

export const list_posts = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()
  res.view('templates/index.ejs', {
    posts,
    pageTitle: 'Apprendre Fastify from server',
  });
}

export const show_article = (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  if (!post) {
    throw new record_not_found_error(`L'article n°${req.params.id} est introuvable`);
  }
  res.view('templates/article.ejs', {
    post,
    pageTitle: `Article n°${post.id}`,
  });
}

export const create_post = (req, res) => {
  const slug = req.body.title.toLowerCase().replace(/ /g, '-'); // Generate slug from title
  const post = db.prepare('INSERT INTO posts (title, content, created_at, slug) VALUES (?, ?, ?, ?)').run(req.body.title, req.body.content, Math.round(Date.now() / 1000), slug);
  res.redirect(`/articles/${post.lastInsertRowid}`);
}

export const delete_post = (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  if (!post) {
    throw new record_not_found_error(`L'article n°${req.params.id} est introuvable`);
  }
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.redirect('/');
}