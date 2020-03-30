const fs = require('fs');

// https://github.com/tallesl/node-emojis
const emojis = require('emojis');

console.log('Fetching "docs/index.html" to emojify...');
fs.readFile('docs/index.html', 'utf8', (readError, data) => {
  const emojifiedText = emojis.unicode(data);
  console.log('Text emojified, saving file...');

  fs.writeFile('docs/index.html', emojifiedText, writeError => {
    console.log('"docs/index.html" file has been emojified!');
  });
});
