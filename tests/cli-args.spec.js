const expect = require("chai").expect;
const exec = require("child_process").exec;

const cmd = "node lib/cli.js";

describe("CouchDB Utils - CLI Test Suite", () => {
  it("should output help if no args passed", (done) => {
    exec(cmd, (err, stdout) => {
      expect(stdout).to.include("Usage: cdbu [MODE] [OPTIONS]");
      done();
    });
  });

  it("should output help if no args recognized", (done) => {
    exec(cmd.concat(" -x"), (err, stdout) => {
      expect(stdout).to.include("Usage: cdbu [MODE] [OPTIONS]");
      done();
    });
  });

  it("should output help when 1st arg -h", (done) => {
    exec(cmd.concat(" -h"), (err, stdout) => {
      expect(stdout).to.include("Usage: cdbu [MODE] [OPTIONS]");
      done();
    });
  });

  it("should output help when 1st arg --help", (done) => {
    exec(cmd.concat(" help"), (err, stdout) => {
      expect(stdout).to.include("Usage: cdbu [MODE] [OPTIONS]");
      done();
    });
  });

  it("should output version when 1st arg -v", (done) => {
    exec(cmd.concat(" -v"), (err, stdout) => {
      expect(stdout).to.include("Version: @gabtec/couchd-utils");
      done();
    });
  });

  it("should output version when 1st arg version", (done) => {
    exec(cmd.concat(" version"), (err, stdout) => {
      expect(stdout).to.include("Version: @gabtec/couchd-utils");
      done();
    });
  });

  it("should call runExtract when 1st arg -e", (done) => {
    exec(cmd.concat(" -e"), (err, stdout) => {
      expect(stdout).to.include("Mode: extract started...");
      done();
    });
  });

  it("should call runExtract when 1st arg extract", (done) => {
    exec(cmd.concat(" extract"), (err, stdout) => {
      expect(stdout).to.include("Mode: extract started...");
      done();
    });
  });

  it("should call runSync when 1st arg -s", (done) => {
    exec(cmd.concat(" -s"), (err, stdout) => {
      expect(stdout).to.include("Mode: sync started...");
      done();
    });
  });

  it("should call runSync when 1st arg sync", (done) => {
    exec(cmd.concat(" sync"), (err, stdout) => {
      expect(stdout).to.include("Mode: sync started...");
      done();
    });
  });

  // it.only("should call runExtract() when option -e and -d db", (done) => {
  //   const cmd = "cdbu -e -d xpto_db";
  //   const spy = sinon.spy(tools, "runExtract");
  //   exec(cmd, (err, stdout) => {
  //     console.log(spy.callCount);
  //     // expect(spy).to.have.been.call;
  //     expect(spy.callCount).to.be.eq(1);
  //     done();
  //   });
  // });
  // it("should call runExtract() when option -e and -d db", (done) => {
  //   const cmd = "cdbu -e -d xpto_db";
  //   exec(cmd, (err, stdout) => {
  //     expect(stdout).to.include(
  //       "Action: dev db to local files ddocs extraction process"
  //     );
  //     done();
  //   });
  // });
  // it("should call runSync() when option -s and -d db", (done) => {
  //   const cmd = "cdbu -s -d xpto_db";
  //   exec(cmd, (err, stdout) => {
  //     expect(stdout).to.include("Action: local to remote sync process");
  //     done();
  //   });
  // });
});
