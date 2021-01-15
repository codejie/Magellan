import DBConnector from "../db-connector";

export function addPersonInfo(db: DBConnector, name: string): Promise<number> {
    const opts = {
        sql: 'INSERT INTO m_person_info (name, flag) VALUES (?,?)',
        values: [name, 0]
    };
    
}