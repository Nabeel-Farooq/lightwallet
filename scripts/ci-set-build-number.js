const fs = require("fs");
const path = require("path");

const appServiceFile = path.resolve(
  __dirname,
  "./src/app/services/app.service.ts"
);

const {
  TRAVIS_BUILD_NUMBER,
  TRAVIS_BUILD_WEB_URL,
  TRAVIS_COMMIT,
} = process.env;

console.log(
  `set ci info for build number ${TRAVIS_BUILD_NUMBER} on ${TRAVIS_BUILD_WEB_URL}`
);

fs.readFile(appServiceFile, "utf8", (err, data) => {
  if (err) {
    console.error("Failed to read file:", err);
    process.exit(1);
  }

  let result = data;

  result = result.replace(
    /readonly ci_number = ''/g,
    `readonly ci_number = '${TRAVIS_BUILD_NUMBER || ""}'`
  );

  result = result.replace(
    /readonly ci_link = ''/g,
    `readonly ci_link = '${TRAVIS_BUILD_WEB_URL || ""}'`
  );

  result = result.replace(
    /readonly ci_commit = ''/g,
    `readonly ci_commit = '${TRAVIS_COMMIT || ""}'`
  );

  fs.writeFile(appServiceFile, result, "utf8", (err) => {
    if (err) {
      console.error("Failed to write file:", err);
      process.exit(1);
    }

    console.log("CI information updated successfully.");
  });
});
