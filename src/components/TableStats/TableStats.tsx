import React from 'react';
import "./TableStats.css"
import { FlavanoidTable } from '../FlavanoidsTable/FlavanoidTable';
import { GammaTable } from '../GammaTable/GammaTable';

/*
 **** Table Stats ****
 * React FC to render flavanoid and gamma statistical tables for wines
 */
export const TableStats: React.FC<{}> = () => {
  return (
    <div>
      <FlavanoidTable />
      <br/>
      <GammaTable /> 
    </div>
  );
};
