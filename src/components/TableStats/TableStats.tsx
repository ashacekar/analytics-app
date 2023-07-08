import React from 'react';
import "./TableStats.css"
import { FlavanoidTable } from '../FlavanoidsTable/FlavanoidTable';
import { GammaTable } from '../GammaTable/GammaTable';

export const TableStats: React.FC<{}> = () => {

  return (
    <div>
      <FlavanoidTable />
      <br/>
      <GammaTable /> 
    </div>
  );
};
