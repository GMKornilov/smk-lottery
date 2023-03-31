import { useEffect } from 'react';
import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LotteryApp from './LotteryApp';
import CreateLottery from './create_lottery/CreateLottery';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { holder } from './web3/ContractHolder';

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
]);

root.render(
  <App router={router} holder={holder} />
);

function App(props) {
  useEffect(() => {
    props.holder.loadAccount()
  }, []);

  return (
    <>
      { window.ethereum ? (
        <React.StrictMode>
          <RouterProvider router={props.router} />
        </React.StrictMode>
      ) : (
        <h1>Install Metamask plugin and reload page!</h1>
      )
      }
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();