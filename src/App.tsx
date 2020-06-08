import React from 'react';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <TheHeader />
      <TheFooter />
    </AuthProvider>
  );
}

export default App;
