/**
 * Utility to add gamma prop in wines data
 * @param arr: any[]
 */
export const addGammaProp = (arr: any[]) => {
    arr.forEach((w)=>{
        w["Gamma"] = (w.Ash * w.Hue) / w.Magnesium
    })

    return arr;
}