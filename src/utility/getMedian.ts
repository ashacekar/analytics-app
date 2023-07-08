  /**
 * Utility to calculate median of a numerical list
 * @param arr: number[]
 */
  export const getMedian = (arr: number[]) => {
    arr.sort((a, b) => a - b);
  
    if (arr.length % 2 === 0) {
      return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
    }
  
    const res = arr[(arr.length - 1) / 2];
    return Number(res.toFixed(3));
  }