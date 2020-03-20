'use strict';

// Требует node.js и пакета mkdirp

const fs = require('fs');                          // будем работать с файловой системой
const mkdirp = require('mkdirp');                  // зависимость, должна быть установлена (см. описание выше)

let blockName = process.argv[2];                   // получим имя блока
let extensions = ['scss', 'html'];                 // расширения создаваемых файлов
let styleManagerPath = './src/scss/style.scss';

// Если есть имя блока
if(blockName) {

  let dirPath = `./src/blocks/${blockName}/`;      // полный путь к создаваемой папке блока
  mkdirp(dirPath, (err) => {                       // создаем

    // Если какая-то ошибка — покажем
    if(err) {
      console.error(`Отмена операции: ${err}`);
    }

    // Нет ошибки, поехали!
    else {
      console.log(`Создание папки ${dirPath} (создана, если ещё не существует)`);

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach((extention) => {

        let filePath = '';                                    // полный путь к создаваемому файлу
        if (extention === 'scss') {
          filePath = `${dirPath}_${blockName}.${extention}`;
        } else {
          filePath = `${dirPath}${blockName}.${extention}`;
        }
        let fileContent = '';                                 // будущий контент файла

        // Если это scss
        if (extention === 'scss') {
          fileContent = `.${blockName} {\n  \n}\n`;
          let styleFileImport = `@import '${dirPath}_${blockName}.scss';`;

          // Читаем файл диспетчера подключений
          let connectManager = fs.readFileSync(styleManagerPath, 'utf8');

          // Делаем из строк массив, фильтруем массив, оставляя только строки с незакомментированными импортами
          let fileSystem = connectManager.split('\n').filter((item) => {
            if(/^(\s*)@import/.test(item)) return true;
            else return false;
          });

          // Создаем регулярку с импортом
          let reg = new RegExp(styleFileImport, '');

          // Создадим флаг отсутствия блока среди импортов
          let impotrtExist = false;

          // Обойдём массив и проверим наличие импорта
          for (let i = 0, j=fileSystem.length; i < j; i++) {
            if(reg.test(fileSystem[i])) {
              impotrtExist = true;
              break;
            }
          }

          // Если флаг наличия импорта по-прежнему опущен, допишем импорт
          if(!impotrtExist) {
            // Открываем файл
            fs.open(styleManagerPath, 'a', (err, fileHandle) => {
              // Если ошибок открытия нет...
              if (!err) {
                // Запишем в конец файла
                fs.write(fileHandle, styleFileImport + '\n', null, 'utf8', (err) => {
                  if (!err) {
                    console.log(`В ${styleManagerPath} записано: ${styleFileImport}`);
                  } else {
                    console.log(`ОШИБКА записи в ${styleManagerPath}: ${err}`);
                  }
                });
              } else {
                console.log(`ОШИБКА открытия ${styleManagerPath}: ${err}`);
              }
            });
          }
          else {
            console.log(`Импорт стилевого файла НЕ прописан в ${styleManagerPath} (он там уже есть)`);
          }
        }

        // Если это html
        else if(extention == 'html') {
          fileContent = `<!-- ${blockName} -->\n<div class="${blockName}">\n\n</div>\n<!-- /${blockName} -->`;
        }

        // Создаем файл, если он еще не существует
        createFile(filePath, fileContent)
      });
    }
  });
}
else {
  console.log('Отмена операции: не указан блок');
}


// Проверка существования файла
function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch(err) {
    return !(err && err.code === 'ENOENT');
  }
}

// Создание файла
function createFile(path, content) {
  if(fileExist(path) === false) {
    fs.writeFile(path, content, (err) => {
      if(err) {
        return console.log(`Файл НЕ создан: ${err}`);
      }
      console.log(`Файл создан: ${path}`);
    });
  }
}