export interface IList {
  _id: string;
  title: string;
  __v: number;
}

export interface IItem {
  completed: boolean;
  isDeleted: boolean;
  listId: string;
  title: string;
  __v: number;
  _id: string;
}
