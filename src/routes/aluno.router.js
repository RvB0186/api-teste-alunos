
import { Router } from 'express';
import AlunoController from '../controllers/AlunoController'; 

const alunoRoutes = Router();
const alunoController = new AlunoController();

alunoRoutes.post('/create', alunoController.create); 
alunoRoutes.get('/show', alunoController.show);

export default alunoRoutes;