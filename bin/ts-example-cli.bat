@echo off

set NODE_NO_WARNINGS=1
node --experimental-modules dist/node.js %*

