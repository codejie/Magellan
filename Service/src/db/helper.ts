import { default as MySQL } from "mysql";
import crypto from 'crypto';

export function assembleInsertSqlOpts(table: string, data: any): MySQL.QueryOptions {
    const cols = Object.keys(data).join(',');
    let holders = '';
    const values = [];
    const items = Object.values(data);
    for (let i = 0; i < items.length; ++ i) {
        holders += '?';
        values.push(items[i]);
        if (i != items.length - 1) {
            holders += ',';
        }
    }
    return {
        sql: 'INSERT INTO ' + table + ' (' + cols + ') VALUES (' + holders + ')',
        values: values
    };        
}

export function getDateString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export function encodePasswd(passwd: string): string {
    return crypto.createHash('md5').update(passwd).digest('hex');
}

export function comparePasswd(passwd: string, encoded: string): boolean {
    return encodePasswd(passwd) === encoded;
}

export function makeToken(seed: string): string {
    return crypto.createHash('md5').update(seed).digest('hex');
}