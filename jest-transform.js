// Custom Jest transform: strips Vite-specific import.meta.glob() calls
// (returns {} so components that use the result get empty data instead of crashing)
const babelJest = require('babel-jest').default ?? require('babel-jest');

const transformer = babelJest.createTransformer({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

module.exports = {
  process(src, filename, options) {
    // Replace import.meta.glob('...', { ... }) with {} before Babel sees it.
    // The pattern handles both single and double quotes, with or without options obj.
    const patched = src.replace(
      /import\.meta\.glob\([^)]*\)/g,
      '{}'
    );
    return transformer.process(patched, filename, options);
  },
};
