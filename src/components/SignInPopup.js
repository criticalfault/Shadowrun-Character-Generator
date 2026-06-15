import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, onAuthStateChanged, db, doc, setDoc, getDoc } from "./firebase";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SignInPopup = (props) => {
  const [open, setOpen] = useState(false);
  const [character1, setCharacter1] = useState([]);
  const [character2, setCharacter2] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        props.setUser(currentUser);
        await loadCharacters(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      props.setUser(result.user);
      await loadCharacters(result.user.uid);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    props.setUser(null);
    setOpen(false);
  };

  async function loadCharacters(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().hasOwnProperty("character1")) {
        setCharacter1(JSON.parse(docSnap.data().character1));
      }
      if (docSnap.data().hasOwnProperty("character2")) {
        setCharacter2(JSON.parse(docSnap.data().character2));
      }
    }
  }

  async function saveCharacterCloud(characterID) {
    let Char = props.Character;
    Char.edition = props.Edition;
    let characterJSON = JSON.stringify(Char);
    try {
      if (characterID === 1) {
        await setDoc(doc(db, "users", props.user.uid), { character1: characterJSON });
        setCharacter1(props.Character);
      } else {
        await setDoc(doc(db, "users", props.user.uid), { character2: characterJSON });
        setCharacter2(props.Character);
      }
    } catch (error) {
      console.error("Error saving character data:", error);
    }
  }

  async function cloudLoad(characterID) {
    try {
      const docRef = doc(db, "users", props.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const rawJSON = characterID === 1
          ? docSnap.data().character1
          : docSnap.data().character2;
        const characterToLoad = JSON.parse(rawJSON);
        props.loadCharacter(characterToLoad);
        props.ChangeEdition(characterToLoad.edition);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error loading character data:", error);
    }
  }

  const slotLabel = (char) =>
    char?.street_name ? ` — ${char.street_name}` : " (empty)";

  if (!props.user) {
    return (
      <Button variant="contained" onClick={handleSignIn}>
        Cloud Save (Sign In)
      </Button>
    );
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Cloud Save
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <strong>Google Cloud Storage</strong>
          <p style={{ fontSize: "0.85em", marginTop: 4, marginBottom: 12 }}>
            Signed in as {props.user.displayName}. Limited to 2 cloud slots.
          </p>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <strong>Save Character</strong>
              <hr />
              <Button fullWidth variant="outlined" sx={{ mb: 1 }}
                onClick={() => saveCharacterCloud(1)}>
                Save to Slot 1{slotLabel(character1)}
              </Button>
              <Button fullWidth variant="outlined"
                onClick={() => saveCharacterCloud(2)}>
                Save to Slot 2{slotLabel(character2)}
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <strong>Load Character</strong>
              <hr />
              <Button fullWidth variant="outlined" sx={{ mb: 1 }}
                onClick={() => cloudLoad(1)}
                disabled={!character1?.street_name}>
                Load Slot 1{slotLabel(character1)}
              </Button>
              <Button fullWidth variant="outlined"
                onClick={() => cloudLoad(2)}
                disabled={!character2?.street_name}>
                Load Slot 2{slotLabel(character2)}
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button size="small" color="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button size="small" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignInPopup;
