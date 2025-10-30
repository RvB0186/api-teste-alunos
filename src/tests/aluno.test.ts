// Caminho: src/tests/aluno.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- INÍCIO DA CORREÇÃO ---
// 1. Crie seus mocks dentro de um bloco vi.hoisted()
// Isso garante que eles serão criados ANTES do vi.mock ser executado.
const { mockCreate, mockFindMany } = vi.hoisted(() => {
  return {
    mockCreate: vi.fn(),
    mockFindMany: vi.fn(),
  };
});

// 2. Agora o vi.mock pode acessar os mocks com segurança
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      aluno = {
        create: mockCreate,
        findMany: mockFindMany,
      };
    },
  };
});
// --- FIM DA CORREÇÃO ---

// 3. Importe seu serviço (ele usará o mock acima)
import { addAluno, getAlunos } from '../services/alunoService';

describe('Serviço de Alunos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um aluno', async () => {
    const mockAluno = {
      id: 1,
      nome: 'João',
      idade: 20,
    };

    mockCreate.mockResolvedValue(mockAluno);

    const resultado = await addAluno('João', 20);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { nome: 'João', idade: 20 },
    });
    
    expect(resultado).toEqual(mockAluno);
  });

  it('deve buscar todos os alunos', async () => {
    const mockAlunos = [
      { id: 1, nome: 'João', idade: 20 },
      { id: 2, nome: 'Maria', idade: 22 },
    ];

    mockFindMany.mockResolvedValue(mockAlunos);

    const resultado = await getAlunos();

    expect(mockFindMany).toHaveBeenCalled();
    expect(resultado).toEqual(mockAlunos);
  });
});