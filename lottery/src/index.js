import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LotteryApp from './LotteryApp';
import CreateLottery from './create_lottery/CreateLottery';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: ( <LotteryApp /> ),
  },
  {
    path: "create",
    element: ( <CreateLottery /> ),
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();