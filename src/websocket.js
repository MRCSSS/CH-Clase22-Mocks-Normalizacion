/* ---------------------------- MODULOS ----------------------------- */
// import httpServer from './server.js';
import { normalize, schema } from 'normalizr';
// import { MessagesContenedor } from "./container/msgsystem.js";
// import { ProdContenedor } from "./container/prodsystem.js";

/* ------------------------- BASE DE DATOS --------------------------*/
// const prods = new ProdContenedor('products');
const msgsApi = new Container('messages');

/* --------------------- NORMALIZANDO MENSAJES ----------------------*/
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });

const normalizing = (fullMsgs) => normalize(fullMsgs, msgsSchema);

async function allNormalizedMsgs() {
    const msgs = await msgsApi.getAll();
    const normalized = normalizing({ id: 'msgs', msgs})
    return normalized;
}
/* ---------------------------- WEBSOCKET ---------------------------*/
const webSocketStart = (io) => {
    io.on('connection', async (socket) => {
        console.log(`Client conected: ${socket.id}`);
    
        // const DB_MSG = await msgs.getAll();
        // const DB_PROD = await prods.getAll();
        
        socket.emit('from-server-msg', {DB_MSG} );
        socket.emit('from-server-prodUpdate', {DB_PROD} );
    
        socket.on('from-client-msg', async (msg) => {
        //     await msgs.save(msg);
        //     DB_MSG.push(msg);
        //     io.sockets.emit('from-server-msg', {DB_MSG});
        })
        socket.on('from-client-prodUpdate', async (prod) => {
        //     const newID = await prods.save(prod);
        //     const newProduct = {...prod, id:newID}
    
        //     DB_PROD.push(newProduct);
        //     io.sockets.emit('from-server-prodUpdate', {DB_PROD});
        })
    })    
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default webSocketStart;