import { verify } from "argon2";
import { db } from "../database.js";

export const login_action = async (req, res) => {
    const { username, password } = req.body
    if (username) {
        const user_db = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (user_db && await verify(user_db.password, password)) {
            return res.send({ success: true }); // Adjust response as needed
        }
    }
    res.view('templates/login.ejs', { pageTitle: 'Connexion' });
}

export const logout_action = (req, res) => {
    res.redirect('/');
}