const axios = require("axios");

module.exports = async function (url, dbname) {
  const endpoint = `${url}/${dbname}`;
  // console.log(endpoint);

  return new Promise(async (resolve, reject) => {
    if (!dbname || !url) {
      // console.log(endpoint);
      return reject({ ok: false, error: new Error("Invalid params") });
    }

    try {
      const result = await axios.put(endpoint);
      return resolve({ ok: `DB "${dbname}" created.`, error: null });
    } catch (error) {
      // error.response.data =
      // data: {
      //   error: 'file_exists',
      //   reason: 'The database could not be created, the file already exists.'
      // }
      // console.log(error.response);
      if (error.response.status === 412) {
        console.log("db exists");
        return resolve({ ok: `DB "${dbname}" exists.`, error: null });
      } else {
        console.log("other error");
        console.log(error);
        return reject({ ok: false, error: error });
      }
    }
  });
};
