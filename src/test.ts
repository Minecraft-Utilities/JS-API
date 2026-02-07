import McUtilsAPI from ".";

const api = new McUtilsAPI();

api.fetchServerRegistryEntries("wild").then((result) => {
  console.log(result);
});