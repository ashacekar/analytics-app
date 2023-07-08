import React from 'react';
import { useWinesData } from '../../hook/useWinesData';

/*
 **** Flavanoid Table ****
 * React FC to create flavanoids data table based on wines data
 */
export const FlavanoidTable: React.FC<{}> = () => {
    const {classNames, meanFlavanoidsList, modeFlavanoidsList, medianFlavanoidsList} = useWinesData();
  return (
    <table>
        <thead>
          <tr>
            <th>{"Measure"}</th>
             {classNames.map((alcohol)=>{
                return <th key={alcohol}>{alcohol}</th>
              }
            )}
          </tr>
        </thead>
        <tbody>
        <tr>
          <th>{"Flavonoids Mean"}</th>
          {meanFlavanoidsList.map((mean,i)=>{
                return <td key={classNames[i]+"-mean"}>{mean}</td>
              }
          )}
        </tr>
        <tr>
          <th>{"Flavonoids Mode"}</th>
          {modeFlavanoidsList.map((mode,i)=>{
                return <td key={classNames[i]+"-mode"}>{mode}</td>
              }
          )}
        </tr>
        <tr>
          <th>{"Flavonoids Median"}</th>
          {medianFlavanoidsList.map((median,i)=>{
                return <td key={classNames[i]+"-median"}>{median}</td>
              }
          )}
        </tr>
        </tbody>
      </table>
  );
};