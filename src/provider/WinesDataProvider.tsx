import React, { createContext, useEffect, useMemo, useState } from 'react';
import winesRawData from "../data/Wine-Data.json";
import { getMean } from '../utility/getMean';
import { getMode } from '../utility/getMode';
import { getMedian } from '../utility/getMedian';
import { groupByClass } from '../utility/groupByClass';
import { addGammaProp } from '../utility/addGammaProp';
import { WineDataNode } from '../model/WineDataNode';

export interface WinesProps {
  winesData: any[];
  setWinesData: (_: any[]) => void;

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

  flavanoidsByClass: any[];
  setFlavanoidsByClass: (_: any[]) => void;
  gammaByClass: any[];
  setGammaByClass: (_: any[]) => void;

}

export const WinesContext = createContext<WinesProps>({
  winesData: [] as any,
  setWinesData: (_: any[]) => {},

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

  flavanoidsByClass: [] as any[],
  setFlavanoidsByClass: (_: any[]) => {},
  gammaByClass: [] as any[],
  setGammaByClass: (_: any[]) => {},
});

interface Props {
  children: React.ReactNode;
}

export const WinesDataProvider: React.FunctionComponent<Props> = ({children}) => {
  const [winesData, updateWinesData] = useState<any[]>(addGammaProp(winesRawData));
  
  const [classNames, updateClassNames] = useState<string[]>([]);

  const [meanFlavanoidsList, updateMeanFlavanoidsList] = useState<number[]>([]);
  const [modeFlavanoidsList, updateModeFlavanoidsList] = useState<number[]>([]);
  const [medianFlavanoidsList, updateMedianFlavanoidsList] = useState<number[]>([]);

  const [meanGammaList, updateMeanGammaList] = useState<number[]>([]);
  const [modeGammaList, updateModeGammaList] = useState<number[]>([]);
  const [medianGammaList, updateMedianGammaList] = useState<number[]>([]);

  const [flavanoidsByClass, updateFlavanoidsByClass] = useState<any[]>([]);
  const [gammaByClass, updateGammaByClass] = useState<any[]>([]);


  const setWinesData = (value: any[]) => {
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

  const setFlavanoidsByClass = (value: any[]) => {
    updateFlavanoidsByClass(value);
  }

  const setGammaByClass = (value: any[]) => {
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

    let tempFlavanoidsByClass: any[] = [];
    let tempGammaByClass: any[] = [];

    Object.keys(wineByClass).forEach((key: any, index) => {
        let flavanoidList: number[] = [];
        let gammaList: number[] = [];
        wineByClass[key].forEach((w: WineDataNode)=>{
          flavanoidList.push(w.Flavanoids);
          gammaList.push(w.Gamma);
        })
        tempFlavanoidsByClass[key] = flavanoidList;
        tempGammaByClass[key] = gammaList;
    });

    setFlavanoidsByClass(tempFlavanoidsByClass.filter((n: any)=>n));
    setGammaByClass(tempGammaByClass.filter((n: any)=>n));

    Object.keys(flavanoidsByClass).forEach((key: any, index) => {
      tempMeanFlavanoidsList.push(getMean(flavanoidsByClass[key]))
      tempModeFlavanoidsList.push(getMode(flavanoidsByClass[key]))
      tempMedianFlavanoidsList.push(getMedian(flavanoidsByClass[key]))
    });

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
  },[winesData, classNames])

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
    [winesData, classNames]
  )


  return (
    <WinesContext.Provider
      value={WinesContextProviderValue}>
        {children}
    </WinesContext.Provider>
  );
};