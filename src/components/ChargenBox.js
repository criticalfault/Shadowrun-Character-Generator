import * as React from 'react';

const style = {
  float: 'right',
  bgcolor: 'background.paper',
  border:'Solid 1px black',
  padding:'5px', 
  width:'250px', 
  borderRadius:'10px',
  marginTop: '-50px',
  marginRight: '10px'
};

export default function ChargenBox(props) {

  const skillReducer = function(accumulator, currentskill, index){
    const returns = accumulator + currentskill.rating;
    return returns;
  }
  return (
    <div style={style}>
        Edition: {props.Edition}<br></br>
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