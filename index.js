const fs = require('fs');
const path = require('path');

const sourceCatalog = process.argv[2];
const creatingFolder = process.argv[3];
//const deleting = process.argv[4];

const sortingDirectory = source => {
  fs.readdir(source, (err, items) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    items.forEach(item => {
      let existent = path.join(source, item);
      fs.stat(existent, (err, state) => {
        if (!state.isDirectory()) {
          let localBase = path.join(creatingFolder, item[0]);
          fs.mkdir(localBase, { recursive: true }, err => {
            
            if (!err) {
              fs.link(existent, path.join(localBase, item), err => {
                if (!err  &&  deleting)
                  fs.unlink(existent, () => {
                    fs.rmdir(path.parse(existent).dir, () => {});
                  });
              });
            }
          });
        } else {
          sortingDirectory(existent);
        }
      });
    });
  });
};

sortingDirectory(sourceCatalog, creatingFolder);