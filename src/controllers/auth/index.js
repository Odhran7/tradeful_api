// This is the export file for the auth controllers
import registerHomeOwnerController from "./local/homeOwnerAuthController.js";
import registerTradespersonController from "./local/tradespersonAuthController.js";
import { emailLoginAuthContoller, phoneNumberLoginAuthController } from "./local/loginAuthController.js";


export {
    registerHomeOwnerController,
    registerTradespersonController,
    emailLoginAuthContoller,
    phoneNumberLoginAuthController,
};

