import React from 'react';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import AuthProvider from './providers/AuthProvider';
import Router from './pages';
function App() {
  return (
    <AuthProvider>
      <TheHeader />
      <Router />
      <TheFooter />
    </AuthProvider>
  );
}

export default App;
