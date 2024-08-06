import React, { useEffect, useState } from 'react';
import initialPositions from './initial_positions.json';
import updatedPositions from './updated_positions.json';
import { Avatar, Tooltip } from '@mui/material';
import secondImage from './secondImage.jpg';

const ZonesData = [
  { label: 'Zone 1', color: '#c2fcff', top: '20%', left: '20%' },
  { label: 'Zone 2', color: '#fcf7c0', top: '20%', left: '60%' },
  { label: 'Zone 3', color: '#d9dcff', top: '60%', left: '20%' },
  { label: 'Zone 4', color: '#f8c5bd', top: '60%', left: '60%' },
];

const EmployeeTracker = () => {
  const [employees, setEmployees] = useState(initialPositions);
  const [zones, setZones] = useState(ZonesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees(updatedPositions);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const getZoneStyle = (zone) => ({
    position: 'absolute',
    top: zone.top,
    left: zone.left,
    width: '20%',
    height: '20%',
    borderRadius: '50%',
    backgroundColor: zone.color,
    opacity: 0.5,
  });

  const getEmployeePosition = (zoneLabel) => {
    const zone = zones.find(z => z.label === zoneLabel);
    if (!zone) return { top: '0%', left: '0%' };
    return {
      top: `calc(${zone.top} + 10%)`,
      left: `calc(${zone.left} + 10%)`,
    };
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={secondImage} alt="Office Floor Plan" style={{ width: '100%', height: 'auto' }} />
      {zones.map(zone => (
        <div key={zone.label} style={getZoneStyle(zone)} />
      ))}
      {employees.map(employee => (
        <Tooltip key={employee._id} title={`${employee.firstName} ${employee.lastName} - ${employee.zone}`}>
          <Avatar
            style={{
              position: 'absolute',
              ...getEmployeePosition(employee.zone),
              transform: 'translate(-50%, -50%)',
            }}
          >
            {employee.firstName.charAt(0)}
          </Avatar>
        </Tooltip>
      ))}
    </div>
  );
};

export default EmployeeTracker;
