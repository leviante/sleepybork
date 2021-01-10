//libraries
import React from 'react';
import ReactDOM from 'react-dom';
//components
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


//Enable hot module replacement (get updated code without browser refresh).
if (module.hot){
    module.hot.accept();
}