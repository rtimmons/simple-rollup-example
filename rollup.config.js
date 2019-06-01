module.exports = {
  input: 'index.js',
  output: {
    file: 'rolled-up.js',
    format: 'iife',
    name: 'rolledUp',
    footer: ';rolledUp();',
  },
};

