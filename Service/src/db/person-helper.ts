import DBConnector from "../db-connector";
import { PersonFundData, PersonInfo, PersonStockData, PersonStockLog } from "../definition/data-define";
import { getDateString } from "./helper";

export function insertPersonInfo(db: DBConnector, name: string): Promise<number> {
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

export function fetchPersonInfos(db: DBConnector, id?: string): Promise<PersonInfo[]> {
    const opts = {
        sql: 'SELECT id, name, flag, created FROM m_person_info',
        values: []
    };
    if (id) {
        opts.sql += ' WHERE id=?';
        (opts.values as any[]).push(id);
    }
    return new Promise<PersonInfo[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            resolve(results as PersonInfo[]);
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

export function fetchPersonStockLog(db: DBConnector, id: number, stockId?: number, begin?: Date, end?: Date): Promise<PersonStockLog[]> {
    const opts = {
        sql: 'SELECT logId, id, stockId, action, total, price, created FROM m_person_stock_log WHERE id=?',
        values: [id]
    };
    if (stockId) {
        opts.sql += ' AND stockId=?';
        opts.values.push(stockId);
    }
    if (begin) {
        opts.sql += ' AND updated >=?',
        (opts.values as any[]).push(getDateString(begin));
    }
    if (end) {
        opts.sql += ' AND updated <?',
        (opts.values as any[]).push(getDateString(end));
    }
    return new Promise<PersonStockLog[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            resolve(results as PersonStockLog[]);
        });
    });

}

export function fetchPersonFundData(db: DBConnector, id: number): Promise<PersonFundData | null> {
    const opts = {
        sql: 'SELECT id, base, valid, updated FROM m_person_fund_data WHERE id=?',
        values: [id]
    };
    return new Promise<PersonFundData | null>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0)
                resolve(results[0] as PersonFundData);
            else
                resolve(null);
        });
    });
}

export function updatePersonFundData(db: DBConnector, id: number, base: number, valid: number): Promise<number> {
    const opts = {
        sql: 'UPDATE m_person_fund_data SET base=?, valid=? WHERE id=?',
        values: [base, valid, id]        
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.effectedRows);
        });
    });
}

export function insertPersonFundData(db: DBConnector, id: number, base: number): Promise<number> {
    const opts = {
        sql: 'INSERT INTO m_person_fund_data (id,base,valid) VALUES (?,?,?)',
        values: [id, base, base]        
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });    
}
