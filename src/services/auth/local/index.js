// This is the export file for the local auth services
import { loginUserEmail, loginUserPhoneNumber } from "./login/userLoginService.js";
import { registerHomeOwnerService, registerTradespersonService } from "./register/index.js";

export {
    loginUserEmail,
    loginUserPhoneNumber,
    registerHomeOwnerService,
    registerTradespersonService,
};