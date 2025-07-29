"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.authController = {
    handleAuth: async (req, res) => {
        const { provider } = req.body;
        if (!provider) {
            return res.status(400).json({ message: 'Provider is required' });
        }
        try {
            let result;
            switch (provider) {
                case 'local':
                    result = await auth_service_1.authService.handleLocalSignup(req.body);
                    break;
                case 'apple':
                    result = await auth_service_1.authService.handleAppleSignup(req.body);
                    break;
                case 'google':
                    result = await auth_service_1.authService.handleGoogleSignup(req.body);
                    break;
                default:
                    return res.status(400).json({ message: 'Unsupported provider' });
            }
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};
