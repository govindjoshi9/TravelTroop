const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const imagedownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");

app.use(cookieParser());
app.use(express.json()); 
app.use(express.static('dist'))
app.use("/uploads", express.static(__dirname + "/uploads"));
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
    });

    res.json(userDoc);
  } catch (e) {
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

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
  // res.json('user info')
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imagedownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    discription,
    parks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const PlaceDoc = await Place.create({
      owner: user.id,
      title,
      address,
      addedPhotos,
      discription,
      parks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    });
    res.json(PlaceDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    discription,
    parks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const placeDoc = await Place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        addedPhotos,
        discription,
        parks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/booking", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, maxGuest, name, phone, price } = req.body;
   Booking.create({
     place,
     checkIn,
     checkOut,
     maxGuest,
     name,
     phone,
     price,
     user: userData.id,
   })
     .then((doc) => {
       res.json(doc);
     })
     .catch((err) => {
       throw err;
     });
});

function getUserDataFromToken(req) {
  return new Promise((resolve, rejects) => {
    
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, user) => { 
      if (err) throw err;
      resolve(user);
    })
  })

};

app.get('/booking', async(req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({user:userData.id}).populate('place'));

  
})

connectToDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
