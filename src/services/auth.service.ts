import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { AppleSignupDTO, GoogleSignupDTO, LocalSignupDTO } from "../dto/auth.dto";
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const authService = {
	async handleLocalSignup(data: LocalSignupDTO) {
		if (!data.email || !data.password || data.name) {
			throw new Error('Email, password, and name are required.');
		}
		
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			throw new Error('User already exists');
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				info: data.info ?? '',
				userImgURL: data.userImgURL ?? '',
			},
		});

		const accessToken = generateAccessToken(user.id);
		const refreshToken = generateRefreshToken(user.id);

		return {
			message: 'User created successfully',
			accessToken,
			refreshToken,
		};
	},

	async handleAppleSignup(data: AppleSignupDTO) {
		return { message: 'Support not yet' };
	},

	async handleGoogleSignup(data: GoogleSignupDTO) {
		return { message: 'Support not yet' };
	},
};