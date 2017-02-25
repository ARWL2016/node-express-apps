###Technology Analysis 

####Application Structure 
- Static files are served from the public folder. This includes user css and js plus vendors. 
- The application root is index.ejs, which is served by app.get() at the root.  

####View Engine
- Only two lines are needed to set the view engine, giving the folder and the extension.   
- ejs uses `<% %>` to wrap js and `<%= %>` to wrap variables.  
