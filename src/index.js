import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import exportGLTF from './utils/exportGLTF';
import { exportModelToServer } from './utils/exportModelToServer';
import importGLBModel from './utils/importGLBModel';
import { parseModelToScene } from './utils/parseModelToScene';
import calculateFileSize from './utils/calculateFileSize';

export const COMP_OBJ_NAME = 'CompressedModel';
export const COMP_OBJ_HELPER_NAME = 'CompressedModelHelper';
export const UNCOMP_OBJ_NAME = 'ModelFromFile';
export const UNCOMP_OBJ_HELPER_NAME = 'ModelFromFileHelper';

let container;
let camera, cameraPosZoomZ, model, object, object2, material, geometry, scene1, scene2compressed, renderer, orbitControl;
let gridHelper, gridHelper2, sphere, waltHead;
let fileModel;
let UNCOMP_MODEL_NAME;

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

// const downloadLink = document.getElementById('download_model');

const btnImport = document.getElementById('import_model');
const btnExportScene = document.getElementById('export_scene');
const reductionOutput = document.getElementById('model_redu');
reductionOutput.innerText = '0.1'
const rendererTriangles = document.getElementById('model_nb_triangles');
const modelSize = document.getElementById('model_size');
// const compressedModelSize = document.getElementById(`compressed_model_size`);
const btnCompress = document.getElementById('btn_compress');
const selectModels = document.getElementById('redu_models');
// const compressedModelTriangles = document.getElementById(`compressed_model_nb_triangles`);

init();
animate();

document.getElementById('option_max_reduction')
  .addEventListener('input', (ev) => {
    reductionOutput.innerText = ev.target.value;
  } )

btnExportScene.addEventListener('click', function () {
  const model = scene2compressed.getObjectByName(COMP_OBJ_NAME);

  // reduceTextureSizes(model)
  exportGLTF(link, model);
  });

btnImport.addEventListener('change',
    async (ev) => {
      const model = scene1.getObjectByName(UNCOMP_OBJ_NAME);
      const helper = scene1.getObjectByName(UNCOMP_OBJ_HELPER_NAME);

      if (model && helper) {
        scene1.remove(model);
        scene1.remove(helper);
        animate();
      }
      fileModel = ev.target.files[0];
      
      const res = await importGLBModel({
        fileModel,
        scene1, 
        renderer, 
      });


      modelSize.innerText = calculateFileSize(res.size);
      UNCOMP_MODEL_NAME = res.filename;

      ev.target.value = '';
    });


selectModels.addEventListener('change', (ev) => {

  const model = scene2compressed.getObjectByName(COMP_OBJ_NAME);
  const helper = scene2compressed.getObjectByName(COMP_OBJ_HELPER_NAME);

  if(model && helper) {
    scene2compressed.remove(model); 
    scene2compressed.remove(helper); 
    animate();
  }
  
  const modelPath = ev.target.value;
  downloadLink.href = modelPath;
  parseModelToScene(modelPath, renderer, scene2compressed);
})

btnCompress.addEventListener('click', async () => {

  const model = scene2compressed.getObjectByName(COMP_OBJ_NAME);
  const helper = scene2compressed.getObjectByName(COMP_OBJ_HELPER_NAME);
  
  if(model && helper) {
    scene2compressed.remove(model); 
    scene2compressed.remove(helper); 
    animate();
  }

  const { fileLink } = await exportModelToServer(UNCOMP_MODEL_NAME, reductionOutput.innerText, selectModels);

  // compressedModelSize.innerText =  calculateFileSize(file.byteLength);
  parseModelToScene(fileLink, renderer, scene2compressed);
})

function init() {
  console.log("init")
  container = document.createElement('div');
  document.body.appendChild(container);

  
  // const gradientTexture = createGradient();

  // ---------------------------------------------------------------------
  // Scenes
  // ---------------------------------------------------------------------
  scene1 = new THREE.Scene();
  const backColor = new THREE.Color(0x505050);
  scene1.background = backColor;
  scene1.name = 'Scene1';

  scene2compressed = new THREE.Scene();
  scene2compressed.name = 'Scene2compressed';
  scene2compressed.translateX(520);
  
  // ---------------------------------------------------------------------
  // Perspective Camera
  // ---------------------------------------------------------------------
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(600, 400, 0);

  camera.name = "PerspectiveCamera";
  cameraPosZoomZ = scene1.position;
  scene1.add(camera);

  // ---------------------------------------------------------------------
  // Ambient light
  // ---------------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  ambientLight.name = 'AmbientLight';
  scene1.add(ambientLight);

  const ambientLight2 = new THREE.AmbientLight(0xffffff, 2);
  ambientLight2.name = 'AmbientLight 2';
  scene2compressed.add(ambientLight2);
  // ---------------------------------------------------------------------
  // DirectLight
  // ---------------------------------------------------------------------
  const dirLight = new THREE.DirectionalLight(0xFFFFFF, 10);
  dirLight.name = 'DirectionalLight';
  // dirLight.target.position.set(-3000, 5000, 5000);
  dirLight.add(dirLight.target);
  dirLight.target.position.set(-3000, 5000, - 1);
  dirLight.lookAt(100, 500, 100);
  scene1.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 10);
  dirLight2.name = 'DirectionalLight 2';
  // dirLight.target.position.set(-3000, 5000, 5000);
  dirLight2.add(dirLight.target);
  // dirLight2.target.position.set(0, 10000, - 1);
  dirLight2.lookAt(0, 0, 0);
  scene2compressed.add(dirLight2);

  // ---------------------------------------------------------------------
  // Grid
  // ---------------------------------------------------------------------

  gridHelper = new THREE.GridHelper(500, 20, 0x888888, 0x444444);
  gridHelper.position.y = - 50;
  gridHelper.name = "Grid";
  scene1.add(gridHelper);

  gridHelper2 = new THREE.GridHelper(500, 20, 0xaabb55, 0xaabb99);
  gridHelper2.position.y = - 50;
  gridHelper2.name = "Grid 2";
  scene2compressed.add(gridHelper2);

  // ---------------------------------------------------------------------
  // Axes
  // ---------------------------------------------------------------------
  const axes = new THREE.AxesHelper(400);
  axes.name = "AxesHelper";
  const axes1 = new THREE.AxesHelper(400);
  axes1.name = "AxesHelper";
  scene1.add(axes);
  scene2compressed.add(axes1);

  // ---------------------------------------------------------------------
  // OrbitControls
  // ---------------------------------------------------------------------

  function createOrbitControl() {
    orbitControl = new OrbitControls(camera, container);
  }

  createOrbitControl()

 
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  rendererTriangles.innerText = renderer.info.render.triangles;
  // const timer = Date.now() * 0.0005;

  // camera.position.x = Math.cos(timer) * 800;
  // camera.position.z = Math.sin(timer) * 800;
  // camera.position.x = 510;
  // camera.position.z = 510;

  camera.lookAt(scene1.position);
  orbitControl.update()
  renderer.autoClear = false;

  renderer.render(scene1, camera);
  renderer.render(scene2compressed, camera);
}


