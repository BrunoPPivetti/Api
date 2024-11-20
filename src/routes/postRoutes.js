import express from 'express'
import { listarPosts } from '../controllers/postsController.js';

const routes = (app) => {
    // Middleware para interpretar o corpo das requisições JSON.
    app.use(express.json());
    // Rota para lidar com requisições GET para a URL '/posts'.
    app.get('/posts', listarPosts) ;
}

export default routes;