# **Trampay - API de Conta Digital**  

Este repositório contém a implementação da API de uma conta digital, desenvolvida com **NestJS**, integrando autenticação baseada em **JWT** e comunicação com serviços externos para autorização de transações.  

## **Tecnologias utilizadas**  
- **NestJS** - Framework para construção da API  
- **TypeORM** - ORM para interação com o banco de dados  
- **PostgreSQL** - Banco de dados relacional  
- **Docker** - Containerização da aplicação  
- **Swagger** - Documentação da API  
- **JWT** - Autenticação segura
- **Adiminer** - Gerenciador de banco de dados

## **Principais funcionalidades**  
✔️ Criação e gerenciamento de contas digitais  
✔️ Transferências internas e externas  
✔️ Autenticação via JWT  
✔️ Comunicação com serviço externo para autorização de transações  
✔️ Documentação interativa via Swagger  

## **Como executar**  

### **Requisitos**  
- Docker e Docker Compose instalados  
- Node.js (versão 20+) e npm/yarn instalados  

### **Passos**  

1. **Clone o repositório**  
   ```sh
   git clone https://github.com/seu-usuario/trampay-api.git
   cd trampay-api
   ```

2. **Suba os containers com Docker Compose**  
   ```sh
   docker-compose up --build
   ```

3. **Acesse a API**  
   - A API estará disponível em `http://localhost:3000`  
   - A documentação Swagger pode ser acessada em `http://localhost:3000/api`  
   - O Adminer (gerenciador do banco) estará disponível em `http://localhost:8080`  

---

