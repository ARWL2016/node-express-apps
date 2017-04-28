#### bookRoutes.js 
- the bookRouter object is returned from the express.Router() function.  
- We create a function `router` to in which we will define the specific routes belonging to the book link. 
- We use the route('/').get() which seems to be functionally equivalent to app.get('/'). Notice that inside the bookRoutes, we now have a new root expressed as '/'. 
- On app.js, we have an array of objects representing our navigation links. These can be passed to the ejs render. 
- On app.js we require the router function in but at the same time call the function with the nav parameter. 
 
