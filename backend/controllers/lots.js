const { Lot } = require("../models/lot");
const {
  HttpsError,
  ctrlWrapper,
  handleMongooseError,
} = require("../error_handler");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs");
const picturesDir = path.join(__dirname, "../", "public", "pictures");
const listLots = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Lot.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "title price");
  res.json(result);
};

const getLotById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Lot.findOne({ $and: [{ _id: id }, { owner }] });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json(result);
};

const addLot = async (req, res) => {
  const { _id: owner } = req.user;
  // const pictureURL = gravatar.url(owner.pictureURL);
  const result = await Lot.create({ ...req.body, owner /*pictureURL*/ });
  res.status(201).json(result);
};

const updateLot = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Lot.findOneAndUpdate(
    { $and: [{ _id: id }, { owner }] },
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json(result);
};

const removeLot = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Lot.findOneAndDelete({ $and: [{ _id: id }, { owner }] });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};
const updateFavoriteLot = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Lot.findOneAndUpdate(
    { $and: [{ _id: id }, { owner }] },
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json(result);
};
const updateLotPicture = async (req, res) => {
  const { id } = req.params;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${id}_${originalname}`;
  const resultUpload = path.join(picturesDir, filename);
  try {
    fs.renameSync(tempUpload, resultUpload);
    const pictureURL = path.join("pictures", filename);
    await Lot.findByIdAndUpdate(id, { pictureURL });
    res.json({
      pictureURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  listLots: ctrlWrapper(listLots),
  getLotById: ctrlWrapper(getLotById),
  addLot: ctrlWrapper(addLot),
  updateLot: ctrlWrapper(updateLot),
  removeLot: ctrlWrapper(removeLot),
  updateFavoriteLot: ctrlWrapper(updateFavoriteLot),
  updateLotPicture: ctrlWrapper(updateLotPicture),
};
