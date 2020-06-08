import { useContext } from 'react';
import { AuthFunctionContext } from '../AuthProvider';
import { IAuthFunctionHook } from '../IAuthProvider';

const useAuthFunction: IAuthFunctionHook = () => {
  const context = useContext(AuthFunctionContext);
  if (context === undefined) {
    throw new Error(
      'useAuthFunction must be used within a AuthFunctionContext'
    );
  }
  return context;
};

export default useAuthFunction;
