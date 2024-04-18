import express from "express"
import { createroom, deleteroom, getroom, getrooms, updateroom,availableroom, changedispo, turnfalsecommande } from "../controllers/room.js";
import { verifyadmin } from "../utils/verifyToken.js";
const router =express.Router();


//post
router.post("/:hotelid",  verifyadmin,createroom)
  
//update
router.put("/:id",verifyadmin, updateroom);
//delete
router.delete("/:roomid/:hotelid",verifyadmin,deleteroom);
//
router.put("/availabality/:id", availableroom)
router.put("/toggleAvailability/:roomId",changedispo)
router.put("/cancel/:roomId",turnfalsecommande)
//find by id
router.get("/:id",getroom);
// find all
router.get("/",getrooms);

export default router