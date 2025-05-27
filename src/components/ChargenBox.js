import * as React from 'react';
import './ChargenBox.css';
export default function ChargenBox(props) {

  const skillReducer = function(accumulator, currentskill, index){
    const returns = accumulator + currentskill.rating;
    return returns;
  }

  const showPointsRemaining = () => {
    let style = {"color":"green"};
    if(props.currentCharacter.cgmethod === 'pointbuy'){
      if(props.currentCharacter.pointsRemaining < 0){
        style = {"color":"red"}
      }
      return (<span>Points Remaining: <span style={style}>{props.currentCharacter.pointsRemaining}</span><br></br></span>)
    }else{
      return "";
    }
  }

  return (
    <div id='chargenBoxMain'>
        Edition: {props.Edition}<br></br>
        {showPointsRemaining()}
        Attributes: {parseInt(props.currentCharacter.attributes.Body)+parseInt(props.currentCharacter.attributes.Quickness)+parseInt(props.currentCharacter.attributes.Strength)+
                    parseInt(props.currentCharacter.attributes.Charisma)+parseInt(props.currentCharacter.attributes.Willpower)+parseInt(props.currentCharacter.attributes.Intelligence)}
                    /
                    {parseInt(props.currentCharacter.maxAttributePoints)}<br></br>
        Skills: {props.currentCharacter.skills.filter(skill => skill.type === 'Active').reduce(skillReducer,0)}/{props.currentCharacter.maxSkillPoints}<br></br>
        Nuyen: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(props.NuyenSpent)}/{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(props.currentCharacter.chargenCash)}<br></br>
        Character Stage: {props.currentCharacter.step}
    </div>
  );
}