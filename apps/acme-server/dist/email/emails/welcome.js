var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';
import { btnContainer, button, container, logo, main, paragraph } from './css';
export function WelcomeEmail(_a) {
    var username = _a.username;
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "The acme platform that helps you uncover qualified leads." }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Img, { alt: "acme", height: "60", src: 'https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/duck//placeholder%20(copy%201).png', style: __assign({ objectFit: 'cover' }, logo), width: "120" }), _jsxs(Text, { style: paragraph, children: ["Hi ", username, ","] }), _jsx(Text, { style: paragraph, children: "Welcome to acme! Your account has been successfully created, and you're now ready to experience everything acme has to offer. Whether you're here to explore powerful tools, streamline your workflow, or unlock new opportunities, we're excited to have you with us. If you need any help getting started, our support team is always ready to assist. Let\u2019s make something great together!" }), _jsx(Section, { style: btnContainer, children: _jsx(Button, { href: "http://localhost:3000/dashboard/", style: button, children: "Get started" }) }), _jsxs(Text, { style: paragraph, children: ["Best,", _jsx("br", {}), "The acme team"] })] }) })] }));
}
export default WelcomeEmail;
//# sourceMappingURL=welcome.js.map