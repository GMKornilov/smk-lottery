import MainPage from './main_page/MainPage';

function LotteryApp() {
    return (
        <>
            {!window.ethereum ? (
                <h1>Install Metamask plugin and reload page!</h1>
            ) : (
                <MainPage />
            )
            }
        </>
    )
}

export default LotteryApp;