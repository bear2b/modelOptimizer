import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

export default function exportGLTF(link, input) {

  const gltfExporter = new GLTFExporter();

  const options = {
    trs: document.getElementById('option_trs').checked,
    onlyVisible: document.getElementById('option_visible').checked,
    truncateDrawRange: document.getElementById('option_drawrange').checked,
    binary: document.getElementById('option_binary').checked,
    maxTextureSize: Number(document.getElementById('option_maxsize').value) || Infinity // To prevent NaN value
  };
  
  gltfExporter.parse(input, function (result) {
    if (result instanceof ArrayBuffer) {
      saveArrayBuffer(link, result, 'scene.glb');
    } else {
      const output = JSON.stringify(result, null, 2);
      saveString(link,output, 'scene.gltf');
    }

  }, (err) => {
    console.error(err);
  }, options);
}

function save(link, blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString(link, text, filename) {
  save(link, new Blob([text], { type: 'text/plain' }), filename);
}


function saveArrayBuffer(link, buffer, filename) {
  save(link, new Blob([buffer], { type: 'application/octet-stream' }), filename);
}
