import React, { createContext, useEffect, useMemo, useState } from 'react';
import winesRawData from "../data/Wine-Data.json";
import { getMean } from '../utility/getMean';
import { getMode } from '../utility/getMode';
import { getMedian } from '../utility/getMedian';
import { groupByClass } from '../utility/groupByClass';
import { addGammaProp } from '../utility/addGammaProp';
import { WineDataNode } from '../model/WineDataNode';
import { StatByClass } from '../model/StatByClass';

export interface WinesProps {
  winesData: WineDataNode[];
  setWinesData: (_: WineDataNode[]) => void;

  classNames: string[];
  setClassNames: (_: string[]) => void;

  meanFlavanoidsList: number[];
  setMeanFlavanoidsList: (_: number[]) => void;
  modeFlavanoidsList: number[];
  setModeFlavanoidsList: (_: number[]) => void;
  medianFlavanoidsList: number[];
  setMedianFlavanoidsList: (_: number[]) => void;

  meanGammaList: number[];
  setMeanGammaList: (_: number[]) => void;
  modeGammaList: number[];
  setModeGammaList: (_: number[]) => void;
  medianGammaList: number[];
  setMedianGammaList: (_: number[]) => void;

  flavanoidsByClass: StatByClass[];
  setFlavanoidsByClass: (_: StatByClass[]) => void;
  gammaByClass: StatByClass[];
  setGammaByClass: (_: StatByClass[]) => void;

}

export const WinesContext = createContext<WinesProps>({
  winesData: [] as WineDataNode[],
  setWinesData: (_: WineDataNode[]) => {},

  classNames: [] as string[],
  setClassNames: (_: string[]) => {},

  meanFlavanoidsList: [] as number[],
  setMeanFlavanoidsList: (_: number[]) => {},
  modeFlavanoidsList: [] as number[],
  setModeFlavanoidsList: (_: number[]) => {},
  medianFlavanoidsList: [] as number[],
  setMedianFlavanoidsList: (_: number[]) => {},

  meanGammaList: [] as number[],
  setMeanGammaList: (_: number[]) => {},
  modeGammaList: [] as number[],
  setModeGammaList: (_: number[]) => {},
  medianGammaList: [] as number[],
  setMedianGammaList: (_: number[]) => {},

  flavanoidsByClass: [] as StatByClass[],
  setFlavanoidsByClass: (_: StatByClass[]) => {},
  gammaByClass: [] as StatByClass[],
  setGammaByClass: (_: StatByClass[]) => {},
});

interface Props {
  children: React.ReactNode;
}

export const WinesDataProvider: React.FunctionComponent<Props> = ({children}) => {
  const [winesData, updateWinesData] = useState<WineDataNode[]>(addGammaProp(winesRawData));
  
  const [classNames, updateClassNames] = useState<string[]>([]);

  const [meanFlavanoidsList, updateMeanFlavanoidsList] = useState<number[]>([]);
  const [modeFlavanoidsList, updateModeFlavanoidsList] = useState<number[]>([]);
  const [medianFlavanoidsList, updateMedianFlavanoidsList] = useState<number[]>([]);

  const [meanGammaList, updateMeanGammaList] = useState<number[]>([]);
  const [modeGammaList, updateModeGammaList] = useState<number[]>([]);
  const [medianGammaList, updateMedianGammaList] = useState<number[]>([]);

  const [flavanoidsByClass, updateFlavanoidsByClass] = useState<StatByClass[]>([]);
  const [gammaByClass, updateGammaByClass] = useState<StatByClass[]>([]);


  const setWinesData = (value: WineDataNode[]) => {
    updateWinesData(value);
  }

  const setClassNames = (value: string[]) => {
    updateClassNames(value);
  }

  const setMeanFlavanoidsList = (value: number[]) => {
    updateMeanFlavanoidsList(value);
  }

  const setModeFlavanoidsList = (value: number[]) => {
    updateModeFlavanoidsList(value);
  }

  const setMedianFlavanoidsList = (value: number[]) => {
    updateMedianFlavanoidsList(value);
  }

  const setMeanGammaList = (value: number[]) => {
    updateMeanGammaList(value);
  }

  const setModeGammaList = (value: number[]) => {
    updateModeGammaList(value);
  }

  const setMedianGammaList = (value: number[]) => {
    updateMedianGammaList(value);
  }

  const setFlavanoidsByClass = (value: StatByClass[]) => {
    updateFlavanoidsByClass(value);
  }

  const setGammaByClass = (value: StatByClass[]) => {
    updateGammaByClass(value);
  }

    useEffect(()=>{
    const wineByClass = groupByClass(winesData, 'Alcohol'); 
    setClassNames(Object.keys(wineByClass));

    let tempMeanFlavanoidsList: number[] = [];
    let tempModeFlavanoidsList: number[] = [];
    let tempMedianFlavanoidsList: number[] = [];

    let tempMeanGammaList: number[] = [];
    let tempModeGammaList: number[] = [];
    let tempMedianGammaList: number[] = [];

    let tempFlavanoidsByClass: StatByClass[] = [];
    let tempGammaByClass: StatByClass[] = [];

    Object.keys(wineByClass).forEach((key: any) => {
        let flavanoidList: number[] = [];
        let gammaList: number[] = [];
        wineByClass[key].forEach((w: WineDataNode)=>{
          flavanoidList.push(w.Flavanoids);
          gammaList.push(w.Gamma);
        })
        tempFlavanoidsByClass[key] = flavanoidList;
        tempGammaByClass[key] = gammaList;
    });

    setFlavanoidsByClass(tempFlavanoidsByClass.filter((n)=>n));
    setGammaByClass(tempGammaByClass.filter((n)=>n));

    Object.keys(flavanoidsByClass).forEach((key: any, index) => {
      tempMeanFlavanoidsList.push(getMean(flavanoidsByClass[key]))
      tempModeFlavanoidsList.push(getMode(flavanoidsByClass[key]))
      tempMedianFlavanoidsList.push(getMedian(flavanoidsByClass[key]))
    });

    console.log(flavanoidsByClass)
    setMeanFlavanoidsList(tempMeanFlavanoidsList);
    setModeFlavanoidsList(tempModeFlavanoidsList);
    setMedianFlavanoidsList(tempMedianFlavanoidsList);

    Object.keys(gammaByClass).forEach((key: any, index) => {
      tempMeanGammaList.push(getMean(gammaByClass[key]))
      tempModeGammaList.push(getMode(gammaByClass[key]))
      tempMedianGammaList.push(getMedian(gammaByClass[key]))
    });

    setMeanGammaList(tempMeanGammaList);
    setModeGammaList(tempModeGammaList);
    setMedianGammaList(tempMedianGammaList);
    // eslint-disable-next-line
  },[winesData,classNames,meanFlavanoidsList,modeFlavanoidsList,medianFlavanoidsList,meanGammaList,modeGammaList,medianGammaList])

  const WinesContextProviderValue = useMemo(
    () => ({ 
        winesData,
        setWinesData,
        classNames,
        setClassNames,
        meanFlavanoidsList,
        setMeanFlavanoidsList,
        modeFlavanoidsList,
        setModeFlavanoidsList,
        medianFlavanoidsList,
        setMedianFlavanoidsList,
        meanGammaList,
        setMeanGammaList,
        modeGammaList,
        setModeGammaList,
        medianGammaList,
        setMedianGammaList,
        flavanoidsByClass,
        setFlavanoidsByClass,
        gammaByClass,
        setGammaByClass 
      }),
      // eslint-disable-next-line
    [winesData,classNames,meanFlavanoidsList,modeFlavanoidsList,medianFlavanoidsList,meanGammaList,modeGammaList,medianGammaList]
  )


  return (
    <WinesContext.Provider
      value={WinesContextProviderValue}>
        {children}
    </WinesContext.Provider>
  );
};