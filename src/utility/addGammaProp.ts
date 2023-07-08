export const addGammaProp = (arr: any[]) => {
    arr.forEach((w)=>{
        w["Gamma"] = (w.Ash * w.Hue) / w.Magnesium
    })

    return arr;
}