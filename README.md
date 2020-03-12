# cruddy-todo
This is a project I completed as a student at [hackreactor](http://hackreactor.com). This project was worked on with a pair.

# SPRINT TWELVE: CRUDDY TO-DO
You are starting with a working Todo list app, but the todo items are stored in memory, so these items get erased each time the server restarts. Your goal is to rewrite the storage layer so that information is saved and loaded to/from the hard drive. To do this, you'll need to make use of callbacks using a callback pattern called [continuation-passing style](https://en.wikipedia.org/wiki/Continuation-passing_style). Additionally, you must follow the [error first callback pattern](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/) that is widely adopted by the nodejs community.

The server is built using ExpressJS, a minimalist web framework for node. The client is a simple single-page application, written in jQuery, and designed with separation of concerns in mind. You need to know almost nothing about Express to start working on this repo. As long as you produce data that has the same shape as supplied by the current datastore API, you will not need to make any modifications to either the server nor the client code.

# Goals

* Dive deeper into Async code using standard nodejs callbacks patterns
* Continue to gain an understanding of RESTful APIs and CRUD
* Learn about promises and how they simplify async callback pattern in nodejs
* Practice ignoring complexity by keeping clear of non-relevant areas of the codebase

# Basic Requirements

Most of your work will be done in *datastore/index.js*, but a small amount of work will be done in *datastore/counter.js*. Remember it's imperative that you always return the same data/shape in the refactored version of the code as was present when you started working on this sprint. Tests are provided to help guide you along.

Note: While node offers "sync" versions of many filesystem functions, you may not use these in the sprint solution. ONLY USE ASYNC FUNCTIONS.

**Unique Identifier**

All todo entries are identified by an auto-incrementing *id.* Currently, that *id* is a counter stored in memory. Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts. Do this by rewriting *getNextUniqueId* to make use of the provided *readCounter* and *writeCounter* functions.

**Creating New Todos**

The next step is to start saving new todos on the hard drive by refactoring create. **Each new todo entry must be saved in its own file.** Use the unique *id* generated by *getNextUniqueId* to create a file path inside the *dataDir.* Each time a POST request is made to the collection route, save a file with the todo item in this folder. **Only save the todo text in the file**, the id of the todo item is encoded into its filename -- **DO NOT STORE AN OBJECT.**

Verify this is working by checking to see:

* The value that is saved in *counter.txt* increases with each new todo item created
* The number of files in *dataDir* increases with each new todo item created
* The contents of each file contain only the text of that todo item

**Retrieving all Todos**

Next, refactor the *readAll* function by returning an array of todos to client app whenever a GET request to the collection route occurs. To do this, you will need to read the *dataDir* directory and build a list of files. Remember, the id of each todo item is encoded in its filename.

**VERY IMPORTANT: at this point in the basic requirements, do not attempt to read the contents of each file that contains the todo item text.** Failing to heed this instruction has the potential to send you down a rabbit hole.

Please note, however, you must still include a text field in your response to the client, and it's recommended that you use the message's id (that you identified from the filename) for both the *id* field and the *text* field. Doing so will have the effect of changing the presentation of your todo items for the time being; we'll address this issue shortly.

**Retrieving one Todo**

Next, refactor the *readOne* to read a todo item from the *dataDir* based on the message's id. For this function, **you must read the contents of the todo item file** and respond with it to the client.

You'll know you've correctly written this function because when you click edit on the UI, you'll see the todo text in the popup window.

**Updating a Todo**

Next, refactor the update function to rewrite the todo item stored in the dataDir based on its id.

You'll know this is working because you'll be able to save the edited todo item and upon subsequent clicks of the edit button, the changes will persist. You should also confirm the counter isn't changing between updates. Refreshing the page should also show the updated todo.

**Deleting a Todo**

Lastly, refactor the *delete* function to remove the todo file stored in the *dataDir* based on the supplied *id.*

You'll know this is working because when you refresh the page, the delete todo item will no longer be present.

**Finish fixing readAll**

At this point, it's time to circle back to finishing your work on *readAll.* You should first find the test for *readAll* and refactor it to expect the correct todo *text* instead of the *id.* Next, you'll need to refactor the function. Because each todo entry is stored in its own file, you'll end up with many async operations (n files = *n* async operations) that all need to complete before you can respond to the API request. This poses a significant challenge: your next task is to read up on promises to see how they can help you. (Hint, you'll very likely need to make use of *Promise.all.*)

Learn about promises by completing the 'Bare Minimum Requirements' of **[Course] Promises.** Then come back to this course and complete *readAll.*

# Advanced Content
* Refactor all the read/write functions in datastore/index.js and datastore/counter.js to make use of promises.
* Modify the datastore so that it stores additional fields for every todo entry, such as createTime and updateTime, which are date-time timestamps
* Allow the items to be re-ordered in the UI; ordering should be persisted.
* Add ReactJS and Webpack to the project, refactor the client to be a ReactJS app.
* Refactor readAll to use an Observable which has its content sourced from dataDir. Then, reuse the Observables to reimplement readOne.
* Replace the dataDir with a key-value datastore such as Redis.
