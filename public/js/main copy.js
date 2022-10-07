/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
// socket.on('serv-prods', data => {
//     renderProducts(data).then(html => {
//         document.getElementById('prodTableContent').innerHTML = html;
//     })
// })

socket.on('serv-msgs', data => {
    renderMessages(data);
})

/* --------------------------- HANDLEBARS ---------------------------*/
    /* ------------------------- Layouts ------------------------ */
// const prodsTable = `{{> prod_table}}`;

const messagesView = `{{> chat}}`;

    /* ------------------------ Partials ----------------------- */
// Handlebars.registerPartial( "prod_table", // Tabla para mostrar productos
//     `<h2 style="color:crimson;">Lista de Productos</h2>
//     <div id="prodTableContent"></div>`
// );
Handlebars.registerPartial( "chat", // Chat
    `<h2 style="color:blue;">Centro de Mensajes</h2>
    <form >
        <div class="form-group">
            <label for="user"><b>Usuario:</b></label>
            <input id="user" class="form-control" type="text" name="user" placeholder="José">
            <small id="userComment" class="form-text text-muted">Usuario que enviará el mensaje.</small>
        </div>
        <div class="form-group">
            <label for="messageContent"><b>Mensaje:</b></label>
            <textarea id="messageContent" class="form-control" name="messageContent" rows="1"></textarea>
        </div>
        <button class="btn btn-primary mt-3 mb-3" onclick="sendMessage()">Enviar</button>
    </form>
    <hr>
    <div id="messagesRecord">
        <!-- Se renderizarán los mensajes ya enviados -->
        {{#each messages}}
            <span>
                <b style="color:blue;">{{this.author}}</b>
                <small style="color:crimson;"> [{{this.date}}] </small> <b style="color:blue;">:</b>
                <i style="color:green;"> {{this.message}} </i>
            </span>
            <br>
        {{/each}}
    </div>    
    `
);

    /* ------------------------ Renders ------------------------ */
// const productsHtml = Handlebars.compile(prodsTable);
// const table = document.getElementById('#prods_table')
// table.innerHTML = productsHtml();

const messagesHtml = Handlebars.compile(messagesView);
document.getElementById('messages_formlist').innerHTML = messagesHtml();

const renderMessages = (messages) => {
    const allMessages = messages.map((msg) => {
        return `
        <span>
            <b style="color:blue;">${msg.author}</b>
            <small style="color:crimson;"> [${msg.date}] </small> <b style="color:blue;">:</b>
            <i style="color:green;"> ${msg.message} </i>
        </span>
        ` 
    }).join('<br>');

    document.getElementById('messagesRecord').innerHTML = allMessages;
}
    
// const renderProducts = (products) => {
//     console.log('en render product')
//     let allProducts = '';
//     if ( products.length > 0 ) {
//         const tableContent = products.map((prod) => {
//             return `
//                 <tr> 
//                     <td>${prod.title}</td>
//                     <td style="text-align: center;">$ ${prod.price}</td>
//                     <td style="text-align: center;">
//                         <img width="30" src="${prod.thumbnail}" alt="">
//                     </td>
//                 </tr>
//             `
//         }).join("\n");
//         allProducts = `
//             <div class="table-responsive">
//                 <table class="table table-dark">
//                     <tr> 
//                         <th>Nombre</th> 
//                         <th style="text-align: center;">Precio</th> 
//                         <th style="text-align: center;">Imagen</th> 
//                     </tr>
//                     <!-- filas -->
//                     ${tableContent}
//                     <!-- Fin filas -->
//                 </table>
//             </div>
//         `;
//     } else {
//         allProducts = '<h3 class="alert alert-warning">No se encontraron productos</h3>';
//     }

//     document.querySelector('#prodTableContent').innerHTML = allProducts;
// }

/* ------------------ DESNORMALIZACION DE MENSAJES ------------------*/
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new normalizr.schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new normalizr.schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });

/* --------------------------- FUNCIONES ----------------------------*/
function sendMessage() {
    const nowDate = new Date();
    
    const inputUser = document.querySelector('#user');
    const inputMessage = document.querySelector('#messageContent');
    const inputDate = 
    `${nowDate.getDate() > 9 ? nowDate.getDate() : `0${nowDate.getDate()}`}/`+
    `${nowDate.getMonth() > 9 ? nowDate.getMonth() : `0${nowDate.getMonth()}`}/${nowDate.getFullYear()} `+
    `${nowDate.getHours() > 9 ? nowDate.getHours() : `0${nowDate.getHours()}`}:`+
    `${nowDate.getMinutes() > 9 ? nowDate.getMinutes() : `0${nowDate.getMinutes()}`}:`+
    `${nowDate.getSeconds() > 9 ? nowDate.getSeconds() : `0${nowDate.getSeconds()}`}`;

    const msg = {
        author: inputUser.value,
        date: inputDate,
        message: inputMessage.value
    }

    socket.emit('from-client-msg', msg)
}
