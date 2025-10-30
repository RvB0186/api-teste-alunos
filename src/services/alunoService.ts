import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retorna todos os alunos cadastrados
 */
export const getAlunos = async () => {
  return prisma.aluno.findMany();
};

/**
 * Adiciona um novo aluno
 */
export const addAluno = async (nome: string, idade: number) => {
  return prisma.aluno.create({ 
    data: { nome, idade } 
  });
};