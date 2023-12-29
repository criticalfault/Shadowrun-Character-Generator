import { useState } from "react";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CasinoIcon from '@mui/icons-material/Casino';
import TextField from '@mui/material/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
export default function DiceRoller() {

    const [showDiceRoller, setShowDiceRoller] = useState(false);
    const [asyncPassword, setasyncPassword] = useState(false);
    const APPSYNC_HOST = "c6uwmanv3jcifoxpl5cgkvbei4.appsync-api.us-east-1.amazonaws.com";
    const APPSYNC_REALTIME_HOST = "c6uwmanv3jcifoxpl5cgkvbei4.appsync-realtime-api.us-east-1.amazonaws.com";
    const APPSYNC_API_KEY = "da2-umxlkuc4orgyzgaiplao4fvwey";
    const [recievedRolls, setRecievedRolls] = useState([]);
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
        height: '30vh'
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0'
      },
      messageArea: {
        height: '30vh',
        overflowY: 'auto'
      }
    });
    const classes = useStyles();    


    function uuidv4() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
    

    function showDiceRollerRender(){
      if(showDiceRoller){
        
        function encodeAppSyncCredentials() {
          const creds = {
            host: APPSYNC_HOST,
            "x-api-key": APPSYNC_API_KEY,
          };
          const b64Creds = window.btoa(JSON.stringify(creds));
  
          return b64Creds;
        }
      
        function getWebsocketUrl() {
            const header = encodeAppSyncCredentials(APPSYNC_HOST, APPSYNC_API_KEY);
            const payload = window.btoa(JSON.stringify({}));
    
            const url = `wss://${APPSYNC_REALTIME_HOST}/graphql?header=${header}&payload=${payload}`;
    
            return url;
        }

        function sendDiceRoll() {
          const DiceRoll = {
            id: window.crypto.randomUUID(),
            type: "start",
            payload: {
              data: JSON.stringify({
                query: `mutation MyMutation {
                  sendMessage(msg: "18f460ce-1cf7-461a-9c7b-38bc2d2a74a9|Dean|1,4,6,7,8,9,67,78,") {
                    message
                  }
                }`,
              }),
              extensions: {
                authorization: {
                  "x-api-key": APPSYNC_API_KEY,
                  host: APPSYNC_HOST,
                },
              },
            },
          };
          websocket.send(JSON.stringify(DiceRoll));
        }
      
        function startSubscription(websocket) {
          if(window.HasDiceSubscription === true){
            return;
          }
          setasyncPassword(uuidv4());
          const subscribeMessage = {
            id: window.crypto.randomUUID(),
            type: "start",
            payload: {
              data: JSON.stringify({
                query: `subscription GetMessagesSub {
                          subscribeToMessages {
                              message
                              from
                              room
                          }
                      }`,
              }),
              extensions: {
                authorization: {
                  "x-api-key": APPSYNC_API_KEY,
                  host: APPSYNC_HOST,
                },
              },
            },
          };
          websocket.send(JSON.stringify(subscribeMessage));
          window.HasDiceSubscription = true;
        }
      
        function handleMessage(message) {

          console.log(message.payload.data.subscribeToMessages.room+" !== "+asyncPassword);
          if(message.payload.data.subscribeToMessages.room !== asyncPassword){
            return;
          }
          let msgToSave = message.payload.data.subscribeToMessages
          let RollObject = {"id":"","room":'',"rollerName":"","diceRolls":""}
          RollObject.id = message.id;
          RollObject.room = msgToSave.room;
          RollObject.rollerName = msgToSave.from;
          RollObject.diceRolls = msgToSave.message;
          setRecievedRolls((prevRolls) => ([
            ...prevRolls,
            RollObject
          ]))
        }
      
        const url = getWebsocketUrl();
        const websocket = new WebSocket(url, ["graphql-ws"]);
      
        websocket.addEventListener("open", () => {
          websocket.send(
            JSON.stringify({
              type: "connection_init",
            })
          );
        });
      
        websocket.addEventListener("message", (event) => {

          let message = JSON.parse(event.data);
          console.log(message);
      
          switch (message.type) {
              case "connection_ack":
                  startSubscription(websocket);
              break;
              // case "start_ack":
              //     console.log("start_ack");
              // break;
              case "error":
                  console.error(message);
              break;
              case "data":
                  handleMessage(message);
              break;
              default:
              break;
          }
        });
        return (<>
              <Grid container style={{'border':'solid black 1px','borderRadius':'5px'}}>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Realtime Dice Roller</Typography>
                </Grid>
                <div>
                    <TextField
                        id="outlined-required"
                        label="Room Password"
                        defaultValue="Hello World"
                        value={asyncPassword} 
                        onChange={(event) => {setasyncPassword(event.target.value)}}
                        style={{width:"330px"}}
                      />
                </div>
                <Grid container component={Paper} className={classes.chatSection}>
                  <List className={classes.messageArea}>
                  {recievedRolls.map(function(roll){
                    return(
                      <div key={roll.id} >
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <CasinoIcon></CasinoIcon>
                        </ListItemIcon>
                      <ListItemText
                        primary={roll.rollerName}
                        secondary={
                          <React.Fragment>
                            {roll.diceRolls}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </div>
                    )
                  })}
                  
                  </List>
              </Grid>
              <button onClick={sendDiceRoll}>Send Dice!</button>
            </Grid>
        </>
        )
      }else{
        return ( <div><button onClick={() => {setShowDiceRoller(true)}}>Connect to Dice Roll Share?</button></div>)
      }
    }
    

  return (
    <div className="container p-52">
       {showDiceRollerRender()}
    </div>
    )
}