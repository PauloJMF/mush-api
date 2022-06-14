interface Database {
    connect(): Promise<void>;
    query(query: string, values?: any): Promise<any>;
}
export { Database }
