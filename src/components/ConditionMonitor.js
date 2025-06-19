import React, { useState } from "react";
import "./ConditionMonitor.css";

const ConditionMonitor = (props) => {
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleClick = (number, key, selected) => {
    setSelectedCondition((prevCondition) => {
      if (prevCondition === number || selected === true) {
        return null; // Unselect the condition if it was already selected
      } else {
        return number; // Select the condition if it was not previously selected
      }
    });
  };

  const renderBoxes = () => {
    const boxes = ["L", "_", "M", "_", "_", "S", "_", "_", "_", "D"];

    return boxes.map((box, index) => {
      const isSelected =
        selectedCondition !== null && index <= selectedCondition;

      return (
        <div
          className="conditionBox"
          key={index}
          data-number={index}
          onClick={() => handleClick(index, props.targetID, isSelected)}
          style={{
            ...styles.rectangle,
            borderColor: isSelected ? "#00ffc3" : "#00ffc3",
            backgroundColor: isSelected ? "#1565c0" : "transparent",
            color: isSelected ? "#00ffc3" : "#00ffc3",
          }}
        >
          <span className="noselect">{box}</span>
        </div>
      );
    });
  };

  return (
    <div className="conditionMonitor">
      <div className="conditionBoxes">
        <span className="noselect" style={{"color":"#00ffc3"}}>{props.type}</span><br></br>
        {renderBoxes()}
      </div>
    </div>
  );
};

const styles = {
  rectangle: {
    width: "40px",
    height: "40px",
    border: "solid 1px black",
    display: "inline-block",
    margin: "1px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default ConditionMonitor;
