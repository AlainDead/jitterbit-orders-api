// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o Express para criar o servidor HTTP
const express = require('express');

// Importa a função de conexão com o banco de dados
const connectDB = require('./config/database');

// Importa as rotas de pedidos
const orderRoutes = require('./routes/order.routes');

// Importa o middleware global de tratamento de erros
const errorHandler = require('./middleware/errorHandler');

// Cria a instância da aplicação Express
const app = express();

// Permite que o frontend React acesse a API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Define a porta — usa a do .env ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// ── Middlewares globais ──────────────────────────────────────
// Permite que a API receba e entenda JSON no body das requisições
app.use(express.json());

// Permite receber dados de formulários HTML codificados
app.use(express.urlencoded({ extended: true }));

// ── Rotas ────────────────────────────────────────────────────
// Todas as rotas de pedidos ficam sob o prefixo /order
app.use('/order', orderRoutes);

// Rota raiz — health check para verificar se a API está rodando
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Jitterbit Orders API está rodando!',
    endpoints: {
      'POST   /order':               'Criar pedido',
      'GET    /order/list':          'Listar todos os pedidos',
      'GET    /order/:numeroPedido': 'Buscar pedido por número',
      'PUT    /order/:numeroPedido': 'Atualizar pedido',
      'DELETE /order/:numeroPedido': 'Deletar pedido'
    }
  });
});

// Rota não encontrada — captura qualquer URL não mapeada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota '${req.originalUrl}' não encontrada`
  });
});

// ── Middleware de erros ──────────────────────────────────────
// Deve ser registrado por último para capturar todos os erros
app.use(errorHandler);

// ── Conecta ao banco e inicia o servidor ─────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});