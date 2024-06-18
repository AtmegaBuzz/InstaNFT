import {
    result,
    results,
    message,
    spawn,
    monitor,
    unmonitor,
    dryrun,
    createDataItemSigner
  } from "@permaweb/aoconnect";

import {readFileSync} from "fs"



const wallet = JSON.parse(
    readFileSync("wallet.json").toString(),
);



await message({
    process: "G6loEk2sBLnczupcyea6dwuldLFIdr9eAK2zzMMZa9Y",
    tags: [
      { name: "Action", value: "RegisterCamera" },
      { name: "MachineID", value: "0x12345" },
    ],
    signer: createDataItemSigner(wallet),
    data: "any data",
  })
    .then(console.log)
    .catch(console.error);