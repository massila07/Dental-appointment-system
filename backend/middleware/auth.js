import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  try {
    let token;

    // read Authorization header (case-insensitive)
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach minimal user info to the request
      req.user = { id: decoded.id };

      return next();
    }

    return res.status(401).json({ message: 'Not authorized, token missing' });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;
