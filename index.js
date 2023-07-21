var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// setup multer to handle file uploading
const multer = require('multer');
// use memoryStorage instead of diskStorage for exercise
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSize = req.file.size;
  console.log(fileName, fileType, fileSize);
  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
      });
})
