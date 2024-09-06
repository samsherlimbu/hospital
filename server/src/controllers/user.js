const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashPassword;

        const phoneNumberUserExists = await User.exists({ phoneNumber: req.body.phoneNumber });
        const emailUserExists = await User.exists({ email: req.body.email });

        if (phoneNumberUserExists) {
            return res.status(409).json({ message: 'Phone number already exists' });
        } else if (emailUserExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        await User.create(req.body);
        return res.json({ message: 'User registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatched = await bcrypt.compare(req.body.password, user.password);
            if (isMatched) {
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
                res.json({ message: "Authorized", token, user });
            } else {
                res.status(401).json({ message: "Invalid Password" });
            }
        } else {
            res.status(401).json({ message: "Email not registered" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const findAllAdmin = async (req, res) => {
    try {
      // Find users where isAdmin is true
      const admins = await User.find({ isAdmin: true });
      return res.json(admins);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        // Find user by ID
        const admin = await User.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({
            message: "Admin fetched successfully",
            data: admin
        });
    } catch (error) {
        console.error("Error fetching admin:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
const deleteAdminById= async (req, res) => {
    const { id } = req.params;
    try {
        const deleteResult = await User.deleteOne({ _id: id });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete admin', error: error.message });
    }

}

module.exports = { findAllUsers, registerUser, loginUser, findAllAdmin, getAdminById,deleteAdminById };
