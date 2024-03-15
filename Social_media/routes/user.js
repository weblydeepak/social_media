import express  from "express";
import {getUser, getUserFriends,addRemoveFriend} from "../controllers/User.js"
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
// route for get and read info 
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends", verifyToken,getUserFriends);
// route for update 
router.patch("/:id/friendId",verifyToken, addRemoveFriend);

export default router;



















