import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const google = async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      const username =
        name.toLowerCase().replace(/\s+/g, "") +
        Math.random().toString(36).slice(-4);

      // Check for unique username here
      let newUser = await User.findOne({ username });
      while (newUser) {
        username += Math.random().toString(36).slice(-4); // Ensure unique username
        newUser = await User.findOne({ username });
      }

      newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = newUser._doc;
      return res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
