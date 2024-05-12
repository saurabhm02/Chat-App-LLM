import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//register new user
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = await req.body;
    if (
      !fullName ||
      fullName === "" ||
      !email ||
      email === "" ||
      !password ||
      password === ""
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: "User already exists please login!",
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    newUser.save();
    return res.status(201).send({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || email === "" || !password || password === "") {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) {
      return res.status(200).send({
        success: false,
        message: "invalid email or password!",
      });
    }

    const token = await jwt.sign(
      { userId: validUser._id, email: validUser.email, status: validUser.status },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    if (!token) {
      return res.status(500).send({
        success: false,
        message: "Error in server",
      });
    }
    await User.updateOne(
      { _id: validUser._id },
      {
        $set: {
          token: token,
        },
      }
    );
    return res
      .cookie("user_token", token, { httpOnly: true })
      .status(200)
      .send({
        success: true,
        message: "Logged in successfully",
        user: {
          _id: validUser._id,
          fullName: validUser.fullName,
          email: validUser.email,
          avatar: validUser.avatar,
        },
        token: validUser.token,
      });
  } catch (error) {
    console.log(error);
  }
};

// log out user
export const logout = (req, res, next) => {
  try {
    res.clearCookie("user_token");
    res.status(200).json("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
export const setStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email }, 
      { status }, 
      { new: true }
    );
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send('Status updated successfully.');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};