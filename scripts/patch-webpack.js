const fs = require("fs");
const path = require("path");

const f = path.resolve(
  __dirname,
  "node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js"
);

console.log("start webpack patch to activate crypto");

fs.readFile(f, "utf8", (err, data) => {
  if (err) {
    console.error("Failed to read webpack config:", err);
    process.exit(1);
  }

  if (!data.includes("node: false")) {
    console.log("Patch already applied or target not found.");
    return;
  }

  const result = data.replace(
    /node: false/g,
    "node: {crypto: true, stream: true, fs: 'empty', net: 'empty'}"
  );

  fs.writeFile(f, result, "utf8", (err) => {
    if (err) {
      console.error("Failed to write webpack config:", err);
      process.exit(1);
    }

    console.log("Webpack crypto patch applied successfully.");
  });
});
