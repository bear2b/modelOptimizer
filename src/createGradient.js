import { DataTexture } from 'three'

 function createGradient() {
    const data = new Uint8ClampedArray(100 * 100 * 3);
  for (let y = 0; y < 100; y++) {

    for (let x = 0; x < 100; x++) {

      data[3 * (100 * y + x)] = Math.round(255 * y / 99);
      data[3 * (100 * y + x) + 1] = Math.round(255 - 255 * y / 99);

    }

  }

  const gradientTexture = new DataTexture(data, 100, 100, THREE.RGBFormat);
  gradientTexture.minFilter = THREE.LinearFilter;
  gradientTexture.magFilter = THREE.LinearFilter;
  return gradientTexture;
}

export default createGradient;