import React, { useState, useRef } from 'react';
import './ConditionMonitor.css';

const ConditionMonitor = (props) => {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const Condition = useRef();
  const handleClick = (number, key) => {
    let reset = false;
    console.log("Number:"+number + ' Key:'+key);
    setSelectedCondition((prevCondition) => {
      if (prevCondition === number) {
        console.log("Resetting selected condition:"+reset);
        reset = true;
        return -1; // Unselect the condition if it was already selected
      } else {
        return number; // Select the condition if it was not previously selected
      }
    });
    props.onConditionSelect(number,props.type, reset, key);
  };

  const renderBoxes = () => {
    const boxes = ['L', '_', 'M', '_', '_', 'S', '_', '_', '_', 'D'];
    return boxes.map((box, index) => {
      const isSelected = selectedCondition !== -1 && index <= selectedCondition;

      return (
        <div
          key={index}
          data-number={index}
          onClick={() => handleClick(index, props.targetID)}
          style={{
            ...styles.rectangle,
            borderColor: isSelected ? 'black' : 'black',
            backgroundColor: isSelected ? 'cyan' : 'transparent',
          }}
        >
          <span>{box}</span>
        </div>
      );
    });
  };

  return (
    <div className="conditionMonitor">
      <div className="conditionBoxes">
        <span>{props.type}</span>
        {renderBoxes()}
      </div>
    </div>
  );
};

const styles = {
  rectangle: {
    width: '50px',
    height: '50px',
    border: 'solid 1px black',
    display: 'inline-block',
    margin: '1px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default ConditionMonitor;
