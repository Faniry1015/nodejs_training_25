import { verify } from "argon2";
import { db } from "../database.js";

export const login_action = async (req, res) => {
    const params = {};
    if (req.method === 'POST') {
        const { username, password } = req.body
        params.username = username
        if (username) {
            const user_db = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
            if (user_db && await verify(user_db.password, password)) {
                req.session.set('user', username)
                return res.redirect('/');
            }
        }
        params.error = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
    return res.view('templates/login.ejs', params, {pageTitle: 'Connexion' });
}

export const logout_action = (req, res) => {
    res.redirect('/');
}