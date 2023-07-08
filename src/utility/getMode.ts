export const getMode = (arr: number[]) => {
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