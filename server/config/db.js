import { connect } from "mongoose";

export const connectDB = () => {
  connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`MongoDB Connected : ${con.connection.host}`);
    })
    .catch((err) => console.log(`MongoDB connection failed : ${err}`));
};
