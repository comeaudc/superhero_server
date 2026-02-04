import express from "express";
import Character from "../models/characterSchema.js";
import data from "../utilities/data.js";

const router = express.Router();

// router.get("/seed", async (req, res) => {
//   try {
//     await Character.deleteMany({});
//     await Character.create(data);

//     res.send("Seeded Database");
//   } catch (error) {
//     console.error(error.message);
//     res.send("Seed failed");
//   }
// });

// Create
router
  .route("/")
  .post(async (req, res) => {
    let newChar = await Character.insertOne(req.body);

    res.json(newChar);
  })
  //  Read - Show All
  .get(async (req, res) => {
    let allChars = await Character.find({});

    res.json(allChars);
  });

// Update
router
  .route("/:id")
  .put(async (req, res) => {
    let updatedChar = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedChar) return res.status(404).json({ error: "Char Not Found" });

    res.json(updatedChar);
  })
  // Delete
  .delete(async (req, res) => {
    let deletedChar = await Character.findByIdAndDelete(req.params.id);

    if (!deletedChar) return res.status(404).json({ error: "Char Not Found" });

    res.json(deletedChar);
  })

  // Show One
  .get(async (req, res) => {
    let char = await Character.findById(req.params.id);

    if (!char) return res.status(404).json({ error: "Char Not Found" });

    res.json(char);
  });

export default router;
