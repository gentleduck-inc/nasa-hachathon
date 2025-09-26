var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IoAdapter } from '@nestjs/platform-socket.io';
import sharedsession from 'express-socket.io-session';
var EventsAdapter = (function (_super) {
    __extends(EventsAdapter, _super);
    function EventsAdapter(session) {
        var _this = _super.call(this) || this;
        _this.session = session;
        return _this;
    }
    EventsAdapter.prototype.createIOServer = function (port, options) {
        var server = _super.prototype.createIOServer.call(this, port, options);
        server.use(sharedsession(this.session, {}));
        return server;
    };
    return EventsAdapter;
}(IoAdapter));
export { EventsAdapter };
//# sourceMappingURL=auth.adapter.js.map