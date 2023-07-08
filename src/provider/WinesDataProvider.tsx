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

/*
 **** Provider for wines data ****
 * It gives information across components for all wines related information and computations
 * based on the initial wines data 
 */

export const WinesDataProvider: React.FunctionComponent<Props> = ({children}) => {
  const [winesData, updateWinesData] = useState<WineDataNode[]>(addGammaProp(winesRawData as WineDataNode[]));
  
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

 /*
 * Calculate mean, mode, median of flavanoids and gamma whenever wines data updates
 */
  useEffect(()=>{

      // Group wine data by Alcohol class as key
      const wineByClass = groupByClass(winesData, 'Alcohol'); // [1:{.....},2:{.....},....]

      // Get all alcohol class names
      setClassNames(Object.keys(wineByClass)); // [1,2,....]

      // As we cannot directly update lists with setters, temporary variables are needed for statistic calculation lists
      let tempMeanFlavanoidsList: number[] = [];
      let tempModeFlavanoidsList: number[] = [];
      let tempMedianFlavanoidsList: number[] = [];

      let tempMeanGammaList: number[] = [];
      let tempModeGammaList: number[] = [];
      let tempMedianGammaList: number[] = [];

      let tempFlavanoidsByClass: StatByClass[] = [];
      let tempGammaByClass: StatByClass[] = [];

      // For each wine class get list of flavanoids and gamma
      Object.keys(wineByClass).forEach((key: any) => {
        let flavanoidList: number[] = [];
        let gammaList: number[] = [];
        wineByClass[key].forEach((w: WineDataNode)=>{
          flavanoidList.push(w.Flavanoids);
          gammaList.push(w.Gamma!);
        })
        tempFlavanoidsByClass[key] = flavanoidList;
        tempGammaByClass[key] = gammaList;
      });

      setFlavanoidsByClass(tempFlavanoidsByClass.filter((n)=>n));  // [1:[x,y,z,...],2:[x,y,z,...],....] where x, y, z are flavanoid values
      setGammaByClass(tempGammaByClass.filter((n)=>n));  // [1:[x,y,z,...],2:[x,y,z,...],....] where x, y, z are gamma values

      // For each class calculate mean, mode and median of flavanoids
      Object.keys(flavanoidsByClass).forEach((key: any) => {
        tempMeanFlavanoidsList.push(getMean(flavanoidsByClass[key]))
        tempModeFlavanoidsList.push(getMode(flavanoidsByClass[key]))
        tempMedianFlavanoidsList.push(getMedian(flavanoidsByClass[key]))
      });

      setMeanFlavanoidsList(tempMeanFlavanoidsList); // [m1,m2,.....] where m1, m2 are mean flavanoid values got respective classes in order
      setModeFlavanoidsList(tempModeFlavanoidsList); // [mo1,mo2,.....] where mo1, mo2 are mode flavanoid values got respective classes in order
      setMedianFlavanoidsList(tempMedianFlavanoidsList); // [me1,me2,.....] where me1, me2 are median flavanoid values got respective classes in order

      // For each class calculate mean, mode and median of gamma
      Object.keys(gammaByClass).forEach((key: any) => {
        tempMeanGammaList.push(getMean(gammaByClass[key]))
        tempModeGammaList.push(getMode(gammaByClass[key]))
        tempMedianGammaList.push(getMedian(gammaByClass[key]))
      });

      setMeanGammaList(tempMeanGammaList); // [m1,m2,.....] where m1, m2 are mean gamma values got respective classes in order
      setModeGammaList(tempModeGammaList); // [mo1,mo2,.....] where mo1, mo2 are mode gamma values got respective classes in order
      setMedianGammaList(tempMedianGammaList); // [me1,me2,.....] where me1, me2 are median gamma values got respective classes in order

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