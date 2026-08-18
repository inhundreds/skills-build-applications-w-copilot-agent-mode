import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profile?: {
        firstName?: string;
        lastName?: string;
        bio?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export interface ITeam extends Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
    leader: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Team: mongoose.Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, mongoose.DefaultSchemaOptions> & ITeam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    duration: number;
    distance?: number;
    calories?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export interface ILeaderboard extends Document {
    userId: mongoose.Types.ObjectId;
    teamId: mongoose.Types.ObjectId;
    totalActivities: number;
    totalCalories: number;
    rank: number;
    updatedAt: Date;
}
export declare const Leaderboard: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    exercises: Array<{
        name: string;
        sets: number;
        reps: number;
        weight?: number;
    }>;
    difficulty: string;
    estimatedDuration: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
//# sourceMappingURL=models.d.ts.map