const crypto = require("crypto");
const key = process.env.WEBHOOK_SECRET;

function generateGitHubHmac(payload, key = key) {
  const hmacSignature = crypto
    .createHmac("sha1", key)
    .update(JSON.stringify(payload))
    .digest("hex");

  return `sha1=${hmacSignature}`;
}

module.exports = { generateGitHubHmac };
