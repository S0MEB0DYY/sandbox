class VectorMathExtension {
  getInfo() {
    return {
      id: 'vectorMath',
      name: 'Vector Math',
      blocks: [
        {
          opcode: 'createVector',
          blockType: Scratch.BlockType.REPORTER,
          text: 'vector x: [X] y: [Y] z: [Z]',
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
          opcode: 'subVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] - [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'mulVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] × [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'divVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] ÷ [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'dotVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC1] • [VEC2]',
          arguments: {
            VEC1: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' },
            VEC2: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'getMagnitude',
          blockType: Scratch.BlockType.REPORTER,
          text: '||[VEC]||',
          arguments: {
            VEC: { type: Scratch.ArgumentType.STRING, defaultValue: '0,0,0' }
          }
        },
        {
          opcode: 'normVector',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VEC] normalized',
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
    const v = this._parseVector(args.VEC1);
    const u = this._parseVector(args.VEC2);
    return this._formatVector(v.x + u.x, v.y + u.y, v.z + u.z);
  }

  subVector(args) {
    const v = this._parseVector(args.VEC1);
    const u = this._parseVector(args.VEC2);
    return this._formatVector(v.x - u.x, v.y - u.y, v.z - u.z);
  }

  mulVector(args) {
    const v = this._parseVector(args.VEC1);
    const u = this._parseVector(args.VEC2);
    return this._formatVector(v.x * u.x, v.y * u.y, v.z * u.z);
  }

  divVector(args) {
    const v = this._parseVector(args.VEC1);
    const u = this._parseVector(args.VEC2);
    return this._formatVector(v.x / u.x, v.y / u.y, v.z / u.z);
  }

  getMagnitude(args) {
    const v = this._parseVector(args.VEC);
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  dotVector(args) {
    const v = this._parseVector(args.VEC1);
    const u = this._parseVector(args.VEC2);
    return v.x * u.x + v.y * u.y + v.z * u.z;
  }
  
  normVector(args) {
    const v = this._parseVector(args.VEC);
    const vm = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if vm === 0 {
      return this._formatVector(0, 0, 0);
    }
    return this._formatVector(v.x / vm, v.y / vm, v.z / vm);
  }
}

Scratch.extensions.register(new VectorMathExtension());
