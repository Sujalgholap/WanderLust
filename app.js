const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Heyy, I am root");
});

app.get("/testListing", async (req,res)=>{
    let sampleListing = new Listing({
      title : "My Villa",
      description : "Seaface view",
      price : 1500,
      location : "Dadur",
      country : "India",
    })

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successfull Testing");
});

app.listen(8080, () => {
  console.log("Port is listening to port 8080");
});
