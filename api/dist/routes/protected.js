"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = require("../db/db");
const multer_1 = __importDefault(require("multer"));
const googledrive_1 = require("../googledrive");
const express_1 = __importDefault(require("express"));
const router = new express_promise_router_1.default();
exports.default = router;
const upload = (0, multer_1.default)();
router.use(express_1.default.urlencoded({ extended: true }));
// ? Middleware to protect all authorized routes. Will be called first before reaching endpoint.
router.use((req, res, next) => {
    if (req.path === "/signup" || req.path === "/login")
        return next();
    jwtValidate(req, res, next);
});
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    return res.send(`Good Request ${id}`);
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
    };
    const hashedPassword = yield bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    try {
        yield (0, db_1.queryNoCall)("INSERT INTO USERS(username,email,password,first_name,last_name) VALUES($1,$2,$3,$4,$5) RETURNING *", Object.values(user));
        return res.send(200).send("Success");
    }
    catch (error) {
        console.log(error);
        return res.status(404).send(`Error ${error.detail.substring(4)}`);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const queryResult = yield (0, db_1.queryNoCall)("SELECT * FROM USERS WHERE username = $1 OR email = $1", [username]);
        const user = queryResult.rows[0];
        console.log(user);
        if (!user)
            return res.status(401).send("Username or email does not exist");
        const isEqual = yield bcrypt.compare(req.body.password, user.password);
        if (!isEqual) {
            console.log("Error: Invalid Username or Password");
            return res.status(401).send("Invalid username or password");
        }
        const expirationDate = Date.now() / 1000 + 60 * 60;
        const accessToken = jwtCreate(username, expirationDate);
        console.log(user.first_name);
        return res.json({
            token: accessToken,
            expiry: expirationDate,
            firstName: user.first_name,
            profile_picture: user.profile_picture,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}));
// ? req.user.sub is the username stored in the request.
router.post("/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { file } = req;
        const userQuery = yield (0, db_1.queryNoCall)("SELECT * FROM USERS WHERE username = $1", [
            req.user.sub,
        ]);
        const user = userQuery.rows[0];
        console.log(user);
        if (user.profile_picture)
            yield (0, googledrive_1.deleteFile)(user.profile_picture);
        const driveId = yield (0, googledrive_1.uploadFile)(file, user.username);
        yield (0, db_1.queryNoCall)("UPDATE USERS SET profile_picture = $1 WHERE username = $2", [
            driveId,
            user.username,
        ]);
        return res.status(200).send(driveId);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}));
router.get("/pic/:fileId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const file = yield (0, googledrive_1.getFile)(fileId);
        console.log("File here in protected");
        console.log(file);
        console.log(file.headers["content-type"]);
        console.log(file.headers["content-length"]);
        res.setHeader("Content-Type", file.headers["content-type"]);
        res.setHeader("Content-Length", file.headers["content-length"]);
        file.data.pipe(res);
        // const stream = fs.createReadStream(file);
        // stream.pipe(res);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}));
const jwtValidate = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer")))
            throw new Error("No token present");
        jwt.verify(token, config_1.default.SECRET_KEY, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw new Error("Invalid token");
            console.log(user);
            req.user = user;
            return next();
        }));
    }
    catch (error) {
        return res.status(403).send(error.message);
    }
};
const jwtCreate = (username, expirationDate) => {
    return jwt.sign({
        sub: username,
        iat: Math.floor(Date.now() / 1000),
        exp: expirationDate, // Expire after one hour
    }, config_1.default.SECRET_KEY);
};
const jwtParse = (token) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
