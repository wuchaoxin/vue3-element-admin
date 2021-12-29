import {
  ElFile,
  UploadStatus,
} from "element-plus/es/components/upload/src/upload.type";

export interface UploadConfig {
  fileType: string | string[];
  fileSize: string | number;
  baseURL: string;
  URL: string;
}

export type FileList = Array<UploadFile>;

export interface UploadFile {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw: ElFile;
}
