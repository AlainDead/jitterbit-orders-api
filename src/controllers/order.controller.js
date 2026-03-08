// Importa o Model de pedidos para interagir com o banco de dados
const Order = require('../models/order.model');

/**
 * Função de mapping: transforma o JSON de entrada (PT-BR)
 * para o formato que será salvo no banco de dados (EN)
 *
 * Entrada:  { numeroPedido, valorTotal, dataCriacao, items: [{ idItem, quantidadeItem, valorItem }] }
 * Saída:    { orderId, value, creationDate, items: [{ productId, quantity, price }] }
 */
const mapInputToSchema = (body) => ({
  orderId: body.numeroPedido,
  value: body.valorTotal,
  creationDate: new Date(body.dataCriacao),
  items: body.items.map((item) => ({
    productId: Number(item.idItem), // converte string para número
    quantity: item.quantidadeItem,
    price: item.valorItem
  }))
});

// ─────────────────────────────────────────────────────────────
// POST /order — Criar novo pedido (Obrigatório)
// ─────────────────────────────────────────────────────────────
const createOrder = async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Valida se todos os campos obrigatórios foram enviados
    if (!numeroPedido || valorTotal === undefined || !dataCriacao || !items) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios ausentes: numeroPedido, valorTotal, dataCriacao, items'
      });
    }

    // Verifica se já existe um pedido com o mesmo número
    const exists = await Order.findOne({ orderId: numeroPedido });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: `Pedido '${numeroPedido}' já existe`
      });
    }

    // Aplica o mapping e salva no banco
    const orderData = mapInputToSchema(req.body);
    const order = await Order.create(orderData);

    // Retorna 201 (Created) com o pedido criado
    return res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: order
    });
  } catch (error) {
    // Trata erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: Object.values(error.errors).map((e) => e.message)
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /order/:numeroPedido — Buscar pedido por número (Obrigatório)
// ─────────────────────────────────────────────────────────────
const getOrderById = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    // Busca o pedido no banco pelo orderId
    const order = await Order.findOne({ orderId: numeroPedido });

    // Retorna 404 se não encontrar
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /order/list — Listar todos os pedidos (Opcional)
// ─────────────────────────────────────────────────────────────
const listOrders = async (req, res) => {
  try {
    // Busca todos os pedidos ordenados do mais recente para o mais antigo
    const orders = await Order.find().sort({ creationDate: -1 });

    return res.status(200).json({
      success: true,
      total: orders.length,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /order/:numeroPedido — Atualizar pedido (Opcional)
// ─────────────────────────────────────────────────────────────
const updateOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    // Monta apenas os campos enviados no body (atualização parcial)
    const updateData = {};
    if (req.body.valorTotal !== undefined) updateData.value = req.body.valorTotal;
    if (req.body.dataCriacao) updateData.creationDate = new Date(req.body.dataCriacao);
    if (req.body.items) {
      updateData.items = req.body.items.map((item) => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));
    }

    // Atualiza e retorna o documento já atualizado (new: true)
    const order = await Order.findOneAndUpdate(
      { orderId: numeroPedido },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: order
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: Object.values(error.errors).map((e) => e.message)
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /order/:numeroPedido — Deletar pedido (Opcional)
// ─────────────────────────────────────────────────────────────
const deleteOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    // Busca e deleta o pedido em uma única operação
    const order = await Order.findOneAndDelete({ orderId: numeroPedido });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Pedido '${numeroPedido}' deletado com sucesso`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

// Exporta todas as funções para serem usadas nas rotas
module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};