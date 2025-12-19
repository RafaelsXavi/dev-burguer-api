const adminMiddleware = (req, res, next) => {
    
    const isUserAdmin = req.userIsAdmin;


    if (!isUserAdmin) {
        return res.status(403).json({ error: 'User is not admin' });
    }

    return next();
};

export default adminMiddleware;