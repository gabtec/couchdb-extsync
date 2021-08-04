#!/usr/bin/env node
const cdbu = require("./index");

const [, , ...args] = process.argv;

// ----- handlers ----------------------------
async function handleRunExtract(args) {
  try {
    await cdbu.runExtract(args);
    process.exit(0);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

async function handleRunSync(args) {
  try {
    await cdbu.runSync(args);
    process.exit(0);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

// ----- cli arguments parser ----------------
if (args.length === 0) {
  cdbu.showUsage();
  process.exit(0);
}

// 1st arg must be "-s || sync", "-e || extract", "-v || version" , "-h || help"
// args.forEach((arg, index) => {
switch (args[0]) {
  case "-e":
  case "extract":
    // MODE = "extract";
    handleRunExtract(args);
    break;
  case "-s":
  case "sync":
    // MODE = "sync";
    handleRunSync(args);
    break;
  case "-v":
  case "version":
    cdbu.showVersion();
    process.exit(0);
    break;
  case "-h":
  case "help":
  default:
    cdbu.showUsage();
    process.exit(0);
    break;
}
// });
// -END---- cli arguments parser ----------------
