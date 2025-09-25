"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventsAdapter", {
    enumerable: true,
    get: function() {
        return EventsAdapter;
    }
});
const _platformsocketio = require("@nestjs/platform-socket.io");
const _expresssocketiosession = /*#__PURE__*/ _interop_require_default(require("express-socket.io-session"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let EventsAdapter = class EventsAdapter extends _platformsocketio.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(//@ts-expect-error
        (0, _expresssocketiosession.default)(this.session, {}));
        return server;
    }
    constructor(session){
        super(), this.session = session;
    }
};

//# sourceMappingURL=auth.adapter.js.map