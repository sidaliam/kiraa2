import express from "express";
import { createRoomOrder,deleteorder,getorders,getOrdersByRoomIds, reponse} from "../controllers/Order.js";

const router = express.Router();
//post
router.post('/neworder/:userId/:roomId', createRoomOrder );
router.put('/response/:orderid', reponse );
router.get('/', getorders )
router.get("/byRoomIds",getOrdersByRoomIds)
router.delete("/:orderid",deleteorder);

export default router;
