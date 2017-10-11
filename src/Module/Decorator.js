export class Decorator {
    constructor(bus) {
        this.bus = bus;
    }

    handle(command) {
        return this.bus.handle(command).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        });
    }
}