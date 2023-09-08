import { addNewVisual, swapNumbers } from "./helperFunctions";

export const mergeSort = (array) =>{

    let visualizer = []
    const size = array.length
    mergeSortHelper(array, 0, size, visualizer)


    return visualizer
}

function mergeArrays(array, start, end, middle, visualizer){

    let firstIndex = start
    let secondIndex = middle

    const resultArray = []

    while(firstIndex < middle && secondIndex < end){
        
        if(array[firstIndex] < array[secondIndex]){
            resultArray.push(array[firstIndex])
            firstIndex ++

        }else{
            resultArray.push(array[secondIndex])
            secondIndex++
        }
    }

    for(firstIndex; firstIndex < middle; firstIndex ++) resultArray.push(array[firstIndex])
    for(secondIndex; secondIndex < end; secondIndex ++) resultArray.push(array[secondIndex])


    for(let i = start; i < end; i++) array[i] = resultArray[i - start]
}

// Recursive MergeSort function
function mergeSortHelper(array, start, end, visualizer){

    // Base Case
    if(end - start <= 1) return
    
    // Split and sort each part of array
    const middle = Math.floor((start + end) / 2)
    mergeSortHelper(array, start, middle)
    mergeSortHelper(array, middle, end)

    // Merge already sorted 2 part of arrays
    mergeArrays(array, start, end, middle, visualizer)
}