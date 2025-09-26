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
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';
import { btnContainer, codeText, container, h1, logo, main, paragraph, validityText, verificationSection, verifyText, } from './css';
export function ConfirmEmail(_a) {
    var code = _a.code;
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "The acme platform that helps you uncover qualified leads." }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Img, { alt: "acme", height: "60", src: 'https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/duck//placeholder%20(copy%201).png', style: __assign({ objectFit: 'contain' }, logo), width: "120" }), _jsxs(Section, { style: btnContainer, children: [_jsx(Heading, { style: h1, children: "Verify your email address" }), _jsx(Text, { style: paragraph, children: "Thanks for starting the new acme account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message." }), _jsxs(Section, { style: __assign({ placeContent: 'center' }, verificationSection), children: [_jsx(Text, { style: verifyText, children: "Verification code" }), _jsx(Text, { style: codeText, children: code }), _jsx(Text, { style: validityText, children: "(This code is valid for 10 minutes)" })] })] }), _jsx(Hr, {}), _jsxs(Text, { style: paragraph, children: ["Best,", _jsx("br", {}), "The acme team"] })] }) })] }));
}
export default ConfirmEmail;
//# sourceMappingURL=confirm-email.js.map