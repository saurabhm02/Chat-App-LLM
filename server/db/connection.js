import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = () => {
  mongoose.connect(process.env.DB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch((error)=>{
    console.log("Facing issues while connecting to database");
    console.error(error);
    process.exit(1);
});
};

export default connectDb;
