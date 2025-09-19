"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get mailOptions () {
        return mailOptions;
    },
    get transporter () {
        return transporter;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'wezonaser50@gmail.com',
        pass: 'lmevmyjzkuzermlj'
    }
});
const mailOptions = (to, subject, html)=>{
    return {
        from: 'wezonaser50@gmail.com',
        to: 'wezonaser50@gmail.com',
        subject,
        html
    };
};

//# sourceMappingURL=email.libs.js.map