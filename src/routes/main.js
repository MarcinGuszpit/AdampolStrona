const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(`
<html>
  <head>
      <meta charset="UTF-8">
  </head>
  <body>
    <h1>To jest główna strona</h1>
  </body>    
</html>
    `);
});

module.exports = router;