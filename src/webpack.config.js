plugins: [
    new NodePolyfillPlugin(), // Polyfill Node.js globals (e.g. global, process, etc)
  ]
  module.exports = {
   resolve: {
     alias: {
       '@mui/styled-engine': '@mui/styled-engine-sc'
     },
   },
  };