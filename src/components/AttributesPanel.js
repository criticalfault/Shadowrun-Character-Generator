import React, { useState } from 'react';
import './AttributesPanel.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function AttributesPanel(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const AttributeMax = React.useRef(6);
    const [Body, setBody] = React.useState(props.currentCharacter.attributes.Body);
    const [Quickness, setQuickness] = React.useState(props.currentCharacter.attributes.Quickness);
    const [Strength, setStrength] = React.useState(props.currentCharacter.attributes.Strength);
    const [Charisma, setCharisma] = React.useState(props.currentCharacter.attributes.Charisma);
    const [Intelligence, setIntelligence] = React.useState(props.currentCharacter.attributes.Intelligence);
    const [Willpower, setWillpower] = React.useState(props.currentCharacter.attributes.Willpower);
    const [Initative] = React.useState(props.currentCharacter.attributes.Initative);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen  = () => setOpen(true);

    const KarmaCosts = {
        "SR3":{
            "costs":{
                'underLimit':2,
                'overLimit':3,
            },
            "racialLimits":{
                "Cyclops":{
                    "Body":{
                        "limit":11,
                        "max":14
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":12,
                        "max":15
                    },
                    "Charisma":{
                        "limit":4,
                        "max":7
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Koborokuru":{
                    "Body":{
                        "limit":7,
                        "max":10
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":7,
                        "max":10
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Fomori":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":9,
                        "max":12
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Menehune":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":7,
                        "max":10
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Hobgoblin":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }    
                },
                "Giant":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":11,
                        "max":14
                    },
                    "Charisma":{
                        "limit":4,
                        "max":7
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Gnome":{
                    "Body":{
                        "limit":7,
                        "max":10
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":7,
                        "max":10
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":8,
                        "max":11
                    }
                },
                "Oni":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Wakyambi":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":11
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Ogre":{
                    "Body":{
                        "limit":9,
                        "max":12
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Minotaur":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":9,
                        "max":12
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }

                },
                "Satyr":{
                    "Body":{
                        "limit":9,
                        "max":12
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Night One":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":8,
                        "max":11
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":11
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Dryad":{
                    "Body":{
                        "limit":5,
                        "max":8
                    },
                    "Quickness":{
                        "limit":7,
                        "max":10
                    },
                    "Strength":{
                        "limit":5,
                        "max":8
                    },
                    "Charisma":{
                        "limit":9,
                        "max":12
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Elf":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":7,
                        "max":11
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":12
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Dwarf":{
                    "Body":{
                        "limit":7,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":12
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":11
                    }
                },
                "Ork":{
                    "Body":{
                        "limit":9,
                        "max":14
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":12
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Troll":{
                    "Body":{
                        "limit":11,
                        "max":17
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":10,
                        "max":15
                    },
                    "Charisma":{
                        "limit":4,
                        "max":6
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":6
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Human":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                }
            }
        },
        "SR2":{
            "costs":{
                'underLimit':1,
                'overLimit':2,
            },
            "racialLimits":{
                "Cyclops":{
                    "Body":{
                        "limit":11,
                        "max":14
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":12,
                        "max":15
                    },
                    "Charisma":{
                        "limit":4,
                        "max":7
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Koborokuru":{
                    "Body":{
                        "limit":7,
                        "max":10
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":7,
                        "max":10
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Fomori":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":9,
                        "max":12
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Menehune":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":7,
                        "max":10
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Hobgoblin":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }    
                },
                "Giant":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":11,
                        "max":14
                    },
                    "Charisma":{
                        "limit":4,
                        "max":7
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":7
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Gnome":{
                    "Body":{
                        "limit":7,
                        "max":10
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":7,
                        "max":10
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":8,
                        "max":11
                    }
                },
                "Oni":{
                    "Body":{
                        "limit":8,
                        "max":11
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Wakyambi":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":11
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Ogre":{
                    "Body":{
                        "limit":9,
                        "max":12
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Minotaur":{
                    "Body":{
                        "limit":10,
                        "max":13
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":9,
                        "max":12
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }

                },
                "Satyr":{
                    "Body":{
                        "limit":9,
                        "max":12
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":8,
                        "max":11
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":7,
                        "max":10
                    }
                },
                "Night One":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":8,
                        "max":11
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":11
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Dryad":{
                    "Body":{
                        "limit":5,
                        "max":8
                    },
                    "Quickness":{
                        "limit":7,
                        "max":10
                    },
                    "Strength":{
                        "limit":5,
                        "max":8
                    },
                    "Charisma":{
                        "limit":9,
                        "max":12
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Elf":{ 
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":7,
                        "max":11
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":8,
                        "max":12
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Dwarf":{
                    "Body":{
                        "limit":7,
                        "max":11
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":8,
                        "max":12
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":7,
                        "max":11
                    }
                },
                "Ork":{
                    "Body":{
                        "limit":9,
                        "max":14
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":8,
                        "max":12
                    },
                    "Charisma":{
                        "limit":5,
                        "max":8
                    },
                    "Intelligence":{
                        "limit":5,
                        "max":8
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                },
                "Troll":{
                  "Body":{
                        "limit":11,
                        "max":17
                    },
                    "Quickness":{
                        "limit":5,
                        "max":8
                    },
                    "Strength":{
                        "limit":10,
                        "max":15
                    },
                    "Charisma":{
                        "limit":4,
                        "max":6
                    },
                    "Intelligence":{
                        "limit":4,
                        "max":6
                    },
                    "Willpower":{
                        "limit":5,
                        "max":8
                    }
                
                },
                "Human":{
                    "Body":{
                        "limit":6,
                        "max":9
                    },
                    "Quickness":{
                        "limit":6,
                        "max":9
                    },
                    "Strength":{
                        "limit":6,
                        "max":9
                    },
                    "Charisma":{
                        "limit":6,
                        "max":9
                    },
                    "Intelligence":{
                        "limit":6,
                        "max":9
                    },
                    "Willpower":{
                        "limit":6,
                        "max":9
                    }
                }
            }
        }
    }
    
    const handleChangeAttribute = (event) => {
        const attributesArray = {'Body':Body,'Quickness':Quickness,'Strength':Strength,'Charisma':Charisma,'Intelligence':Intelligence,'Willpower':Willpower};
        let attribute = event.target.name;
        let value = event.target.value;
        let AttributeSum = (parseInt(Body)+parseInt(Quickness)+parseInt(Strength)+parseInt(Charisma)+parseInt(Intelligence)+parseInt(Willpower));
        if(value > AttributeMax.current){
            value = AttributeMax.current;
        }
        //No attribute can be negative
        if(value < 0){
            value = 0;
        }

        //Need a better check to make sure the attributes max points arent negative.
        if(parseInt(AttributeSum)-parseInt(props.currentCharacter.maxAttributePoints) >= 0){
            if(attributesArray[attribute] < value){
                return;
            } 
        }
        switch (attribute) {
            case 'Body':
                setBody(value);
            break;
            case 'Quickness':
                setQuickness(value);
            break;
            case 'Strength':
                setStrength(value);
            break;
            case 'Charisma':
                setCharisma(value);
                break;
            case 'Intelligence':
                setIntelligence(value);
                break;
            case 'Willpower':
                setWillpower(value);
                break;
            default:
                break;
       }
       props.ChangeAttributes(attribute,value);
    }

    const Essence= React.useState(6);
    const Magic = React.useState(0);

    const displayChargenPointsLeft = () => {

        if(props.currentCharacter.step === 'chargen'){
            return (
                <div>Attribute Points Left: {parseInt(props.currentCharacter.maxAttributePoints)-Body-Quickness-Strength-Charisma-Intelligence-Willpower}</div>
            )
        }
    }

    const lockAttributes = () => {
        if(props.currentCharacter.step === 'chargen'){
            return false;
        }else{
            return true;
        }
    }

    const displayImproveAttribute = (where, attribute) =>{
        if(props.currentCharacter.step === 'finalized'){
            if (where === 'header'){
                return (<th>Action</th>);
            }else if(where === 'body'){
                return (<td><Button variant="contained" color="primary" onClick={() => { increaseAttribute(attribute) } }>Increase {attribute}</Button></td>);
            }else if(where === 'empty'){
                return (<td></td>)
            }else{
                return;
            }
        }else{
            return;
        }
    }

    const [increaseAttributeTarget, setIncreaseAttributeTarget] = useState('Body');

    const increaseAttribute = (attribute) => {
        setIncreaseAttributeTarget(attribute);
        handleOpen();
        return;
    }

    const increaseAttributeConfirm = () => {
        let karmaCost = calcIncreaseAttributeTarget();
        let AttributeStart = props.currentCharacter.attributes[increaseAttributeTarget];
        let AttributeFinal = props.currentCharacter.attributes[increaseAttributeTarget] += 1
        props.currentCharacter.attributes[increaseAttributeTarget] = AttributeFinal
        switch(increaseAttributeTarget){
            case "Strength":
                setStrength(AttributeFinal);
            break;
            case "Quickness":
                setQuickness(AttributeFinal);
            break;
            case "Body":
                setBody(AttributeFinal);
            break;
            case "Charisma":
                setCharisma(AttributeFinal);
            break;
            case "Intelligence":
                setIntelligence(AttributeFinal);
            break;
            case "Willpower":
                setWillpower(AttributeFinal);
            break;
            default:
                break;
        }

        //Fire off Karma Spending Log
        const event = new Date();
        let improvementLog = {
            "Type": 'IncreaseAttribute',
            "Date": event.getTime(),
            "Amount": (karmaCost*-1),
            "Notes":  "Increased "+increaseAttributeTarget+" from "+AttributeStart+ " to "+AttributeFinal+" for "+karmaCost +" Karma."
        }
        props.onSpendKarma(karmaCost);
        props.onChangeLog([...props.Log, improvementLog]);
        handleClose();
    }

    const calcIncreaseAttributeTarget = () => {
        console.log(props.Edition);
        let attributeCost = KarmaCosts[props.Edition]['racialLimits'][props.currentCharacter.race][increaseAttributeTarget];
        console.log(attributeCost);
        if(props.currentCharacter.attributes[increaseAttributeTarget] >= attributeCost['limit'] && props.currentCharacter.attributes[increaseAttributeTarget] <= attributeCost['max']){
            return (props.currentCharacter.attributes[increaseAttributeTarget]+1) * KarmaCosts[props.Edition].costs.overLimit;
        }else if(props.currentCharacter.attributes[increaseAttributeTarget] < attributeCost['limit'] ){

            return (props.currentCharacter.attributes[increaseAttributeTarget]+1) * KarmaCosts[props.Edition].costs.underLimit;
        }else{
            console.log("Invalid range");
            return "1";
        }
    }

    return (
        <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p>Are you sure you want to increase {increaseAttributeTarget}?</p>
                    <p>It will cost you {calcIncreaseAttributeTarget()} karma.</p>
                    <Button variant="contained" color="primary" onClick={increaseAttributeConfirm}>Are you sure?</Button>
                    <hr></hr>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            { displayChargenPointsLeft() }
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        {displayImproveAttribute('header',false)}
                        <th>Racial Modifier</th>
                        <th>Cybered Bonus</th>
                        <th>Magical Bonus</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Body</td>
                        <td><input type='number' name="Body" value={Body} onChange={handleChangeAttribute} disabled={lockAttributes()} /></td>
                        {displayImproveAttribute('body','Body')}
                        <td>{props.currentCharacter.raceBonuses['Body']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Body'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Body'])}</td>
                        <td>{parseInt(Body)+parseInt(props.currentCharacter.raceBonuses['Body'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Body'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Body'])}</td>
                    </tr>
                    <tr>
                        <td>Quickness</td>
                        <td><input type='number' name="Quickness" value={Quickness} onChange={handleChangeAttribute} disabled={lockAttributes()}  /></td>
                        {displayImproveAttribute('body','Quickness')}
                        <td>{props.currentCharacter.raceBonuses['Quickness']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Quickness'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Quickness'])}</td>
                        <td>{parseInt(Quickness)+parseInt(props.currentCharacter.raceBonuses['Quickness'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Quickness'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Quickness'])}</td>
                    </tr>
                    <tr>
                        <td>Strength</td>
                        <td><input type='number' name="Strength" value={Strength} onChange={handleChangeAttribute} disabled={lockAttributes()}  /></td>
                        {displayImproveAttribute('body','Strength')}
                        <td>{props.currentCharacter.raceBonuses['Strength']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Strength'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Strength'])}</td>
                        <td>{parseInt(Strength)+parseInt(props.currentCharacter.raceBonuses['Strength'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Strength'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Strength'])}</td>
                    </tr>
                    <tr>
                        <td>Charisma</td>
                        <td><input type='number' name="Charisma" value={Charisma} onChange={handleChangeAttribute} disabled={lockAttributes()}  /></td>
                        {displayImproveAttribute('body','Charisma')}
                        <td>{props.currentCharacter.raceBonuses['Charisma']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Charisma'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Charisma'])}</td>
                        <td>{parseInt(Charisma)+parseInt(props.currentCharacter.raceBonuses['Charisma'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Charisma'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Charisma'])}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td><input type='number' name="Intelligence" value={Intelligence} onChange={handleChangeAttribute} disabled={lockAttributes()}  /></td>
                        {displayImproveAttribute('body','Intelligence')}
                        <td>{props.currentCharacter.raceBonuses['Intelligence']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Intelligence'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Intelligence'])}</td>
                        <td>{parseInt(Intelligence)+parseInt(props.currentCharacter.raceBonuses['Intelligence'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Intelligence'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Intelligence'])}</td>
                    </tr>
                    <tr>
                        <td>Willpower</td>
                        <td><input type='number' name="Willpower" value={Willpower} onChange={handleChangeAttribute} disabled={lockAttributes()} /></td>
                        {displayImproveAttribute('body','Willpower')}
                        <td>{props.currentCharacter.raceBonuses['Willpower']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Willpower'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Willpower'])}</td>
                        <td>{parseInt(Willpower)+parseInt(props.currentCharacter.raceBonuses['Willpower'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Willpower'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Willpower'])}</td>
                    </tr>
                    <tr>
                        <td>Essence</td>
                        <td>{Essence}</td>
                        {displayImproveAttribute('empty',false)}
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{Essence}</td>
                    </tr>
                    <tr>
                        <td>Magic</td>
                        <td>{Magic}</td>
                        {displayImproveAttribute('empty',false)}
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{Magic}</td>
                    </tr>
                    <tr>
                        <td>Reaction:</td>
                        <td>{Math.floor((parseInt(Quickness)+parseInt(Intelligence))/2)}</td>
                        {displayImproveAttribute('empty',false)}
                        <td>{props.currentCharacter.raceBonuses['Reaction']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Reaction'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Reaction'])}</td>
                        <td>{Math.floor(
                                        (parseInt(Quickness)+
                                        parseInt(props.currentCharacter.raceBonuses['Quickness'])+
                                        parseInt(props.currentCharacter.cyberAttributeBonuses['Quickness'])+
                                        parseInt(props.currentCharacter.magicalAttributeBonuses['Quickness'])+
                                        parseInt(Intelligence)+
                                        parseInt(props.currentCharacter.raceBonuses['Intelligence'])+
                                        parseInt(props.currentCharacter.cyberAttributeBonuses['Intelligence'])+
                                        parseInt(props.currentCharacter.magicalAttributeBonuses['Intelligence']))
                                    /2)+
                                        parseInt(props.currentCharacter.cyberAttributeBonuses['Reaction'])+
                                        parseInt(props.currentCharacter.magicalAttributeBonuses['Reaction'])}</td>
                    </tr>
                    <tr>
                        <td>Initative:</td>
                        <td>{Initative}d6</td>
                        {displayImproveAttribute('empty',false)}
                        <td>{props.currentCharacter.raceBonuses['Initative']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Initative'])}</td>
                        <td>{parseInt(props.currentCharacter.magicalAttributeBonuses['Initative'])}</td>
                        <td>{parseInt(Initative)+parseInt(props.currentCharacter.cyberAttributeBonuses['Initative'])+parseInt(props.currentCharacter.magicalAttributeBonuses['Initative'])}d6</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}