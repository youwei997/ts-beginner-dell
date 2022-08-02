"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResData = void 0;
const getResData = (data, err) => {
    if (err) {
        return {
            success: false,
            err,
            data,
        };
    }
    return {
        success: true,
        data,
    };
};
exports.getResData = getResData;
