# 🚀 Jitterbit Orders API

<!-- Navegação rápida entre os dois idiomas -->
> **PT-BR** | [EN](#english-version)

<!-- Descrição curta do projeto — aparece abaixo do título no GitHub -->
API REST para gerenciamento de pedidos desenvolvida em Node.js, Express e MongoDB Atlas.
Projeto desenvolvido como parte do teste técnico para a vaga de **Jr System Analyst na Jitterbit**.

---

## 📋 Sobre o projeto

<!-- Explica o objetivo principal da API e a regra de negócio central (o mapping) -->
A API permite o gerenciamento completo de pedidos (CRUD), com **transformação de dados** entre o formato de entrada (PT-BR) e o formato salvo no banco de dados (EN), conforme especificado no desafio.

### Mapeamento de campos

<!-- Tabela mostrando como os campos são renomeados entre o input e o banco -->
| Input (PT-BR) | Banco de dados (EN) |
|---|---|
| `numeroPedido` | `orderId` |
| `valorTotal` | `value` |
| `dataCriacao` | `creationDate` |
| `items[].idItem` | `items[].productId` |
| `items[].quantidadeItem` | `items[].quantity` |
| `items[].valorItem` | `items[].price` |

---

## 🛠️ Tecnologias

<!-- Lista das tecnologias utilizadas com versão e função de cada uma -->
- **Node.js** v22+ — Runtime JavaScript que executa o servidor
- **Express.js** 4.18 — Framework HTTP para criação das rotas e middlewares
- **Mongoose** 7.5 — ODM que conecta o Node.js ao MongoDB e valida os dados
- **MongoDB Atlas** — Banco de dados NoSQL hospedado na nuvem (gratuito)
- **dotenv** — Carrega variáveis de ambiente do arquivo .env sem expor credenciais

---

## 📁 Estrutura do projeto

<!-- Organização dos arquivos — cada pasta tem uma responsabilidade única (MVC simplificado) -->
```
src/
├── app.js                    # Entry point — inicializa Express, rotas e banco
├── config/
│   └── database.js           # Conexão com MongoDB Atlas via Mongoose
├── controllers/
│   └── order.controller.js   # Lógica de negócio + mapping PT→EN dos campos
├── middleware/
│   └── errorHandler.js       # Tratamento global de erros (captura qualquer exceção)
├── models/
│   └── order.model.js        # Schema Mongoose — define estrutura e validações dos dados
└── routes/
    └── order.routes.js       # Define os endpoints e conecta com o controller
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

<!-- O que precisa ter instalado antes de começar -->
- Node.js v18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuito)

### Instalação

<!-- Passo a passo para clonar, instalar dependências e iniciar o servidor -->
```bash
# 1. Clone o repositório
git clone https://github.com/AlainDead/jitterbit-orders-api.git
cd jitterbit-orders-api

# 2. Instale as dependências listadas no package.json
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua connection string do MongoDB Atlas

# 4. Inicie o servidor
npm start
```

### Variáveis de ambiente

<!-- O arquivo .env guarda informações sensíveis e NÃO vai para o GitHub (.gitignore) -->
```env
# Porta em que o servidor vai rodar
PORT=3000

# String de conexão com o MongoDB Atlas
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/jitterbit-orders
```

---

## 📡 Endpoints

<!-- Tabela com todos os endpoints disponíveis, método HTTP, URL e se é obrigatório -->
| Método | URL | Descrição | Obrigatório |
|--------|-----|-----------|-------------|
| `POST` | `/order` | Criar novo pedido | ✅ Sim |
| `GET` | `/order/:numeroPedido` | Buscar pedido por número | ✅ Sim |
| `GET` | `/order/list` | Listar todos os pedidos | Opcional |
| `PUT` | `/order/:numeroPedido` | Atualizar pedido | Opcional |
| `DELETE` | `/order/:numeroPedido` | Deletar pedido | Opcional |

### Exemplo — Criar pedido

<!-- Exemplo completo de como usar o endpoint POST /order via terminal (curl) -->
**Request:**
```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

<!-- Response esperado após criar o pedido com sucesso — campos já mapeados para EN -->
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
}
```

### Códigos de resposta HTTP

<!-- Tabela com os status HTTP retornados pela API em cada situação -->
| Código | Situação |
|--------|----------|
| `200` | Operação realizada com sucesso |
| `201` | Pedido criado com sucesso |
| `400` | Dados inválidos ou campos obrigatórios ausentes |
| `404` | Pedido não encontrado |
| `409` | Pedido com esse número já existe |
| `500` | Erro interno do servidor |

---

## 👨‍💻 Autor

<!-- Informações do desenvolvedor com link direto para o LinkedIn -->
**Jonathan Alain**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-jonathan--alain-blue?logo=linkedin)](https://linkedin.com/in/jonathan-alain-933432225/)

---
---

<!-- ============================================================ -->
<!-- VERSÃO EM INGLÊS — mesma estrutura, conteúdo traduzido       -->
<!-- ============================================================ -->

<a name="english-version"></a>

# 🚀 Jitterbit Orders API

<!-- Quick navigation between languages -->
> **EN** | [PT-BR](#)

<!-- Short project description shown below the title on GitHub -->
REST API for order management built with Node.js, Express and MongoDB Atlas.
Developed as part of the technical test for the **Jr System Analyst** position at **Jitterbit**.

---

## 📋 About

<!-- Explains the main goal of the API and the central business rule (field mapping) -->
This API provides full CRUD operations for order management, with **data transformation** between the input format (PT-BR field names) and the database format (EN field names), as specified in the challenge.

### Field Mapping

<!-- Table showing how fields are renamed from input to database -->
| Input (PT-BR) | Database (EN) |
|---|---|
| `numeroPedido` | `orderId` |
| `valorTotal` | `value` |
| `dataCriacao` | `creationDate` |
| `items[].idItem` | `items[].productId` |
| `items[].quantidadeItem` | `items[].quantity` |
| `items[].valorItem` | `items[].price` |

---

## 🛠️ Tech Stack

<!-- Technologies used, their versions and what each one does -->
- **Node.js** v22+ — JavaScript Runtime that runs the server
- **Express.js** 4.18 — HTTP framework for routing and middlewares
- **Mongoose** 7.5 — ODM that connects Node.js to MongoDB and validates data
- **MongoDB Atlas** — Cloud-hosted NoSQL database (free tier)
- **dotenv** — Loads environment variables without exposing credentials

---

## 📁 Project Structure

<!-- File organization — each folder has a single responsibility (simplified MVC) -->
```
src/
├── app.js                    # Entry point — initializes Express, routes and DB
├── config/
│   └── database.js           # MongoDB Atlas connection via Mongoose
├── controllers/
│   └── order.controller.js   # Business logic + PT→EN field mapping
├── middleware/
│   └── errorHandler.js       # Global error handler (catches all exceptions)
├── models/
│   └── order.model.js        # Mongoose schema — defines structure and validations
└── routes/
    └── order.routes.js       # Defines endpoints and connects to controller
```

---

## ⚙️ Getting Started

### Prerequisites

<!-- What needs to be installed before running the project -->
- Node.js v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)

### Installation

<!-- Step by step to clone, install dependencies and start the server -->
```bash
# 1. Clone the repository
git clone https://github.com/AlainDead/jitterbit-orders-api.git
cd jitterbit-orders-api

# 2. Install dependencies listed in package.json
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

# 4. Start the server
npm start
```

### Environment Variables

<!-- The .env file stores sensitive info and is NOT committed to GitHub (.gitignore) -->
```env
# Port where the server will run
PORT=3000

# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/jitterbit-orders
```

---

## 📡 Endpoints

<!-- Table with all available endpoints, HTTP method, URL and whether required -->
| Method | URL | Description | Required |
|--------|-----|-------------|----------|
| `POST` | `/order` | Create a new order | ✅ Yes |
| `GET` | `/order/:numeroPedido` | Get order by number | ✅ Yes |
| `GET` | `/order/list` | List all orders | Optional |
| `PUT` | `/order/:numeroPedido` | Update an order | Optional |
| `DELETE` | `/order/:numeroPedido` | Delete an order | Optional |

### Example — Create Order

<!-- Full example of how to use the POST /order endpoint via terminal (curl) -->
**Request:**
```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

<!-- Expected response after successfully creating an order — fields already mapped to EN -->
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
}
```

### HTTP Response Codes

<!-- Table with HTTP status codes returned by the API in each situation -->
| Code | Meaning |
|------|---------|
| `200` | Operation completed successfully |
| `201` | Order created successfully |
| `400` | Invalid data or missing required fields |
| `404` | Order not found |
| `409` | Order with this number already exists |
| `500` | Internal server error |

---

## 👨‍💻 Author

<!-- Developer info with direct link to LinkedIn -->
**Jonathan Alain**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-jonathan--alain-blue?logo=linkedin)](https://linkedin.com/in/jonathan-alain-933432225/)
