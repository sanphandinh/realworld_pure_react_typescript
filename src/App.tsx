import React from 'react';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import AuthProvider from './providers/AuthProvider';
import Router from './pages';
import { ReactQueryDevtools } from 'react-query-devtools';
function App() {
  return (
    <>
      <AuthProvider>
        <TheHeader />
        <Router />
        <TheFooter />
      </AuthProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
