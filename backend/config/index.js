import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
  PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI 
};


export default CONFIG