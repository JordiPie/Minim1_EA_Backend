import mongoose, { Document, Schema } from 'mongoose';
import { ISchedule } from './Schedule';
import { IProfessor } from './Professor';

export interface IAsignatura {
    name: string;
    schedule: ISchedule[];
    professor: IProfessor[];
}

export interface IAsignaturaModel extends IAsignatura, Document {}

const AsignaturaSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        schedule: [{ type: Schema.Types.ObjectId, required: false, ref: 'schedule' }],
        professor: [{ type: Schema.Types.ObjectId, required: false, ref: 'professor' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAsignaturaModel>('asignatura', AsignaturaSchema);
