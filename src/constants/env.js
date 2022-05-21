const isLive = false;
let api_base_uri = "http://192.168.1.33/Nettpage/api/version_1_0";
if (isLive) {
  api_base_uri = "http://192.168.1.33/Nettpage/api/version_1_0";
}
export default {
  isLive,
  api_base_uri,
};
