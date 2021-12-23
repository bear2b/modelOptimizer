const { exec } = require('child_process');

function compressModel(params) {
  return new Promise((res, rej) => {
    exec(`gltfpack  ${params.compression} -i ${params.inputFile} -o ${params.outputFile}`,
      { shell: true }, (err, stdout, stderr) => {
        if (err) rej(err);
        if (stdout) rej(stdout);
        if (stderr) rej(stderr);
        if (!err && !stderr) res(console.log('Compression finished!'))
      })
  })
 
}

module.exports = compressModel;

