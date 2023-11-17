// This is an export file for validators

import validateUser from "./user/userValidator.js";
import validateHomeowner from "./homeowner/homeownerValidator.js";
import validateTradesperson from "./tradesperson/tradespersonValidator.js";
import validateBooking from "./booking/bookingValidator.js";

export {
    validateUser,
    validateHomeowner,
    validateTradesperson,
    validateBooking,
}