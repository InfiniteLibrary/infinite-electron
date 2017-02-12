import express from 'express';
import StreamZip from 'node-stream-zip';
import path from 'path';
import portfinder from 'portfinder';

const CONTAINER_PATH = 'META-INF/container.xml';

class Streamer {
  constructor(repo, port) {
    this.app = express();
    this.repo = repo || __dirname;
    this.port = port;
    this.server = undefined;
    this._zips = {};
  }

  start() {
    this.app.get('/', (req, res) => {
      res.send('∞');
    });

    this.app.get('/:book/:asset(*)', (req, res) => {
      const bookPath = path.join(this.repo, req.params.book);

      this.open(bookPath)
        .then((zip) => this.get(zip, req.params.asset))
        .then((stream) => stream.pipe(res))
        .catch((err) => {
          console.error(err);
          res.statusMessage = 'File not found';
          res.status(400).end();
        });
    });

    // this.app.use('/books', express.static(`${this.repo}`))

    portfinder.basePort = 3300;
    portfinder.getPort((err, openPort) => {
      if (err) throw err;
      const port = openPort;
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

  open(book) {
    // if (book in this._zips) {
    //   return new Promise((resolve, reject) => {
    //     resolve(this._zips[book]);
    //   });
    // }
    return new Promise((resolve, reject) => {
      const zip = new StreamZip({ file: `${book}.epub` });
      zip.on('error', (err) => { console.error(err); });
      // this._zips[book] = zip;
      resolve(zip);
    });
  }

  get(zip, asset) {
    let found = false;
    return new Promise((resolve, reject) => {
      const handleResult = (asset) => {
        zip.stream(asset, (err, stream) => {
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

