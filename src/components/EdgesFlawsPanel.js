import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  ListItemSecondaryAction,
  Stack
} from "@mui/material";
import { 
  Add as AddIcon, 
  Remove as RemoveIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import "./EdgesFlawsPanel.css";

// Styled components
const BalanceChip = styled(Chip)(({ theme, balance }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: theme.spacing(1),
  '& .MuiChip-label': {
    padding: theme.spacing(0, 2),
  },
  ...(balance === 0 && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  }),
  ...(balance > 0 && {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.contrastText,
  }),
  ...(balance < 0 && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  }),
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function EdgesFlawsPanel({ currentCharacter, onUpdateEdgesFlaws }) {
  const [edges, setEdges] = useState([]);
  const [flaws, setFlaws] = useState([]);
  const [availableEdges, setAvailableEdges] = useState([]);
  const [availableFlaws, setAvailableFlaws] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState("");
  const [selectedFlaw, setSelectedFlaw] = useState("");
  const [edgePoints, setEdgePoints] = useState(0);
  const [flawPoints, setFlawPoints] = useState(0);
  const [balance, setBalance] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  // Load edges and flaws data
  useEffect(() => {
    const loadEdgesAndFlaws = async () => {
      try {
        // Try to fetch from public directory first
        const response = await fetch('/data/SR3/EdgesAndFlaws.json');
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded edges and flaws from public directory');
          setAvailableEdges(data.edges || []);
          setAvailableFlaws(data.flaws || []);
        } else {
          throw new Error('Failed to fetch from public directory');
        }
      } catch (error) {
        console.error('Error loading from public directory:', error);
        try {
          // Fallback to direct import
          const edgesAndFlawsData = await import('../../data/SR3/EdgesAndFlaws.json');
          console.log('Loaded edges and flaws from direct import');
          setAvailableEdges(edgesAndFlawsData.edges || []);
          setAvailableFlaws(edgesAndFlawsData.flaws || []);
        } catch (importError) {
          console.error('Error with direct import:', importError);
          
          // Hardcoded fallback data
          console.log('Using hardcoded fallback data');
          setAvailableEdges([
            {
              name: "Bonus Attribute Point(BOD)",
              category: "ATTRIBUTES",
              cost: 2,
              notes: "+1 to a physical attribute. Only once per character.",
              isEdge: true
            },
            {
              name: "Ambidexterity",
              category: "PHYSICAL",
              cost: 4,
              notes: "When firing two weapons, TN +1 for the first, TN +1 for the second weapon.",
              isEdge: true
            },
            {
              name: "Quick Healer",
              category: "PHYSICAL",
              cost: 2,
              notes: "TN -2 for healing tests.",
              isEdge: true
            }
          ]);
          
          setAvailableFlaws([
            {
              name: "Allergy (Common/Mild)",
              category: "PHYSICAL",
              cost: 1,
              notes: "TN +2 when exposed to allergen.",
              isEdge: false
            },
            {
              name: "Bad Luck",
              category: "MENTAL",
              cost: 4,
              notes: "Character has one less karma point per adventure.",
              isEdge: false
            },
            {
              name: "SINner",
              category: "SOCIAL",
              cost: 3,
              notes: "Character has a SIN (System Identification Number) and is in the system.",
              isEdge: false
            }
          ]);
        }
      }
    };
    
    loadEdgesAndFlaws();
    
    // Initialize with character's existing edges and flaws if any
    if (currentCharacter) {
      if (currentCharacter.edges && currentCharacter.edges.length > 0) {
        setEdges(currentCharacter.edges);
      }
      if (currentCharacter.flaws && currentCharacter.flaws.length > 0) {
        setFlaws(currentCharacter.flaws);
      }
    }
  }, [currentCharacter]);

  // Update balance whenever edges or flaws change
  useEffect(() => {
    let totalEdgePoints = edges.reduce((sum, edge) => sum + edge.cost, 0);
    let totalFlawPoints = flaws.reduce((sum, flaw) => sum + flaw.cost, 0);
    
    setEdgePoints(totalEdgePoints);
    setFlawPoints(totalFlawPoints);
    setBalance(totalFlawPoints - totalEdgePoints);
  }, [edges, flaws]);

  // Handle adding an edge
  const handleAddEdge = () => {
    if (!selectedEdge) return;
    
    const edgeToAdd = availableEdges.find(edge => edge.name === selectedEdge);
    if (edgeToAdd && flawPoints >= edgePoints + edgeToAdd.cost) {
      setEdges([...edges, edgeToAdd]);
      setSelectedEdge("");
      setSnackbar({
        open: true,
        message: `Added edge: ${edgeToAdd.name}`,
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: "Not enough flaw points to add this edge!",
        severity: 'error'
      });
    }
  };

  // Handle adding a flaw
  const handleAddFlaw = () => {
    if (!selectedFlaw) return;
    
    const flawToAdd = availableFlaws.find(flaw => flaw.name === selectedFlaw);
    if (flawToAdd) {
      setFlaws([...flaws, flawToAdd]);
      setSelectedFlaw("");
      setSnackbar({
        open: true,
        message: `Added flaw: ${flawToAdd.name}`,
        severity: 'success'
      });
    }
  };

  // Handle removing an edge
  const handleRemoveEdge = (index) => {
    const newEdges = [...edges];
    const removedEdge = newEdges[index];
    newEdges.splice(index, 1);
    setEdges(newEdges);
    
    // Update character data
    if (onUpdateEdgesFlaws) {
      onUpdateEdgesFlaws({
        edges: newEdges,
        flaws: flaws
      });
    }
    
    setSnackbar({
      open: true,
      message: `Removed edge: ${removedEdge.name}`,
      severity: 'info'
    });
  };

  // Handle removing a flaw
  const handleRemoveFlaw = (index) => {
    const newFlaws = [...flaws];
    const removedFlaw = newFlaws[index];
    newFlaws.splice(index, 1);
    
    // Check if removing this flaw would make edge points exceed flaw points
    const remainingFlawPoints = flawPoints - removedFlaw.cost;
    if (remainingFlawPoints < edgePoints) {
      setSnackbar({
        open: true,
        message: "You need to remove some edges first before removing this flaw!",
        severity: 'error'
      });
      return;
    }
    
    setFlaws(newFlaws);
    
    // Update character data
    if (onUpdateEdgesFlaws) {
      onUpdateEdgesFlaws({
        edges: edges,
        flaws: newFlaws
      });
    }
    
    setSnackbar({
      open: true,
      message: `Removed flaw: ${removedFlaw.name}`,
      severity: 'info'
    });
  };

  // Update character data when edges or flaws change
  useEffect(() => {
    if (onUpdateEdgesFlaws) {
      onUpdateEdgesFlaws({
        edges: edges,
        flaws: flaws
      });
    }
  }, [edges, flaws, onUpdateEdgesFlaws]);

  // Group edges by category for better organization
  const edgesByCategory = edges.reduce((acc, edge) => {
    if (!acc[edge.category]) {
      acc[edge.category] = [];
    }
    acc[edge.category].push(edge);
    return acc;
  }, {});

  // Group flaws by category for better organization
  const flawsByCategory = flaws.reduce((acc, flaw) => {
    if (!acc[flaw.category]) {
      acc[flaw.category] = [];
    }
    acc[flaw.category].push(flaw);
    return acc;
  }, {});

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }} className="edges-flaws-panel">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Edges & Flaws
      </Typography>
      
      <Grid container spacing={3}>
        {/* Balance display */}
        <Grid item xs={12}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)'
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <Chip 
                label={`Edge Points: ${edgePoints}`} 
                color="secondary" 
                variant="outlined"
                icon={<AddIcon />}
              />
              <Chip 
                label={`Flaw Points: ${flawPoints}`} 
                color="primary" 
                variant="outlined"
                icon={<RemoveIcon />}
              />
              <BalanceChip 
                label={`Balance: ${balance}`} 
                balance={balance}
                icon={balance === 0 ? <CheckCircleIcon /> : <InfoIcon />}
              />
            </Stack>
          </Paper>
        </Grid>
        
        {/* Flaws selection */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardHeader 
              title="Add Flaws" 
              titleTypographyProps={{ variant: 'h6', color: 'primary' }}
              sx={{ backgroundColor: 'primary.light', color: 'white' }}
            />
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Flaw</InputLabel>
                <Select
                  value={selectedFlaw}
                  onChange={(e) => setSelectedFlaw(e.target.value)}
                  label="Select Flaw"
                  startAdornment={<RemoveIcon color="primary" sx={{ mr: 1 }} />}
                >
                  {availableFlaws.map((flaw, index) => (
                    <MenuItem key={index} value={flaw.name}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>{flaw.name}</Typography>
                        <Chip 
                          label={`${flaw.cost} pts`} 
                          size="small" 
                          color="primary"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {flaw.category}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddFlaw}
                disabled={!selectedFlaw}
                fullWidth
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
              >
                Add Flaw
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: 'bold' }}>
                Selected Flaws
              </Typography>
              
              {Object.keys(flawsByCategory).length > 0 ? (
                Object.entries(flawsByCategory).map(([category, categoryFlaws]) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <CategoryHeader>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {category}
                      </Typography>
                      <Chip 
                        label={`${categoryFlaws.reduce((sum, flaw) => sum + flaw.cost, 0)} points`} 
                        size="small" 
                        color="primary"
                      />
                    </CategoryHeader>
                    <List dense>
                      {categoryFlaws.map((flaw, index) => {
                        const flawIndex = flaws.findIndex(f => f === flaw);
                        return (
                          <StyledListItem 
                            key={index}
                            secondaryAction={
                              <Tooltip title="Remove flaw">
                                <IconButton 
                                  edge="end" 
                                  color="error" 
                                  onClick={() => handleRemoveFlaw(flawIndex)}
                                  size="small"
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <ListItemText 
                              primary={
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Typography variant="body1">{flaw.name}</Typography>
                                  <Chip 
                                    label={`${flaw.cost} pts`} 
                                    size="small" 
                                    color="primary"
                                    variant="outlined"
                                  />
                                </Stack>
                              }
                              secondary={flaw.notes} 
                            />
                          </StyledListItem>
                        );
                      })}
                    </List>
                  </Box>
                ))
              ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No flaws selected. Add flaws to gain points for edges.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Edges selection */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardHeader 
              title="Add Edges" 
              titleTypographyProps={{ variant: 'h6', color: 'secondary' }}
              sx={{ backgroundColor: 'secondary.light', color: 'white' }}
            />
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Edge</InputLabel>
                <Select
                  value={selectedEdge}
                  onChange={(e) => setSelectedEdge(e.target.value)}
                  label="Select Edge"
                  disabled={flawPoints <= edgePoints}
                  startAdornment={<AddIcon color="secondary" sx={{ mr: 1 }} />}
                >
                  {availableEdges.map((edge, index) => (
                    <MenuItem key={index} value={edge.name}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>{edge.name}</Typography>
                        <Chip 
                          label={`${edge.cost} pts`} 
                          size="small" 
                          color="secondary"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {edge.category}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleAddEdge}
                disabled={!selectedEdge || flawPoints < edgePoints + (availableEdges.find(e => e.name === selectedEdge)?.cost || 0)}
                fullWidth
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
              >
                Add Edge
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: 'bold' }}>
                Selected Edges
              </Typography>
              
              {Object.keys(edgesByCategory).length > 0 ? (
                Object.entries(edgesByCategory).map(([category, categoryEdges]) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <CategoryHeader>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {category}
                      </Typography>
                      <Chip 
                        label={`${categoryEdges.reduce((sum, edge) => sum + edge.cost, 0)} points`} 
                        size="small" 
                        color="secondary"
                      />
                    </CategoryHeader>
                    <List dense>
                      {categoryEdges.map((edge, index) => {
                        const edgeIndex = edges.findIndex(e => e === edge);
                        return (
                          <StyledListItem 
                            key={index}
                            secondaryAction={
                              <Tooltip title="Remove edge">
                                <IconButton 
                                  edge="end" 
                                  color="error" 
                                  onClick={() => handleRemoveEdge(edgeIndex)}
                                  size="small"
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <ListItemText 
                              primary={
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Typography variant="body1">{edge.name}</Typography>
                                  <Chip 
                                    label={`${edge.cost} pts`} 
                                    size="small" 
                                    color="secondary"
                                    variant="outlined"
                                  />
                                </Stack>
                              }
                              secondary={edge.notes} 
                            />
                          </StyledListItem>
                        );
                      })}
                    </List>
                  </Box>
                ))
              ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No edges selected. You need flaw points to add edges.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}