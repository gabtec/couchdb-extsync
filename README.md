# couchdb-extsync

[![Tests CI](https://github.com/gabtec/couchdb-utils/actions/workflows/test.yml/badge.svg)](https://github.com/gabtec/couchdb-utils/actions/workflows/test.yml)

_I renamed to "couchdb-extsync" for npm publish because couchdb-utils was taken and I do not have npm enterprise account_  
_This is why the github project and folder is named couchdb-utils_

## What is couchdb-utils

This is a cli tool to extract design docs from a development CouchDB database to a local dev folder, and the another cli tool to sync thos design docs to a second CouchDB server.

## Installation

### global

```js
$ npm i -g couchdb-extsync
// this will puth "cdbu" command in your /usr/bin

// you can use it like this
$ cdbu -h
```

### local

```js
$ npm i -D couchdb-extsync
// then create a package.json script entry
// e.g. "cdbu": "cdbu"

// you can use it like this
$ cdbu -- [args]
//e.g
$ cdbu -- -h
```

## Dependecies

- node js (developed with v14.17.3 LTS)
- axios
- dotenv

## CLI usage

```js
$ cdbu [MODE] [options]

// extract ddocs
$ cdbu -e -d my_db [-C configs] [-E envs]

// sync ddocs
$ cdbu -s -d my_db [-r new_DB_name] [-C configs] [-E envs]
```

## MODES

```
Modes:
-s | sync    - Sync mode (will copy from local files to remote couchdb server)
-e | extract - Extract mode (will copy from local dev couchdb to local files)
-h | help    - Help
-v | version - Script version
```

## OPTIONS

```
Options:
-d | database - The database name (required with -e and -s options)
-r | rename   - (optional) Will use a diferent database name on the remote server
-C | config   - (optional, but...) Provides a js object OR a path to config json file (e.g. .cdburc.json) (MUST BE JSON)
-E | env      - (optional, but...) Provides a js object OR a path to a env file (e.g. .env).
              - Also reads a connection string from COUCH env (e.g. COUCH=http://admin:password@127.0.0.1:5984)
```

## Defaul Config values

The package will read the configs from "-C" argument.
The argument value may be a path to a json file or a inline javascript object.

If no -C argument is passed, it will try to read a ".cdburc" file in the project root directory (MUST be JSON syntax).

If no -C argument and no ".cdburc" file exists, the package will use this defaults:

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

The package will read the env variables to generate the couchdb connection string.

First it will try to read them from "-E" argument.
The argument value may be a path to a env file as a string, or it can be a javascript object passed inline.

If no -E argument is passed, it will try to read a "COUCH" variable from process.env.
This is the default way used in tests.
e.g.

```
$ export COUCH=http://user:pass@localhost:5984 && cdbu -s ...
```

If no -E argument passed and no COUCH variable exportes, it will try to read a ".env" file from project root directory.
If no -E argument and no ".env" file exists, the package will use this defaults:

```
COUCHDB_PROT = "http";
COUCHDB_USER = "admin";
COUCHDB_PASS = "admin";
COUCHDB_ADDR = "localhost";
COUCHDB_PORT = "5984";
```

## TESTS

If you try to run tests locally, make sure you have a couchdb instance running first.

# AUTHOR

Gabriel Martins _aka Gabtec_

# LICENSE

MIT
