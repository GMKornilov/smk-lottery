import React from "react";
import './CreateLottery.css';
import Spinner from '../design/Spinner';
import Button from '../design/Button';

class CreateLottery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            etherInput: 0.001,
            loading: false,
        }

        this.onCreateLotteryClick = this.onCreateLotteryClick.bind(this);
        this.onEtherInputChange = this.onEtherInputChange.bind(this);
    }

    onCreateLotteryClick() {
        console.log("creating lottery");
        this.setState({
            loading: true,
        });
    }

    onEtherInputChange(event) {
        this.setState({
            etherInput: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <header className="CreateLotteryHeader">
                    <label for="ether_input">Input ether amount(min is 0.001 ether)</label>
                    <input 
                        id = "ether_input"
                        value={this.state.etherInput} 
                        type="number" 
                        step="0.001"
                        min="0.001"
                        onChange={ event => this.onEtherInputChange(event)} />

                    
                    <Button onClick={this.onCreateLotteryClick} text="Create lottery" enabled={!this.state.loading}/>

                    { this.state.loading ? ( <Spinner/> ) : (<></>) }
                </header>
            </div>
        )
    }
}

export default CreateLottery;