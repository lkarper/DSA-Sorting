function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
}

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
}

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
}

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
}

function getNum(num, index) {
    const stringNum = String(num);
    let end = stringNum.length - 1;
    const foundNum = stringNum[end - index];
    if (foundNum === undefined) {
        return 0;
    }
    return foundNum;
}

function radixSort(array, max) {
    const maxLength = String(max).length;
    for (let i = 0; i < max; i++) {
        const buckets = Array.from({ length: 10 }, () => []);
        for (let j = 0; j < array.length; j++) {
            const num = getNum(array[j], i);
            if (num !== undefined) {
                buckets[num].push(array[j]);
            }
        }
        array = buckets.flat();
    }
    return array;
}

function bucketSort(array, min, max) {
    const numBuckets = array.length;
    const bucketRange = (max - min + 1) / numBuckets;
    
    const buckets = [];

    for (let i = 0; i < numBuckets; i++) {
        buckets.push([]);
    }

    for (let i = 0; i < array.length; i++) {
        const index = Math.ceil(array[i]/bucketRange) - 1;
        buckets[index].push(array[i]);
    }

    const sortedBuckets = [];

    for (let bucket of buckets) {
        bucket = quickSort(bucket);
        for (let num of bucket) {
            sortedBuckets.push(num);
        }
    }

    return sortedBuckets;

}

function shuffleInPlace(array) {
    for (let i = 0; i < array.length; i++) {
        const rand = Math.floor(Math.random() * array.length);
        let x = array[rand];
        let y = array[i];
        y = y + x;
        x = y - x;
        y = y - x;
        array[rand] = x;
        array[i] = y;
    }
    return array;
}

const testArray = [26, 45, 1, 21,];

// mergeSort(testArray);
// quickSort(testArray);
// console.log(shuffleInPlace(testArray))
const arrya = [3, 2, 1, 5, 4, 12];
// console.log(bucketSort(arrya, 1, 12));
console.log(radixSort(arrya, 12));
const books = [
    'Time',
    'History',
    'Cooking',
    'Butter',
];
console.log(quickSort(books));