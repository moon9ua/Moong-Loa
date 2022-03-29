const prod = process.env.NODE_ENV === "production";
const name = "Moong-Loa";

module.exports = {
  "process.env.BACKEND_URL": prod ? `/${name}` : "",
};
