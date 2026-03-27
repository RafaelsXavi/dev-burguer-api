# 🍔 DevBurguer API

Backend robusto e escalável para o sistema DevBurguer, desenvolvido com foco em alta performance, segurança e organização arquitetural.

## 🚀 Destaques da Arquitetura

Este projeto foi recentemente refatorado para seguir padrões de **Senior Software Engineering**:

- **Service Layer (Camada de Serviço):** Isolamento total da lógica de negócio em `src/app/services`.
- **Validation Middleware:** Validação centralizada de esquemas com `Yup` via middleware, garantindo integridade dos dados sem repetição de código.
- **Advanced Error Handling:** Tratamento global de exceções otimizado para `Express 5`, com suporte nativo a erros assíncronos.
- **Configuração Segura:** Gestão de tokens JWT e conexões de banco de dados via variáveis de ambiente (`.env`).
- **Code Style:** Padronização rigorosa de código utilizando `Biome`.

## 🛠️ Tecnologias Utilizadas

- **Core:** Node.js, Express 5 (Beta/Latest)
- **Banco de Dados Relacional:** PostgreSQL com Sequelize ORM
- **Banco de Dados NoSQL:** MongoDB com Mongoose (para gestão de pedidos)
- **Autenticação:** JWT (JSON Web Token) e Bcrypt para hashing de senhas
- **Uploads:** Multer (Configuração ESM)
- **Validação:** Yup
- **Desenvolvimento:** Biome (Linting e Formatação), Jest (Testes de Integração)

## 📋 Como Rodar o Projeto

1. **Acesse o diretório da API:**
   ```bash
   cd dev-burguer-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` baseado no exemplo fornecido (ou use o já configurado):
   ```env
   MONGO_URL=mongodb://localhost:27017/devburguer
   JWT_SECRET=SEU_SEGREDO_AQUI
   PORT=3001
   ```

4. **Rode as migrações (Postgres):**
   ```bash
   npm run sequelize db:migrate
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🧪 Testes

Para rodar os testes de integração (ESM):
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

---
*Desenvolvido com visão crítica e padrões de alta escalabilidade.*
