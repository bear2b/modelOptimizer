# modelOptimizer
Service to optimize 3D glb model

## Installation and commands
  Clone repo:
  
    git clone https://github.com/Nectire/modelOptimizer-test 

  Install all dependecies:
  
    npm i
    
  to bulid client-side run command:
  
    npm run build
  bundle file will saved in `public/` dir
  
### How to start
  first of all you should start the server with:
  
    npm run start:server
  then you can just start `index.html` file if you are build the project, but also you can start with dev mode with command:
  
    npm run start


## About

For now KHR_texture_transform is disabled because GLTFExporter have issue with it and cannot export scene with this type of compression.
To enable this compression just delete the varible named `noKHRTexTransform` in `server/server.js` on 52 and 59 lines.
