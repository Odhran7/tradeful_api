// This is the tradesperson model
/*
userId,
tradeType,
businessName,
skills,
qualifications,
*/
import mongoose from "mongoose";

const tradespersonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tradeType: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  available: {
    type: Boolean,
    required: false,
  }
});

const TradespersonModel = mongoose.model('Tradesperson', tradespersonSchema);

export default TradespersonModel;
