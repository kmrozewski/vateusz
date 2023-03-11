export interface IModal {
  s3Key: string;
  show: boolean;
}

export interface IRenameModal extends IModal {
  fileName: string;
}