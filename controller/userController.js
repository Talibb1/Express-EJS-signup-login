// import userModel from "../models/userModel.js";
// import bcrypt from "bcrypt";

// class userController {
//   static home = (req, res) => {
//     res.render("index.ejs");
//   };
//   static login = (req, res) => {
//     res.render("login.ejs");
//   };

//   static findUser = async (req, res) => {

//     try {
//       const { email, password } = req.body;
      
//       const result = await userModel.findOne({
//           email: email
//         });
//         // console.log(email);
//         if (result != null) {
//         if (result.email === email && result.password === password) {
//           res.send(`<h1> wellcome ${result} </h1>`);
//         } else {
//           res.send("<h1>Your Email or password Is Not Validate</h1>");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   static register = (req, res) => {
//     res.render("registration.ejs");
//   };


//   static createUser = async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     try {
//       const dec = new userModel({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword,
//       });
//       await dec.save();
//       res.redirect("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// export default userController;




import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

class userController {
  static home = (req, res) => {
    res.render("index.ejs");
  };

  static login = (req, res) => {
    res.render("login.ejs");
  };

  static findUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Email validation
      if (!isValidEmail(email)) {
        return res.status(400).send("Invalid email format");
      }

      // Find user by email
      const user = await userModel.findOne({ email });

      // Handle user not found
      if (!user) {
        return res.status(401).send("Invalid email or password");
      }

      // Validate password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Handle incorrect password
      if (!passwordMatch) {
        return res.status(401).send("Invalid email or password");
      }

      // Successful login
      res.status(200).send({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };

  static register = (req, res) => {
    res.render("registration.ejs");
  };

  static createUser = async (req, res) => {
    const { name, email, password} = req.body;

    // Email validation
    if (!isValidEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Password validation (example regex)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Password must contain at least 8 characters, including a lowercase letter, an uppercase letter, a number, and a special character.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };
}

// Email validation function
function isValidEmail(email) {
  // Implement a robust email validation mechanism (e.g., using a dedicated library)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default userController;
