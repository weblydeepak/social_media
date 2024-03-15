import jwt from 'jsonwebtoken';
export const verifyToken =async(req,res,next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const Token =token.split(" ");
        const JWT_TOKEN = Token[1];
        const data = jwt.verify(JWT_TOKEN, process.env.SECKEY);
        res.user=data.user;
        next();
    } catch (err) {
        return res.status(500).json({
            message:err.message,
        })
    }
}