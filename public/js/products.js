/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
socket.on('from-server-prodUpdate', data => {
    console.log(data);
    renderProd(data.DB_PROD);
})

/* --------------------------- HANDLEBARS ---------------------------*/
    /* ------------------------- Layouts ------------------------ */
const prodView = `
    <div class="jumbotron">
        {{> prod_table}}
    </div>
`;

    /* ------------------------ Partials ----------------------- */
Handlebars.registerPartial( "prod_table", // Tabla para mostrar productos
    `<h2 style="color:crimson;">Lista de Productos</h2>
    <div id="prodTableContent"></div>`
);

    /* ------------------------ Compile ------------------------ */
const html = Handlebars.compile(prodView);
document.querySelector('#root').innerHTML = html();

/* ----------------------------- RENDERS ----------------------------*/
const renderProd = (products) => {
    let allProducts = '';

    if ( products.length > 0 ) {
        const tableContent = products.map((prod) => {
            return `
                <tr> 
                    <td>${prod.title}</td>
                    <td style="text-align: center;">$ ${prod.price}</td>
                    <td style="text-align: center;">
                        <img width="30" src="${prod.thumbnail}" alt="">
                    </td>
                </tr>
            `
        }).join("\n");
        allProducts = `
            <div class="table-responsive">
                <table class="table table-dark">
                    <tr> 
                        <th>Nombre</th> 
                        <th style="text-align: center;">Precio</th> 
                        <th style="text-align: center;">Imagen</th> 
                    </tr>
                    <!-- filas -->
                    ${tableContent}
                    <!-- Fin filas -->
                </table>
            </div>
        `;
    } else {
        allProducts = '<h3 class="alert alert-warning">No se encontraron productos</h3>';
    }

    document.querySelector('#prodTableContent').innerHTML = allProducts;
}
