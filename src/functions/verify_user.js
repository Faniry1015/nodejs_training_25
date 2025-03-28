import { not_authenticated_error } from "../errors/not_authenticated_error.js";

export const verify_user = (req) => {
    if (!req.session.get('user')) {
        throw new not_authenticated_error('Vous devez vous connecter pour créer un article');
      }
}