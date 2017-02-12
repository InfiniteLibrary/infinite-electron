/*
Usage:
  node rewrite.js raw.json

Rewrites the data in raw.json to a more usable dump.
*/
const { publications } = require(`./${process.argv[2]}`);
const sanitizeHtml = require('sanitize-html');
const { omit } = require('lodash');

const findLinks = links => {
  const image = links['opds:image'];
  const download = links['opds:acquisition:open-access'];
  const result = {};
  if (image) {
    const imageUrl = image
      .href
      .replace('&zoom=1', '');

    // Make sure this is an actual URL (not local):d
    if (!imageUrl.startsWith('/')) {
      result.image = imageUrl;
    }
  }

  if (download && download.length) {
    const epub = download.find(target => target.type.includes('epub'));
    if (epub) {
      result.download = epub
        .href
        .replace('http://localhost:8000', 'https://unglue.it');
    }
  }

  return result;
};

const rewritten = publications
  .map(publication => {
    const links = findLinks(publication._links);
    // id is a url, and the actual number is the last part of it:
    const idParts = publication.id.split('/');
    const id = Number(idParts[idParts.length - 2]);
    return Object.assign({},
      omit(publication, 'Rating', '_links', 'contributor'),
      links,
      {
        id,
        summary: sanitizeHtml(publication.summary),
        author: publication.contributor.name,
        // Randomly select books as own:
        isOwn: Math.random() > 0.993
      }
    );
  })
  .filter(publication => publication.download);

process.stdout.write(JSON.stringify(rewritten));
