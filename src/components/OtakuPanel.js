import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SearchableSelect from "./SearchableSelect";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const allComplexForms = import.meta.glob('../data/*/ComplexForms.json', { eager: true });

export default function OtakuPanel(props) {
  const edition = props.Edition ?? 'SR2';
  const rawPrograms = allComplexForms[`../data/${edition}/ComplexForms.json`]?.default ?? [];
  const [openModal, setOpenModal] = React.useState(false);
  const [NewComplexForm, setNewComplexForm] = useState(0);
  const [NewComplexFormIndex, setNewComplexFormIndex] = useState(0);

  // Sprite state
  const sprites = props.sprites ?? [];
  const [spriteModalOpen, setSpriteModalOpen] = useState(false);
  const [editingSpriteIndex, setEditingSpriteIndex] = useState(null);
  const [spriteForm, setSpriteForm] = useState({ Name: '', CoreRating: 1, Bod: 1, Evasion: 1, Masking: 1, Sensor: 1, Pilot: 1, ExtraInitDice: 0, CFPayload: 0, ComplexForms: [] });
  const [spriteCFIndex, setSpriteCFIndex] = useState(0);
  const [spriteCFValue, setSpriteCFValue] = useState(0);
  const [spriteCFModalOpen, setSpriteCFModalOpen] = useState(false);

  const getCompSkillRating = () => {
    const s = (props.currentCharacter.skills ?? []).find(
      (s) => s.name === 'Computer' || s.name === 'Computer (Programming)'
    );
    return s?.rating ?? 10;
  };

  const spritePersonaPointsLeft = (sf) => {
    const core = parseInt(sf.CoreRating) || 1;
    const used = parseInt(sf.Bod) + parseInt(sf.Evasion) + parseInt(sf.Masking) + parseInt(sf.Sensor);
    return core * 3 - used;
  };

  const spriteFramePointsLeft = (sf) => {
    const core = parseInt(sf.CoreRating) || 1;
    const pilotCost = (parseInt(sf.Pilot) || 1) * 2;
    const initCost = (parseInt(sf.ExtraInitDice) || 0) * 3;
    const payloadCost = parseInt(sf.CFPayload) || 0;
    return core * 4 - pilotCost - initCost - payloadCost;
  };

  const openNewSpriteModal = () => {
    setEditingSpriteIndex(null);
    setSpriteForm({ Name: '', CoreRating: 1, Bod: 1, Evasion: 1, Masking: 1, Sensor: 1, Pilot: 1, ExtraInitDice: 0, CFPayload: 0, ComplexForms: [] });
    setSpriteModalOpen(true);
  };

  const openEditSpriteModal = (index) => {
    setEditingSpriteIndex(index);
    setSpriteForm({ ...sprites[index] });
    setSpriteModalOpen(true);
  };

  const saveSpriteModal = () => {
    if (editingSpriteIndex !== null) {
      props.onChangeSprites(sprites.map((s, i) => i === editingSpriteIndex ? { ...spriteForm } : s));
    } else {
      props.onChangeSprites([...sprites, { ...spriteForm }]);
    }
    setSpriteModalOpen(false);
  };

  const removeSprite = (index) => {
    props.onChangeSprites(sprites.filter((_, i) => i !== index));
  };

  const handleSpriteCFChange = (event) => {
    setSpriteCFValue(rawPrograms[event.target.value]);
    setSpriteCFIndex(event.target.value);
  };

  const addSpriteCF = () => {
    const cf = { Name: spriteCFValue.Name, Multiplyer: spriteCFValue.Multiplyer, Rating: 1 };
    setSpriteForm((prev) => ({ ...prev, ComplexForms: [...prev.ComplexForms, cf] }));
    setSpriteCFModalOpen(false);
  };

  const removeSpriteCF = (cfIndex) => {
    setSpriteForm((prev) => ({ ...prev, ComplexForms: prev.ComplexForms.filter((_, i) => i !== cfIndex) }));
  };

  const handleSpriteCFRating = (cfIndex, value) => {
    const r = parseInt(value) || 1;
    setSpriteForm((prev) => ({
      ...prev,
      ComplexForms: prev.ComplexForms.map((cf, i) => i === cfIndex ? { ...cf, Rating: r } : cf),
    }));
  };

  const spritePayloadUsed = (sf) => sf.ComplexForms.reduce((sum, cf) => sum + (parseInt(cf.Rating) || 1), 0);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Sum base + race + cyber bonus for a single attribute
  const raceBonuses = props.currentCharacter.raceBonuses ?? {};
  const cyberAttributeBonuses = props.currentCharacter.cyberAttributeBonuses ?? {};
  const attr = (name) =>
    parseInt(props.currentCharacter.attributes[name] ?? 0) +
    parseInt(raceBonuses[name] ?? 0) +
    parseInt(cyberAttributeBonuses[name] ?? 0);

  const WIL = attr('Willpower');
  const INT = attr('Intelligence');
  const CHA = attr('Charisma');

  const MPCP = Math.ceil((INT + WIL + CHA) / 3);
  const hackingPool = Math.floor((MPCP + INT) / 3);
  const Masking = Math.ceil((WIL + CHA) / 2);
  // DF = ceil((Masking + 0) / 2) + 1 — otaku have no Sleaze utility; +1 otaku bonus (p.137)
  const detectionFactor = Math.ceil(Masking / 2) + 1;

  const CHANNEL_SKILL_NAMES = ['Access', 'Control', 'Index', 'Files', 'Slave'];
  const getChannelSkills = () => {
    const skills = props.currentCharacter.skills ?? [];
    return CHANNEL_SKILL_NAMES.map(name => {
      const found = skills.find(s => s.name === name);
      return { name, rating: found?.rating ?? 0 };
    });
  };

  const characterAge = parseInt(props.currentCharacter.age) || 0;
  const submersionGradeVal = parseInt(props.submersionGrade) || 0;

  const OtakuPathInfo = {
    'Cyber Adept': "Complex forms are treated as 1 rating higher when used (does not affect size)",
    'Technoshaman': "Reduce all target numbers by 1 when using Channel skills",
  }

  const handleCloseModal = () => setOpenModal(false);
  const addComplexForm = () => {
    const ComplexForm = {
      Name: NewComplexForm.Name,
      Multiplyer: NewComplexForm.Multiplyer,
      Rating: 1,
      Size: NewComplexForm.Multiplyer,
    };
    setOpenModal(false);
    props.onChangeComplexForm([...props.complexForms, ComplexForm]);
  };

  const removeComplexForm = (event, index) => {
    const updated = [...props.complexForms];
    updated.splice(index, 1);
    props.onChangeComplexForm(updated);
  };

  const handleComplexFormChange = (event) => {
    const TempProgram = rawPrograms[event.target.value];
    setNewComplexForm(TempProgram);
    setNewComplexFormIndex(event.target.value);
  };

  const handleCFRatingChange = (event, index) => {
    const newRating = parseInt(event.target.value);
    const updated = props.complexForms.map((cf, i) => {
      if (i !== index) return cf;
      return { ...cf, Rating: newRating, Size: newRating * newRating * cf.Multiplyer };
    });
    props.onChangeComplexForm(updated);
  };

  // Book (Matrix p.137): free complex forms = Computer(Programming) skill × 50 Mp
  const getFreeComplexFormMp = () => {
    const compSkill = (props.currentCharacter.skills ?? []).find(
      (s) => s.name === "Computer" || s.name === "Computer (Programming)"
    );
    const rating = compSkill?.rating ?? 0;
    return rating * 50;
  };

  const handlePathChange = (event) => {
    props.onChangeOtakuPath(event.target.value);
  };

  // ── Submersion ────────────────────────────────────────────────
  const [submersionGrade, setSubmersionGrade] = useState(props.submersionGrade ?? 0);
  const [submersions, setSubmersions] = useState(props.submersions ?? []);
  const [pendingEcho, setPendingEcho] = useState('');
  const blankTribe = { name: '', resources: 'Squatter', resonanceWell: '' };
  const [otakuTribe, setOtakuTribe] = useState(props.otakuTribe ?? null);
  const [editingTribe, setEditingTribe] = useState(false);
  const [tribeDraft, setTribeDraft] = useState(props.otakuTribe ?? blankTribe);

  const ECHOES_INCREMENTAL = [
    'Improved I/O Speed',
    'Improved Hardening',
    'Improved MPCP',
    'Improved Persona (Bod)',
    'Improved Persona (Evasion)',
    'Improved Persona (Masking)',
    'Improved Persona (Sensor)',
    'Improved Reaction',
  ];
  const ECHOES_STATIC = [
    'Daemon Summoning',
    'Ghosting',
    'Info Sortilage',
    'Neurofilter',
    'Overclock',
    'Resonance Link',
    'Switch',
    'Traceroute',
  ];

  const calcSubmersionCost = (grade) => (grade * 2) + 10;

  const handleSubmerge = () => {
    if (!pendingEcho) return;
    const nextGrade = submersionGrade + 1;
    const cost = calcSubmersionCost(nextGrade);
    const newEntry = { grade: nextGrade, echoName: pendingEcho };
    const newGrade = nextGrade;
    const newSubmersions = [...submersions, newEntry];
    setSubmersionGrade(newGrade);
    setSubmersions(newSubmersions);
    setPendingEcho('');
    props.onSpendKarma?.(cost);
    props.onChangeSubmersions?.(newGrade, newSubmersions);
  };

  const handleRemoveLastSubmersion = () => {
    if (submersions.length === 0) return;
    const last = submersions[submersions.length - 1];
    const cost = calcSubmersionCost(last.grade);
    const newGrade = submersionGrade - 1;
    const newSubmersions = submersions.slice(0, -1);
    setSubmersionGrade(newGrade);
    setSubmersions(newSubmersions);
    props.onSpendKarma?.(-cost);
    props.onChangeSubmersions?.(newGrade, newSubmersions);
  };

  const saveTribe = () => {
    setOtakuTribe(tribeDraft);
    setEditingTribe(false);
    props.onChangeOtakuTribe?.(tribeDraft);
  };

  const removeTribe = () => {
    setOtakuTribe(null);
    props.onChangeOtakuTribe?.(null);
  };

  const RenderSubmersionSection = () => {
    const nextGrade = submersionGrade + 1;
    const cost = calcSubmersionCost(nextGrade);
    const learnedStatic = submersions
      .map(s => s.echoName)
      .filter(n => ECHOES_STATIC.includes(n) && n !== 'Resonance Link');
    const availableEchoes = [
      ...ECHOES_INCREMENTAL,
      ...ECHOES_STATIC.filter(e => !learnedStatic.includes(e)),
    ];

    return (
      <>
        <hr />
        <h3>Submersion</h3>

        <Box sx={{ mb: 2 }}>
          <strong>Grade:</strong> {submersionGrade}&nbsp;&nbsp;
          <strong>Hacking Pool bonus:</strong> +{submersionGrade} dice
          <div style={{ fontSize: '0.85em', color: '#888', marginTop: 4 }}>
            Cost formula: (grade × 2) + 10 Karma — requires access to a resonance well
          </div>
        </Box>

        {submersions.length > 0 && (
          <TableContainer component={Paper} sx={{ mb: 2, maxWidth: 500 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Grade</TableCell>
                  <TableCell>Echo Gained</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submersions.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>{row.echoName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ border: '1px solid #444', borderRadius: 1, p: 2, maxWidth: 480, mb: 2 }}>
          <strong>Next Submersion — Grade {nextGrade}</strong>
          <Box sx={{ mt: 1, mb: 1 }}>
            <strong>Karma cost: {cost}</strong>
          </Box>
          <Box sx={{ mt: 1 }}>
            <strong>Echo to learn:</strong>{' '}
            <FormControl size="small" style={{ minWidth: 240, marginLeft: 8 }}>
              <InputLabel>Echo</InputLabel>
              <Select value={pendingEcho} onChange={e => setPendingEcho(e.target.value)} label="Echo">
                {availableEchoes.map(e => (
                  <MenuItem key={e} value={e}>{e}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmerge} disabled={!pendingEcho}>
              Spend {cost} Karma &amp; Submerge to Grade {nextGrade}
            </Button>
            {submersions.length > 0 && (
              <Button color="secondary" sx={{ ml: 2 }} onClick={handleRemoveLastSubmersion}>
                Undo Last Submersion
              </Button>
            )}
          </Box>
        </Box>

        <h3>Tribe</h3>
        {!otakuTribe && !editingTribe && (
          <Button variant="outlined" onClick={() => { setTribeDraft(blankTribe); setEditingTribe(true); }}>
            Register Tribe
          </Button>
        )}
        {otakuTribe && !editingTribe && (
          <Box sx={{ border: '1px solid #666', borderRadius: 1, p: 2, maxWidth: 480 }}>
            <strong>{otakuTribe.name}</strong>
            <Box sx={{ fontSize: '0.85em', mt: 0.5 }}>
              <div>Resources: {otakuTribe.resources}</div>
              {otakuTribe.resonanceWell && <div>Resonance Well: {otakuTribe.resonanceWell}</div>}
              <div style={{ color: '#888', fontSize: '0.9em', marginTop: 4 }}>
                Tribe members live at one resource level below tribe resources.
              </div>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button size="small" onClick={() => { setTribeDraft({ ...otakuTribe }); setEditingTribe(true); }}>
                Edit
              </Button>
              <Button size="small" color="secondary" sx={{ ml: 1 }} onClick={removeTribe}>
                Leave Tribe
              </Button>
            </Box>
          </Box>
        )}
        {editingTribe && (
          <Box sx={{ border: '1px solid #666', borderRadius: 1, p: 2, maxWidth: 480 }}>
            <TextField size="small" fullWidth label="Tribe Name" value={tribeDraft.name}
              onChange={e => setTribeDraft({ ...tribeDraft, name: e.target.value })}
              sx={{ mb: 1 }} />
            <FormControl size="small" fullWidth sx={{ mb: 1 }}>
              <InputLabel>Resources</InputLabel>
              <Select value={tribeDraft.resources} label="Resources"
                onChange={e => setTribeDraft({ ...tribeDraft, resources: e.target.value })}>
                {['Squatter', 'Low', 'Middle', 'High', 'Luxury'].map(r => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField size="small" fullWidth label="Resonance Well location (optional)" value={tribeDraft.resonanceWell}
              onChange={e => setTribeDraft({ ...tribeDraft, resonanceWell: e.target.value })}
              sx={{ mb: 1 }} />
            <Box>
              <Button variant="contained" size="small" onClick={saveTribe}
                disabled={!tribeDraft.name.trim()}>Save Tribe</Button>
              <Button size="small" sx={{ ml: 1 }} onClick={() => setEditingTribe(false)}>Cancel</Button>
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <div>
      <h2>Otaku Living Persona</h2>
      <Box className="cyberdeckCard">
        <Grid container spacing={2}>
          <Grid size={{ xs: 3}} className="cyberDeckTable">
            <table className="">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MPCP</td>
                  <td>{MPCP}</td>
                </tr>
                <tr>
                  <td>Bod</td>
                  <td>{WIL}</td>
                </tr>
                <tr>
                  <td>Sensor</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Masking</td>
                  <td>{Math.ceil((WIL + CHA) / 2)}</td>
                </tr>
                <tr>
                  <td>Evasion</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Hardening</td>
                  <td>{Math.ceil(WIL / 2)}</td>
                </tr>
                <tr>
                  <td>Matrix Reaction</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Matrix Initiative</td>
                  <td>{INT} + 4D6</td>
                </tr>
                <tr>
                  <td>I/O Speed</td>
                  <td>{INT * 100} Mp</td>
                </tr>
                <tr>
                  <td>Hacking Pool</td>
                  <td>{hackingPool}</td>
                </tr>
                <tr title="ceil(Masking ÷ 2) + 1 otaku bonus (Matrix p.137)">
                  <td>Detection Factor</td>
                  <td>{detectionFactor}</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td title="Complex forms require no active memory">N/A</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td title="Uses external headware memory for file transfers">External</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid size={{ xs: 9}} className="">
            <h3>Otaku Special Rules</h3>
            <div>
              <FormControl style={{ width: "200px" }}>
                <Select
                  id="TraditionList-dropdown"
                  value={props.currentCharacter.otakuPath}
                  onChange={handlePathChange}
                >
                  {Object.keys(OtakuPathInfo).map((path, index) => (
                    <MenuItem key={index} value={path}>
                      {path}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <br></br>
            <div><strong>Otaku Path:</strong> <em>{props.currentCharacter.otakuPath}</em>: {OtakuPathInfo[props.currentCharacter.otakuPath]} </div>
            <div><strong>Hacking Pool:</strong> {hackingPool}</div>
            <div><strong>Starting Channel Points:</strong> {MPCP} (= MPCP; distribute among 5 channels)</div>
            <div><strong>Free Complex Forms (char gen):</strong> {getFreeComplexFormMp()} Mp (Computer(Programming) × 50)</div>
            <h3>Complex Forms</h3>
            <div>
               <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                  <SearchableSelect
                    items={rawPrograms}
                    value={NewComplexFormIndex}
                    onChange={handleComplexFormChange}
                    label="Complex Form"
                    getLabel={(prog) => prog.Name}
                    style={{ width: "300px" }}
                  />
                  <Button variant="contained" color="primary" onClick={addComplexForm}>
                    Add Complex Form
                  </Button>
                </Box>
              </Modal>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal()}>
                Add Complex Form
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Multiplyer</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={0}>
                      <TableCell>Armor</TableCell>
                      <TableCell>{WIL}</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>{WIL * WIL * 3}</TableCell>
                      <TableCell>Free</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  {props.complexForms.map((cForm, index) => (
                    <TableRow key={index}>
                      <TableCell>{cForm.Name}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          data-index={index}
                          value={cForm.Rating}
                          min={1}
                          max={12}
                          onChange={(event) =>
                            handleCFRatingChange(
                              event,
                              index
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{cForm.Multiplyer}</TableCell>
                      <TableCell>{cForm.Size}</TableCell>
                      <TableCell>{cForm.Rating} Karma</TableCell>
                      <TableCell>
                        <button
                          edge="end"
                          aria-label="delete"
                          onClick={(event) =>
                            removeComplexForm(event, index)
                          }
                        >
                          <DeleteIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
           <p style={{ fontSize: '0.85em', color: '#888', margin: '-8px 0 8px' }}>
             Creating a complex form costs 1 Good Karma Point (Matrix p.139). Size = Rating² × Multiplier.
           </p>
           <h3>Channel Skills</h3>
           <p style={{ fontSize: '0.85em', opacity: 0.7, marginBottom: 6 }}>
             Starting channel points = MPCP ({MPCP}). Distribute among the 5 channels. Add skills via the Skills tab.
           </p>
           <table style={{ marginBottom: 12 }}>
             <thead><tr><th style={{ paddingRight: 16 }}>Channel</th><th>Rating</th></tr></thead>
             <tbody>
               {getChannelSkills().map(({ name, rating }) => (
                 <tr key={name}>
                   <td style={{ paddingRight: 16 }}>{name}</td>
                   <td style={{ color: rating === 0 ? '#aaa' : 'inherit' }}>{rating === 0 ? '—' : rating}</td>
                 </tr>
               ))}
             </tbody>
           </table>
           {characterAge >= 21 && (
             <Box sx={{ mb: 2, p: 1.5, border: '1px solid #f57c00', borderRadius: 1, bgcolor: '#fff3e0' }}>
               <strong>Fading Test Reminder</strong> (Matrix p.146)<br />
               <span style={{ fontSize: '0.85em' }}>
                 Age {characterAge} ≥ 21 — roll {submersionGradeVal + 1} dice vs TN {5 + (characterAge - 21)} annually.<br />
                 Failure: lose 1 Computer (Programming) skill point.
               </span>
             </Box>
           )}
           <h3>Sprites</h3>
           <p style={{ fontSize: '0.85em', opacity: 0.7 }}>
             Frame core is a complex form (×5). Persona Points = core×3 (Bod/Evasion/Masking/Sensor, each ≤ core).
             Frame Points = core×4 (Pilot costs 2 FP/pt; extra init dice cost 3 FP/die max 3; CF payload costs 1 FP/pt).
             Karma cost = core rating.
           </p>
           <Button variant="contained" color="primary" style={{ marginBottom: 12 }} onClick={openNewSpriteModal}>
             Add Sprite
           </Button>

           {sprites.map((sprite, si) => {
             const core = parseInt(sprite.CoreRating) || 1;
             const payloadUsed = spritePayloadUsed(sprite);
             return (
               <Box key={si} className="cyberdeckCard" sx={{ mb: 2 }}>
                 <h4>{sprite.Name || 'Unnamed Sprite'} <span style={{ fontSize: '0.7em', opacity: 0.7 }}>(Core {core})</span></h4>
                 <Grid container spacing={2}>
                   <Grid size={{ xs: 4 }} className="cyberDeckTable">
                     <table>
                       <thead><tr><th>Attribute</th><th>Value</th></tr></thead>
                       <tbody>
                         <tr><td>Bod</td><td>{sprite.Bod}</td></tr>
                         <tr><td>Evasion</td><td>{sprite.Evasion}</td></tr>
                         <tr><td>Masking</td><td>{sprite.Masking}</td></tr>
                         <tr><td>Sensor</td><td>{sprite.Sensor}</td></tr>
                         <tr><td>Pilot</td><td>{sprite.Pilot}</td></tr>
                         <tr><td>Initiative</td><td>{core} + {1 + parseInt(sprite.ExtraInitDice)}D6</td></tr>
                         <tr><td>CF Payload</td><td>{payloadUsed} / {sprite.CFPayload}</td></tr>
                         <tr><td>Frame Core Size</td><td>{core * core * 5} Mp</td></tr>
                         <tr><td>Karma Cost</td><td>{core}</td></tr>
                       </tbody>
                     </table>
                   </Grid>
                   <Grid size={{ xs: 8 }}>
                     <h5>Complex Form Payload</h5>
                     <TableContainer component={Paper}>
                       <Table size="small">
                         <TableHead>
                           <TableRow>
                             <TableCell>Name</TableCell>
                             <TableCell>Rating</TableCell>
                             <TableCell>Multiplyer</TableCell>
                           </TableRow>
                         </TableHead>
                         <TableBody>
                           {sprite.ComplexForms.map((cf, cfi) => (
                             <TableRow key={cfi}>
                               <TableCell>{cf.Name}</TableCell>
                               <TableCell>{cf.Rating}</TableCell>
                               <TableCell>{cf.Multiplyer}</TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
                     </TableContainer>
                   </Grid>
                 </Grid>
                 <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                   <Button size="small" variant="outlined" onClick={() => openEditSpriteModal(si)}>Edit</Button>
                   <Button size="small" variant="contained" color="error" onClick={() => removeSprite(si)}>Remove</Button>
                 </Box>
               </Box>
             );
           })}

           {/* Sprite designer modal */}
           <Modal open={spriteModalOpen} onClose={() => setSpriteModalOpen(false)}>
             <Box sx={{ ...modalStyle, width: 520, maxHeight: '90vh', overflowY: 'auto' }}>
               <h3>{editingSpriteIndex !== null ? 'Edit Sprite' : 'New Sprite'}</h3>
               <div style={{ marginBottom: 8 }}>
                 <label>Name:&nbsp;
                   <input type="text" value={spriteForm.Name} onChange={(e) => setSpriteForm((p) => ({ ...p, Name: e.target.value }))} style={{ width: 200, padding: 4 }} />
                 </label>
               </div>
               <div style={{ marginBottom: 8 }}>
                 <label>Core Rating (1–{getCompSkillRating()}):&nbsp;
                   <input type="number" min={1} max={getCompSkillRating()} value={spriteForm.CoreRating}
                     onChange={(e) => {
                       const core = Math.max(1, parseInt(e.target.value) || 1);
                       setSpriteForm((p) => ({ ...p, CoreRating: core, Bod: 1, Evasion: 1, Masking: 1, Sensor: 1, Pilot: 1, ExtraInitDice: 0, CFPayload: 0 }));
                     }}
                     style={{ width: 50, padding: 4 }} />
                 </label>
               </div>
               <p style={{ fontSize: '0.85em' }}>
                 Persona Points: <strong>{spritePersonaPointsLeft(spriteForm)}</strong> remaining (pool = core×3 = {(parseInt(spriteForm.CoreRating)||1)*3})<br/>
                 Frame Points: <strong>{spriteFramePointsLeft(spriteForm)}</strong> remaining (pool = core×4 = {(parseInt(spriteForm.CoreRating)||1)*4})
               </p>
               <table style={{ marginBottom: 12, width: '100%' }}>
                 <thead><tr><th>Persona Attr</th><th>Value</th><th>Max</th></tr></thead>
                 <tbody>
                   {['Bod','Evasion','Masking','Sensor'].map((attr) => (
                     <tr key={attr}>
                       <td>{attr}</td>
                       <td><input type="number" min={1} max={parseInt(spriteForm.CoreRating)||1} value={spriteForm[attr]}
                         onChange={(e) => {
                           const v = Math.min(parseInt(e.target.value)||1, parseInt(spriteForm.CoreRating)||1);
                           const testForm = { ...spriteForm, [attr]: v };
                           if (spritePersonaPointsLeft(testForm) >= 0) setSpriteForm(testForm);
                         }}
                         style={{ width: 50 }} /></td>
                       <td>{parseInt(spriteForm.CoreRating)||1}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               <table style={{ marginBottom: 12, width: '100%' }}>
                 <thead><tr><th>Frame Point Spend</th><th>Value</th><th>FP Cost</th></tr></thead>
                 <tbody>
                   <tr>
                     <td>Pilot Rating (2 FP/pt, min 1)</td>
                     <td><input type="number" min={1} max={getCompSkillRating()} value={spriteForm.Pilot}
                       onChange={(e) => {
                         const v = Math.max(1, parseInt(e.target.value)||1);
                         const testForm = { ...spriteForm, Pilot: v };
                         if (spriteFramePointsLeft(testForm) >= 0) setSpriteForm(testForm);
                       }} style={{ width: 50 }} /></td>
                     <td>{(parseInt(spriteForm.Pilot)||1)*2}</td>
                   </tr>
                   <tr>
                     <td>Extra Init Dice (3 FP/die, max 3)</td>
                     <td><input type="number" min={0} max={3} value={spriteForm.ExtraInitDice}
                       onChange={(e) => {
                         const v = Math.min(3, Math.max(0, parseInt(e.target.value)||0));
                         const testForm = { ...spriteForm, ExtraInitDice: v };
                         if (spriteFramePointsLeft(testForm) >= 0) setSpriteForm(testForm);
                       }} style={{ width: 50 }} /></td>
                     <td>{(parseInt(spriteForm.ExtraInitDice)||0)*3}</td>
                   </tr>
                   <tr>
                     <td>CF Payload (1 FP/pt)</td>
                     <td><input type="number" min={0} value={spriteForm.CFPayload}
                       onChange={(e) => {
                         const v = Math.max(0, parseInt(e.target.value)||0);
                         const testForm = { ...spriteForm, CFPayload: v };
                         if (spriteFramePointsLeft(testForm) >= 0) setSpriteForm(testForm);
                       }} style={{ width: 50 }} /></td>
                     <td>{parseInt(spriteForm.CFPayload)||0}</td>
                   </tr>
                 </tbody>
               </table>

               <h4>Complex Form Payload ({spritePayloadUsed(spriteForm)} / {spriteForm.CFPayload} used)</h4>
               <Button size="small" variant="outlined" style={{ marginBottom: 8 }}
                 onClick={() => setSpriteCFModalOpen(true)}
                 disabled={spritePayloadUsed(spriteForm) >= (parseInt(spriteForm.CFPayload)||0)}>
                 Add Complex Form
               </Button>
               <table style={{ width: '100%', marginBottom: 12 }}>
                 <thead><tr><th>Name</th><th>Rating</th><th>×</th></tr></thead>
                 <tbody>
                   {spriteForm.ComplexForms.map((cf, cfi) => (
                     <tr key={cfi}>
                       <td>{cf.Name}</td>
                       <td><input type="number" min={1} max={parseInt(spriteForm.CFPayload)||1} value={cf.Rating}
                         onChange={(e) => handleSpriteCFRating(cfi, e.target.value)} style={{ width: 50 }} /></td>
                       <td><button onClick={() => removeSpriteCF(cfi)}>✕</button></td>
                     </tr>
                   ))}
                 </tbody>
               </table>

               <Button variant="contained" color="primary" onClick={saveSpriteModal}>Save Sprite</Button>
             </Box>
           </Modal>

           {/* Sprite CF picker modal */}
           <Modal open={spriteCFModalOpen} onClose={() => setSpriteCFModalOpen(false)}>
             <Box sx={modalStyle}>
               <SearchableSelect
                 items={rawPrograms}
                 value={spriteCFIndex}
                 onChange={handleSpriteCFChange}
                 label="Complex Form"
                 getLabel={(prog) => prog.Name}
                 style={{ width: '300px' }}
               />
               <Button variant="contained" color="primary" onClick={addSpriteCF} style={{ marginTop: '10px' }}>
                 Add
               </Button>
             </Box>
           </Modal>
           {RenderSubmersionSection()}
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}