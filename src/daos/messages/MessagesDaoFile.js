/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContFile from '../../containers/ContFile.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class CartsDaoFile extends ContFile {
    constructor() {
        super('DB_Messages.json');
    }

    // async save( cart= { products: [] }) {
    //     return super.save(cart);
    // }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default CartsDaoFile;