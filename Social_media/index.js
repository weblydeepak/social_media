import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/user.js";
import postsRoutes from "./routes/post.js";
import {createPost} from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/Auth.js";
import User from "./models/UserSchema.js"
import Post from "./models/post.js"
import {users,posts} from "./data/index.js"
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));



/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  
/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/post",verifyToken,upload.single("picture"),createPost);

// routes with code
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

const PORT = process.env.PORT ||4001;
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`port is runnig on ${PORT}`);
        console.log(`connected to database`);
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
}).catch((err)=>{
    console.log("err"+err.message);
})










