function showUsage() {
  console.log("Package: @gabtec/couchd-utils [bin: cdbu]");
  console.log("Usage: cdbu [MODE] [OPTIONS]");
  console.log("Mode:");
  console.log(
    "  -e | extract   Extracts ddocs from local developer server, to a json file"
  );
  console.log(
    "  -s | sync      Sync local ddocs file to remote Couchdb server"
  );
  console.log("  -h | help      Help");
  console.log("  -v | version   Script version");
  console.log("Options:");
  console.log("  -d | database  The database name");
  console.log(
    "  -r | rename    Rename the source database name on the remote server"
  );
  console.log(
    "  -C | config    The path to a config json file, or a inline js object"
  );
  console.log("  -E | env       The path to a env file ");
}

module.exports = showUsage;
