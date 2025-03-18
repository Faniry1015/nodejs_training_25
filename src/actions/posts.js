import { db } from "../database.js";
import { record_not_found_error } from "../errors/record_not_found_error.js";

export const list_posts = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts').all()
  console.log(posts)
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
  res.view('templates/articles.ejs', {
    post,
    pageTitle: `Article n°${post.id}`,
  });
}