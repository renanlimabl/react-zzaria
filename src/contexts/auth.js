import React, {
  createContext, useCallback, useState,
} from 'react';
import t from 'prop-types';

import firebase from '../services/firebase';

export const AuthContext = createContext();

function Auth({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, []);

  // useCallback só executa 1 vez com o segundo parâmetro vazio "[]", parecido com o useEffect,
  // mas o segundo parâmetro "[]" e o useCallback irá executar toda vez que esse parâmetro mudar
  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      console.log('deslogou');
      setUserInfo({
        isUserLoggedIn: false,
        user: null,
      });
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{
        login,
        logout,
        userInfo,
        setUserInfo,
      }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

Auth.propTypes = {
  children: t.node.isRequired,
};

export default Auth;
