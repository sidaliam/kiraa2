import Order from "../models/OrderSchema.js";
import Hote from "../models/Hote.js";
import user from "../models/user.js";
export const createRoomOrder = async (req, res) => {
    try {
      const {unavailable} = req.body
      const{username}=req.body
      const{télephone}=req.body
      const{modéle}=req.body
      const {totale}=req.body
      const{idroomnumber}=req.body
      const userid=req.params.userId
      const roomid=req.params.roomId
      const roomOrder = new Order({
        user: userid,
        room: roomid,
        unavailable,
        username,
        télephone,
        modéle,
        totale,
        idroomnumber

      });
      await roomOrder.save();
  
      res.status(201).json({ success: true, data: roomOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  export const getorders = async (req, res, next) => {
    try {
        const order = await Order.find()
        res.status(200).json(order);

    } catch (err) {
      res.status(500).json(err);
    }
  };
  export const getUserOrders = async (req, res, next) => {
    try {
      const userId = req.params.userId;  // Récupérez l'ID de l'utilisateur à partir des paramètres de la requête
  
      // Recherchez les hôtels associés à l'utilisateur
      const User = await user.findById(userId).exec();
      const hotelIds = User.hotels;  // Obtenez les IDs des hôtels de l'utilisateur
  
      // Recherchez les chambres associées aux hôtels de l'utilisateur
      const hotelRooms = await Hote.find({ _id: { $in: hotelIds } }).select('rooms').exec();
  
      // Récupérez les IDs des chambres
      const roomIds = hotelRooms.flatMap((hotel) => hotel.rooms.map((room) => room._id));
  
      // Recherchez les commandes associées aux chambres de l'utilisateur
      const userOrders = await Order.find({ room: { $in: roomIds } }).exec();
  
      res.status(200).json(userOrders);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // orderController.js


// Fonction pour récupérer les commandes des chambres d'un hôtel pour un utilisateur donné
export const getOrdersByRoomIds = async (req, res) => {
    try {
      const { roomIds } = req.query;

      const orders = await Order.find({ room: { $in: roomIds } });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

  export const reponse = async (req, res, next) => {
    const {orderid}  = req.params
  
    try {
      // Recherchez la commande par ID
      const commande = await Order.findById(orderid);
  
      if (!commande) {
        return res.status(404).json({ message: "Chambre non trouvée" });
      }
  
      // Inversez la valeur de la disponibilité
      commande.reponse = true;
  
      // Enregistrez la mise à jour
      await commande.save();
  
      return res
        .status(200)
        .json({ message: "Disponibilité mise à jour avec succès", room });
    } catch (error) {

    }
  };

  export const deleteorder = async (req, res, next) => {
    try {
      const orderIdToDelete = req.params.orderid;
  
      // Supprimez l'hôtel lui-même
      await Order.findByIdAndDelete(orderIdToDelete);
  
  
      res.status(200).json("Commande supprimé avec succès");
    } catch (err) {
      res.status(500).json(err);
    }
  };


