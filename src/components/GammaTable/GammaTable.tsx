import React from 'react';
import { useWinesData } from '../../hook/useWinesData';

/*
 **** Gamma Table ****
 * React FC to create gamma data table based on wines data
 */
export const GammaTable: React.FC<{}> = () => {
  const {classNames, meanGammaList, modeGammaList, medianGammaList} = useWinesData();
  return (
    <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map((c)=>{
                return <th key={c}>{c}</th>
              }
            )}
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Gamma Mean</td>
          {meanGammaList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {modeGammaList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {medianGammaList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        </tbody>
      </table>  
  );
};