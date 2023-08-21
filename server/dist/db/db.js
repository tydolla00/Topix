"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryNoCall = exports.query = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};
exports.query = query;
const queryNoCall = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    const res = yield pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
});
exports.queryNoCall = queryNoCall;
