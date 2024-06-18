import express from "express";
import fileUpload from "express-fileupload";
import fs, { readFileSync } from "fs";
import pkg from 'elliptic';
import {
  message,
  createDataItemSigner
} from "@permaweb/aoconnect";
import { readBinaryFile, replaceBytes, stringToByteArray, writeBinaryFile } from "./firmware.mjs";
import { fetch, FormData as FD } from 'undici';

// const pinataSDK = require('@pinata/sdk');
import pinataSDK from "@pinata/sdk"
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNjQ0NGM2ZC1jNTQ5LTQ5OGEtYWJkMC05M2Y5MjFiZTYyOGYiLCJlbWFpbCI6ImNyZWVweWRhenplQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyOTM2ZjZiYjg2Mzc5NTRhNDEzMCIsInNjb3BlZEtleVNlY3JldCI6IjNhNDMwYzUyNzA5YTNjYTA1Mzc5ZTFmZmRlYzgzYmNmOWEwZjliNWMwZmM4ZmIxNjgxZDY3MWRlMzliMzFlMzgiLCJpYXQiOjE3MTg3MzIyNTJ9.RKAPSoGBbxbXAG-Ll9r4SGIbjnNPax9yco5M1_3Bs5Y'});


const { ec: EC } = pkg;

const app = express();
var ec = new EC('secp256k1');

const wallet = JSON.parse(
  readFileSync("wallet.json").toString(),
);

const processId = "G6loEk2sBLnczupcyea6dwuldLFIdr9eAK2zzMMZa9Y";
const inputFilePath = "/home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/firmware.bin"; // Path to the input binary file
const outputFilePath = 'output.bin'; // Path to save the modified binary file

const port = 3000;


app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);



app.get("/", (req, res) => {
  console.log("Received GET request to /");
  res.send("Hello World!");
});


app.post("/upload", async (req, res) => {
  console.log("Received POST request to /upload");

  // If no files were uploaded, exit
  if (!req.files) {
    console.log("No files uploaded");
    return res.sendStatus(400);
  }

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  let image = req.files.image;

  // If no image submitted, exit
  if (!image) {
    console.log("No image submitted");
    return res.sendStatus(400);
  }

  // If does not have image mime type prevent from uploading
  if (!/^image/.test(image.mimetype)) {
    console.log("Invalid image mimetype:", image.mimetype);
    return res.sendStatus(400);
  }

  // Add the timestamp to the image name
  image.name = Date.now() + "_" + image.name;

  // Check if the folder exists, if not create it
  if (!fs.existsSync("./images")) {
    fs.mkdirSync("./images");
  }

  // Move the uploaded image to our upload folder
  image.mv("./images/" + image.name);

  console.log("Image uploaded successfully:", image.name);

  const stream = fs.createReadStream("/home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/server/images/" + image.name);
  const pres = await pinata.pinFileToIPFS(stream, {pinataMetadata: {name: image.name}})
  const ipfs_url = "https://jade-content-mollusk-671.mypinata.cloud/ipfs/"+pres.IpfsHash

  

  await message({
    process: processId,
    tags: [
      { name: "Action", value: "RegisterCamera" },
      { name: "MachineID", value: "rzzJsdJhRRjkMh26RxFEwGpzvF2DjyBixfEiWsT52tg" },
      { name: "Url", value: ipfs_url },
      { name: "timestamp", value: "2024-06-18" },
      { name: "signature", value: "12k2302420384902839048902384" },

    ],
    signer: createDataItemSigner(wallet),
  })
    .then(console.log)
    .catch(console.error);


  // All good
  res.sendStatus(200);
});


app.get("/aocam-firmware", async (req, res) => {
  const key = ec.genKeyPair();

  await message({
    process: processId,
    tags: [
      { name: "Action", value: "RegisterCamera" },
      { name: "MachineID", value: key.getPrivate().toString().slice(0, 32) },
    ],
    signer: createDataItemSigner(wallet),
    data: "any data",
  })
    .then(console.log)
    .catch(console.error);

  const searchString = 'CAMMCAMMCAMMCAMMCAMMCAMMCAMMCAMM';
  const replaceString = key.getPrivate().toString().slice(0, 32);
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



  res.send(JSON.stringify({
    "pub": key.getPublic('hex').toString().slice(0, 32),
    "priv": key.getPrivate('hex').toString().slice(0, 32)
  }));
});








app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});