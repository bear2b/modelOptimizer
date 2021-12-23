// window.reduceTextureSizes = reduceTextureSizes

// For future maybe will help

// export function reduceTextureSizes(scene) {
//   scene.traverse(function (object) {
//     if (object.material && object.material.map) {
//       reduceTexture(object.material, 512, 512);
//     }
//     scene.name = "SceneReducedTexture"
//   });

//   console.log('reduce ', scene);
// }
// function reduceTexture(material, w, h, ratio = 1) {
//   const texture = material.map;
//   // const flipY = texture.flipY
//   const image = texture.image;
//   var can = document.createElement('canvas');
//   var canvas = can;
//   can.width = w * ratio;
//   can.height = h * ratio;
//   var context = canvas.getContext('2d', { antialias: false })

//   if (image !== undefined && image.width > 0) {
//     canvas.title = texture.sourceFile;
//     const scale = canvas.width / image.width;
//     console.log(material.map)
//     console.log("Scale " + scale)
//     if (image.data === undefined) {
//       context.drawImage(image, 0, 0, image.width * scale, image.height * scale);
//     } else {
//       const canvas2 = renderToCanvas(texture);
//       context.drawImage(canvas2, 0, 0, image.width * scale, image.height * scale);
//     }
//   }
//   var reducedTexture = new THREE.CanvasTexture(canvas)
//   // reduceTexture.flipY = flipY
//   reducedTexture.needsUpdate = true;
//   material.map = reducedTexture;
//   return;
// }

// function renderToCanvas(texture) {
//   if (renderer === undefined) {
//     renderer = new THREE.WebGLRenderer();
//     renderer.outputEncoding = THREE.sRGBEncoding;
//   }
//   const image = texture.image;
//   renderer.setSize(image.width, image.height, false);
//   const scene = new THREE.Scene();
//   const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
//   const material = new THREE.MeshBasicMaterial({ map: texture });
//   const quad = new THREE.PlaneGeometry(2, 2);
//   const mesh = new THREE.Mesh(quad, material);
//   scene.add(mesh);
//   renderer.render(scene, camera);
//   return renderer.domElement;
// }