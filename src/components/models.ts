export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface ItunesResp {
  trackId: number,
  collectionName: string,
  collectionViewUrl: string,
  longDescription: string,
  shortDescription: string,
  trackName: string,
  trackViewUrl: string,
  previewUrl: string,
  releaseDate: string
}
