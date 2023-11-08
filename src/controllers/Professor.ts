import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Professor from '../models/Professor';

const createProfessor = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, age } = req.body;

    const professor = new Professor({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        age
    });

    return professor
        .save()
        .then((professor) => res.status(201).json(professor))
        .catch((error) => res.status(500).json(error));
};

const readProfessor = (req: Request, res: Response, next: NextFunction) => {
    const professorId = req.params.professorId;

    return Professor.findById(professorId)
        .then((professor) => (professor ? res.status(200).json(professor) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

async function paginate(page: number, limit: number): Promise<any> {
    try {
        const professors = await Professor.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await Professor.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ professors, pageCount });
        return { professors, pageCount };
    } catch (err) {
        console.log(err);
        return err;
    }
}

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    console.log({ page, limit });
    // Comprueba si page y limit son números válidos
    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send({ error: 'Invalid page or limit' });
    }

    console.log({ page, limit });
    const response = await paginate(Number(page), Number(limit));
    res.send(response);
};

const dameTodo = (req: Request, res: Response, next: NextFunction) => {
    return Professor.find()
        .then((professors) => res.status(200).json(professors))
        .catch((error) => res.status(500).json(error));
};

const updateProfessor = (req: Request, res: Response, next: NextFunction) => {
    const professorId = req.params.professorId;
    const { name, email,age } = req.body;
    const professor = new Professor({
        name,
        email,
        age
    });
    console.log(professor);
    return Professor.findByIdAndUpdate(professorId, { name: professor.name, email: professor.email })
        .then((professorOut) => (professorOut ? res.status(200).json(professor) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
    /* return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => 
                        res.status(201).json(user))
            
                    .catch((error) => {
                        console.log("save", error);
                        res.status(500).json(error);
                    });
                    
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json(error)); */
};

const deleteProfessor = (req: Request, res: Response, next: NextFunction) => {
    const professorId = req.params.professorId;

    return Professor.findByIdAndDelete(professorId)
        .then((professor) => (professor ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

export default { createProfessor, readProfessor, readAll, updateProfessor, deleteProfessor, dameTodo };