export const login_action = (req, res) => {
    return res.view('/templates/login.ejs');
}
export const log_user = (req, res) => {
    return req.body;
}