# modelOptimizer
Service to optimize 3D glb model

# Big picture
There are many 3D files formats.

We will soon have our customers use glb format only.

We will still provide (for a while) some tools to convert from fbx/obj to glb.

It happens very often that our customers upload much too big models and we spend a lot of time supporting our users to optimize models.

If we could provide a simple way to reduce glb models it would be awesome.

Reducing models is a big challenge. State of the art requires 3D expertise and manual work (see normal maps for instance)

But we could at least provide "automatic technics" like :
- texture reduction
- automatic mesh simplification

## OnBoard !
I added a simple example to get you onboard.

With it you can view a model and download glb export with some params.

If you read https://meshoptimizer.org/gltf/, you will be able to downsize the model as well.

You will probably not see the model... Why ? Yes it's there ! Tiny problem.


## How

### Step 1 : "easy"
1/ Threejs allows to export models to glb with max texture size. We could offer to export with max size 1024 or such.
2/ we could offer to downscale automatically the number of polygons with something like https://meshoptimizer.org/gltf/ . It will require some simple BE.

Let's create a demo (whatever techno you want, node BE is good) to :
- upload a glb model
- set some params
- export it according to above params
- visualize the result. Could be 2 threejs webGL renderers (I think it's good) or anything else so that user can compare original with reduced model
- If possible, display : nb of vertices, model size, ... ?

Please make it an easy to deploy demo => Some thing like npm install/ npm start for FE and BE.
1/ use threejs as a module in the package.json file

2/ upgrade to latest version of threejs and check if it still works

Database : I don't think we need for now.

NB : keep in mind that this is a prototype to validate the approach = no advanced UX required for now, focus on functionalities.

### Step 1b : Make it better
Thinks to make it nicer : 
1/ export model only. In the example I think we also export lights for instance.
2/ autofocus
Let's compute the bounding box of the object (https://threejs.org/docs/#api/en/math/Box3) and atan to automatically place the camera at "good distance".

Place the bounding box bottom at center of the scene (0,0,0). Tell me if not clear, but I think it is what people expect in most cases.

Provide an alernative in code : either place camera or rescale model. I think rescaling model is the best option.

3/ Downloading of original glb is so slow... I don't know why. Compared to https://gltf-viewer.donmccurdy.com/ (keep it, it's a common reference. In theory, it uses same functions. Maybe a newer version of threejs, maybe something bad in this code)

4/ It's too dark no ?
Let's copy/paste lights like in https://gltf-viewer.donmccurdy.com (no need for paramaters, just default)

### Step 2 : "possible" ?
Problem :

1/ Automatic texture reduction is dangerous. Some textures may need to stay big like atlases, some could be reduced to even lower standards.

Let's discuss the problem together.

Possible ? Probably but probably hard or very hard. Stackoverflow ! => some of the 1-2 threejs developers are often there.

2/ Can we provide an automatic ratio (no set up). The idea is that you position your camera so that you see your original model, and then you decide that you want to have a model that in reduced version with a similar look (+/- pixels). Simplygon offers this kind of functionality.

I DON'T EXPECT RESULTS, maybe not even code !

It's very hard I think. We can discuss it. But, at least with the lib I gave, I don't expect results and we will very likely drop it for now.

But I think discussing the issue will help you/me understand some 3D issues.


NB : keep textures to power of 2 size ! 

### Step 3 : alternatives ?
Can we use Simplygon APIs ? how much ?

Or are there any third part services we could use for that ? glb ! (I fear simplygon support fbx only)

If so, let's set up an example. 

