import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, onAuthStateChanged, db, doc, setDoc, getDoc } from "./firebase";
import Button from "@mui/material/Button";
import { Grid,Box } from "@mui/material";
const SignInPopup = (props,{ onSignIn }) => {
    const style = {
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        margin:"10px",
        p: 4,
      };
    const [character1, setCharacter1] = useState([]);
    const [character2, setCharacter2] = useState([]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            props.setUser(currentUser);
            const loadedCharacters = await loadCharacters(currentUser.uid);
            // if (loadedCharacters) {
            //   setCharacters(loadedCharacters);
            // }
          }
        });
    
        return () => unsubscribe();
      }, []);

    const handleSignIn = async () => {
       
        try {
            const result = await signInWithPopup(auth, provider);
            props.setUser(result.user);
            //onSignIn(result.user);
            console.log(result.user);
            const loadedCharacters = await loadCharacters(result.user.uid);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    async function loadCharacters(userId){
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if(docSnap.data().hasOwnProperty('character1')){
                setCharacter1(JSON.parse(docSnap.data().character1));
            }else if(docSnap.data().hasOwnProperty('character2')){
                setCharacter2(JSON.parse(docSnap.data().character2));
            }
        }
    }

    async function saveCharacterCloud(characterID) {
        
        let Char = props.Character;
        Char.edition = props.Edition;
        let characterJSON = JSON.stringify(Char);     
        
        try {
          if(characterID == 1){
            await setDoc(doc(db, "users", props.user.uid), { character1: characterJSON });
          }else{
            await setDoc(doc(db, "users", props.user.uid), { character2: characterJSON });
          }
          
          console.log("Character data saved!");
        } catch (error) {
          console.error("Error saving character data:", error);
        }
    }

    async function cloudLoad(characterID) {
        try {
          const docRef = doc(db, "users", props.user.uid);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            console.log("Character data:", docSnap.data());
            var characterToLoad = {};
            console.log("CharacterID: "+characterID);
            if(characterID == 1){
                let rawCharacterJSON = docSnap.data().character1;
                characterToLoad = JSON.parse(rawCharacterJSON);
            }else{
                let rawCharacterJSON = docSnap.data().character2;
                characterToLoad = JSON.parse(rawCharacterJSON);
            }
            props.loadCharacter(characterToLoad);
            props.ChangeEdition(characterToLoad.edition);
            
          } else {
            console.log("No character data found!");
            return null;
          }
        } catch (error) {
          console.error("Error loading character data:", error);
        }
      }

      const getSaveDescription = (saveSlot) => {

        if(saveSlot == 1){
            return (
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  - {character1.street_name}
                </span>
              );
        }else{
            return (
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  - {character2.street_name}
                </span>
              );
        }
         
      };

  return (
    <div>
      {props.user ? (
        
            
            <Box sx={style}>
                <p>Welcome, {props.user.displayName}!</p>
                <p>This uses Cloud Storage, which can be accessed anywhere, but its not free, so it's limited to 2 characters for the moment.</p>
                      <Grid container spacing={2}>
                        <Grid item size={12}>
                          
                        </Grid>
                        <Grid item size={{ xs: 12, md: 6 }}>
                          Save Character
                          <hr></hr>
                          <Button
                            onClick={function (event) {
                                saveCharacterCloud(1);
                            }}
                          >
                            Save 1{" "}
                          </Button>
                          <br></br>
                          <Button
                            onClick={function (event) {
                                saveCharacterCloud(2);
                            }}
                          >
                            Save 2{" "}
                          </Button>
                         
                        </Grid>
                        <Grid item size={{ xs: 12, md: 6 }}>
                          Load Character
                          <hr></hr>
                          <Button
                            onClick={function (event) {
                              cloudLoad(1);
                            }}
                          >
                            Load {getSaveDescription(1)}
                          </Button>
                          <br></br>
                          <Button
                            onClick={function (event) {
                                cloudLoad(2);
                            }}
                          >
                            Load {getSaveDescription(2)}
                          </Button>
                          <br></br>
                        </Grid>
                      </Grid>
                    </Box>
      ) : (
            <Button 
            onClick={handleSignIn}
            variant="contained"
            color="primary"
            style={{ marginTop: "30px" }}>
            Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default SignInPopup;