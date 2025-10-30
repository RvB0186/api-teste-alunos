# API de Teste de Alunos

Este projeto é uma API REST simples para gerenciar alunos, desenvolvida em Node.js com Express e TypeScript. O objetivo principal do projeto foi praticar e implementar testes de unidade e de integração usando o **Vitest**.

## 🚀 Estrutura do Projeto

O projeto foi estruturado com uma clara separação de responsabilidades (Separation of Concerns), dividindo a aplicação nas seguintes camadas:

* [cite_start]`prisma/`: Contém o schema do banco de dados (`schema.prisma`)[cite: 14], definindo o modelo `Aluno`.
* [cite_start]`src/routes/`: Define as rotas da API (ex: `/alunos/show` [cite: 30][cite_start], `/alunos/create` [cite: 30]).
* [cite_start]`src/controllers/`: Recebe as requisições HTTP (`request`, `response`) e chama os serviços apropriados (ex: `AlunoController.ts` [cite: 3]).
* `src/services/`: Contém a lógica de negócio principal.
    * [cite_start]`alunoService.ts`: Funções como `getAlunos` [cite: 33] [cite_start]e `addAluno`[cite: 34], que interagem com o banco de dados.
    * [cite_start]`utils.js`: Funções auxiliares (ex: `isValidEmail` [cite: 35]).
* [cite_start]`src/tests/`: Contém os testes de unidade para os serviços (ex: `aluno.test.ts` [cite: 38]).

## 🧪 Testes Implementados

Foram implementados testes de unidade para garantir que a lógica de negócio e as funções utilitárias funcionem como esperado.

### [cite_start]1. Testes do `alunoService` (`aluno.test.ts`) [cite: 38]

O desafio aqui era testar o serviço sem se conectar a um banco de dados real. Para isso, o `PrismaClient` foi simulado (mockado).

* [cite_start]**`vi.mock('@prisma/client', ...)`**: Intercepta a importação do `PrismaClient`[cite: 41].
* [cite_start]**`vi.hoisted`**: Garante que nossas variáveis de mock (`mockCreate`, `mockFindMany`) fossem criadas *antes* que o `vi.mock` fosse executado[cite: 40], evitando erros de "ReferenceError".
* **Testes:**
    * [cite_start]`deve criar um aluno`: Verifica se a função `addAluno` chama o `prisma.aluno.create` com os dados corretos[cite: 43].
    * [cite_start]`deve buscar todos os alunos`: Verifica se `getAlunos` chama `prisma.aluno.findMany` e retorna a lista de mock[cite: 44].

### [cite_start]2. Testes do `utils.js` (`utils.test.js`) [cite: 36]

[cite_start]Testes simples para validar a função `isValidEmail`[cite: 37]:

* Testa se um e-mail válido (com `@`) retorna `true`.
* Testa se um e-mail inválido (sem `@`) retorna `false`.

## 💡 Aprendizados com a Prática

Este projeto foi uma experiência de aprendizado prático, especialmente na configuração de um ambiente de testes moderno para um projeto TypeScript com ESM.

1.  [cite_start]**Configuração de Módulos (ESM vs CJS):** O projeto usa ES Modules (`"type": "module"` no `package.json` [cite: 259]). Isso exigiu que todo o código fosse padronizado para `import/export`, corrigindo arquivos antigos que usavam `require/module.exports`.

2.  **Mocking de Dependências (Prisma):** A maior lição foi como isolar um serviço para testes de unidade. Aprender a usar `vi.mock` foi essencial para simular o `PrismaClient` e testar a lógica do `alunoService` sem depender do banco de dados.

3.  **Hoisting no Vitest:** Descobri que `vi.mock` é "elevado" (executado antes de tudo). Isso causou erros de `ReferenceError` porque meus mocks ainda não existiam. A solução foi usar `vi.hoisted` para criar as funções mock antes que o `vi.mock` tentasse acessá-las.

4.  **Boas Práticas de Git:** Aprendi na prática a importância fundamental do arquivo `.gitignore` para **NUNCA** enviar a pasta `node_modules` para o repositório. Também passei pelo fluxo de autenticação (erro 403), entendendo como o Git gerencia credenciais de diferentes contas no Windows.