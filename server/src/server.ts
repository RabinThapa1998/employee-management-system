import { app } from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config";

const start = async () => {
  console.log("Starting up........");
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  const server = require("http").createServer(app);
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
    });

    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  server.listen(config.app.port, () => {
    console.log(`Listening on port ${config.app.port}`);
  });
};

start();
