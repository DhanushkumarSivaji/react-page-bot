import React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import ErrorBoundary from './components/error-boundary'

function App() {
  return (
    <ErrorBoundary>
    <Provider store={store}>
    <div className="App">
      <Routes/> 
    </div>
    </Provider>
    </ErrorBoundary>
  );
}

export default App;
