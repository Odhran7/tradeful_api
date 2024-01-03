// This is a model for the payments 
import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema({
    stripeCustomerId: {
        type: String,
        required: true,
    },
    paymentMethodId: {
        type: String,
        required: true,
    },
});

const PaymentInfoModel = mongoose.model("PaymentInfo", paymentInfoSchema);
export default PaymentInfoModel;
