function showUsage() {
  console.log("Package: @gabtec/couchd-utils [bin: cdbu]");
  console.log("Usage: cdbu [MODE] [OPTIONS]");
  console.log("Mode:");
  console.log(
    "  -e | --extract   Extracts ddocs from local developer server, to a json file"
  );
  console.log(
    "  -s | --sync      Sync local ddocs file to remote Couchdb server"
  );
  console.log("Options:");
  console.log(
    "  -C | --config    The config file path (relative to pwd)(only json files suported)"
  );
  console.log("  -E | --env       The .env file path (relative to pwd)");
  console.log("  -d | --database  The database name");
  console.log(
    "  -r | --rename    Rename the source database name on the remote server"
  );
  console.log("  -h | --help      Help");
  console.log("  -v | --version   Script version");
}

module.exports = showUsage;
