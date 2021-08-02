# @gabtec/couchdb-utils

## What is couchdb-utils

This is a cli tool to extract design docs from a development CouchDB database to a local dev folder, and the another cli tool to sync thos design docs to a second CouchDB server.

## Intallation

WIP: not yet published in npm, but will be something like this

```js
$ npm i  gabtec/couchdb-utils
```

until not on npm

```js
$ cd projectFolder
$ npm init
$ npm i  gabtec/couchdb-utils
$ npm link
```

## Uninstall

```js
$ npm uninstall gabtec/couchdb-utils
or
$ npm unlink cdbu
```

## Dependecies

. node js (tested with v14.17.3 LTS)
. axios
. dotenv

## CLI usage

```js
$ cdbu [MODE] [options]

// extract ddocs
$ cdbu -e -d my_db [-C configs] [-E envs]

// sync ddocs
$ cdbu -s -d my_db [-r new_DB_name] [-C configs] [-E envs]
```

## MODES

```js
Modes:
-s | sync    - Sync mode (will copy from local files to remote couchdb server)
-e | extract - Extract mode (will copy from local dev couchdb to local files)
-h | help    - Help
-v | version - Script version
```

## OPTIONS

```js
Options:
-d | database - The database name (required with -e and -s options)
-r | rename   - (optional) Will use a diferent database name on the remote server
-C | config   - (optional, but...) Provides a js object OR a path to config json file (e.g. .cdburc.json) (MUST BE JSON)
-E | env      - (optional, but...) Provides a js object OR a path to a env file (e.g. .env)
```

## Defaul Config values

If no config file is passed, the lib uses this default values

```js
{
  "workDir": "process.cwd()",
  "outputFolder": "couchdb",
  "keepRevs": true,
}
```

### options

**workDir** - dir where to store the folder with the ddocs files (default is cwd, the dir from were script is called)
**outputFolder** - dir to be created inside workDir, to store the ddocs files (default is couchdb)
**keepRevs** - true = will sync to the new couchdb instance and keep ddocs \_rev (better to version controll), false=will reset \_rev (default is true)

## Default Env variables

By default it looks for a .env file in workDir.
If no env file is found or passed with "-E /path/to/env" argument,
they will default to localhost cenário, like this:
The script will use thia envs to generate a database connection string.

```js
COUCHDB_PROT = "http";
COUCHDB_USER = "admin";
COUCHDB_PASS = "admin";
COUCHDB_ADDR = "localhost";
COUCHDB_PORT = "5984";
```
