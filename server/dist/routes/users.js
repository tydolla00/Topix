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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const db_1 = require("../db/db");
const router = new express_promise_router_1.default();
exports.default = router;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield (0, db_1.queryNoCall)("SELECT * FROM USERS");
    const users = queryResult.rows;
    return res.send(users);
}));
router.get("/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        };
        yield (0, db_1.queryNoCall)("INSERT INTO CONTACT(first_name,last_name, email,subject, email) VALUES($1,$2,$3,$4,$5)", Object.values(contact));
        return res.send("Your response has been submitted!");
    }
    catch (error) {
        res.status(500).send("Oops, something unexpected happened.");
    }
}));
