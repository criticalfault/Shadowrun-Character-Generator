import * as React from 'react';
import './AttributesPanel.css';

export default function PriorityPanel(props) {
    const AttributeMax = React.useRef(6);
    const [Body, setBody] = React.useState(props.currentCharacter.attributes.Body);
    const [Quickness, setQuickness] = React.useState(props.currentCharacter.attributes.Quickness);
    const [Strength, setStrength] = React.useState(props.currentCharacter.attributes.Strength);
    const [Charisma, setCharisma] = React.useState(props.currentCharacter.attributes.Charisma);
    const [Intelligence, setIntelligence] = React.useState(props.currentCharacter.attributes.Intelligence);
    const [Willpower, setWillpower] = React.useState(props.currentCharacter.attributes.Willpower);
    const handleChangeAttribute = (event) => {
        const attributesArray = [Body,Quickness,Strength,Charisma,Intelligence,Willpower];
        let attribute = event.target.name;
        let value = event.target.value;
        if(value > AttributeMax.current){
            value = AttributeMax.current;
        }
        //No attribute can be negative
        if(value < 0){
            value = 0;
        }
        //Need a better check to make sure the attributes max points arent negative.
        if(parseInt(props.currentCharacter.maxAttributePoints)-Body-Quickness-Strength-Charisma-Intelligence-Willpower <= -1){
            return;
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

    const [Essence, setEssence] = React.useState(6);
    const [Magic, setMagic] = React.useState(0);

    return (
        <div>
            <div>Attribute Points Left: {parseInt(props.currentCharacter.maxAttributePoints)-Body-Quickness-Strength-Charisma-Intelligence-Willpower}</div>
            <table className="">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        <th>Racial Modifier</th>
                        <th>Cybered Attribute</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Body</td>
                        <td><input type='number' name="Body" value={Body} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Body']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Body'])}</td>
                        <td>{parseInt(Body)+parseInt(props.currentCharacter.raceBonuses['Body'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Body'])}</td>
                    </tr>
                    <tr>
                        <td>Quickness</td>
                        <td><input type='number' name="Quickness" value={Quickness} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Quickness']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Quickness'])}</td>
                        <td>{parseInt(Quickness)+parseInt(props.currentCharacter.raceBonuses['Quickness'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Quickness'])}</td>
                    </tr>
                    <tr>
                        <td>Strength</td>
                        <td><input type='number' name="Strength" value={Strength} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Strength']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Strength'])}</td>
                        <td>{parseInt(Strength)+parseInt(props.currentCharacter.raceBonuses['Strength'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Strength'])}</td>
                    </tr>
                    <tr>
                        <td>Charisma</td>
                        <td><input type='number' name="Charisma" value={Charisma} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Charisma']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Charisma'])}</td>
                        <td>{parseInt(Charisma)+parseInt(props.currentCharacter.raceBonuses['Charisma'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Charisma'])}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td><input type='number' name="Intelligence" value={Intelligence} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Intelligence']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Intelligence'])}</td>
                        <td>{parseInt(Intelligence)+parseInt(props.currentCharacter.raceBonuses['Intelligence'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Intelligence'])}</td>
                    </tr>
                    <tr>
                        <td>Willpower</td>
                        <td><input type='number' name="Willpower" value={Willpower} onChange={handleChangeAttribute}/></td>
                        <td>{props.currentCharacter.raceBonuses['Willpower']}</td>
                        <td>{parseInt(props.currentCharacter.cyberAttributeBonuses['Willpower'])}</td>
                        <td>{parseInt(Willpower)+parseInt(props.currentCharacter.raceBonuses['Willpower'])+parseInt(props.currentCharacter.cyberAttributeBonuses['Willpower'])}</td>
                    </tr>
                    <tr>
                        <td>Essence</td>
                        <td>{Essence}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Magic</td>
                        <td>{Magic}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}