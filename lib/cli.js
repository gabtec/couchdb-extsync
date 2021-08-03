#!/usr/bin/env node
const cdbu = require("./index");

const [, , ...args] = process.argv;

// let MODE, DATABASE, NEW_DATABASE, CONFIG_FILE, ENV_FILE;

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
    cdbu.runExtract(args);
    break;
  case "-s":
  case "sync":
    // MODE = "sync";
    cdbu.runSync(args);
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
