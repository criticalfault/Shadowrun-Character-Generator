import React from "react";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import "./SheetDisplay.css";

import AttributesBlock from './Sheet/AttributesBlock';
import RunnerInfo from './Sheet/RunnerInfo';
import DicePools from './Sheet/DicePools';
import SkillsBlock from './Sheet/SkillsBlock';
import CyberwareTable from './Sheet/CyberwareTable';
import BiowareTable from './Sheet/BiowareTable';
import GearTable from './Sheet/GearTable';
import LifestylesTable from './Sheet/LifestylesTable';
import ArmorTable from './Sheet/ArmorTable';
import WeaponsTable from './Sheet/WeaponsTable';
import PhysicalAdeptPowers from './Sheet/PhysicalAdeptPowers';
import SpellsTable from './Sheet/SpellsTable';
import FociTable from './Sheet/FociTable';
import VehiclesTable from './Sheet/VehiclesTable';
import DronesTable from './Sheet/DronesTable';
import ConditionMonitorBlock from './Sheet/ConditionMonitorBlock';
import CyberdeckTable from './Sheet/CyberdeckTable';
import AllyTable from './Sheet/AllyTable';
import RCDSheet from './Sheet/RCDSheet';
import CustomWeaponsTable from './Sheet/CustomWeaponsTable';
import CustomVehiclesTable from './Sheet/CustomVehiclesTable';
import CustomDecksTable from './Sheet/CustomDecksTable';

import rangesData from "../data/ranges.json";

function SheetDisplay(props) {
  const char = props.currentCharacter;
  const rcd = char.rcd ?? {};

  // ── Auto-show guards ──────────────────────────────────────────────────────
  const hasCyberware = (char.cyberware?.length ?? 0) > 0;
  const hasBioware   = (char.bioware?.length ?? 0) > 0;
  const hasMagic     = (props.magicalChoice && props.magicalChoice !== 'none' && props.magicalChoice !== '')
                    || (char.spells?.length ?? 0) > 0
                    || (char.foci?.length ?? 0) > 0
                    || (char.powers?.length ?? 0) > 0
                    || !!char.ally;
  const hasDecking   = (char.decks?.length ?? 0) > 0;
  const hasRigging   = (char.vehicles?.length ?? 0) > 0
                    || (char.drones?.length ?? 0) > 0
                    || Object.values(rcd).some(v => v !== '' && v !== false && v !== null
                        && !(Array.isArray(v) && v.length === 0)
                        && typeof v !== 'object');

  const handleConditionSelect = () => {};
  const handleChangeStun     = (val) => props.onChangeConditionMonitor?.({ stunDamage: val, physicalDamage: char.physicalDamage ?? 0 });
  const handleChangePhysical = (val) => props.onChangeConditionMonitor?.({ stunDamage: char.stunDamage ?? 0, physicalDamage: val });

  const getRangesFromName = (name) => {
    const Ranges = rangesData;
    for (const key of Object.keys(Ranges)) {
      if (name.includes(key)) return Ranges[key];
    }
    return { short: "N/A", medium: "N/A", long: "N/A", extreme: "N/A" };
  };

  return (
    <div className="sheetBody">

      {/* ── Print button ──────────────────────────────────────────────── */}
      <div className="no-print sheet-print-row">
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          className="sheet-print-btn"
        >
          Print Sheet
        </Button>
      </div>

      {/* ── Runner identity — full width ──────────────────────────────── */}
      <RunnerInfo
        character={char}
        onChange={(key, value) => {
          switch (key) {
            case 'street_name':  props.onChangeStreetName(value); break;
            case 'age':          props.onChangeAge(value);        break;
            case 'description':  props.onChangeDescription(value); break;
            case 'notes':        props.onChangeNotes(value);      break;
            default: break;
          }
        }}
      />

      {/* ── 2-column core ─────────────────────────────────────────────── */}
      <div className="sheet-two-col">

        {/* Left: Attributes · Dice Pools */}
        <div className="sheet-col">
          <AttributesBlock
            attributes={char.attributes}
            raceBonuses={char.raceBonuses}
            cyberBonuses={char.cyberAttributeBonuses}
            magicBonuses={char.magicalAttributeBonuses}
            Cyberware={char.cyberware}
          />
          <DicePools
            character={char}
            edition={props.Edition}
            magicalChoice={props.magicalChoice}
          />
        </div>

        {/* Right: Condition Monitor · Skills · Armor · Gear */}
        <div className="sheet-col">
          <ConditionMonitorBlock
            stunDamage={char.stunDamage ?? 0}
            physicalDamage={char.physicalDamage ?? 0}
            onChangeStun={handleChangeStun}
            onChangePhysical={handleChangePhysical}
          />
          <SkillsBlock character={char} edition={props.Edition} />
          <ArmorTable gear={char.gear} />
          <GearTable  gear={char.gear} />
          <LifestylesTable gear={char.gear} />
        </div>

      </div>

      {/* ── Weapons — full width ──────────────────────────────────────── */}
      <WeaponsTable gear={char.gear} />
      <CustomWeaponsTable customWeapons={char.customWeapons} />
      <CustomVehiclesTable customVehicles={char.customVehicles} />
      <CustomDecksTable customDecks={char.customDecks} />

      {/* ── Optional sections — full width, auto-hidden ───────────────── */}

      {hasCyberware && (
        <CyberwareTable cyberware={char.cyberware} />
      )}

      {hasBioware && (
        <BiowareTable bioware={char.bioware} />
      )}

      {hasMagic && (
        <>
          <PhysicalAdeptPowers powers={char.powers} />
          <SpellsTable spells={char.spells} />
          <FociTable foci={char.foci} />
          <AllyTable ally={char.ally} />
        </>
      )}

      {hasDecking && (
        <CyberdeckTable
          Decks={char.decks}
          onChangeDeck={props.onChangeDeck}
          character={char}
        />
      )}

      {hasRigging && (
        <>
          <VehiclesTable vehicles={char.vehicles} onChangeVehicles={props.onChangeVehicles} />
          <DronesTable drones={char.drones} onChangeDrones={props.onChangeDrones} />
          <RCDSheet
            rcd={rcd}
            drones={char.drones}
            onChangeRCD={props.onChangeRCD}
          />
        </>
      )}

    </div>
  );
}

export default SheetDisplay;
