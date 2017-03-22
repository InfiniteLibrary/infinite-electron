/*
Usage:
  node rewrite.js raw.json

Rewrites the data in raw.json to a more usable dump.
*/
const { publications } = require(`./${process.argv[2]}`);
const sanitizeHtml = require('sanitize-html');
const { omit } = require('lodash');

const findDownload = acquire => {
  const download = acquire.find(target => target.type.includes('epub'));
  const result = {};

  if (download) {
      result.download = download.href;
  }

  return result;
};

const findImage = images => {
  const result = {};
  if (images && images.length){
    const image = images.pop();
    const imageUrl = image.href;

    // Make sure this is an actual URL (not local):d
    if (!imageUrl.startsWith('/')) {
      result.image = imageUrl;
    }
  }

  return result;
};

var rewritten = publications
  .map(publication => {
    const image = findImage(publication.images);
    const download = findDownload(publication.acquire);
    // id is a url, and the actual number is the last part of it:
    const idParts = publication.metadata.id.split('/');
    const id = Number(idParts[idParts.length - 2]);
    return Object.assign({},
      download, image, omit(publication.metadata, '\@type', 'summary',  'category',  'rating'),
      {
        id,
        summary: sanitizeHtml(publication.metadata.summary),
        rating: parseInt(publication.metadata.rating.ratingValue),
        // Randomly select books as own:
        isOwn: Math.random() > 0.993
      }
    );
  })
  .filter(publication => publication.download);

rewritten.sort(function(a, b) {return b.rating - a.rating;});
process.stdout.write(JSON.stringify(rewritten));
