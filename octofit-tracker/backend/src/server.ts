import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    baseUrl,
    message: 'OctoFit Tracker API is running',
  });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ count: users.length, users });
});

app.post('/api/users/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ user });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').populate('leader').lean();
  res.json({ count: teams.length, teams });
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

app.get('/api/teams/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members').populate('leader').lean();
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }

  return res.json({ team });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json({ count: activities.length, activities });
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity created', activity });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

app.get('/api/activities/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('userId').lean();
  if (!activity) {
    return res.status(404).json({ message: 'Activity not found' });
  }

  return res.json({ activity });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('userId').populate('teamId').sort({ rank: 1 }).lean();
  res.json({ count: leaderboard.length, leaderboard });
});

app.get('/api/leaderboard/:teamId', async (req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find({ teamId: req.params.teamId })
    .populate('userId')
    .populate('teamId')
    .sort({ rank: 1 })
    .lean();

  res.json({ count: leaderboard.length, teamId: req.params.teamId, leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().populate('userId').lean();
  res.json({ count: workouts.length, workouts });
});

app.get('/api/workouts/:userId', async (req: Request, res: Response) => {
  const workouts = await Workout.find({ userId: req.params.userId }).populate('userId').lean();
  res.json({ count: workouts.length, userId: req.params.userId, workouts });
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🏋️ OctoFit Tracker API running on port ${PORT}`);
      console.log(`📍 Base URL: ${baseUrl}`);
      console.log(`🔗 Health check: ${baseUrl}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
