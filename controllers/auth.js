import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newuser = new user({
      ...req.body,
      password: hash,
    });
    await newuser.save();
    res.status(200).send("user has been created");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const u = await user.findOne({ username: req.body.username });
    if (!u) {
      // Invalid username
      return res.status(401).send("Invalid username");
    }

    const ispasswordcorrect = await bcrypt.compare(
      req.body.password,
      u.password
    );

    if (!ispasswordcorrect) {
      // Invalid password
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: u._id, isAdmin: u.isAdmin }, process.env.JWT);

    const { password, isAdmin, ...otherdetails } = u._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherdetails }, isAdmin });
  } catch (err) {
    res.status(500).json(err);
  }
};
