import * as fs from "fs";

function readBinaryFile(filePath) {
    const buffer = fs.readFileSync(filePath);
    return new Uint8Array(buffer);
}

function replaceBytes(byteArray, searchBytes, replaceBytesArr) {
    const searchLength = searchBytes.length;
    const replaceLength = replaceBytesArr.length;

    for (let i = 0; i < byteArray.length - searchLength + 1; i++) {
        let match = true;
        for (let j = 0; j < searchLength; j++) {
            if (byteArray[i + j] !== searchBytes[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            console.log(`Found sequence at index ${i}`);
            byteArray.set(replaceBytesArr, i);
            i += replaceLength - 1; // Skip past the replaced sequence
        }
    }
}

function writeBinaryFile(filePath, byteArray) {
    const buffer = Buffer.from(byteArray);
    fs.writeFileSync(filePath, buffer);
}

const inputFilePath = process.env.FIRMWARE_BIN; // Path to the input binary file
const outputFilePath = 'AOcam.bin'; // Path to save the modified binary file

// Convert string to byte array
function stringToByteArray(str) {
    const byteArray = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        byteArray[i] = str.charCodeAt(i);
    }
    return byteArray;
}

// Define search and replace bytes
const searchString = 'CAMMCAMMCAMMCAMMCAMMCAMMCAMMCAMM';
const replaceString = 'CAMTCAMTCAMTCAMTCAMTCAMTCAMTCAMT';
const searchBytes = stringToByteArray(searchString);
const replaceBytesArr = stringToByteArray(replaceString);

// Main workflow
try {
    const byteArray = readBinaryFile(inputFilePath);
    replaceBytes(byteArray, searchBytes, replaceBytesArr);
    writeBinaryFile(outputFilePath, byteArray);
    console.log('File processing complete. Output saved as:', outputFilePath);
} catch (error) {
    console.error('An error occurred:', error);
}
