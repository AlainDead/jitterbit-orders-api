// Importa o Router do Express para definir as rotas da aplicação
const express = require('express');
const router = express.Router();

// Importa todas as funções do controller de pedidos
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/order.controller');

/**
 * ATENÇÃO: A rota /list deve vir ANTES de /:numeroPedido
 * Se /:numeroPedido vier primeiro, o Express vai interpretar
 * "list" como um parâmetro dinâmico e nunca chegará na rota correta
 */

// GET /order/list — lista todos os pedidos (Opcional)
router.get('/list', listOrders);

// POST /order — cria um novo pedido (Obrigatório)
router.post('/', createOrder);

// GET /order/:numeroPedido — busca pedido por número (Obrigatório)
router.get('/:numeroPedido', getOrderById);

// PUT /order/:numeroPedido — atualiza pedido por número (Opcional)
router.put('/:numeroPedido', updateOrder);

// DELETE /order/:numeroPedido — deleta pedido por número (Opcional)
router.delete('/:numeroPedido', deleteOrder);

// Exporta o router para ser usado no app.js
module.exports = router;