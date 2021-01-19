import DBConnector from "../db-connector";
import { PersonStockData } from "../definition/data-define";

export function addPersonInfo(db: DBConnector, name: string): Promise<number> {
    const opts = {
        sql: 'INSERT INTO m_person_info (name, flag) VALUES (?,?)',
        values: [name, 0]
    };
    
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            return resolve(result.insertId);
        });
    });
}

export function fetchPersonStockData(db: DBConnector, id: number, stockId?: number): Promise<PersonStockData[]> {
    const opts = {
        sql: 'SELECT id, stockId, total, price, updated FROM m_person_stock_data WHERE id=?',
        values: [id]
    };

    if (stockId) {
        opts.sql += ' AND stockId=?';
        opts.values.push(stockId);                
    }

    return new Promise<PersonStockData[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            resolve(results as PersonStockData[]);
        });
    });
}

export function insertPersonStockData(db: DBConnector, id: number, stockId: number, total: number, price: number): Promise<number> {
    const opts = {
        sql: 'INSERT INTO m_person_stock_data (id,stockId,total,price) VALUES (?,?,?,?)',
        values: [id, stockId, total, price]
    };
    return new Promise<number>((resolve, reject) => {
        db.query(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
}

export function updatePersonStockData(db: DBConnector, id: number, stockId: number, total: number, price: number): Promise<number> {
    const opts = {
        sql: 'UPDATE m_person_stock_data SET total=?,price=? WHERE id=? AND stockId=?',
        values: [total, price, id, stockId]
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.effectedRows);
        });
    });
}

export function removePersonStockData(db: DBConnector, id: number, stockId: number): Promise<number> {
    const opts = {
        sql: 'DELETE FROM m_person_stock_data WHERE id=? AND stockId?=?',
        values: [id, stockId]
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.effectedRows);
        });
    });
}

export function insertPersonStockLog(db: DBConnector, id: number, stockId: number, action: number, total: number, price: number): Promise<number> {
    const opts = {
        sql: 'INSERT INTO m_person_stock_log (id,stockId,action,total,price) VALUES (?,?,?,?,?)',
        values: [id, stockId, action, total, price]
    };
    return new Promise<number>((resolve, reject) => {
        db.query(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });    
}
