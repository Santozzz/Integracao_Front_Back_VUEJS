// Importando as bibliotecas necessárias
const express = require("express"); // Framework para construir o servidor
const bodyParser = require("body-parser"); // Middleware para analisar o corpo das requisições
const bcrypt = require("bcrypt"); // Biblioteca para hashing de senhas
const jwt = require("jsonwebtoken"); // Biblioteca para criação de tokens JWT
const fs = require("fs"); // Módulo para manipulação de arquivos
const cors = require("cors"); // Middleware para permitir requisições CORS

// Inicializando o aplicativo Express
const app = express();
const PORT = 3000; // Definindo a porta em que o servidor irá rodar
const SECRET_KEY = "minha_chave_secreta"; // Chave secreta para assinatura dos tokens JWT

// Configurando o middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());
// Habilitando CORS para permitir requisições de outros domínios
app.use(cors());

// Função para ler o banco de dados (que neste caso é um arquivo JSON)
function readDB() {
  const data = fs.readFileSync("bd.json"); // Lê o conteúdo do arquivo bd.json
  return JSON.parse(data); // Converte o conteúdo JSON em um objeto JavaScript
}

// Função para escrever no banco de dados (atualiza o arquivo JSON)
function writeDB(data) {
  fs.writeFileSync("bd.json", JSON.stringify(data, null, 2)); // Escreve o objeto data no arquivo bd.json
}

// Rota de cadastro (endpoint para registrar novos usuários)
app.post("/register", async (req, res) => {
  const { username, password } = req.body; // Desestrutura o corpo da requisição para obter username e password

  const db = readDB(); // Lê o banco de dados
  const userExists = db.users.find((user) => user.username === username); // Verifica se o usuário já existe

  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" }); // Retorna erro se o usuário já existe
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Faz o hash da senha do usuário
  db.users.push({ username, password: hashedPassword }); // Adiciona o novo usuário ao banco de dados
  writeDB(db); // Atualiza o banco de dados no arquivo JSON

  res.status(201).json({ message: "Usuário criado com sucesso" }); // Retorna sucesso no registro
});

// Rota de login (endpoint para autenticar usuários)
app.post("/login", async (req, res) => {
  const { username, password } = req.body; // Desestrutura o corpo da requisição para obter username e password

  const db = readDB(); // Lê o banco de dados
  const user = db.users.find((user) => user.username === username); // Tenta encontrar o usuário

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" }); // Retorna erro se o usuário não existe
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); // Compara a senha fornecida com a senha armazenada
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha incorreta" }); // Retorna erro se a senha estiver incorreta
  }

  // Gera um token JWT para o usuário autenticado
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ token }); // Retorna o token para o cliente
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Mensagem de log indicando que o servidor está ativo
});
