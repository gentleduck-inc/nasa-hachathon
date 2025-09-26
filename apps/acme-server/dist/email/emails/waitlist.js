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
import { Body, Container, Head, Html, Img, Link, Preview, Text } from '@react-email/components';
import { container, logo, main, paragraph } from './css';
export function WaitlistEmail() {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "The acme platform that helps you uncover qualified leads." }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Img, { alt: "acme", height: "60", src: 'https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/duck//placeholder%20(copy%201).png', style: __assign({ objectFit: 'cover' }, logo), width: "120" }), _jsx(Text, { style: paragraph, children: "Hi Friend," }), _jsx(Text, { style: paragraph, children: "Thanks for Your interest in acme! We received your information and we will be in touch soon" }), _jsxs(Text, { style: paragraph, children: ["We are excited about what we are building and can't wait to share more with you. In the meantime, stay up to date on product updates and more on our X account", ' ', _jsx(Link, { href: "https://x.com/clonedwithacme", children: "@clonedwithacme" })] }), _jsxs(Text, { style: paragraph, children: ["Best,", _jsx("br", {}), "The acme team"] })] }) })] }));
}
export default WaitlistEmail;
//# sourceMappingURL=waitlist.js.map