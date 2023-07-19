import * as React from 'react';
import './AttributesPanel.css';

export default function PriorityPanel(props) {

    const [Body, setBody] = React.useState(props.currentCharacter.attributes.Body);
    const [Quickness, setQuickness] = React.useState(props.currentCharacter.attributes.Quickness);
    const [Strength, setStrength] = React.useState(props.currentCharacter.attributes.Strength);
    const [Charisma, setCharisma] = React.useState(props.currentCharacter.attributes.Charisma);
    const [Intelligence, setIntelligence] = React.useState(props.currentCharacter.attributes.Intelligence);
    const [Willpower, setWillpower] = React.useState(props.currentCharacter.attributes.Willpower);
    const handleChangeAttribute = (event) => {
        let attribute = event.target.name;
        let value = event.target.value;
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


    const [RacialBody, setRacialBody] = React.useState(0);
    const [RacialQuickness, setRacialQuickness] = React.useState(0);
    const [RacialStrength, setRacialStrength] = React.useState(0);
    const [RacialCharisma, setRacialCharisma] = React.useState(0);
    const [RacialIntelligence, setRacialIntelligence] = React.useState(0);
    const [RacialWillpower, setRacialWillpower] = React.useState(0);

    const [CyberedBody, setCyberedBody] = React.useState(0);
    const [CyberedQuickness, setCyberedQuickness] = React.useState(0);
    const [CyberedStrength, setCyberedStrength] = React.useState(0);
    const [CyberedCharisma, setCyberedCharisma] = React.useState(0);
    const [CyberedIntelligence, setCyberedIntelligence] = React.useState(0);
    const [CyberedWillpower, setCyberedWillpower] = React.useState(0);

    const [Essence, setEssence] = React.useState(6);
    const [Magic, setMagic] = React.useState(0);

    return (
        <div>
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
                        <td>{RacialBody}</td>
                        <td>{CyberedBody}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Quickness</td>
                        <td><input type='number' name="Quickness" value={Quickness} onChange={handleChangeAttribute}/></td>
                        <td>{RacialQuickness}</td>
                        <td>{CyberedQuickness}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Strength</td>
                        <td><input type='number' name="Strength" value={Strength} onChange={handleChangeAttribute}/></td>
                        <td>{RacialStrength}</td>
                        <td>{CyberedStrength}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Charisma</td>
                        <td><input type='number' name="Charisma" value={Charisma} onChange={handleChangeAttribute}/></td>
                        <td>{RacialCharisma}</td>
                        <td>{CyberedCharisma}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td><input type='number' name="Intelligence" value={Intelligence} onChange={handleChangeAttribute}/></td>
                        <td>{RacialIntelligence}</td>
                        <td>{CyberedIntelligence}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Willpower</td>
                        <td><input type='number' name="Willpower" value={Willpower} onChange={handleChangeAttribute}/></td>
                        <td>{RacialWillpower}</td>
                        <td>{CyberedWillpower}</td>
                        <td></td>
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