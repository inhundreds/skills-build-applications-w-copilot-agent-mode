"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log(`✅ Connected to MongoDB at ${connectionString}`);
    }
    catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
mongoose_1.default.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=database.js.map