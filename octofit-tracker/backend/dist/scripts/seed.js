"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        await mongoose_1.default.connection.db?.dropDatabase();
        const users = await models_1.User.insertMany([
            {
                username: 'alina_runs',
                email: 'alina@example.com',
                password: 'hashed_password_1',
                profile: { firstName: 'Alina', lastName: 'Park', bio: 'Half-marathon enthusiast and team captain.' },
            },
            {
                username: 'marc_strength',
                email: 'marc@example.com',
                password: 'hashed_password_2',
                profile: { firstName: 'Marc', lastName: 'Nguyen', bio: 'Strength coach focused on sustainable gains.' },
            },
            {
                username: 'sasha_cycle',
                email: 'sasha@example.com',
                password: 'hashed_password_3',
                profile: { firstName: 'Sasha', lastName: 'Lopez', bio: 'Cycling specialist with a love for sprint intervals.' },
            },
            {
                username: 'dj_hike',
                email: 'dj@example.com',
                password: 'hashed_password_4',
                profile: { firstName: 'D.J.', lastName: 'Miller', bio: 'Weekend trail explorer and recovery advocate.' },
            },
        ]);
        const auroraStriders = await models_1.Team.create({
            name: 'Aurora Striders',
            description: 'A community running club focused on endurance and recovery.',
            members: [users[0]._id, users[1]._id, users[2]._id],
            leader: users[0]._id,
        });
        const summitCrew = await models_1.Team.create({
            name: 'Summit Crew',
            description: 'Strength-first team balancing mobility, power, and consistency.',
            members: [users[1]._id, users[3]._id],
            leader: users[3]._id,
        });
        const activities = await models_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 42,
                distance: 8.5,
                calories: 420,
                notes: 'Tempo run at sunrise.',
            },
            {
                userId: users[1]._id,
                type: 'weightlifting',
                duration: 55,
                calories: 380,
                notes: 'Upper-body power day.',
            },
            {
                userId: users[2]._id,
                type: 'cycling',
                duration: 35,
                distance: 18,
                calories: 460,
                notes: 'Interval ride on flats.',
            },
            {
                userId: users[3]._id,
                type: 'hiking',
                duration: 70,
                distance: 12.3,
                calories: 540,
                notes: 'Steady incline trail session.',
            },
        ]);
        const leaderboard = await models_1.Leaderboard.insertMany([
            {
                userId: users[0]._id,
                teamId: auroraStriders._id,
                totalActivities: 1,
                totalCalories: 420,
                rank: 1,
            },
            {
                userId: users[2]._id,
                teamId: auroraStriders._id,
                totalActivities: 1,
                totalCalories: 460,
                rank: 2,
            },
            {
                userId: users[3]._id,
                teamId: summitCrew._id,
                totalActivities: 1,
                totalCalories: 540,
                rank: 1,
            },
            {
                userId: users[1]._id,
                teamId: summitCrew._id,
                totalActivities: 1,
                totalCalories: 380,
                rank: 2,
            },
        ]);
        const workouts = await models_1.Workout.insertMany([
            {
                userId: users[0]._id,
                name: '5K Progressive Tempo',
                description: 'A balanced runner-focused session for pacing and confidence.',
                exercises: [
                    { name: 'Warm-up jog', sets: 1, reps: 1, weight: 0 },
                    { name: 'Tempo intervals', sets: 4, reps: 5, weight: 0 },
                    { name: 'Cool-down walk', sets: 1, reps: 1, weight: 0 },
                ],
                difficulty: 'medium',
                estimatedDuration: 40,
            },
            {
                userId: users[1]._id,
                name: 'Upper Body Power',
                description: 'Build explosive strength while protecting shoulder health.',
                exercises: [
                    { name: 'Bench Press', sets: 4, reps: 6, weight: 60 },
                    { name: 'Pull-ups', sets: 4, reps: 8, weight: 0 },
                    { name: 'Overhead Press', sets: 3, reps: 8, weight: 30 },
                ],
                difficulty: 'hard',
                estimatedDuration: 50,
            },
            {
                userId: users[2]._id,
                name: 'Sprint Pyramid Ride',
                description: 'Bike intervals to improve cadence and climbing power.',
                exercises: [
                    { name: 'Warm-up spin', sets: 1, reps: 1, weight: 0 },
                    { name: 'Sprint ladder', sets: 5, reps: 2, weight: 0 },
                    { name: 'Recovery spin', sets: 1, reps: 1, weight: 0 },
                ],
                difficulty: 'hard',
                estimatedDuration: 45,
            },
            {
                userId: users[3]._id,
                name: 'Trail Recovery Circuit',
                description: 'Low-impact work to improve balance and mobility after long hikes.',
                exercises: [
                    { name: 'Mobility flow', sets: 2, reps: 10, weight: 0 },
                    { name: 'Step-ups', sets: 3, reps: 12, weight: 12 },
                    { name: 'Core hold', sets: 3, reps: 30, weight: 0 },
                ],
                difficulty: 'easy',
                estimatedDuration: 35,
            },
        ]);
        console.log('Database seeding complete');
        console.log(JSON.stringify({ users: users.length, teams: [auroraStriders.name, summitCrew.name], activities: activities.length, leaderboard: leaderboard.length, workouts: workouts.length }, null, 2));
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    seedDatabase();
}
//# sourceMappingURL=seed.js.map