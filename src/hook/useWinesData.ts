import { useContext } from 'react';
import { WinesContext, WinesProps } from '../provider/WinesDataProvider';

/**
 * Returns Wineer data
 *
 * Usage:
 *
 * ```typescript
 *  const {
 *      winesData,
 *      setWinesData,
 *      classNames,
 *      setClassNames,
 *      meanFlavanoidsList,
 *      setMeanFlavanoidsList,
 *      modeFlavanoidsList,
 *      setModeFlavanoidsList,
 *      medianFlavanoidsList,
 *      setMedianFlavanoidsList,
 *      meanGammaList,
 *      setMeanGammaList,
 *      modeGammaList,
 *      setModeGammaList,
 *      medianGammaList,
 *      setMedianGammaList,
 *      flavanoidsByClass,
 *      setFlavanoidsByClass,
 *      gammaByClass,
 *      setGammaByClass
 *  } = useWinesData();
 * ```
 */
export const useWinesData = (): WinesProps => {
  return useContext(WinesContext);
};
