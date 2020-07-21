import IUser from './User';

interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: IUser;
}

export default Comment;
