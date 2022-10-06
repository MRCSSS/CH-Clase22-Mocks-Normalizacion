import knex from 'knex';
import { config } from '../config.js';
import moment from 'moment';

export class MessagesContenedor {
    constructor(tableName) {
        this.knexCli = knex(config.db_messages);
        this.tableName = tableName;
    }

    async save(msg) {
        const newMsg = { ...msg, date: moment().format('DD/MM/YY HH:mm:ss') };

        try {
            return await this.knexCli(this.tableName).insert(newMsg);
        } catch (error) {
            throw error;
        }
    }
    
    async getAll() {
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy('date', 'asc');
        } catch (error) {
            throw error;
        }
    }

    closeConection(){
        this.knexCli.destroy();
    }
}
