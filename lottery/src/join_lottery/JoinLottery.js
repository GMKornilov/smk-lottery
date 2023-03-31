import React, { useState } from "react";
import './JoinLottery.css';
import Spinner from '../design/Spinner';
import Button from '../design/Button';
import { holder } from '../web3/ContractHolder';
import { useNavigate, useParams } from 'react-router-dom';

export function JoinLottery() {
    const params = useParams();
    const lotteryId = params.lotteryId;

    const [etherInput, setEtherInput] = useState(0.002);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    function onJoinLotteryClick() {
        console.log("joining lottery");
        setLoading(true);

        holder.joinLottery(lotteryId, etherInput)
            .then(() => navigate("/"))
            .catch(e => {
                setLoading(false);
                console.error(e);
                alert("Error joining lottery :(");
            });
    }

    function onEtherInputChange(event) {
        setEtherInput(event.target.value);
    }

    return (
        <div>
            <header className="JoinLotteryHeader">
                <label htmlFor="ether_input">Input ether amount(should be more than 0.001 ether)</label>
                <input 
                    id = "ether_input"
                    value={etherInput} 
                    type="number" 
                    step="0.001"
                    min="0.002"
                    onChange={ event => onEtherInputChange(event)} />

                
                <Button onClick={onJoinLotteryClick} text="Join lottery" enabled={!loading}/>

                { loading ? ( <Spinner/> ) : (<></>) }
            </header>
        </div>
    )
}