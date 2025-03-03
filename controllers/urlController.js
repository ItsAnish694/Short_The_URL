import newShortID from "../utilities/shortId.js";
import URL from "../models/urlModel.js";

async function generateNewShortID(req, res) {
  let url = req.body.url.trim().toLowerCase();
  while (url.endsWith("/")) {
    url = url.slice(0, url.length - 1);
  }

  if (!url)
    return res
      .status(400)
      .json({ success: false, errorMsg: "URL is Required" });

  const urls = await URL.find({ createdBy: req.user._id });
  const ifExists = await URL.findOne({
    originalURL: url,
    createdBy: req.user._id,
  });

  if (ifExists) {
    return res.render("index", {
      urls: urls,
      shortId: ifExists.shortId,
    });
  }

  const shortId = newShortID();
  await URL.create({
    shortId: shortId,
    originalURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("index", { urls: urls, shortId: shortId });
}

async function redirectToOriginalURL(req, res) {
  const id = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    { shortId: id },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!result)
    return res
      .status(400)
      .json({ success: false, error: "No ShortURL Created" });
  return res.redirect(result.originalURL);
}

export { generateNewShortID, redirectToOriginalURL };
