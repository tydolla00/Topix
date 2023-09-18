import config from "./config";
const { google } = require("googleapis");
// import { google } from "googleapis"; use for checking types
const stream = require("stream");

// https://www.labnol.org/google-drive-api-upload-220412

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export const getDriveService = () => {
  const credential: GoogleCreds = JSON.parse(
    Buffer.from(config.GOOGLE_SERVICE_KEY, "base64").toString()
  );
  const auth = new google.auth.GoogleAuth({
    projectId: credential.project_id,
    credentials: credential,
    scopes: SCOPES,
  });

  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

export const drive = getDriveService();

type GoogleCreds = {
  type?: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  unvierse_domain: string;
};
