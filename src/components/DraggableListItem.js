import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import makeStyles from "@mui/styles/makeStyles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CachedIcon from "@mui/icons-material/Cached";
import { Box } from "@mui/material";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
});

const DraggableListItem = ({ item, index }) => {
  const classes = useStyles();
  return (
    <Box sx={{ background: "#ffffff", padding: "20px" }}>
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(provided, snapshot) => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={snapshot.isDragging ? classes.draggingListItem : ""}
          >
            <ListItemAvatar>
              <Avatar>
                <CachedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        )}
      </Draggable>
    </Box>
  );
};

export default DraggableListItem;
