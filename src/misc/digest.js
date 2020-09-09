const crypto = require("crypto");
const randomObj = {
  main: true,
  hobbies: ["dsd", 23],
};
const key = "dsds";

const token = crypto
  .createHmac("sha1", key)
  .update(JSON.stringify(randomObj))
  .digest("hex");
console.log(token);
