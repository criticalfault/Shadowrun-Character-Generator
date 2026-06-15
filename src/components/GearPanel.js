import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import FilteredMenuItem from './FilteredMenuItem';
import SearchableSelect from './SearchableSelect';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WeaponModsModal, { applyWeaponMods } from './WeaponModsModal';
import LifestyleBuilderModal from './LifestyleBuilderModal';

// Pre-import all edition data so Vite can bundle them (no runtime require)
const allGear = import.meta.glob('../data/*/Gear.json', { eager: true });

export default function GearPanel(props) {
  const GearData = allGear[`../data/${props.Edition}/Gear.json`]?.default;
  const tempCategories = Object.keys(GearData);
  const GearCategories = [...tempCategories].sort();
  const CalcTotalNuyenSpent = () =>{
      let TotalNuyen = 0;
      props.Gear.forEach(function(gear){
          TotalNuyen += parseInt(gear.Cost)*parseInt(gear.Amount);
      });
      return TotalNuyen;
  }

  const [NewGear, setNewGear]           = useState();
  const [NewGearCost, setNewGearCost]   = useState();
  const [NewGearAmount, setNewGearAmount] = useState(1);
  const [NewGearIndex, setNewGearIndex] = useState(0);
  const [NewGearDesc, setNewGearDesc]   = useState('');
  const [SelectedGear, setSelectedGear] = useState(props.Gear);
  const [SelectedGearCategory, setSelectedGearCategory] = useState(GearCategories[0]);
  const [globalSearch, setGlobalSearch] = useState('');

  // Flat list of every item across all categories, with _category attached
  const flatGearList = GearCategories.flatMap(cat =>
    (GearData[cat]?.entries ?? []).map(item => ({ ...item, _category: cat }))
  );

    const getSortedEntries = () =>
      GearData[SelectedGearCategory].entries.slice().sort((a, b) => a.Name.localeCompare(b.Name));

    const handleGearCategoryChange = (event) => {
        setSelectedGearCategory(event.target.value);
        setNewGear(null);
        setNewGearIndex(0);
        setNewGearDesc('');
    }

    const handleGearChange = (event) => {
      const TempGear = globalSearch.length >= 2
        ? flatGearList[event.target.value]
        : getSortedEntries()[event.target.value];
      setNewGear(TempGear);
      setNewGearIndex(event.target.value);
      setNewGearCost(TempGear.Cost ?? TempGear['$Cost'] ?? '0');
      setNewGearAmount(1);
      setNewGearDesc(TempGear.Notes ?? '');
      if (TempGear._category) setSelectedGearCategory(TempGear._category);
    }
  
    const handleAddGear = () => {
      if (NewGear) {
        const gearToAdd = {...NewGear};
        gearToAdd.Type = SelectedGearCategory;
        gearToAdd.Amount = NewGearAmount;
        setSelectedGear(prevGear => [...prevGear, gearToAdd]);
        setNewGear('');
        setNewGearIndex('');
        setNewGearAmount(1);
        props.onChangeGear([...SelectedGear, gearToAdd]);
      }
    }
  
    const handleRemoveGear = (index) => {
      const editedGear = [...SelectedGear];
      editedGear.splice(index, 1);
      setSelectedGear(editedGear);
      props.onChangeGear([...editedGear]);
    };

    const [modifyingWeaponIndex, setModifyingWeaponIndex] = useState(null);
    const [lifestyleBuilderOpen, setLifestyleBuilderOpen] = useState(false);
    const ssgEnabled = props.Edition === 'SR3' && props.BooksFilter?.includes('ssg');

    const handleLifestylePurchase = (gearEntry) => {
      const updated = [...SelectedGear, gearEntry];
      setSelectedGear(updated);
      props.onChangeGear(updated);
    };

    const handleSaveWeaponMods = (index, newMods) => {
      const editedGear = SelectedGear.map((g, i) =>
        i === index ? { ...g, weaponMods: newMods } : g
      );
      setSelectedGear(editedGear);
      props.onChangeGear(editedGear);
    };

    // Cyberdeck categories use VR2 or SR2 base rules exclusively — not both.
    // When VR2 is enabled, suppress SR2-base-tagged items in these categories.
    const deckCategories = ['Cyberdecks', 'Cyberdeck Other'];
    const vr2Active = props.BooksFilter?.includes('vr2');

    const renderGearItem = (gear, originalIndex) => {
      const bookCode = gear.BookPage?.split('.')[0];
      const inDeckCategory = deckCategories.includes(SelectedGearCategory);
      const suppressedByVr2 = inDeckCategory && vr2Active && bookCode === 'sr2';
      const allowed = !suppressedByVr2 &&
        (!gear.hasOwnProperty('BookPage') || props.BooksFilter.includes(bookCode));
      return (
        <FilteredMenuItem allowed={allowed} bookCode={bookCode} key={originalIndex} value={originalIndex}>{gear.Name}</FilteredMenuItem>
      );
    }

    return ( <>
    <Box sx={{ width: '250px' }}>
        Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
    </Box>
    <br></br>

    <TextField
      label="Search all gear"
      placeholder="Type to search across all categories..."
      value={globalSearch}
      onChange={(e) => { setGlobalSearch(e.target.value); setNewGear(null); setNewGearIndex(0); }}
      size="small"
      style={{ width: '400px', marginBottom: '12px' }}
    />

    {globalSearch.length >= 2 ? (
      <SearchableSelect
        items={flatGearList}
        value={NewGearIndex}
        onChange={handleGearChange}
        label="All Gear"
        getLabel={(item) => `${item.Name} (${item._category})`}
        renderItem={(item, originalIndex) => {
          const bookCode = item.BookPage?.split('.')[0];
          const suppressedByVr2 = deckCategories.includes(item._category) && vr2Active && bookCode === 'sr2';
          const allowed = !suppressedByVr2 && (!item.BookPage || props.BooksFilter.includes(bookCode));
          return (
            <FilteredMenuItem allowed={allowed} bookCode={bookCode} key={originalIndex} value={originalIndex}>
              {item.Name} <span style={{ opacity: 0.55, fontSize: '0.8em' }}>({item._category})</span>
            </FilteredMenuItem>
          );
        }}
        style={{ minWidth: 650 }}
      />
    ) : (
      <>
        <Box sx={{ width: '250px' }}>
          <FormControl style={{ width: '200px' }}>
            <InputLabel id="gear-label">Gear Categories</InputLabel>
            <NativeSelect
              id="gear-dropdown"
              value={SelectedGearCategory}
              onChange={handleGearCategoryChange}>
              {GearCategories.map(catName => (
                <option key={catName} value={catName}>{catName}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box><br />
        {SelectedGearCategory && (
          <SearchableSelect
            items={getSortedEntries()}
            value={NewGearIndex}
            onChange={handleGearChange}
            label={SelectedGearCategory}
            renderItem={renderGearItem}
            style={{ minWidth: 650 }}
          />
        )}
      </>
    )}
    {NewGear && (
        <>
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewGearCost}
            />
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            label="Amount"
            type="number"
            value={NewGearAmount}
            onChange={(event) => setNewGearAmount(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddGear}>
            Add Gear
            </Button>
            <div>Notes:{NewGearDesc}</div>
        </>
    )}

    {ssgEnabled && (
      <div style={{ margin: '12px 0' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setLifestyleBuilderOpen(true)}
        >
          Build Custom Lifestyle (SSG)
        </Button>
        <span style={{ marginLeft: 10, fontSize: '0.8em', color: '#999' }}>
          Sprawl Survival Guide detailed lifestyle system
        </span>
      </div>
    )}

    <LifestyleBuilderModal
      open={lifestyleBuilderOpen}
      onClose={() => setLifestyleBuilderOpen(false)}
      onPurchase={handleLifestylePurchase}
    />

    <br></br><br></br>
    <h3>Armor</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Ballistic</TableCell>
              <TableCell align="right">Impact</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.Gear.map(
                (gear, index) => {
                  if(!gear.hasOwnProperty('Ballistic')){
                    return;
                  }
                  return(
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {gear.Name}
                      {gear.Amount !== 0?`  x${gear.Amount}`:''}
                    </TableCell>
                    <TableCell align="right">{gear.Ballistic}</TableCell>
                    <TableCell align="right">{gear.Impact}</TableCell>
                    <TableCell align="right">
                      {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}
                      {gear.Amount !== 0 && gear.Amount !== 1 ?`  [${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost*gear.Amount)}]`:''}
                    </TableCell>
                    <TableCell align="right">{gear.BookPage}</TableCell>
                    <TableCell align="right">{gear.Availability}</TableCell>
                    <TableCell align="right">{gear.Notes}</TableCell>
                    <TableCell align="right">
                        <Button color="secondary" onClick={() => handleRemoveGear(index)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                  )
                }
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    <h3>Weapons</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="weapons table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Conceal</TableCell>
              <TableCell align="right">Mode</TableCell>
              <TableCell align="right">Damage</TableCell>
              <TableCell align="right">RC</TableCell>
              <TableCell align="right">Ammunition</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SelectedGear.map((gear, index) => {
              if(!gear.hasOwnProperty('Damage')){
                return null;
              }
              const weaponMods = gear.weaponMods ?? [];
              const modified = applyWeaponMods(gear, weaponMods);
              const baseConceal = parseInt(gear.Concealability ?? 0);
              const hasMods = weaponMods.length > 0;
              return(
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {gear.Name}{gear.Amount !== 0 ? `  x${gear.Amount}` : ''}
                  {hasMods && (
                    <Chip label={`${weaponMods.length} mod${weaponMods.length > 1 ? 's' : ''}`}
                      size="small" color="primary" sx={{ ml: 1, fontSize: '0.7rem' }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  {modified.conceal !== baseConceal
                    ? <><s style={{opacity:0.5}}>{baseConceal}</s> <strong style={{color: modified.conceal > baseConceal ? '#4caf50' : '#f44336'}}>{modified.conceal}</strong></>
                    : baseConceal}
                </TableCell>
                <TableCell align="right">
                  {modified.mode !== (gear.Mode ?? '')
                    ? <><s style={{opacity:0.5}}>{gear.Mode}</s> <strong style={{color:'#4caf50'}}>{modified.mode}</strong></>
                    : gear.Mode ?? '—'}
                </TableCell>
                <TableCell align="right">
                  {modified.damage !== (gear.Damage ?? '')
                    ? <><s style={{opacity:0.5}}>{gear.Damage}</s> <strong style={{color:'#f44336'}}>{modified.damage}</strong></>
                    : gear.Damage}
                </TableCell>
                <TableCell align="right">
                  {modified.recoilComp > 0
                    ? <strong style={{color:'#4caf50'}}>+{modified.recoilComp}</strong>
                    : '—'}
                </TableCell>
                <TableCell align="right">{gear.Ammunition||'N/A'}</TableCell>
                <TableCell align="right">{gear.Availability}</TableCell>
                <TableCell align="right">
                    {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {props.Edition === 'SR3' && (
                      <Button size="small" onClick={() => setModifyingWeaponIndex(index)} sx={{ mr: 0.5 }}>
                        {hasMods ? 'Mods' : 'Modify'}
                      </Button>
                    )}
                    <Button color="secondary" size="small" onClick={() => handleRemoveGear(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>

    <WeaponModsModal
      open={modifyingWeaponIndex !== null}
      weapon={modifyingWeaponIndex !== null ? SelectedGear[modifyingWeaponIndex] : null}
      weaponIndex={modifyingWeaponIndex}
      onClose={() => setModifyingWeaponIndex(null)}
      onSave={handleSaveWeaponMods}
    />
    <h3>Gear</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Gear.map((gear, index) => {
              if(gear.hasOwnProperty('Damage') || gear.hasOwnProperty('Ballistic')){
                return;
              }
              return (
              <TableRow key={index}>
                <TableCell component="th" scope="row"> {gear.Name}
                      {gear.Amount !== 0?`  x${gear.Amount}`:''}</TableCell>
                <TableCell align="right">{gear.Rating??'N/A'}</TableCell>
                <TableCell align="right"> 
                    {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}
                    {gear.Amount !== 0 && gear.Amount !== 1 ?`  [${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost*gear.Amount)}]`:''}
                </TableCell>
                <TableCell align="right">{gear.BookPage}</TableCell>
                <TableCell align="right">{gear.Availability}</TableCell>
                <TableCell align="right">{gear.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveGear(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </>)

}