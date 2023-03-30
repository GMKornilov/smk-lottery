import { useEffect, useState } from 'react';
import Web3 from 'web3';
import MainPage from './main_page/MainPage';

function LotteryApp() {
    // const [account, setAccount] = useState();

    useEffect(() => {
        async function loadAccount() {
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const accounts = await web3.eth.requestAccounts();

            console.log(accounts);
            // setAccount(accounts[0]);
        }
        
        loadAccount()
    }, []);


    return (
        <>
            {!window.ethereum ? (
                <h1>Install Metamask plugin and reload page!</h1>
            ) : (
                // <p>Your account is: {account}</p>
                <MainPage />
            )
            }
        </>
    )
}

export default LotteryApp;