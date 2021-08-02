module.exports = () => {
  delete process.env.COUCHDB_PROT;
  delete process.env.COUCHDB_USER;
  delete process.env.COUCHDB_PASS;
  delete process.env.COUCHDB_ADDR;
  delete process.env.COUCHDB_PORT;
};
