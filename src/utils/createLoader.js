import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import {  LoadingManager, REVISION} from "three";

export default function createGLTFLoader(renderer) {
  const MANAGER = new LoadingManager();

  const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`

  const DRACO_LOADER = new DRACOLoader(MANAGER)
    .setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);
  const KTX2_LOADER = new KTX2Loader(MANAGER)
    .setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`);

  const loader = new GLTFLoader(MANAGER)
    .setMeshoptDecoder(MeshoptDecoder)
    .setDRACOLoader(DRACO_LOADER)
    .setKTX2Loader(KTX2_LOADER.detectSupport(renderer))

  return loader;
}