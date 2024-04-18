import user from "../models/user.js";
import Hote from "../models/Hote.js";


export const updateuser = async (req, res, next) => {
  try {
    const updateduser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteuser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("Supprimé avec succées");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getuser = async (req, res, next) => {
  try {
    const u = await user.findById(req.params.id);
    res.status(200).json(u);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getusers = async (req, res, next) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getusershotel = async (req, res, next) => {
  try {
    const u= await user.findById(req.params.userid);
    const list = await Promise.all(u.hotels.map((hotel) => {
      return Hote.findById(hotel)

    }));

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};


