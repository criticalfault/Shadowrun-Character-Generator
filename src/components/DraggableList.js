import React, {useState, useEffect} from "react";
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable
} from 'react-beautiful-dnd';


const DraggableList = React.memo(({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem item={item} index={index} key={item.id} isDragDisabled={item.locked === true} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;