import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"

// Conecta ao banco de dados utilizando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts(){
    // Obtém o banco de dados 'instabytes' da conexão.
    const db = conexao.db('instabytes')
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts')
    // Executa uma consulta para encontrar todos os documentos da coleção e retorna um array com os resultados.
    return colecao.find().toArray()
};

export async function criarPost(novoPost){
    const db = conexao.db('instabytes')
    const colecao = db.collection('posts')
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db('instabytes')
    const colecao = db.collection('posts')
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}