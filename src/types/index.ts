export interface Board {
  _id: string;
  id: string;
  title: string;
}

export interface Card {
  _id: string;
  id: string;
  boardId: string;
  title: string;
  description?: string;
}
