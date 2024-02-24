import express from "express";
const app = express();
const port = process.env.PORT || "3000";
import web from "./routes/userRoute.js";
// import mongoose from "mongoose";
import connectToDatabase from "./database/config.js";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/school";

// Database configuration
connectToDatabase(MONGODB_URI);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", web);

app.listen(port, () => {
  console.log(`sever listeners listening on port http://localhost:${port}`);
});

// const bcrypt = require("bcrypt");

// const saltRounds = 10;
// const pepper = "mySecretPepper";

// async function hashPassword(password) {
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const passwordWithPepper = password + pepper;
//     const hashedPassword = await bcrypt.hash(passwordWithPepper, salt);
//     return hashedPassword;
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     throw error;
//   }
// }

// async function verifyPassword(password, hashedPassword) {
//   try {
//     const passwordWithPepper = password + pepper;
//     const match = await bcrypt.compare(passwordWithPepper, hashedPassword);

//     return match;
//   } catch (error) {
//     console.error("Error verifying password:", error);
//     throw error;
//   }
// }

// const password = "mySecurePassword";
// hashPassword(password)
//   .then((hashedPassword) => {
//     console.log("Hashed password:", hashedPassword);
//     const inputPassword = "mySecurePassword";
//     verifyPassword(inputPassword, hashedPassword)
//       .then((match) => {
//         if (match) {
//           console.log("Password is correct");
//         } else {
//           console.log("Password is incorrect");
//         }
//       })
//       .catch((error) => {
//         console.error("Error verifying password:", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Error hashing password:", error);
//   });
