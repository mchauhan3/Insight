const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/user/:id', function(req, res) {
  console.log('req_rec');
  const { spawn } = require('child_process');
  var id = req.params.id;
  const pyProg = spawn('python', ['./../test.py', id]);

  pyProg.stdout.on('data', function(data) {
    fs.readFile('./data.json', 'utf8', function(err, ret) {
      if (err) throw err;
      else {
        var obj = JSON.parse(ret);
        res.json(obj);
      }
    })
  });
});

module.exports = router;
