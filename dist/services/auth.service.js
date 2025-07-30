"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
exports.authService = {
    async handleLocalSignup(data) {
        if (!data.email || !data.password) {
            throw new Error('Email, password required.');
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!data.password.match(passwordRegex)) {
            throw new Error('Password invalid.');
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: data.name ?? 'Default',
                email: data.email,
                password: hashedPassword,
                info: data.info ?? 'Input your info.',
                userImgURL: data.userImgURL ?? '',
            },
        });
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        return {
            message: 'User created successfully',
            accessToken,
            refreshToken,
        };
    },
    async handleAppleSignup(data) {
        return {
            message: 'Support not yet'
        };
    },
    async handleGoogleSignup(data) {
        return {
            message: 'Support not yet'
        };
    },
};
