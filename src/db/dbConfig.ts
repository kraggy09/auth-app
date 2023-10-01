import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error .Pls make sure MongoDB is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!!");
    console.log(error);
  }
}
