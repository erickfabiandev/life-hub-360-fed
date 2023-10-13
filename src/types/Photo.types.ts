
interface IPhoto {
  photoName: string,
  size: any,
  album: string,
  dateUploaded: any,
  description: string,
  location: string,
  resolution: string,
  tags: string[],
  url: string
}

export type { IPhoto }