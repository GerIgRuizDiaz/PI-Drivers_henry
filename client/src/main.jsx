import React from 'react'
import{BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from '../src/components/redux/store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
<React.StrictMode>
   <BrowserRouter>
   <App />
   </BrowserRouter>
  </React.StrictMode>
</Provider>
  
)
