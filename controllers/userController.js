import URL from "../models/urlModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function loadHomePage(req, res) {
  const userId = req.user._id;
  const allInfo = await URL.find({ createdBy: userId });
  res.render("index", { urls: allInfo });
}

async function signUpTheUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await User.create({ fullName: name, email: email, passWord: password });
  } catch (error) {
    return res.render("signup", { err: "Email Already In Use" });
  }
  res.redirect("login");
}

async function logInTheUser(req, res) {
  const { email, password } = req.body;
  const data = await User.findOne({ email: email });
  if (!data) {
    return res.render("login", {
      error: "Invalid Username Or Password Or It Doesn't Exists",
    });
  }
  const check = await bcrypt.compare(password, data.passWord);

  if (check) {
    const tokenCookie = jwt.sign({ _id: data._id }, process.env.SECRET_KEY);
    return res
      .cookie("uid", tokenCookie, {
        expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
        httpOnly: true, // Prevents client-side JavaScript access
      })
      .redirect("home");
  } else {
    return res.render("login", {
      error: "Invalid Username Or Password Or It Doesn't Exists",
    });
  }
}
export { loadHomePage, signUpTheUser, logInTheUser };
