const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promises } = require('fs');
const compressModel = require('./compress');
// const createGLBFile = require('./createGLBFile');
const queryParse = require('./utils/queryParse');

const port = 3000;

const glbStorage = multer.diskStorage({
  // Destination to store models
  destination: __dirname + '/public/models',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  }
});

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
// dest: __dirname + `/public`,
const upload = multer({  storage: glbStorage })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('model'), (req, res) => {

  try {
    const result= req.file;
    return res.json({ ...result, })
  } catch (error) {
    console.error(error);
  }
 
})

app.post('/compress/:path', async (req, res) => {
  try {
    const filePath = 'server/public/models/' +  req.params.path

    if (fs.existsSync(filePath)) {

      if (req.query.hasOwnProperty('-si')) {
        const compressParams = queryParse(req.query);
        const noKHRTexTransform = '-noq ';
        
        const numbs= compressParams.match(/(\d+\.)?\d+/)[0];

        const fileName = req.params.path.match(/^(.+)(\..+)$/)[1] + `_compressed_${numbs}.glb`;
        const outputFilePath = 'server/public/models/' + fileName;
        
        await compressModel(({ compression: noKHRTexTransform + compressParams, inputFile: filePath, outputFile: outputFilePath }));

        // const file = await promises.readFile(outputFilePath);
        
        return res.json({ fileLink: outputFilePath, fileName})
      }
    }
  } catch (e) {
    console.error(e);
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})