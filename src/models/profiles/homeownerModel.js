// This is the homeowner model
/*
userId
propertyDetails : [
    type,
    size,
    location,
    isBusiness
]
*/
import mongoose from "mongoose";
const homeownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  propertyDetails: {
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    isBusiness: {
      type: Boolean,
      required: true
    }
  }
});

const HomeownerModel = mongoose.model('Homeowner', homeownerSchema);

export default HomeownerModel;
