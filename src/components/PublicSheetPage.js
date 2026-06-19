import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicCharacter } from "./firebase";
import SheetDisplay from "./SheetDisplay";
import { CircularProgress, Typography, Box } from "@mui/material";
import "./SheetDisplay.css";

export default function PublicSheetPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicCharacter(id).then((char) => {
      if (!char) {
        setNotFound(true);
      } else {
        setCharacter(char);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Character not found.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          This link may be invalid or the character may have been removed.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="caption" sx={{ display: "block", mb: 1, color: "text.secondary" }}>
        Shared character sheet — read only
      </Typography>
      <SheetDisplay
        currentCharacter={character}
        magicalChoice={character.magical_tradition ?? character.magicalTradition ?? ""}
        readOnly={true}
      />
    </Box>
  );
}
