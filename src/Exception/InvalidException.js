export class InvalidException {
    constructor(message) {
        this._message = message;
    }

    get message() {
        return this._message;
    }
}