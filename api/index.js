const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json())
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
const jwtSecret = "sxrdctfvgybhctrfvygbhjnkmgfhbj";
const bcryptSalt = bcrypt.genSaltSync(10);

//database connection
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.json("test ok");
});

// Regiter api
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
   
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    
    res.json(userDoc)
  }
  catch (e) {
    res.status(422).json(e);
  }
 
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDoc = await User.findOne({ email });
  if (UserDoc) {
    const passok = bcrypt.compareSync(password, UserDoc.password);
    if (passok) {
      jwt.sign(
        { email: UserDoc.email, id: UserDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          res.cookie("token", token).json(UserDoc);
        }
      );
    } else {
      res.json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(user.id);
      res.json({name, email, _id});
    })
  }
  else {
    res.json(null)
  }
  // res.json('user info')
})


connectToDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
