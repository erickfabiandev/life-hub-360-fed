interface IFile {
  _id: string,
  name: string,
  size: number,
  type: string,
  uploadDate: any,
  description: string,
  owner: string,
  location: string
}

export type { IFile }