const crypto = require("crypto");

function generateGitHubHmac(payload, key) {
  const hmacSignature = crypto
    .createHmac("sha1", key)
    .update(JSON.stringify(payload))
    .digest("hex");

  return `sha1=${hmacSignature}`;
}

module.exports = { generateGitHubHmac };
