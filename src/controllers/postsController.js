import fs from 'fs';
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import  gerarDescricaoComGemini  from '../services/geminiService.js';

export async function listarPosts(req, res) {
    // Chama a função para buscar todos os posts.
    const resultado = await getTodosPosts();
    // Envia uma resposta com status 200 (sucesso) e os dados dos posts no formato JSON.
    res.status(200).json(resultado);
} 

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;
  
    try {
      // Chama a função criarPost para inserir o novo post no banco de dados
      const postCriado = await criarPost(novoPost);
  
      // Retorna uma resposta HTTP com status 200 (sucesso) e o post criado como JSON
      res.status(200).json(postCriado);
    } catch (erro) {
      // Imprime o erro no console para facilitar o debug
      console.error(erro.message);
  
      // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
      res.status(500).json({'Erro':'Falha na requisição.'});
    }
  }
  
// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo a descrição (vazia por padrão), o nome original da imagem e a altura (vazia por padrão)
  const novoPost = {
    descricao: '',
    imgUrl: req.file.originalname,
    alt: ''
  };
  
  try {
    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
  
    // Constrói o novo nome do arquivo da imagem, usando o ID do post inserido
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
  
    // Renomeia o arquivo da imagem para o novo nome e move para a pasta 'uploads'
    fs.renameSync(req.file.path, imagemAtualizada);
  
    // Retorna uma resposta HTTP com status 200 (sucesso) e o post criado como JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para facilitar o debug
    console.error(erro.message);
  
    // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({'Erro':'Falha na requisição.'});
  }
}

export async function atualizarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const id = req.params.id;
  const urlImagem = `https://localhost:3000/${id}.png`
  const post = {
    imgUrl: urlImagem,
    descricao: req.body.descricao,
    alt: req.body.alt
  }

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)


    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await atualizarPost(id, post);

    // Retorna uma resposta HTTP com status 200 (sucesso) e o post criado como JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para facilitar o debug
    console.error(erro.message);

    // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({'Erro':'Falha na requisição.'});
  }
}
 