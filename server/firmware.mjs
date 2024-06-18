import * as fs from "fs";

export function readBinaryFile(filePath) {
    const buffer = fs.readFileSync(filePath);
    return new Uint8Array(buffer);
}

export function replaceBytes(byteArray, searchBytes, replaceBytesArr) {
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

export function writeBinaryFile(filePath, byteArray) {
    const buffer = Buffer.from(byteArray);
    fs.writeFileSync(filePath, buffer);
}

// Convert string to byte array
export function stringToByteArray(str) {
    const byteArray = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        byteArray[i] = str.charCodeAt(i);
    }
    return byteArray;
}
