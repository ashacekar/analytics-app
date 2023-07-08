export const getMean = (arr: number[]) => {
    arr.forEach((a,i)=>{
      if(!a){
        arr[i]=0;
      }
    })
    let total = 0;
    let i = 0;
    for (i = 0; i < arr.length; i++) {
      total += typeof arr[i] === 'number' && arr[i] ? arr[i] : 0;
    }
    let res = total / arr.length;
    return Number(res.toFixed(3));
  }