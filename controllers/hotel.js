import Hote from "../models/Hote.js";
import Room from "../models/room.js";
import user from "../models/user.js";
export const createHotel = async (req, res, next) => {
  const userId = req.params.userid;
  const newHotel = new Hote(req.body);
  try {
    const savedhotel = await newHotel.save();
    await user.findByIdAndUpdate(userId, {
      $push: { hotels: savedhotel._id },
    });
    res.status(200).json(savedhotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updatehotel = async (req, res, next) => {
  try {
    const updatedhotel = await Hote.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedhotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    const hotelIdToDelete = req.params.id;

    // Supprimez l'hôtel lui-même
    await Hote.findByIdAndDelete(hotelIdToDelete);
    
    await Room.deleteMany({ idHote: hotelIdToDelete });

    // Ensuite, mettez à jour les utilisateurs pour supprimer l'ID de l'hôtel
    const users = await user.find({ hotels: hotelIdToDelete });

    for (const us of users) {
      const index = us.hotels.indexOf(hotelIdToDelete);
      if (index !== -1) {
        us.hotels.splice(index, 1);
      }
      await us.save();
    }

    res.status(200).json("Hôtel supprimé avec succès");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const gethotel = async (req, res, next) => {
  try {
    const hotel = await Hote.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const gethotels = async (req, res, next) => {
  try {
    console.log("Limit:", req.query.limit);
    const { min, max, ...others } = req.query;
    const hotels = await Hote.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999999999999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const countbycity = async (req, res, next) => {
  const Cities = req.query.cities.split(",");
  const list = await Promise.all(
    Cities.map((city) => {
      return Hote.countDocuments({ city: city });
    })
  );
  try {
    const hotels = await Hote.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const countbytype = async (req, res, next) => {
  try {
    const hotelcount = await Hote.countDocuments({ type: "Hotel" });
    const ressortcount = await Hote.countDocuments({ type: "ressort" });
    const appartementcount = await Hote.countDocuments({ type: "appartement" });
    const villacount = await Hote.countDocuments({ type: "villa" });
    const cabinecount = await Hote.countDocuments({ type: "cabine" });

    res.status(200).json([
      { type: "hotel", count: hotelcount },
      { type: "ressort", count: ressortcount },
      { type: "appartement", count: appartementcount },
      { type: "villa", count: villacount },
      { type: "cabine", count: cabinecount },
    ]);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const gethotelrooms = async (req, res, next) => {
  try {
    const hotel = await Hote.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const searchHotelsByModel = async (req, res, next) => {
  const { model } = req.query; // Le modèle de chambre que vous recherchez

  try {
    const hotels = await Hote.find({ "rooms.modéle": model }).exec();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const searchHotelsByModelandcity = async (req, res, next) => {
  const { model } = req.query; // Le modèle de chambre que vous recherchez
  const { destination } = req.query;

  try {
    const hotels = await Hote.find({
      "rooms.modéle": model,
      city: destination,
    }).exec();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};
