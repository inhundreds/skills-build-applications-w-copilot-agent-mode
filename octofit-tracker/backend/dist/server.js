"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        baseUrl,
        message: 'OctoFit Tracker API is running',
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json({ count: users.length, users });
});
app.post('/api/users/', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
app.get('/api/users/:id', async (req, res) => {
    const user = await models_1.User.findById(req.params.id).lean();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().populate('members').populate('leader').lean();
    res.json({ count: teams.length, teams });
});
app.post('/api/teams/', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json({ message: 'Team created', team });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
app.get('/api/teams/:id', async (req, res) => {
    const team = await models_1.Team.findById(req.params.id).populate('members').populate('leader').lean();
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    return res.json({ team });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('userId').lean();
    res.json({ count: activities.length, activities });
});
app.post('/api/activities/', async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json({ message: 'Activity created', activity });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
app.get('/api/activities/:id', async (req, res) => {
    const activity = await models_1.Activity.findById(req.params.id).populate('userId').lean();
    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    return res.json({ activity });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.Leaderboard.find().populate('userId').populate('teamId').sort({ rank: 1 }).lean();
    res.json({ count: leaderboard.length, leaderboard });
});
app.get('/api/leaderboard/:teamId', async (req, res) => {
    const leaderboard = await models_1.Leaderboard.find({ teamId: req.params.teamId })
        .populate('userId')
        .populate('teamId')
        .sort({ rank: 1 })
        .lean();
    res.json({ count: leaderboard.length, teamId: req.params.teamId, leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().populate('userId').lean();
    res.json({ count: workouts.length, workouts });
});
app.get('/api/workouts/:userId', async (req, res) => {
    const workouts = await models_1.Workout.find({ userId: req.params.userId }).populate('userId').lean();
    res.json({ count: workouts.length, userId: req.params.userId, workouts });
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json({ message: 'Workout created', workout });
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`🏋️ OctoFit Tracker API running on port ${PORT}`);
            console.log(`📍 Base URL: ${baseUrl}`);
            console.log(`🔗 Health check: ${baseUrl}/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map