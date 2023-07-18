import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  mode: "production",
  target: "node",
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      '.js': ['.ts', '.js']
    },
  },
  output: {
    filename: "bundle.cjs",
    path: path.resolve(__dirname, "dist")
  }
}

export default config;