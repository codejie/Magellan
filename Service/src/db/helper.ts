import { default as MySQL } from "mysql";

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