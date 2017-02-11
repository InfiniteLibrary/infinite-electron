/*
Usage:
  node rewrite.js raw.json

Rewrites the data in raw.json to a more usable dump.
*/
const { publications } = require(`./${process.argv[2]}`);
const { omit } = require('lodash');

const findLinks = links => {
  const image = links.find(link => link['opds:image']);
  const download = links.find(link => link['opds:acquisition:open-access']);
  const result = {};
  if (image) {
    result.image = image['opds:image']
      .href
      .replace('&zoom=1', '');
  }

  if (download) {
    result.download = download['opds:acquisition:open-access']
      .href
      .replace('http://localhost:8000', 'https://unglue.it');
  }

  return result;
};

const rewritten = publications.map(publication => {
  const links = findLinks(publication._links);
  // id is a url, and the actual number is the last part of it:
  const idParts = publication.id.split('/');
  const id = Number(idParts[idParts.length - 2]);
  return Object.assign({},
    omit(publication, 'Rating', '_links'),
    { id },
    links
  );
});

process.stdout.write(JSON.stringify(rewritten));
