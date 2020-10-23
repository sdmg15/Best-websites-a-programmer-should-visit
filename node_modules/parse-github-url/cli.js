#!/usr/bin/env node

var gh = require('./');

if (!process.argv[2]) {
  process.stderr.write('Error: URL must be provided as first argument\n');
  process.exit(1);
}
var res = gh(process.argv[2]);
if (res == null) {
  process.stderr.write('Error: Invalid parameter: ' + process.argv[2] + '\n');
  process.exit(1);
}
process.stdout.write(JSON.stringify(res, null, 2) + '\n');
