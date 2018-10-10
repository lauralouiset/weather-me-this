WEATHER ME THIS!

Built with node.js as a server
API call to Google Maps Geocoding API & Dark Sky API

pseudocode


TO DO

HTML/CSS
- design website, wireframe
- CSS 

JS

SO FAR -- reads coordinates from Google Maps Geocoding API.
-- need to implement second API call.
-- decide which information to extract and where to put it

- repopulate new data into code

- create template engine - CHECK
- read the files - CHECK
- bind the values into files to populate our templates - CHECK 

- use redirection to make the search field work - check
- GET / POST requests - check

- FIX API CALL.

- ERROR HANDLING in both API call functions

- importing es6 modules with import vs require

- get current location option


STRETCH GOALS

- refactor getForecast into es6
https://nodejs.org/api/events.html#events_class_eventemitter
- google places autocomplete

- learn about event emitters
https://medium.com/technoetics/node-js-event-emitter-explained-d4f7fd141a1a
https://www.youtube.com/watch?v=NtrnaTKqFPQ

- compile down to pre-e6 with babel

chaining API calls in Node

https://medium.com/adobetech/how-to-combine-rest-api-calls-with-javascript-promises-in-node-js-or-openwhisk-d96cbc10f299

https://stackoverflow.com/questions/34835940/chain-multiple-node-http-request

https://medium.freecodecamp.org/how-to-write-beautiful-node-js-apis-using-async-await-and-the-firebase-database-befdf3a5ffee

https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c

4+1 ways
https://www.valentinog.com/blog/http-requests-node-js-async-await/



code from scott:

use request-promise

doRequests() {
  let response;
  response = await rp(url1);
  //build 2nd url based on 1st response
  response= await rp(url2);
  //do things with 2nd response
}