import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        error: 'Token not provided',
        message: 'Please provide a valid authentication token',
      });
    }

    const token = authToken.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Invalid token format',
        message: 'Token must be in the format: Bearer <token>',
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || authConfig.secret,
      (error, decoded) => {
        if (error) {
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
              error: 'Token expired',
              message:
                'Your authentication token has expired. Please login again.',
            });
          }
          return res.status(401).json({
            error: 'Token invalid',
            message: 'Your authentication token is invalid',
          });
        }

        req.userId = decoded.id;
        req.userName = decoded.name;
        req.userIsAdmin = decoded.admin;

        return next();
      },
    );
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      error: 'Authentication error',
      message: 'An error occurred during authentication',
    });
  }
};

export default authMiddleware;
