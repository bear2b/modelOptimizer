import * as THREE from "three/build/three.module"

function deleteObject(node) {
  //console.log("deleteObject "+node.uuid+node.name)
  if (node.geometry) {
    node.geometry.dispose();
  }
  if (node.boneTexture) {
    node.boneTexture.dispose();
  }
  if (node.gif) {
    node.gif.pause()
    node.gif.clear()
    delete node.gif.canvas
    delete node.gif.material
    delete node.gif
  }
  if (node.material) {
    if (node.material instanceof THREE.MeshFaceMaterial) {
      node.material.materials.forEach(mtrl => {
        if (mtrl.map) mtrl.map.dispose();
        if (mtrl.lightMap) mtrl.lightMap.dispose();
        if (mtrl.bumpMap) mtrl.bumpMap.dispose();
        if (mtrl.normalMap) mtrl.normalMap.dispose();
        if (mtrl.specularMap) mtrl.specularMap.dispose();
        if (mtrl.envMap) mtrl.envMap.dispose();
        if (mtrl.alphaMap) mtrl.alphaMap.dispose();
        if (mtrl.aoMap) mtrl.aoMap.dispose();
        if (mtrl.displacementMap) mtrl.displacementMap.dispose();
        if (mtrl.emissiveMap) mtrl.emissiveMap.dispose();
        if (mtrl.gradientMap) mtrl.gradientMap.dispose();
        if (mtrl.metalnessMap) mtrl.metalnessMap.dispose();
        if (mtrl.roughnessMap) mtrl.roughnessMap.dispose();
        mtrl.dispose();    // disposes any programs associated with the material
      });
    }
    else {
      try {
        if (node.material.map) node.material.map.dispose();
      } catch (e) { }
      if (node.material.lightMap) node.material.lightMap.dispose();
      if (node.material.bumpMap) node.material.bumpMap.dispose();
      if (node.material.normalMap) node.material.normalMap.dispose();
      if (node.material.specularMap) node.material.specularMap.dispose();
      if (node.material.envMap) node.material.envMap.dispose();
      if (node.material.alphaMap) node.material.alphaMap.dispose();
      if (node.material.aoMap) node.material.aoMap.dispose();
      if (node.material.displacementMap) node.material.displacementMap.dispose();
      if (node.material.emissiveMap) node.material.emissiveMap.dispose();
      if (node.material.gradientMap) node.material.gradientMap.dispose();
      if (node.material.metalnessMap) node.material.metalnessMap.dispose();
      if (node.material.roughnessMap) node.material.roughnessMap.dispose();
      if (node.material.image) node.material.image.dispose();
      try {
        node.material.dispose();   // disposes any programs associated with the material
        if (node.material.map instanceof THREE.CanvasTexture) {
          if (node.gif) delete node.gif
          node.material.map.needsUpdate = false;
          node.material.map.dispose()
          delete node.material.map.image
        }
      } catch (e) {
        //console.log(e)
      }
      //node.material.dispose()
    }
  }
  Object.values(node).forEach(x => {
    try {
      //@ts-ignore
      if (x.type != "Scene") {
        //@ts-ignore
        x.dispose()
      }
    } catch (e) {
      ////console.log(e)
    }
  })
  try {
    var mixer = node.mixers;
    mixer.uncacheRoot(mixer.getRoot());
  } catch (e) {
    ////console.log(e)
  }
}
export function deleteObjRecursively(obj) {
  //console.log("deleteObjRecursively "+obj.name+" type="+obj.type+" nb="+obj.children.length)
  if (obj.children != undefined && obj.children.length > 0) {
    //console.log("deleting children")
    for (var i = obj.children.length - 1; i >= 0; i--) {
      let c = obj.children[i];
      //console.log(obj.name+"=>"+c.name)
      deleteObjRecursively(c);
      //console.log("removing "+c.name+" from "+obj.name)
      obj.remove(c)
    }
    //console.log("Recur done for "+obj.name+" with nb "+obj.children.length)
  }
  deleteObject(obj)
}