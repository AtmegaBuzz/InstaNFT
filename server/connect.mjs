import {
    result,
    results,
    message,
    spawn,
    monitor,
    unmonitor,
    dryrun,
  } from "@permaweb/aoconnect";


import { connect } from "@permaweb/aoconnect";



const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
    {
      GATEWAY_URL: "https://specs.g8way.io",
    },
  );

  