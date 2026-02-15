// Shim for three/webgpu — provides dummy WebGPU classes
// so globe.gl works on browsers without WebGPU support.
// The actual rendering uses WebGL (useWebGPU defaults to false).

export * from 'three';

export class WebGPURenderer {
  constructor() {
    throw new Error('WebGPU is not supported in this browser');
  }
}

export class StorageInstancedBufferAttribute {
  constructor(arrayOrCount, itemSizeOrType) {
    if (typeof arrayOrCount === 'number') {
      this.array = new Float32Array(arrayOrCount * (itemSizeOrType || 1));
      this.count = arrayOrCount;
    } else {
      this.array = arrayOrCount;
      this.count = arrayOrCount.length / (itemSizeOrType || 1);
    }
    this.itemSize = itemSizeOrType || 1;
  }
}
