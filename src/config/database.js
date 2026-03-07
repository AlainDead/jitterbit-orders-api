// Importa o Mongoose, biblioteca que conecta o Node.js ao MongoDB
const mongoose = require('mongoose');

/**
 * Função responsável por conectar a aplicação ao banco de dados MongoDB
 * Usa a URL de conexão definida na variável de ambiente MONGO_URI
 * Em caso de falha, exibe o erro e encerra o processo
 */
const connectDB = async () => {
  try {
    // Tenta estabelecer a conexão com o MongoDB usando a URL do .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Exibe o host do banco conectado para confirmar a conexão
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Exibe a mensagem de erro caso a conexão falhe
    console.error(`❌ Erro ao conectar ao MongoDB: ${error.message}`);

    // Encerra o processo com código 1 (indica falha)
    process.exit(1);
  }
};

// Exporta a função para ser usada no app.js
module.exports = connectDB;