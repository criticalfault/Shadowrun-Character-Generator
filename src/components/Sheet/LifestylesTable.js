import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const LifestylesTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;
  const lifestyles = gear.filter((item) => item.Type === 'Lifestyles');
  if (lifestyles.length === 0) return null;

  return (
    <Grid size={12}>
      <SRSection title="Lifestyles">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lifestyles.map((item, index) => {
                const monthlyCost = item._lifestyleData?.finalMonthlyCost;
                const costDisplay = monthlyCost
                  ? `${parseInt(item.Cost).toLocaleString()}¥ (${monthlyCost.toLocaleString()}¥/mo)`
                  : `${parseInt(item.Cost || 0).toLocaleString()}¥`;
                return (
                  <TableRow key={item.Name + index}>
                    <TableCell component="th" scope="row">{item.Name}</TableCell>
                    <TableCell align="right">{costDisplay}</TableCell>
                    <TableCell>{item.Notes ?? ''}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default LifestylesTable;
