import { DiceRoll, exportFormats } from '@dice-roller/rpg-dice-roller';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import './DiceRollerTray.css';
import Slider from '@mui/material/Slider';
export default function DiceRollerTray(props) {
    const [DiceResult, setDiceResult] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [DiceAmount, setDiceAmount] = useState(1);
//  https://dice-roller.github.io/documentation/guide/usage.html#examples
    const handleRoll = () => {
        const roll = new DiceRoll(DiceAmount+'d6!!sd');
        const jsonString = roll.export(exportFormats.JSON);
        //setDiceResult(JSON.parse(jsonString).output.split('=')[0]);
        const rollToAdd = JSON.parse(jsonString).output.split('=')[0];
        setDiceResult(prevRolls => {
            if(prevRolls.length > 9){
                const newRolls = prevRolls.slice(1);
                return [...newRolls, rollToAdd]
            }else{
                return [...prevRolls, rollToAdd]
            }

            
        });
        try{
            fathom.trackEvent('Dice Rolled'); // eslint-disable-line
        }catch(err){
            console.log(err);
            console.log("Fathom wasn't found. Prolly a blocker");
        }
    };

    const handleDiceChange = (event, newValue) => {
        setDiceAmount(newValue);
    };

    const handleOpenDiceRoller = () => {
        if(open === false){
            handleOpen()
        }else{
            handleClose();
        }
    }

    const showRollerDisplay = () => {

        if(open === true){
            return (
                <div className='dice-roller-area'>
                    <Button variant="outlined" onClick={ handleRoll }>Roll</Button>
                    <Slider
                        aria-label="Number of Dice"
                        defaultValue={1}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={30}
                        onChange={handleDiceChange}
                    />
                    <div className="dice-roller-results">
                        {DiceResult.slice().reverse().map((result, index) => (
                           <div className="dice-roller-result" key={index}>{result}</div>
                        ))}
                    </div>
                </div>
            );
        }else{
            return;
        }
    }

    if(props.showDice === 11){
        return (
            <div>
                 {showRollerDisplay()}
                 <div className="dice-rolling-panel">
                    <Button onClick={ handleOpenDiceRoller }><CasinoOutlinedIcon className='MuiIcon-colorPrimary'/></Button>
                </div>
            </div>
        );
    }else{
        return;
    }

   

}