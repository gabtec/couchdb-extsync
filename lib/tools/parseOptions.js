function parseOptions(allArgs) {
  const args = allArgs.slice(1); // removes 1st arg, already tested

  let parser = {};

  const loops = args.length;
  for (let i = 0; i < loops; i++) {
    parser[args[i]] = args[i + 1];
    i++;
  }

  const options = {
    database: parser["-d"] || parser["database"],
    rename: parser["-r"] || parser["rename"],
    pathToEnv: parser["-E"] || parser["env"],
    pathToConfig: parser["-C"] || parser["config"],
  };

  if (!options.database) throw new Error("A database name is required");

  if (["-r", "rename", "-C", "config", "-E", "env"].includes(options.database))
    throw new Error(`"${options.database}" is invalid database name`);

  if (["-d", "database", "-C", "config", "-E", "env"].includes(options.rename))
    throw new Error(`"${options.rename}" is an invalid new database name`);

  if (
    ["-d", "database", "-C", "config", "-r", "rename"].includes(
      options.pathToEnv
    )
  )
    throw new Error(`"${options.pathToEnv}" is invalid path to env file`);

  if (
    ["-d", "database", "-E", "env", "-r", "rename"].includes(
      options.pathToConfig
    )
  )
    throw new Error(`"${options.pathToConfig}" is invalid path to config file`);

  return options;
}

module.exports = parseOptions;
