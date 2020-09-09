import useRequester from 'providers/AuthProvider/hooks/useRequester';
import { useQuery } from 'react-query';
import IUserResponse from 'models/UserResponse';

const useGetCurrentUser = () => {
  const requester = useRequester<IUserResponse>();
  return useQuery<IUserResponse, string>(`user`, requester);
};

export default useGetCurrentUser;
