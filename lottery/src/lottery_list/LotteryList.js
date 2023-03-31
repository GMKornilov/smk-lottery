import React, { useEffect, useState } from "react";
import './LotteryList.css';
import Spinner from '../design/Spinner';
import { holder } from '../web3/ContractHolder';
import { Link } from 'react-router-dom';

export function LotteryList() {
    const [lotteries, setLotteries] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        holder.loadLotteries()
            .then(data => {
                setLoading(false)
                setLotteries(data)
            })
            .catch(e => {
                setLoading(false)
                console.error(e);
                alert("Error loading lotteries")
            })
    }, []);

    return (
        <div className="LotteryListContainer">
            {loading ? (
                <Spinner />
            ) : (
                <Lotteries lotteries={lotteries} />
            )
            }
        </div>
    )
}

function Lotteries(props) {
    return (
        <>
            {props.lotteries.length == 0 ? (
                <p>No lotteries were created</p>
            ) : (
                <ul className="LotteryList">
                    {props.lotteries.map(lottery => (
                        <li key={lottery}>
                            <Lottery lottery={lottery} />
                        </li>
                    ))}
                </ul>
            )
            }
        </>
    )
}

function Lottery(props) {
    return (
        <Link to="/join/${props.lottery}">{props.lottery}</Link>
    )
}