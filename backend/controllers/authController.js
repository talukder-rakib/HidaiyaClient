import User from '../models/User.js';

export const registerUser = async (req, res, next) => {
  try {
    const { uid, email, name } = req.body;

    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email, name });
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
