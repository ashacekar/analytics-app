import React from 'react';
import wineData from "../../data/Wine-Data.json";
import "./App.css"

export const TableStats: React.FC<{}> = () => {

  const groupByClass = (arr: any[], property: string) => {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
  }

  const wineByClass = groupByClass(wineData, 'Alcohol'); // => {1:[...], 2:[...]}

  const classNames = Object.keys(wineByClass);

  let meanFlavanoidsList: number[] = [];
  let modeFlavanoidsList: number[] = [];
  let medianFlavanoidsList: number[] = [];

  let meanGammaList: number[] = [];
  let modeGammaList: number[] = [];
  let medianGammaList: number[] = [];

  let flavanoidsByClass: any[] = [];
  let gammaByClass: any[] = [];

  const getMean = (arr: number[]) => {
    arr.forEach((a,i)=>{
      if(!a){
        arr[i]=0;
      }
    })
    let total = 0;
    let i = 0;
    for (i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    let res = total / arr.length;
    return Number(res.toFixed(3));
  }

  const getMode = (arr: number[]) => {
    const mode: any = {};
  let max = 0, count = 0;

  for(const element of arr) {
    const item = element;
    
    if(mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }
    
    if(count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }
   
    return Number(max.toFixed(3));
  }

  const getMedian = (arr: number[]) => {
    arr.sort((a, b) => a - b);
  
    if (arr.length % 2 === 0) {
      return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
    }
  
    const res = arr[(arr.length - 1) / 2];
    return Number(res.toFixed(3));
  }

  Object.keys(wineByClass).forEach((key: any, index) => {
        let flavanoidList: number[] = [];
        let gammaList: number[] = [];
        wineByClass[key].forEach((w: { Flavanoids: number; Ash: number; Hue: number; Magnesium: number; })=>{
          flavanoidList.push(w.Flavanoids);
          gammaList.push((w.Ash * w.Hue) / w.Magnesium);
        })
        flavanoidsByClass[key] = flavanoidList;
        gammaByClass[key] = gammaList;
  });

  flavanoidsByClass = flavanoidsByClass.filter(n=>n);
  gammaByClass = gammaByClass.filter(n=>n);

  Object.keys(flavanoidsByClass).forEach((key: any, index) => {
      meanFlavanoidsList.push(getMean(flavanoidsByClass[key]))
      modeFlavanoidsList.push(getMode(flavanoidsByClass[key]))
      medianFlavanoidsList.push(getMedian(flavanoidsByClass[key]))
  });

  Object.keys(gammaByClass).forEach((key: any, index) => {
      meanGammaList.push(getMean(gammaByClass[key]))
      modeGammaList.push(getMode(gammaByClass[key]))
      medianGammaList.push(getMedian(gammaByClass[key]))
  });

  return (
    <div>
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
      <br/>
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
    </div>
  );
};
