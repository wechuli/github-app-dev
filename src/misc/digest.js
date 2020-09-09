const crypto = require("crypto");
let key = process.env.WEBHOOK_SECRET;

function generateGitHubHmac(payload, key) {
  const hmacSignature = crypto
    .createHmac("sha1", key)
    .update(JSON.stringify(payload))
    .digest("hex");

  return `sha1=${hmacSignature}`;
}

console.log(generateGitHubHmac({ me: "dfdf" }, "ddsd"));
