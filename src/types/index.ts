export interface Board {
  _id: string;
  id: string;
  title: string;
}

type StatusValues = "TODO" | "IN_PROGRESS" | "DONE";

export interface Card {
  _id: string;
  id: string;
  boardId: string;
  title: string;
  description?: string;
  status: StatusValues;
}

export const PROGRESS_TYPE = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

export type ResponseData = {
  data?: {
    message: string;
  };
  error?: {
    data: {
      message: string;
    };
  };
};
