export interface IPosterImage {
  id?: number
  url: string
  description?: string
  createdAt?:string
}

export interface IPosterInfo {
  id?: number
  url?: string
  image: string
  text: string
  createdAt?:string
}