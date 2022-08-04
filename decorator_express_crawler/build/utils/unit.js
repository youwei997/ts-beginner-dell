"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResData = void 0;
var getResData = function (data, err) {
    if (err) {
        return {
            success: false,
            err: err,
            data: data,
        };
    }
    return {
        success: true,
        data: data,
    };
};
exports.getResData = getResData;
