const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1395878839/photo/despair.webp?b=1&s=170667a&w=0&k=20&c=SZqDiMhFlvtXvtCHd5JSNgyvmKpt55LPZXMGwUc_J0k=",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/1395878839/photo/despair.webp?b=1&s=170667a&w=0&k=20&c=SZqDiMhFlvtXvtCHd5JSNgyvmKpt55LPZXMGwUc_J0k="
        : v,
  },
  price : Number,
  location: String,
  country: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review",
    },
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "User",
  },
});

listingSchema.post("findOneandDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id: {$in : listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;