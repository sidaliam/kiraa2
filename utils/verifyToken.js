import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(400).send("not authenticated");
    }
    jwt.verify(token, process.env.JWT, (err, u) => {
        if (err) {
            return res.status(401).send("Token not valid");
        }
        req.user = u;
        next();
    });
};
export const verifyuser = (req, res, next) => {
    verifytoken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return res.status(402).send("not authorized")

        }
        
    })
};
export const verifyadmin = (req, res, next) => {
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(402).send("not authorized")

        }
        
    })
};
