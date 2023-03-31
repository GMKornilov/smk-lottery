import React, { useState } from "react";
import './CreateLottery.css';
import Spinner from '../design/Spinner';
import Button from '../design/Button';
import { holder } from '../web3/ContractHolder';
import { useNavigate } from 'react-router-dom';

function CreateLottery() {
    const [etherInput, setEtherInput] = useState(0.002);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    function onCreateLotteryClick() {
        console.log("creating lottery");
        setLoading(true);

        holder.createLottery(etherInput)
            .then(() => navigate("/"))
            .catch(e => {
                setLoading(false);
                console.error(e);
                alert("Error creating lottery :(");
            });
    }

    function onEtherInputChange(event) {
        setEtherInput(event.target.value);
    }

    return (
        <div>
            <header className="CreateLotteryHeader">
                <label htmlFor="ether_input">Input ether amount(should be more than 0.001 ether)</label>
                <input 
                    id = "ether_input"
                    value={etherInput} 
                    type="number" 
                    step="0.001"
                    min="0.002"
                    onChange={ event => onEtherInputChange(event)} />

                
                <Button onClick={onCreateLotteryClick} text="Create lottery" enabled={!loading}/>

                { loading ? ( <Spinner/> ) : (<></>) }
            </header>
        </div>
    )
}

export default CreateLottery;