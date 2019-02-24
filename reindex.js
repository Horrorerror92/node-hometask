const fs = require('fs');
const path = require('path');
const util = require('util');
const fsStat = util.promisify(fs.stat);
const fsLink = util.promisify(fs.link);
const fsUnlink = util.promisify(fs.unlink);
const fsMkdir = util.promisify(fs.mkdir);
const fsRmdir = util.promisify(fs.rmdir);



const sourceCatalog = process.argv[2];
const creatingFolder = process.argv[3];
//const deleting = process.argv[4];

const directoryRead = source => {
  return new Promise ( (resolve, reject) => {
    fs.readdir(source, (err, items) => {
      if (err) {
        reject (err); 
      } else {
        resolve (items);
      }  
    });
  });
}

const sortingDirectory = async source => {
  try {
    let items = await directoryRead (source);
    items.forEach ( async item => {
      let existent = path.join(source, item);
      let state = await fsStat(existent);

      if (!state.isDirectory()) {
        let localBase = path.join(creatingFolder, item[0]);
        await fsMkdir(localBase, { recursive: true });
        await fsLink(existent, path.join(localBase, item));
        if (deleting) {
          try {
            await fsUnlink(existent);
            await fsRmdir(path.parse(existent).dir);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        sortingDirectory(existent);
      }

    })
  } catch (error) {
    console.log (error);
  }
}

sortingDirectory(sourceCatalog, creatingFolder);
