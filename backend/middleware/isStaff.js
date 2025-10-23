import User from '../models/User.js';

const isStaff = async (req, res, next) => {
  try {
    // req.user should be set by the protect middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'staff') {
      return res.status(403).json({ message: 'Forbidden: staff only' });
    }

    next();
  } catch (error) {
    console.error('isStaff middleware error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export default isStaff;
