import { addNewVisual, swapNumbers } from "./helperFunctions"

export const bubbleSort = (array) => {

    const visualizer = []
    let isSwapped = false

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){

            addNewVisual(visualizer, j, j + 1, -1)

            if(array[j] > array[j + 1]){
                addNewVisual(visualizer, j, j + 1, -2)
                swapNumbers(array, j, j + 1)
                isSwapped = true
            }
        }

        if(!isSwapped) break
    }

    return visualizer
} 