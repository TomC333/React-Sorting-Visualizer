import { addNewVisual, swapNumbers } from "./helperFunctions"

export const insertionSort = (array) => {
    
    const visualizer = []

    let j = 0
    let key = 0

    // Just insertion sort xD
    for(let i = 1; i < array.length; i++){
        
        if(array[i] > array[i - 1]) {
            
            addNewVisual(visualizer, -1, -1, i)
            continue  
        }

        key = i
        j = i - 1
        
        while(j >= 0 && array[key] < array[j]){
            
            swapNumbers(array, key, j)
            addNewVisual(visualizer, key, j, i)

            key--
            j-- 
        }
    }

    return visualizer

}