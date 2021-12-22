const fs = require('fs');

function createGLBFile(bufferData) {
  const path = __dirname + '/models/model.glb';
  return new Promise(((resolve, reject) => {
    fs.writeFile(path, bufferData, (err) => {
      if (err) reject(console.log(err))
      else {
        resolve(console.log("File written successfully!\n"))
      }
    });
  }))

}

module.exports = createGLBFile