import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';

const corsOption = {
    origin:'http://localhost:8000',
    optionsSuccesStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Middleware para interpretar o corpo das requisições JSON.
    app.use(express.json());
    app.use(cors(corsOption))
    // Rota para lidar com requisições GET para a URL '/posts'.
    app.get('/posts', listarPosts) ;
    //Rota para criar um post
    app.post('/posts', postarNovoPost)
    //Rota para upload de uma unica imagem
    app.post('/upload', upload.single('imagem'), uploadImagem)

    app.put('/upload/:id', atualizarNovoPost)
}

export default routes;