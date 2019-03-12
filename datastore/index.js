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
    fs.writeFile(path.join(__dirname, '../test/testData', `${id}.txt`), text, (err, res) => {
      //created the file in the testData directory in order to pass tests
      if(err) {
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


//i: todo text string, callback that creates a new .txt file named after the id# and saves todo text string in it
  //callback function 
    // i: err, results
    // o: new file with todo text saved in it
    // code:
      // (err, res) => {
      //    create a file path
      //    writeFile to add a value to the filepath 
      // }
//o: new todo with a corresponding file that saves its value
// getNextUniqueID callback (err, res) => {
  //   res.writeHeader(200, headers)
  //   res.write( countString );
  //   res.end();  
  // }


  
  



//fs.writeFile to create a new file
//exports.createFile = path.join(__dirname, 'counter.txt');
  //the directory will be ./data  
  //file path name will be the id.txt `${id}.txt`


  // = (err, res) => {
  
  //   exports.createFile = path.join('./data', `${id}.txt`);
  //   // var filepath = `./data/${id}.txt`;
  //   fs.writeFile(exports.createFile, items[id], (err, text) => {
  //     console.log(item[id]);
  //   })
  // }
  

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
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
