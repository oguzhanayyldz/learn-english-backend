import express from "express";
import { basicAuth } from "../middlewares/auth.js";

import Word from "../models/word.js";

const router = express.Router();

router.get("/getWords", async (req, res) => {
    console.log("Kelimeler çağırıldı...");
    const { limit, offset } = req.query;
    const words = await Word.find({}).populate('author').skip(offset).limit(limit);
    res.json(words);
});

router.get("/getFailedWord", async (req, res) => {
    console.log("Hatalı kelime çağırıldı...");
    const { id } = req.query;
    const count = await Word.countDocuments({ _id: { $ne: id } });
    const random = Math.floor(Math.random() * count);
    console.log(random, count);
    const words = await Word.findOne({ _id: { $ne: id } }).skip(random);
    res.json(words);
});

router.post("/create", basicAuth ,async (req, res) => {
    try {
        const { word, successWord, rate } = req.body;
        const wordModel = new Word({ word: word, successWord: successWord, rate: rate, author: req.user.id });
        await wordModel.save();
        res.send("word is created succsessfully");
    } catch (error) {
        res.send("Failed when create word");
    }
})

router.get("/", (req, res) => {
	res.send(`Wordsss!`);
});

export default router;
