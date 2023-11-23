import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import ConditionMonitor from './ConditionMonitor';
import {ListItem, ListItemText } from '@mui/material';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './SheetDisplay.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));
function SheetDisplay(props) {

    const handleConditionSelect = () => {
    
    }

    const renderControlPool = () =>{

        if(props.currentCharacter.cyberAttributeBonuses.hasOwnProperty('Vehicle_Control_Rig_Level')) {
            return (<>
                        <br/><br/>
                        <TextField
                            style={{ width: '100px', marginRight: '10px' }}
                            id="rating-input"
                            label="Control"
                            type="text"
                            value={(Math.floor(parseInt(props.currentCharacter.attributes.Quickness) +
                                parseInt(props.currentCharacter.raceBonuses.Quickness??0) +
                                parseInt(props.currentCharacter.cyberAttributeBonuses.Quickness??0)+
                                parseInt(props.currentCharacter.attributes.Intelligence) +
                                parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                                parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0))/2)+
                                parseInt(props.currentCharacter.cyberAttributeBonuses.Vehicle_Control_Reaction??0)
                            }

                        />
                    </>
            )
        }
    }

    const renderAstralCombatPool = () => {
        if(props.currentCharacter.attributes.Magic > 0){
            return(<>
                    <br/><br/>
                    <TextField
                        style={{ width: '100px', marginRight: '10px' }}
                        id="rating-input"
                        label="Astral Combat"
                        type="text"
                        value={(Math.floor(parseInt(props.currentCharacter.attributes.Charisma) +
                            parseInt(props.currentCharacter.raceBonuses.Charisma??0) +
                            parseInt(props.currentCharacter.cyberAttributeBonuses.Charisma??0)+
                            parseInt(props.currentCharacter.attributes.Intelligence) +
                            parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                            parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0)+
                            parseInt(props.currentCharacter.attributes.Willpower) +
                            parseInt(props.currentCharacter.raceBonuses.Willpower??0) +
                            parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower??0))/2)}
                    />
                </>
            )
        }
    }

    const renderHackingPool = () => {
        if(props.currentCharacter.cyberAttributeBonuses.hasOwnProperty('Hacking_Pool')){
            return(<>
                    <br/><br/>
                    <TextField
                        style={{ width: '100px', marginRight: '10px' }}
                        id="rating-input"
                        label="Hacking"
                        type="text"
                        value={ parseInt(props.currentCharacter.cyberAttributeBonuses.Hacking_Pool??0) }
                    />
                </>)
        }
    }

    const renderSpellPool = () => {
        if(props.currentCharacter.attributes.Magic > 0){
            return(<>
                    <br/><br/>
                    <TextField
                        style={{ width: '100px', marginRight: '10px' }}
                        id="rating-input"
                        label="Spell"
                        type="text"
                        value={(parseInt(props.currentCharacter.attributes.Magic)+parseInt(props.currentCharacter.attributes.Intelligence) +
                            parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                            parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0)/3)}
                    />
                </>
            )
        }
    }

    const renderTaskPool = () => {
        if(props.currentCharacter.cyberAttributeBonuses.hasOwnProperty('Task_Pool') > 0){
            return(<>
                    <br/><br/>
                    <TextField
                        style={{ width: '100px', marginRight: '10px' }}
                        id="rating-input"
                        label="Task"
                        type="text"
                        value={parseInt(props.currentCharacter.cyberAttributeBonuses.Task_Pool??0)}
                    />
                </>
            )
        }
    }

    const renderControlPoolBoxes = () => {
        if(props.currentCharacter.cyberAttributeBonuses.hasOwnProperty('Vehicle_Control_Rig_Level')){
            return(<>
                <br/><br/>
                <TextField
                    style={{ width: '100px', marginRight: '10px', display: 'inline-block' }}
                    id="rating-input"
                    label="Rigged React"
                    type="text"
                    value={(Math.floor(parseInt(props.currentCharacter.attributes.Quickness) +
                        parseInt(props.currentCharacter.raceBonuses.Quickness??0) +
                        parseInt(props.currentCharacter.cyberAttributeBonuses.Quickness??0)+parseInt(props.currentCharacter.attributes.Intelligence) +
                        parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                        parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0))/2)+parseInt(props.currentCharacter.cyberAttributeBonuses.Vehicle_Control_Reaction)}
                /><br/><br/>
                <TextField
                    style={{ width: '100px', marginRight: '10px', display: 'inline-block' }}
                    id="rating-input"
                    label="Rigged Init"
                    type="text"
                    value={(parseInt(props.currentCharacter.attributes.Initative)+parseInt(props.currentCharacter.cyberAttributeBonuses.Vehicle_Initative))+'d6'}
                />
            </>
            )
        }else{
            return;
        }
    }


  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <Item>Name: {props.currentCharacter.street_name}</Item>
        </Grid>
        <Grid item xs={6} md={3}>
            <Item>Metatype: {props.currentCharacter.race}</Item>
        </Grid>
        <Grid item xs={6} md={3}>
            <Item>Age: </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>Description: </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>Notes: </Item>
        </Grid>
        <Grid item xs={12} md={4}>
            <Item>
                <h2 className={"boxHeader"}>Attributes</h2>
                <Grid container>
                    <Grid item xs={8}>
                        <table className="">
                            <tbody>
                            {Object.keys(props.currentCharacter.attributes).map(attribute => (
                                <tr key={attribute}>
                                    <td>{attribute}</td>
                                    <td style={{"width":"25px"}}>{props.currentCharacter.attributes[attribute]}</td>
                                    <td style={{"width":"25px"}}>
                                        {parseInt(props.currentCharacter.attributes[attribute]) +
                                        parseInt(props.currentCharacter.raceBonuses[attribute]??0) +
                                        parseInt(props.currentCharacter.cyberAttributeBonuses[attribute]??0)+
                                        parseInt(props.currentCharacter.magicalAttributeBonuses[attribute]??0)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            style={{ width: '90px', marginRight: '10px', display: 'inline-block' }}
                            id="rating-input"
                            label="Reaction"
                            type="text"
                            value={(Math.floor(parseInt(props.currentCharacter.attributes.Quickness) +
                                parseInt(props.currentCharacter.raceBonuses.Quickness??0) +
                                parseInt(props.currentCharacter.cyberAttributeBonuses.Quickness??0)+
                                parseInt(props.currentCharacter.magicalAttributeBonuses.Quickness)+
                                parseInt(props.currentCharacter.attributes.Intelligence) +
                                parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                                parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0))/2)+parseInt(props.currentCharacter.cyberAttributeBonuses.Reaction)}
                        /><br></br><br></br>
                        <TextField
                            style={{ width: '90px', marginRight: '10px', display: 'inline-block' }}
                            id="rating-input"
                            label="Initative"
                            type="text"
                            value={(parseInt(props.currentCharacter.attributes.Initative)+parseInt(props.currentCharacter.cyberAttributeBonuses.Initative))+'d6'}
                            
                        />
                        {renderControlPoolBoxes()}
                    </Grid>
                </Grid>
            </Item>
        </Grid>
        <Grid item xs={12} md={8}>
            <Item>
                <h2 className={"boxHeader"}>Condition Monitor</h2>
                <ConditionMonitor type="Stun &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" key={'S'} actor='S'  onConditionSelect={handleConditionSelect} />
                <ConditionMonitor type="Physical &nbsp;" key={'P'} actor="P" onConditionSelect={handleConditionSelect} />
            </Item>
        </Grid>
        <Grid item xs={12} md={6}>
            <Item style={{"minHeight":"341px"}}>
                <h2 className={"boxHeader"}>Skills</h2>
                {
                    props.currentCharacter.skills.map((skill, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={skill.specialization ? `${skill.name} (${skill.rating-1}) ->  ${skill.specialization} (${skill.rating + 1})`:`${skill.name} (${skill.rating})`}
                          />
                          </ListItem>
                    ))}

            </Item>
        </Grid>
        <Grid item xs={6} md={3}>
            <Item style={{"minHeight":"341px"}}>
                <h2 className={"boxHeader"}>Dice Pools</h2>
                <TextField
                    style={{ width: '100px', marginRight: '10px' }}
                    id="rating-input"
                    label="Combat"
                    type="text"
                    value={(
                        Math.floor(
                                   (parseInt(props.currentCharacter.attributes.Quickness) +
                                    parseInt(props.currentCharacter.raceBonuses.Quickness??0) +
                                    parseInt(props.currentCharacter.cyberAttributeBonuses.Quickness??0)+
                                    parseInt(props.currentCharacter.magicalAttributeBonuses.Quickness)+
                                    parseInt(props.currentCharacter.attributes.Intelligence) +
                                    parseInt(props.currentCharacter.raceBonuses.Intelligence??0) +
                                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence??0)+
                                    parseInt(props.currentCharacter.magicalAttributeBonuses.Intelligence)+
                                    parseInt(props.currentCharacter.attributes.Willpower) +
                                    parseInt(props.currentCharacter.raceBonuses.Willpower??0) +
                                    parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower??0))+
                                    parseInt(props.currentCharacter.magicalAttributeBonuses.Willpower)
                                    /2
                                    )+parseInt(props.currentCharacter.magicalAttributeBonuses.Combat_Pool??0)
                                )}
                />
                
                {renderHackingPool()}
                {renderControlPool()}
                {renderAstralCombatPool()}
                {renderSpellPool()}
                {renderTaskPool()}
                
            </Item>
        </Grid>
        <Grid item xs={6} md={3}>
            <Item style={{"minHeight":"341px"}}>
            <h2 className={"boxHeader"}>Cyberware</h2>
            {props.currentCharacter.cyberware.map((cyberware, index) => (
                <div key={cyberware.Name+index}>
                 {cyberware.name}
                </div>
              ))}
            </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>
            <h2 className={"boxHeader"}>Gear</h2>
            {props.currentCharacter.gear.filter(item => !item.hasOwnProperty('Damage') && !item.hasOwnProperty('Ballistic')).map((gear, index) => (
                <div key={gear.Name+index}>
                 {gear.name}
                </div>
              ))}
            </Item>
        </Grid>
        <Grid item xs={4}>
            <Item>
            <h2 className={"boxHeader"}>Armor</h2>
            {props.currentCharacter.gear.filter(item => item.hasOwnProperty('Ballistic')).map((gear, index) => (
                <div key={gear.Name+index}>
                    {gear.name}: {gear.Ballistic} / {gear.Impact}
                </div>
              ))}
            </Item>
        </Grid>
        <Grid item xs={8}>
            <Item>
                <h2 className={"boxHeader"}>Weapons</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.currentCharacter.gear.filter(item => item.hasOwnProperty('Damage')).map((gear, index) => (
                            <TableRow key={gear.Name+index}>
                                <TableCell component="th" scope="row">{gear.name}</TableCell>
                                <TableCell align="right">{gear.Damage}</TableCell>
                                <TableCell align="right">{gear.Notes}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Item>
        </Grid>
    
{props.currentCharacter.spells && props.currentCharacter.spells.length? (
    <Grid item xs={12}>
        <h3>Spells</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Spell Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Drain Code</TableCell>
              <TableCell align="right">Options</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.currentCharacter.spells.map((spell, index) => (
              <TableRow
                key={spell.Name}
              >
                <TableCell component="th" scope="row">
                  {spell.Name}
                </TableCell>
                <TableCell align="right">{spell.Rating} {CalcSpellRating(spell)}</TableCell>
                <TableCell align="right">{spell.Type}</TableCell>
                <TableCell align="right">{spell.Target}</TableCell>
                <TableCell align="right">{spell.Duration}</TableCell>
                <TableCell align="right">{spell.Drain}</TableCell>
                <TableCell align="right">
                 {isFetishSpell(spell.Fetish)} {isExclusiveSpell(spell.Exclusive)}
                </TableCell>
                <TableCell align="right"><Button onClick={() => handleRemoveSpell(index)}>Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>   
    ):''}
{props.currentCharacter.vehicles && props.currentCharacter.vehicles.length? ( 
    <Grid item xs={12}>
        <h2 className={"boxHeader"}>Vehicle</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Handling</TableCell>
                <TableCell align="right">Speed/Accel</TableCell>
                <TableCell align="right">Body/Armor</TableCell>
                <TableCell align="right">Sig/Autonav</TableCell>
                <TableCell align="right">Pilot/Sensor</TableCell>
                <TableCell align="right">Cargo/Load</TableCell>
                <TableCell align="right">Seating</TableCell>
                <TableCell align="right">Notes</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.currentCharacter.vehicles.map((vehicle, index) => (
                <TableRow key={vehicle.Name+index}>
                    <TableCell component="th" scope="row">{vehicle.name}</TableCell>
                    <TableCell align="right">{vehicle.Handling}</TableCell>
                    <TableCell align="right">{vehicle['Speed/Accel']}</TableCell>
                    <TableCell align="right">{vehicle['Body/Armor']}</TableCell>
                    <TableCell align="right">{vehicle['Sig/Autonav']}</TableCell>
                    <TableCell align="right">{vehicle['Pilot/Sensor']}</TableCell>
                    <TableCell align="right">{vehicle['Cargo/Load']}</TableCell>
                    <TableCell align="right">{vehicle.Seating}</TableCell>
                    <TableCell align="right">{vehicle.Notes}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </Grid>   
    ):''}
</Grid>
  );
}

export default SheetDisplay;
