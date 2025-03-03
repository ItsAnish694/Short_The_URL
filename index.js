import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./connString.js";
import urlRouter from "./routes/urlRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const connString = process.env.connString;

connectToMongo(connString).then(() => console.log("Connected To Mongo"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("styles"));
app.use("/", urlRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.redirect("/user/home");
});

app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
