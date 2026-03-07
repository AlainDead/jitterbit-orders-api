// Importa o Mongoose para criar o schema e o model
const mongoose = require('mongoose');

/**
 * Schema dos itens do pedido
 * Define a estrutura de cada item dentro de um pedido
 * Os campos já estão no formato mapeado (EN) que será salvo no banco
 *
 * Mapping de entrada → banco:
 *   idItem         → productId
 *   quantidadeItem → quantity
 *   valorItem      → price
 */
const itemSchema = new mongoose.Schema({
  // ID do produto — convertido de string para número no controller
  productId: {
    type: Number,
    required: [true, 'productId é obrigatório']
  },
  // Quantidade do item — deve ser maior que zero
  quantity: {
    type: Number,
    required: [true, 'quantity é obrigatório'],
    min: [1, 'quantity deve ser maior que 0']
  },
  // Preço unitário do item — não pode ser negativo
  price: {
    type: Number,
    required: [true, 'price é obrigatório'],
    min: [0, 'price não pode ser negativo']
  }
});

/**
 * Schema principal do pedido
 * Define a estrutura do documento que será salvo no MongoDB
 *
 * Mapping de entrada → banco:
 *   numeroPedido → orderId
 *   valorTotal   → value
 *   dataCriacao  → creationDate
 *   items        → items (cada item passa pelo itemSchema acima)
 */
const orderSchema = new mongoose.Schema(
  {
    // Número único do pedido — não permite duplicatas
    orderId: {
      type: String,
      required: [true, 'orderId é obrigatório'],
      unique: true,
      trim: true // remove espaços extras no início e fim
    },
    // Valor total do pedido
    value: {
      type: Number,
      required: [true, 'value é obrigatório'],
      min: [0, 'value não pode ser negativo']
    },
    // Data de criação do pedido
    creationDate: {
      type: Date,
      required: [true, 'creationDate é obrigatório']
    },
    // Lista de itens do pedido — deve ter ao menos um item
    items: {
      type: [itemSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'O pedido deve conter ao menos um item'
      }
    }
  },
  {
    versionKey: '__v' // campo de controle de versão do documento no MongoDB
  }
);

// Exporta o model para ser usado no controller
module.exports = mongoose.model('Order', orderSchema);