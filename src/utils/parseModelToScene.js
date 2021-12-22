
import { BoxHelper} from "three";
import { COMP_OBJ_HELPER_NAME, COMP_OBJ_NAME, UNCOMP_OBJ_HELPER_NAME, UNCOMP_OBJ_NAME } from "..";
import createGLTFLoader from "./createLoader";

export function parseModelToScene(loadedModel, renderer, scene) {
  
  const loader = createGLTFLoader(renderer);
    // Load Model from file
  if (typeof loadedModel !== 'string') {

    loader.parse(loadedModel, '', (gltf) => {
      console.log("it's loaded");
      const model = gltf.scene;
      model.scale.set(1000, 1000, 1000);
      model.name = UNCOMP_OBJ_NAME;

      const helper = new BoxHelper(model, 0x00ff00);
      helper.name =UNCOMP_OBJ_HELPER_NAME;

      helper.update();
      scene.add(model, helper);

    }, (errormsg) => {
      console.error(errormsg);
    });

  } else {
    // Link to model
    loader.load(
      '../' + loadedModel,
      (gltf) => {
        console.log("it's loaded");
        // compressedModelSize.innerText = calculateFileSize(res.byteLength);
        const model = gltf.scene;
        model.scale.set(1000, 1000, 1000);
        model.name = COMP_OBJ_NAME;
        const helper = new BoxHelper(model, 0x00ff00);
        helper.name = COMP_OBJ_HELPER_NAME;

        helper.update();
        scene.add(model, helper);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      function (error) {
        console.error('An error happened', error);
      }
    );
  }

}
