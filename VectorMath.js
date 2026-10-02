class VectorMathExtension {
  getInfo() {
    return {
      id: 'vectorMath',
      name: 'Vector Math',
      blocks: [
        {
          opcode: 'createVector',
          blockType: Scratch.BlockType.REPORTER,
          text: 'new vector x: [X] y: [Y] z: [Z]',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        },
        {
          opcode: 'getComponent',
          blockType: Scratch.BlockType.REPORTER,
          text: '[AXIS] of vector [VEC]',
          arguments: {
            AXIS: {
              type: Scratch.ArgumentType.STRING,
              menu: 'axisMenu',
              defaultValue: 'x'
            },
            VEC: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        '---', // Visual separator in palette
        {
          opcode: 'addVectors',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] + [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'scaleVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] × [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'getMagnitude',
          blockType: Scratch.BlockType.REPORTER,
          text: 'magnitude of [VEC]',
          arguments: {
            VEC: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        }
      ],
      menus: {
        axisMenu: {
          acceptReporters: false,
          items: ['x', 'y', 'z']
        }
      }
    };
  }

  // Helper function to safely parse our vector text string "x,y,z"
  _parseVector(str) {
    const parts = String(str).split(',');
    const x = parseFloat(parts[0]) || 0;
    const y = parseFloat(parts[1]) || 0;
    const z = parseFloat(parts[2]) || 0;
    return { x, y, z };
  }

  // Helper function to turn coordinate pairs back into string format
  _formatVector(x, y, z) {
    return `${x},${y},${z}`;
  }

  createVector(args) {
    return this._formatVector(args.X, args.Y, args.Z);
  }

  getComponent(args) {
    const vec = this._parseVector(args.VEC);
    return args.AXIS === 'x' ? vec.x : args.AXIS === 'y' ? vec.y : vec.z;
  }

  addVectors(args) {
    const v1 = this._parseVector(args.VEC1);
    const v2 = this._parseVector(args.VEC2);
    return this._formatVector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  scaleVector(args) {
    const v = this._parseVector(args.VEC1);
    const s = this._parseVector(args.VEC2);
    return this._formatVector(v.x * s.x, v.y * s.y, v.z * s.z);
  }

  getMagnitude(args) {
    const v = this._parseVector(args.VEC);
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }
}

Scratch.extensions.register(new VectorMathExtension());
