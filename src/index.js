import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {firebaseContext} from './Store/Context'
import firebase from './Firebase/Config';
import Context from './Store/Context'



ReactDOM.render(
<firebaseContext.Provider value={{firebase}}> 

<Context>
<BrowserRouter>
    <App />
</BrowserRouter>
</Context>
</firebaseContext.Provider>,
 document.getElementById('root'));
