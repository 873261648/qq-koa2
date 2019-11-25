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
class NotLoginModule extends BaseModule {
    constructor() {
        super('登录失效请重新登录！');
        this.errno = -2;
    }
}

module.exports = {
    SuccessModule,
    ErrorModule,
    NotLoginModule
};