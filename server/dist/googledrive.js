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
exports.deleteFile = exports.getFile = exports.uploadFile = exports.getDriveService = void 0;
const config_1 = __importDefault(require("./config"));
const { google } = require("googleapis");
// import { google } from "googleapis"; use for checking types
const stream = require("stream");
// https://www.labnol.org/google-drive-api-upload-220412
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const getDriveService = () => {
    const credential = JSON.parse(Buffer.from(config_1.default.GOOGLE_SERVICE_KEY, "base64").toString());
    const auth = new google.auth.GoogleAuth({
        projectId: credential.project_id,
        credentials: credential,
        scopes: SCOPES,
    });
    const driveService = google.drive({ version: "v3", auth });
    return driveService;
};
exports.getDriveService = getDriveService;
const drive = (0, exports.getDriveService)();
const uploadFile = (fileObject, user) => __awaiter(void 0, void 0, void 0, function* () {
    const folderId = "1oQnIyJhE5TcF6ICumRWBv6JSZMhDOX8N";
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    console.log({ fileObject });
    const { data } = yield drive.files.create({
        resource: {
            name: fileObject.name,
            parents: [folderId],
        },
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: `${user}`,
            parents: ["1oQnIyJhE5TcF6ICumRWBv6JSZMhDOX8N"],
        },
        fields: "id,name",
    });
    console.log({ data });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
});
exports.uploadFile = uploadFile;
const getFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield drive.files.get({ fileId: fileId, alt: "media" }, { responseType: "stream", encoding: null });
        console.log(res);
        return res;
        // const imageType = res.headers["content-type"];
        // console.log(imageType);
        // const base64 = Buffer.from(res.data, "utf8").toString("base64");
        // const dataUri = `data:${imageType};base64,${base64}`;
        // return dataUri;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error receiving file");
    }
});
exports.getFile = getFile;
const deleteFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    yield drive.files.delete({ fileId: fileId });
});
exports.deleteFile = deleteFile;
