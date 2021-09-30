import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

const auth = async (req, res, next) => {
    let token;

    try {
        token = req.header('Authorization').replace('Bearer ', ''); //Removing Bearer from Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select('-password');
        if (!user) {
            throw new Error();
        }
        //To sending token and user back to request
        req.user = user;
        next();

    } catch (e) {

        res.status(401).send({ error: 'Authorization issue' })
    }

}
/*To check if user is admin or not we are adding an middleware*/

const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        }
        else {
            throw new Error('Not Authoroized as Admin.')
        }
    } catch (e) {
        res.status(401).send(e.message)
    }

}

export { auth, isAdmin }