const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getCompliment, randomFortune, getAllFortunes, createFortune, deleteFortune, updateFortune } = require('./controller')


app.get("/api/compliment", getCompliment);

app.get("/api/fortunes", randomFortune) //Part 1 

app.get("/api/fortunes", getAllFortunes) //Part 2
app.post("/api/fortunes", createFortune)
app.put("/api/fortunes/:id", updateFortune)
app.delete("/api/fortunes/:id", deleteFortune)


app.listen(4000, () => console.log("Server running on 4000"));
