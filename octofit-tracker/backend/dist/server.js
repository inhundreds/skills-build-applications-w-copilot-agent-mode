"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Environment-aware base URL for Codespaces
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        baseUrl,
        message: 'OctoFit Tracker API is running',
    });
});
// Users routes
app.get('/api/users/', (req, res) => {
    res.json({ message: 'Get all users', endpoint: '/api/users/' });
});
app.post('/api/users/', (req, res) => {
    res.json({ message: 'Create a new user', endpoint: '/api/users/' });
});
app.get('/api/users/:id', (req, res) => {
    res.json({ message: `Get user ${req.params.id}`, endpoint: '/api/users/:id' });
});
// Teams routes
app.get('/api/teams/', (req, res) => {
    res.json({ message: 'Get all teams', endpoint: '/api/teams/' });
});
app.post('/api/teams/', (req, res) => {
    res.json({ message: 'Create a new team', endpoint: '/api/teams/' });
});
app.get('/api/teams/:id', (req, res) => {
    res.json({ message: `Get team ${req.params.id}`, endpoint: '/api/teams/:id' });
});
// Activities routes
app.get('/api/activities/', (req, res) => {
    res.json({ message: 'Get all activities', endpoint: '/api/activities/' });
});
app.post('/api/activities/', (req, res) => {
    res.json({ message: 'Create a new activity', endpoint: '/api/activities/' });
});
app.get('/api/activities/:id', (req, res) => {
    res.json({ message: `Get activity ${req.params.id}`, endpoint: '/api/activities/:id' });
});
// Leaderboard routes
app.get('/api/leaderboard/', (req, res) => {
    res.json({ message: 'Get leaderboard', endpoint: '/api/leaderboard/' });
});
app.get('/api/leaderboard/:teamId', (req, res) => {
    res.json({
        message: `Get leaderboard for team ${req.params.teamId}`,
        endpoint: '/api/leaderboard/:teamId',
    });
});
// Workouts routes
app.get('/api/workouts/', (req, res) => {
    res.json({ message: 'Get all workout suggestions', endpoint: '/api/workouts/' });
});
app.get('/api/workouts/:userId', (req, res) => {
    res.json({
        message: `Get personalized workouts for user ${req.params.userId}`,
        endpoint: '/api/workouts/:userId',
    });
});
app.post('/api/workouts/', (req, res) => {
    res.json({ message: 'Create a new workout suggestion', endpoint: '/api/workouts/' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🏋️ OctoFit Tracker API running on port ${PORT}`);
    console.log(`📍 Base URL: ${baseUrl}`);
    console.log(`🔗 Health check: ${baseUrl}/health`);
});
exports.default = app;
//# sourceMappingURL=server.js.map