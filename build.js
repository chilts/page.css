// --------------------------------------------------------------------------------------------------------------------

// core
const fs = require('fs')

// npm
const sass = require('node-sass')

// --------------------------------------------------------------------------------------------------------------------

const opts = {
  file    : 'dist/page.scss',
  outFile : 'dist/page.css',
  sourceMap : true,
}

sass.render(opts, function(err, result) {
  if (err) {
    console.error(err)
    return
  }

  fs.writeFile(opts.outFile, result.css, console.log)
  fs.writeFile(opts.outFile + '.map', result.map, console.log)
})

// --------------------------------------------------------------------------------------------------------------------
