// This is the login contoller

import { loginUserEmail, loginUserPhoneNumber } from "../../../services/auth/index.js";
import { logger } from "../../../config/index.js";

const emailLoginAuthContoller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginData = { email, password };
        const loginResponse = await loginUserEmail(email, password);
        res.status(200).json(loginResponse);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: error.message });
    }
};

const phoneNumberLoginAuthController = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const loginData = { phoneNumber, password };
        const loginResponse = await loginUserPhoneNumber(phoneNumber, password);
        res.status(200).json(loginResponse);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: error.message });
    }
};

export {
    emailLoginAuthContoller,
    phoneNumberLoginAuthController,
}