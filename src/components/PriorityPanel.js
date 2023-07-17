import * as React from 'react';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function PriorityPanel() {

    const [PriorityA, setPriorityA] = React.useState('');
    const [PriorityB, setPriorityB] = React.useState('');
    const [PriorityC, setPriorityC] = React.useState('');
    const [PriorityD, setPriorityD] = React.useState('');
    const [PriorityE, setPriorityE] = React.useState('');
    
    const handleChangePriority = (event, newPriority) => {
        let letter = event.target.dataset.code;
        switch(letter) {

            case "A":
                setPriorityA(newPriority);
            break;

            case "B":
                setPriorityB(newPriority);
            break

            case "C":
                setPriorityC(newPriority);
            break;

            case "D":
                setPriorityD(newPriority);
            break;

            case "E":
                setPriorityE(newPriority);
            break;

            default:
            break;
        }
        
    };
    

    return (
        <div>
            <h2>MASTER CHARACTER CREATION TABLE</h2>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={2}>
                    <div>Priority</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Race</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Magic</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Attributes</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Skills</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Resources</div>
                </Grid>
                <Grid item xs={2}>
                    <div>A</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                        color="primary"
                        value={PriorityA}
                        exclusive
                        onChange={handleChangePriority}
                        aria-label="Platform"
                        >
                        <ToggleButton style={{'width':'140px'}} data-code='A' value='' disabled={true}>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="full_magician"> Full Magician</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="30_attributes">30</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="50_skills">50</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="1000000_nuyen">1,000,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {
                    /*  Priority B Selections    */
                }
                
               
                <Grid item xs={2}>
                    <div>B</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityB}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='B' value='' disabled={true}>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="full_magician">Adept <br></br>Aspected</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="27_attributes">27</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="40_skills">40</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="400000_nuyen">400,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>C</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityC}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="troll_elf">Troll / Elf</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value='' disabled={true}>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="24_attributes">24</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="34_skills">34</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="90000_nuyen">90,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>D</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityD}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="dwarf_ork">Dwarf / Ork</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value='' disabled={true}>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="21_attributes">21</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="30_skills">30</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="20000_nuyen">20,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>E</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityE}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="human">Human</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value='' disabled={true}>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="18_attributes">18</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="27_skills">27</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="5000_nuyen">5,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </div>
  );
}