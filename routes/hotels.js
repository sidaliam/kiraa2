import express from "express";
import { createHotel, deleteHotel, gethotel, gethotels, updatehotel ,countbycity,countbytype,gethotelrooms, searchHotelsByModel, searchHotelsByModelandcity } from "../controllers/hotel.js";
import { verifyadmin} from "../utils/verifyToken.js";

const router = express.Router();
//post
router.post("/:userid",  verifyadmin,createHotel)
  
//update
router.put("/:id",verifyadmin, updatehotel);
//delete
router.delete("/:id",verifyadmin,deleteHotel);
//find by id
router.get("/find/:id",gethotel);
// find all
router.get("/",gethotels);
router.get("/Countbycity",countbycity);
router.get("/Countbytypes",countbytype);
router.get("/room/:id",gethotelrooms);
router.get("/searchByModel",searchHotelsByModel)
router.get("/searchbymodelandcity",searchHotelsByModelandcity)

export default router;
