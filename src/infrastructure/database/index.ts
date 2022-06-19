interface Database {
    connect(): Promise<void>;
    getInstance(): any;
}
export { Database }
