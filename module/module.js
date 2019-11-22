class BaseModule {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            this.result = null;
            return;
        }
        if (data) {
            this.result = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModule extends BaseModule {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModule extends BaseModule {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModule,
    ErrorModule
};