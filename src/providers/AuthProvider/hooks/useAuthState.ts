import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { IUseAuthStateHook } from '../IAuthProvider';

const useAuthState: IUseAuthStateHook = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

export default useAuthState;
