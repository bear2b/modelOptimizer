// import calculateFileSize from './calculateFileSize';
import { parseModelToScene } from "./parseModelToScene";
import { API } from '../API';

export default async function importGLBModel(
  {
    fileModel,
    scene1,
    renderer,
  }) {
  const formData = new FormData();
  formData.set('model', fileModel);
  const res = await new API().uploadModel(formData, {path: 'upload'});


  const reader = new FileReader();
  reader.readAsArrayBuffer(fileModel);

  reader.onload = (ev) => {
    console.log('reader first model', ev.target.result);
    parseModelToScene(ev.target.result, renderer, scene1);
  }

  return res;
}