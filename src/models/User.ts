interface IUser {
  email: string;
  token?: string;
  username: string;
  bio: string;
  image?: string;
  following?: boolean;
}
export default IUser;
