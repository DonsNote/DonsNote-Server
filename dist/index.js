"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const artist_router_1 = __importDefault(require("./routers/artist.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const busking_router_1 = __importDefault(require("./routers/busking.router"));
const report_router_1 = __importDefault(require("./routers/report.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = Number(process.env.PORT) || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/auth', auth_router_1.default);
app.use('/users', user_router_1.default);
app.use('/artists', artist_router_1.default);
app.use('/buskings', busking_router_1.default);
app.use('/reports', report_router_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 DonsServer running at http://0.0.0.0:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/index.html'));
});
app.get('/policy', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/policy.html'));
});
