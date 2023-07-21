"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const games_1 = __importDefault(require("./games"));
const mountRoutes = (app) => {
    app.use("/games", games_1.default);
};
exports.default = mountRoutes;