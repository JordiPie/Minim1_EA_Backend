import express from 'express';
import controller from '../controllers/Professor';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.professor.create), controller.createProfessor);
router.get('/:professorId', controller.readProfessor);
router.get('/:page/:limit', controller.readAll);
router.get('/', controller.dameTodo);
router.put('/:professorId', ValidateSchema(Schemas.user.update), controller.updateProfessor);
router.delete('/:professorId', controller.deleteProfessor);

export = router;