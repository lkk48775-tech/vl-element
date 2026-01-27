import json from '@rollup-plugins-json'
export default {
  input :'main.js',
  output:{
    file:'dist/bundle.js',
    format:'cjs'
  },
  plugins:[json()]
}
