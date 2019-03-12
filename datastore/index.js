const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = { 
  // '00001': 'wake up';
};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  //removed var id in order to use the counterString from getNextUniqueId
  counter.getNextUniqueId((err, id) => {
    //will get the counterString from the counter.js file
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err, res) => {
      //created the file in the testData directory in order to pass tests
      if (err) {
        console.log (`ERROR: ${err}`);
        callback(err); // so that the callback knows not to run with 'null' as the err argument
      } else {
        console.log('File was created successfully');
        items[id] = text; // adds the key/value pair to the items object at the top of this file
        callback(null, { id, text }); //runs the callback with an object containing the id and text as the response argument
      }
    });
  });
};
  

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  fs.readdir(exports.dataDir, (err, data) => {
    if (err) {
      console.log(`ERROR: ${err}`);
      callback(err);
    } else {
      var mappedData = _.map(data, (value) => ({id: value.slice(0, 5), text: value.slice(0, 5)}));
      console.log(mappedData);
      callback(null, mappedData);
    }
  });
  

  // i: callback function
  // o: array of todos (that we'll send to the client via GET request)
  // c: do not attempt to read the contents of each file that contains todo item text- DON'T DO IT!
  //  must include a text field in your response to the client, use the message's id for both the id field and the text field 
  // e: no todos should return an empty array

  //justification: to create a route to the collection of todos. Create a way to access all todos
  //explanation: readAll accepts a callback, maps the data to key,value pairs, and then runs a callback on those key value pairs. at some point, we need to put the data in an array

  //pseudo code
  //  1. use fs.readdir to access the contents of the directory and put them into an array
  //  console.log the data to see what it looks like
  //  2. map over the list, and create an object where id and text are both set equal to the file name string
  //regex to remove .txt from the key, value pairs


};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

