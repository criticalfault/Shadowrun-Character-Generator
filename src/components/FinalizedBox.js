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

export default function finalizedBox(props) {

  return (
    <div style={style}>
        Edition: {props.Edition}<br></br>
        Karma: {props.currentCharacter.karma-props.currentCharacter.karmaSpent}/{props.currentCharacter.karma}<br></br>
        Karma Pool: {props.currentCharacter.karmaPool}<br></br>
        Nuyen: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(props.currentCharacter.cash)}<br></br>
        Character Stage: {props.currentCharacter.step}
    </div>
  );
}