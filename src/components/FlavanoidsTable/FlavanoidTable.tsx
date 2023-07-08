import React from 'react';
import { useWinesData } from '../../hook/useWinesData';

export const FlavanoidTable: React.FC<{}> = () => {
    const {classNames, meanFlavanoidsList, modeFlavanoidsList, medianFlavanoidsList} = useWinesData();
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
          <td>Flavonoids Mean</td>
          {meanFlavanoidsList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        <tr>
          <td>Flavonoids Mode</td>
          {modeFlavanoidsList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        <tr>
          <td>Flavonoids Median</td>
          {medianFlavanoidsList.map((c)=>{
                return <th key={c}>{c}</th>
              }
          )}
        </tr>
        </tbody>
      </table>
  );
};