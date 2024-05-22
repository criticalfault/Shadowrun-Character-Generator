import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
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
