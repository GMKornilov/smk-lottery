import { useNavigate } from 'react-router-dom';
import Button from '../design/Button';
import './MainPage.css';

function MainPage() {
    let navigate = useNavigate();

    return (
        <div className='MainPage-column'>
            <p>Lottery SMK app</p>

            <div className='ButtonsRow'>
                <Button className='Button' onClick={() => navigate("create")} text="Create lottery"/>

                <Button onClick={() => navigate("join")} text="Join lottery"/>
            </div>
        </div>
    )
}

export default MainPage;