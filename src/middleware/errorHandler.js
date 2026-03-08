/**
 * Middleware global de tratamento de erros
 * Deve ser o último middleware registrado no app.js
 * Captura qualquer erro não tratado nos controllers e retorna
 * uma resposta padronizada para o cliente
 *
 * @param {Error} err - Objeto de erro capturado
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar para o próximo middleware
 */
const errorHandler = (err, req, res, next) => {
  // Loga o erro completo no console para debug
  console.error(`[ERROR] ${err.stack}`);

  // Erro de cast do Mongoose — ex: formato de ID inválido
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Formato de dado inválido',
      error: err.message
    });
  }

  // Erro de chave duplicada no MongoDB (unique constraint violada)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Já existe um pedido com esse número'
    });
  }

  // Erro genérico — usa o statusCode do erro ou 500 como padrão
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor'
  });
};

// Exporta o middleware para ser registrado no app.js
module.exports = errorHandler;