import requester from 'utils/requester';
import { useQuery } from 'react-query';
import IProfileResponse from 'models/ProfileResponse';

const useProfile = (username: string) => {
  return useQuery<IProfileResponse, string>(`profiles/${username}`, requester, {
    retry: false,
  });
};

export default useProfile;
