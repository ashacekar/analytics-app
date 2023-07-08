  /**
 * Utility to group an array of objects by a class property
 * @param arr: any[]
 * @param property: string
 */
  export const groupByClass = (arr: any[], property: string) => {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
  }