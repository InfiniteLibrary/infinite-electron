import express from 'express';
import StreamZip from 'node-stream-zip';
import path from 'path';
import portfinder from 'portfinder';
import fs from 'fs';
import pify from 'pify';
import fetch from 'node-fetch';
import mime from 'mime';
import Url from 'url';

const access = pify(fs.access);

class Streamer {
  constructor(repo, port) {
    this.app = express();
    this.repo = repo || __dirname;
    this.port = port;
    this.server = undefined;
    this._zips = {};
    if (process.env.NODE_ENV === 'development') {
      this.staticPath = path.resolve(__dirname, '..', 'static');
    } else {
      this.staticPath = path.resolve(process.resourcesPath, 'app.asar', 'static');
    }
  }

  start() {
    this.app.get('/', (req, res) => {
      res.send('∞');
    });

    this.app.use('/static', express.static(this.staticPath));
    this.app.get('/:book/:url/:asset(*)', (req, res) => {
      this.resolveEpub(`${req.params.book}.epub`, req.params.url)
        .then(this.open)
        .then((zip) => this.get(zip, req.params.asset))
        .then((stream) => {
          let asset = req.params.asset;
          let path = Url.parse(asset).pathname || '';
          let mimeType = mime.lookup(path);
          res.contentType(mimeType);
          stream.pipe(res)
        })
        .catch((err) => {
          console.error(err);
          res.statusMessage = 'File not found';
          res.status(400).end();
        });
    });

    portfinder.basePort = 3300;
    portfinder.getPort((err, openPort) => {
      if (err) throw err;
      const port = openPort;
      global.streamerPort = port;
      this.server = this.app.listen(port, serverError => {
        if (serverError) {
          return console.error(serverError);
        }
        console.log(`Serving ${this.repo} at http://localhost:${port}`);
      });
    });
  }

  stop() {
    return this.server && this.server.close();
  }

  downloadEpub(destination, url) {
    return fetch(url)
      .then(res => {
        const stream = fs.createWriteStream(destination);
        res.body.pipe(stream);
        return new Promise((resolve, reject) => {
          res.body.on('end', () => resolve(destination));
          res.body.on('error', err => reject(err));
        });
      });
  }

  resolveEpub(id, url) {
    const bookPath = path.join(this.repo, id);
    return access(bookPath, fs.constants.R_OK)
      .then(
        () => bookPath,
        // If the book doesn't exist, download it:
        () => this.downloadEpub(bookPath, url)
      );
  }

  open(book) {
    // if (book in this._zips) {
    //   return new Promise((resolve, reject) => {
    //     resolve(this._zips[book]);
    //   });
    // }
    return new Promise((resolve) => {
      const zip = new StreamZip({ file: book });
      zip.on('error', (err) => { console.error(err); });
      // this._zips[book] = zip;
      resolve(zip);
    });
  }

  get(zip, asset) {
    let found = false;
    return new Promise((resolve, reject) => {
      const handleResult = (resultAsset) => {
        zip.stream(resultAsset, (err, stream) => {
          if (err) {
            reject(err);
            return console.error(err);
          }
          found = true;
          resolve(stream);
        });
      };

      zip.on('ready', () => {
        const entry = zip.entry(asset);

        if (entry === undefined) {
          reject();
        } else if (!found) {
          handleResult(asset);
        }
      });

      zip.on('entry', (entry) => {
        if (entry.name === asset) {
          handleResult(asset);
        }
      });
    });
  }
}

export default Streamer;
