import User from '../models/user.js';
import handleErrors from '../utils/errorHandler.js';
import getPaginationData from '../utils/paginate.js'; // Assuming you have this

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const { currentPage, itemsPerPage, skip, totalPages } = getPaginationData(
      req.query.page,
      req.query.limit,
      totalUsers
    );
    const users = await User.find().skip(skip).limit(itemsPerPage);
    res.json({
      message: "Users retrieved successfully",
      currentPage,
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
  
    try {
      const savedUser = await user.save();
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ success: false, errors });
    }
};
  
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({
        success: true,
        message: "✅ User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ success: false, errors });
    }
};
  
export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "✅ User delete successfully",
        user: deletedUser,
      });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ success: false, errors });
    }
};
  
