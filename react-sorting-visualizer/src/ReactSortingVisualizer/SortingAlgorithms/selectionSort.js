import { addNewVisual, swapNumbers } from "./helperFunctions"

export const selectionSort = (array) => {
    
    const visualizer = []

    let minIndex = 0

    for(let i = 0; i < array.length - 1; i++){

        minIndex = findMinIndex(array, i, visualizer)
        swapNumbers(array, i, minIndex)
        addNewVisual(visualizer, i, minIndex, -2)
        addNewVisual(visualizer, -1, -1, i)
    }

    return visualizer
}

// Function finds min element in receieved array from start index && updates visualizer  
function findMinIndex(array, start, visualizer){

    for(let i = start + 1; i < array.length; i++){
        if(array[i] < array[start]) start = i
        addNewVisual(visualizer, i, start, -1)
    }

    return start
}