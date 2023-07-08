import { WineDataNode } from "../model/WineDataNode";

/**
 * Utility to add gamma prop in wines data
 * @param arr: WineDataNode[]
 */
export const addGammaProp = (arr: WineDataNode[]) => {
    arr.forEach((w)=>{
        w["Gamma"] = (w.Ash * w.Hue) / w.Magnesium
    })

    return arr;
}