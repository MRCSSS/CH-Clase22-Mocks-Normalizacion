/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
socket.on('from-server-msg', data => {
    renderChat(data.DB_MSG);
})

/* --------------------------- HANDLEBARS ---------------------------*/
    /* ------------------------- Layouts ------------------------ */
const home = `
    <div class="jumbotron">
        {{> chat}}
    </div>
`;

    /* ------------------------ Partials ----------------------- */
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

    /* ------------------------ Compile ------------------------ */
const html = Handlebars.compile(home);
document.querySelector('#root').innerHTML = html();

/* ----------------------------- RENDERS ----------------------------*/
const renderChat = (messages) => {
    const allMessages = messages.map((msg) => {
        return `
        <span>
            <b style="color:blue;">${msg.author}</b>
            <small style="color:crimson;"> [${msg.date}] </small> <b style="color:blue;">:</b>
            <i style="color:green;"> ${msg.message} </i>
        </span>
        ` 
    }).join('<br>');

    document.querySelector('#messagesRecord').innerHTML = allMessages;
}

/* ---------------------------- FUNCIONES ---------------------------*/
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
