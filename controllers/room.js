import room from "../models/room.js";
import Hote from "../models/Hote.js";

export const createroom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newroom = new room(req.body);
  try {
    const savedroom = await newroom.save();
    const hotel = await Hote.findById(hotelId);
    const nextRoomNumber = hotel.rooms.length + 1;
    newroom.roomNumbers = [{ number: nextRoomNumber }];
    newroom.idHote = hotelId; // Ajouter l'ID de l'hôtel à la chambre
    newroom.hotelDetails = {
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      cheapestPrice: hotel.cheapestPrice,
      desc:  hotel.desc,
      distance:  hotel.distance,
      title:  hotel.title
    };
    await newroom.save();
    try {
      await Hote.findByIdAndUpdate(hotelId, {
        $push: {
          rooms: {
            _id: savedroom._id,
            modéle: savedroom.modéle,
            marque: savedroom.marque,
          },
        },
      });
      res.status(200).json({ room: savedroom, hotel: newroom.hotelDetails }); // Envoyer la réponse avec les détails de la chambre et de l'hôtel
    } catch (err) {
      res.status(500).json(err); // Envoyer une réponse d'erreur si une erreur se produit
    }
  } catch (err) {
    res.status(500).json(err); // Envoyer une réponse d'erreur si une erreur se produit
  }
};

export const updateroom = async (req, res, next) => {
  try {
    const updatedroom = await room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedroom);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteroom = async (req, res, next) => {
  try {
    const roomToDelete = await room.findById(req.params.roomid);

    if (!roomToDelete) {
      return res.status(404).json({ message: "Room not found" });
    }

    const hotelId = req.params.hotelid;

    await Hote.findByIdAndUpdate(hotelId, {
      $pull: { rooms: { _id: req.params.roomid } },
    });

    await Hote.updateOne(
      { _id: hotelId, "rooms._id": req.params.roomid },
      {
        $unset: {
          "rooms.$.marque": "",
          "rooms.$.modéle": "",
          "rooms.$._id": "",
        },
      }
    );

    await room.findByIdAndDelete(req.params.roomid);

    res.status(200).json("Supprimé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const getroom = async (req, res, next) => {
  try {
    const R = await room.findById(req.params.id);
    res.status(200).json(R);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getrooms = async (req, res, next) => {
  try {
    const rooms = await room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const availableroom = async (req, res, next) => {
  try {
    await room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("succées");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const changedispo = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const ROOM = await room.findById(roomId);

    if (!ROOM) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }

    ROOM.disponible = false;

    await ROOM.save();

    return res
      .status(200)
      .json({ message: "Disponibilité mise à jour avec succès", room: ROOM });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la disponibilité",
        error,
      });
  }
};

export const turnfalsecommande = async (req,res) => {
  const { roomId } = req.params;
  try {
    const ROOM = await room.findById(roomId);

    if (!ROOM) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }

    ROOM.disponible = true;

    await ROOM.save();

    return res
      .status(200)
      .json({ message: "Disponibilité mise à jour avec succès", room: ROOM });
  }
  catch (error) {
    return res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la disponibilité",
        error,
      });
  }
}