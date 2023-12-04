import { readInstructions } from "../utils/readFile";
import { sum } from "../utils/sum";

const inputArray = readInstructions('day1/input.txt');

const writtenNumbers: { [key: string]: string } = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};

const pattern = /(?:one|two|three|four|five|six|seven|eight|nine)/gi;

const convertTextToNumber = (array: string[]): string[] => {
    let convertedInputArray = [];

    array.map((inputString: string) => {
        let textMod: string = inputString;
    
        while (textMod.match(pattern) != null) {
            const match = textMod.match(pattern)[0];
            textMod = textMod.replace(textMod.match(pattern)[0], writtenNumbers[match] + match.at(-1));
        }
    
        convertedInputArray.push(textMod);
    
    });

    return convertedInputArray;
};

//PART 1
const calibrationValues: number[] = [];

inputArray.forEach((entry) => {

    let result: number;
    const numericValuse = entry.match(/\d/g);

    if (numericValuse.length > 1) {
        result = Number(numericValuse[0] + numericValuse.at(-1));
        calibrationValues.push(result);
    } else {
        result = Number(numericValuse[0] + numericValuse[0]);
        calibrationValues.push(result);
    }
})

const calibrationResult = sum(calibrationValues);

console.log('Part 1 answer is: ',calibrationResult);


//PART 2
const correctCalibrationValues: number[] = [];

const convertedInputArray = convertTextToNumber(inputArray);

convertedInputArray.forEach((entry) => {  
    let result: number;
    const numericValuse = entry.match(/\d/g);

    if (numericValuse.length > 1) {
        result = Number(numericValuse[0] + numericValuse.at(-1));
        correctCalibrationValues.push(result);
    } else {
        result = Number(numericValuse[0] + numericValuse[0]);
        correctCalibrationValues.push(result);
    }
})

const correctCalibrationResult = sum(correctCalibrationValues);

console.log('Part 2 answer is: ',correctCalibrationResult);
