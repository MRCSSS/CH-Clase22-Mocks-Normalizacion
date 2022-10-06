/* ---------------------------- MODULOS ----------------------------- */
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import mockRouter from './routes/test.routes.js';
import { Server } from 'socket.io';
import webSocketStart from './websocket.js';

/* ---------------------- INSTANCIA DE SERVER ----------------------- */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/* -------------------------- MIDDLEWARES --------------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

/* ------------------------------ RUTAS ----------------------------- */
app.use('/api/productos-test', mockRouter);

app.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

/* ---------------------------- WEBSOCKET ---------------------------*/
webSocketStart(io);

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default httpServer;