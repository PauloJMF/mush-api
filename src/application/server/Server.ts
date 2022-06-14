
interface Server {
    instance: any;

    start(number: number, router: any): Promise<void>;
}

export { Server }
