module.exports = (express, connection) => {
  var router = express.Router();
  // Router Middleware
  router.use((req, res, next) => {
    // log each request to the console
    console.log("You have hit the /api", req.method, req.url);

    // Remove powered by header res.set('X-Powered-By', ''); // OLD WAY
    // res.removeHeader("X-Powered-By"); // OLD WAY 2 See bottom of script for
    // better way CORS
    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // we can use this later to validate some stuff continue doing what we were
    // doing and go to the route
    next();
  });

  router.get('/', (req, res) => {
    res.jsonp({name: 'oriens UAT API', version: '1.0'});
  });

  // COLLECTION ROUTES
  router.route('/unit')
  //we can use .route to then hook on multiple verbs
    .post((req, res) => {
    var data = req.body; // maybe more carefully assemble this data
    console.log(req.body)
    var query = connection.query('INSERT INTO isteer_unit SET ?', [data], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
      } else {
        res.status(201);
        res.location('/api/unit/' + result.insertId);
        res.end();
      }
    });
    console.log(query.sql);
  }).get((req, res) => {
    var query = connection.query('SELECT * FROM isteer_unit', (err, rows, fields) => {
      if (err) 
        console.error(err);
      
      res.jsonp(rows);
    });
    console.log(query.sql);
  })

  //We do NOT do these to the collection
    .put((req, res) => {
    //res.status(404).send("Not Found").end();
    res.sendStatus(404);
  }).patch((req, res) => {
    res.sendStatus(404);
  }).delete((req, res) => {
    // LET's TRUNCATE TABLE..... NOT!!!!!
    res.sendStatus(404);
  });
  //end route
  return router;
}