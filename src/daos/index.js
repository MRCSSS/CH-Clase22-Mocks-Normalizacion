/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import * as dotenv from 'dotenv';

/* ----------------- CONF DE VARIABLES DE ENTORNO ------------------- */
dotenv.config();

/* -------------------- DECLARACIÓN DE VARIABLES -------------------- */
let prodsDao;
let msgsDao;

/* ------------------- DECLARACIÓN DE DB ELEGIDA -------------------- */
switch (process.env.DB_TYPE) {
    case 'json':
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js');
        const { default: MessagesDaoFile } = await import('./messages/MessagesDaoFile.js');

        prodsDao = new ProductsDaoFile();
        msgsDao = new MessagesDaoFile();

        break;

    // case 'firebase':
    //     const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js');
    //     const { default: MessagesDaoFirebase } = await import('./messages/MessagesDaoFirebase.js');

    //     prodsDao = new ProductsDaoFirebase();
    //     msgsDao = new MessagesDaoFirebase();
        
    //     break;

    // case 'mariadb':
    //     const { default: ProductsDaoMariaDB } = await import('./products/ProductsDaoMariaDB.js');
    //     const { default: MessagesDaoMariaDB } = await import('./messages/MessagesDaoMariaDB.js');

    //     prodsDao = new ProductsDaoMariaDB();
    //     msgsDao = new MessagesDaoMariaDB();
        
    //     break;

    // case 'mongodb':
    //     const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js');
    //     const { default: MessagesDaoMongoDB } = await import('./messages/MessagesDaoMongoDB.js');

    //     prodsDao = new ProductsDaoMongoDB();
    //     msgsDao = new MessagesDaoMongoDB();
        
    //     break;

    // case 'sqlite3':
    //     const { default: ProductsDaoSqlite3 } = await import('./products/ProductsDaoSqlite3.js');
    //     const { default: MessagesDaoSqlite3 } = await import('./messages/MessagesDaoSqlite3.js');

    //     prodsDao = new ProductsDaoSqlite3();
    //     msgsDao = new MessagesDaoSqlite3();
        
    //     break;

    default:
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js');
        const { default: MessagesDaoMemory } = await import('./messages/MessagesDaoMemory.js');

        prodsDao = new ProductsDaoMemory();
        msgsDao = new MessagesDaoMemory();
        
        break;
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export { prodsDao, msgsDao };
