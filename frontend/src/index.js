import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './views/MainPage';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecificTrain from './views/SpecificTrain';
import RegisterPage from './views/RegisterPage';
import InsertTrain from './views/InsertTrain';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<MainPage/>}/>
        <Route path = '/specifictrain' element = {<SpecificTrain/>}/>
        <Route path = '/register' element = {<RegisterPage/>}/>
        <Route path = '/inserttrain' element = {<InsertTrain/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
