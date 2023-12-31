import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Cradentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signinGoogle = async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const decodedData = jwt.decode(req.body.data);
    // console.log("decodedData", decodedData);
    const { email, name, sub, picture } = decodedData;

    const existingUser = await User.findOne({ sub });

    if (existingUser) {
      // console.log("existingUser", existingUser);
      existingUser.name = name;
      existingUser.picture = picture;
      await existingUser.save();
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
          sub: existingUser.sub,
        },
        secret,
        { expiresIn: "1h" }
      );
      const result = {
        email: existingUser.email,
        name: existingUser.name,
        picture: existingUser.picture,
        _id: existingUser._id,
      };
      return res.status(200).json({ result: result, token });
    }

    const newUser = await User.create({
      email,
      sub,
      name,
      picture,
    });

    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, sub: newUser.sub },
      secret,
      { expiresIn: "1h" }
    );
    const result = {
      email: newUser.email,
      name: newUser.name,
      picture: newUser.picture,
      _id: newUser._id,
    };
    return res.status(200).json({ result: result, token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "invalid" });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    // console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const { name, email } = user;
    return res.status(200).json({ data: { name, email } });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};