export default class CustomError extends Error {
    code: number;
    constructor(message: any, code: number) {
        super(message);
        this.code = code;
    }
}