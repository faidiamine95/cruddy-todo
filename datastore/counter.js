const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
  //00000
  //00001
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    // .readFile synchronously reads the entire contents of a file
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    //.writeFile asynchronously writes data to a file, replacing the data that already exists; if no file exists, .writeFile will create it
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
// writeCount must be called inside the callback of readCount to avoid asynchronous function call issues  
  readCounter(readCounterCB = (err, number) => {
    writeCounter((number + 1), writeCounterCB = (err, counterString) => {
      callback(null, counterString);
    });
  });


};


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt'); //creates file path



