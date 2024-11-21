import express from 'express'
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

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
    // Rota para lidar com requisições GET para a URL '/posts'.
    app.get('/posts', listarPosts) ;
    //Rota para criar um post
    app.post('/posts', postarNovoPost)
    //Rota para upload de uma unica imagem
    app.post('/upload', upload.single('imagem'), uploadImagem)
}

export default routes;