import * as THREE from 'three';

export function calcCameraDist(object, camera) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  object.position.x += (object.position.x - center.x);
  // object.position.y += (object.position.y - center.y);
  object.position.z += (object.position.z - center.z);

  // controls.maxDistance = size * 10;
  // camera.zoom = 0.05;
  camera.near = size / 100;
  camera.far = size * 100;
  camera.lookAt(center);
  camera.updateProjectionMatrix();
  console.log(center);
  return center;
}

export const getCamDistancetoFitCameraToObject = function (camera, object, offset) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject(object);
  const size = boundingBox.getSize(new THREE.Vector3());
  // get the max side of the bounding box (fits to width OR height as needed )
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / (Math.tan(fov / 2))) + boundingBox.max.z;
  cameraZ *= offset; // zoom out a little so that objects don't fill the screen
  console.log('camera z : ',  cameraZ);
  return cameraZ;
}