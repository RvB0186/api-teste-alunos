

import { PrismaClient } from '@prisma/client'; 
import { Request, Response } from 'express';
const prisma = new PrismaClient();


export default class AlunoController {
  
  async create(request: Request, response: Response) {
    try {
      const { nome, idade, email } = request.body;
      const aluno = await prisma.aluno.create({
        data: {
          nome,
          idade,
        },
      });
      response.json(aluno); 
    } catch (err) {
      return response.status(409).send();
    }
  }
 
  async show(request: Request, response: Response) {
    try {
      const alunos = await prisma.aluno.findMany();
      response.json(alunos);
    } catch (err) {
      return response.status(409).send();
    }
  }
}