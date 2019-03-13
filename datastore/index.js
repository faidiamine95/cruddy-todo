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
        callback(err); // so that the callback knows not to run with 'null' as the err argument
      } else {
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
      callback(err);
    } else {
      var mappedData = _.map(data, (value) => ({id: value.slice(0, 5), text: value.slice(0, 5)}));
      // console.log(mappedData);
      callback(null, mappedData);
    }
  });
};

exports.readOne = (id, callback) => {

  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, fileContents) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {id, text: fileContents.toString()});
    }
  });
}; 

//exports.dataDir + '/' + id + '.txt'

exports.update = (id, text, callback) => {
//   var item = items[id];
//   if (!item) {
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     items[id] = text;
//     callback(null, { id, text });
//   }
// };

  fs.access(`${exports.dataDir}/${id}.txt`, fs.F_OK, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }  
      });    
    }  
  });
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  fs.access(`${exports.dataDir}/${id}.txt`, fs.F_OK, (err) => {

    if (err) {
      callback(err);
      return;
    }

    fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
      if (err) {
        callback(err);
      }
      callback();
    });
  });
}
//i: id, callback
//o: no output, abscence of input id file- should delete todo
//c:
//e:

// use fs.unlink to delete file



// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

