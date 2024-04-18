import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authroute from "./routes/auth.js"
import usersroute from "./routes/users.js"
import orderroute from "./routes/Order.js"
import hotelsroute from "./routes/hotels.js"
import roomsroute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connecté a mongodb!")
  } catch (error) {
    throw error;
  }
};
const corsOptions = {
  origin: 'https://votre-site-web.com',
  methods: 'GET, POST, PUT, DELETE',
};
app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authroute)
app.use("/api/hotels",hotelsroute)
app.use("/api/rooms",roomsroute)
app.use("/api/users",usersroute)
app.use("/api/orders",orderroute)



app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("connecté au serveur");
});


