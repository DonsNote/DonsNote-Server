import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
	handleAuth: async (req: Request, res: Response) => {
		const { provider } = req.body;

		if (!provider) {
			return res.status(400).json({ message: 'Provider is required' });
		}

		try {
			let result;

			switch (provider) {
				case 'local':
					result = await authService.handleLocalSignup(req.body);
					break;
				
				case 'apple':
					result = await authService.handleAppleSignup(req.body);
					break;
				
				case 'google':
					result = await authService.handleGoogleSignup(req.body);
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
