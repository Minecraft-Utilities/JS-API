import McUtilsAPI from ".";

const api = new McUtilsAPI();

api.fetchJavaServer("aetheria.cc").then((result) => {
  console.log(result);
});
api.fetchPlayer("ImFascinated").then((result) => {
  console.log(result.player?.skin?.parts.FULLBODY_FRONT);
});