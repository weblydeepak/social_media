import express  from "express";
import {login} from "../controllers/Auth.js"

const router = express.Router();
router.get("/user", (req, res) => {
    res.send("GET request to /user");
  });
router.post("/login", login)
export default router;