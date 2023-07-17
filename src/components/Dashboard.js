import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PriorityPanel from './PriorityPanel';
import IdentityPanel from './IdentityPanel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='dashboard'>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Identity" {...a11yProps(0)} />
                    <Tab label="Priorities" {...a11yProps(1)} />
                    <Tab label="Attributes" {...a11yProps(2)} />
                    <Tab label="Skills" {...a11yProps(3)} />
                    <Tab label="Magic" {...a11yProps(4)} />
                    <Tab label="Gear" {...a11yProps(5)} />
                    <Tab label="Karma" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <IdentityPanel />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PriorityPanel />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    </div>
  );
}