import mongoose, { Document, Schema } from 'mongoose';

export interface IProfessor {
    name: string;
    email: string;
    age: number;
}

export interface IProfessorModel extends IProfessor, Document {}

const ProfessorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IProfessorModel>('professor', ProfessorSchema);