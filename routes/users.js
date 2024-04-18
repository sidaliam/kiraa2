import express from "express"
import { deleteuser, getuser, getusers, getusershotel, updateuser } from "../controllers/user.js";
import { verifyadmin, verifytoken, verifyuser } from "../utils/verifyToken.js";
import { getUserOrders } from "../controllers/Order.js";

const router =express.Router();

//
router.get("/checkauthentification", verifytoken, (req, res, next) => {
    res.send("hello user , you are logged in");
});
router.get("/checkuser/:id", verifyuser, (req, res, next) => {
    res.send("hello user , you are logged in and you can delete your account");
});
router.get("/checkadmin/:id", verifyadmin, (req, res, next) => {
    res.send("hello admin , you are logged in and you can delete all acounts");
});

//update
router.put("/:id",verifyuser, updateuser);
//delete
router.delete("/:id",verifyuser,deleteuser);
//find by id
router.get("/:id",verifyuser, getuser);
// find all
router.get("/",verifyadmin, getusers);
//getusershotels
router.get("/hotels/:userid",getusershotel)

router.get("/:userId/orders",getUserOrders)

export default router