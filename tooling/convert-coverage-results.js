'use strict';

const loadCoverage = require('remap-istanbul/lib/loadCoverage');
const remap = require('remap-istanbul/lib/remap');
const writeReport = require('remap-istanbul/lib/writeReport');
const path = require('path');

var source = path.join(__dirname, '../', 'coverage/coverage-final.json');
var destination = path.join(__dirname, '../', 'coverage/lcov.info');
var collector = remap(loadCoverage(source));

writeReport(collector, 'lcovonly', null, destination).then(function() {
  console.log('Coverage converted!!');
}).catch((error) => {
  console.error('Error converting coverage: ', error);
});


