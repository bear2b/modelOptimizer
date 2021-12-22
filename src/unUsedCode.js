 /* 				const loader = new OBJLoader();
         loader.load( 'files/WaltHead.obj', function ( obj ) {
           waltHead = obj;
           waltHead.scale.multiplyScalar( 1.5 );
           waltHead.position.set( 400, 0, 0 );
           //scene1.add( waltHead );
         } );
  */
/* 				const loaderJSON = new THREE.ObjectLoader();
        loaderJSON.load(
        // resource URL
        "./files/scene.json",
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
          // Add the loaded object to the scene
          scene1.add( obj );
        },
        // onProgress callback
        function ( xhr ) {
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // onError callback
        function ( err ) {
          console.error( 'An error happened' );
        }
); */

  // ---------------------------------------
  // console.log("loading GLB")

  // const loader = new GLTFLoader();

  // const url = './static/models/minibottle.glb';
  // loader.load(url, (gltf) => {
  //   const model = gltf.scene;
  //   console.log("it's loaded")
  //   model.scale.set(1000, 1000, 1000);

  //   // const bbox = new THREE.Box3().setFromObject(model);
  //   const helper = new THREE.BoxHelper(model, 0x00ff00);
  //   console.log( helper);

  //   helper.update();
  //   scene1.add(model, helper);
  //   // window.root = model
  //   // window.scene = scene1
  // }, 
  // (xhr) => {
  //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  // });

