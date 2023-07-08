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
            <th>{"Measure"}</th>
            {classNames.map((alcohol)=>{
                return <th key={alcohol}>{alcohol}</th>
              }
            )}
          </tr>
        </thead>
        <tbody>
        <tr>
          <th>{"Gamma Mean"}</th>
          {meanGammaList.map((mean,i)=>{
                return <td key={classNames[i]+"-mean"}>{mean}</td>
              }
          )}
        </tr>
        <tr>
          <th>{"Gamma Mode"}</th>
          {modeGammaList.map((mode,i)=>{
                return <td key={classNames[i]+"-mode"}>{mode}</td>
              }
          )}
        </tr>
        <tr>
          <th>{"Gamma Median"}</th>
          {medianGammaList.map((median,i)=>{
                return <td key={classNames[i]+"-median"}>{median}</td>
              }
          )}
        </tr>
        </tbody>
      </table>  
  );
};