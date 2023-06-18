import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            console.log("401 : auth token authorization");
            return res.status(401).json({ error: 'No token provided' });
        }
        jwt.verify(authorization, "VBVECDGDEGCHCDAHCNBEA*&^*@&*#$HVFFBNVF", (err, decodedToken) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to authenticate token' });
            }

            // Pass the decoded user information to the next middleware or route handler
            req.locals = { user: decodedToken };
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}

export default auth;