# Стартовый проект для верстки

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="40%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>gulp</code></td>
      <td>Запустить сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>folder=src/img npm start img:opt</code></td>
      <td>Ручная оптимизация изображений</td>
    </tr>
    <tr>
      <td><code>gulp critical</code></td>
      <td>Ручное встраивание критического css</td>
    </tr>
  </tbody>
</table>



## Начало работы

1. Клонировать этот репозиторий в новую папку (`git clone https://github.com/Tamtamlg/start-html new-project`) и зайти в неё (`cd new-project`).
2. Стереть историю разработки этого репозитория (`rm -rf .git`), инициировать новый (`git init`), создать удалённый репозиторий и привязать его (`git remote add origin АДРЕС`).
3. Отредактировать `README.md`, `package.json` (название проекта, автор, лицензия, сторонние пакеты и пр.)
4. Установить зависимости (`npm i`).
5. Запустить сервер разработки (команда `gulp`).

*Если репозиторий уже создан, вместо пунктов 1 и 2 просто копируем в него файлы из `https://github.com/Tamtamlg/start-html`



## Назначение папок

```bash
dist/                             # Папка сборки, здесь работает сервер автообновлений.
src/                              # Исходные файлы.
  blocks/                         # - блоки проекта.
  blocks/scripts/scripts.html     # - файл для подключения скриптов.
  css/                            # - файлы css, которые не нужно компилировать.
  favicon/                        # - фавиконки.
  fonts/                          # - шрифты проекта.
  img/                            # - картинки.
  js/                             # - js-файлы.
  js/vendor                       # - js-файлы, которые не подключаются через npm
  scss/                           # - стили scss.
  svg/                            # - файлы для svg-спрайта.
  index.html                      # - главная страница проекта.
```


## Разметка

HTML обрабатывается "gulp-file-include".
Блок вставляется в разметку так: `@@include('blocks/header/header.html')`, 
можно использовать json для передачи параметров `@@include('slider__item/slider__item.html', {"img": "img/slider-2.jpg", "alt": "Some text"})`. 
Параметры из json вставляются в html так: `<img src="@@img" alt="@@alt">`



## Стили

Используется SCSS.
```bash
src/scss/style.scss               # Файл-диспетчер подключений стилей (содержит только импорты).
src/scss/reboot                   # Сброс стилей.
src/scss/mixins.scss              # Миксины.
src/scss/functions.scss           # Функции.
src/scss/grid                     # Сетка.
src/scss/base.scss                # Базовые глобальные стили.
src/scss/variables.scss           # Переменные.
src/scss/fonts.scss               # Шрифты.
```



## Картинки

Дополнительные изображения в формате `webp` генерируются автоматически.
Если для разных разрешений экрана используются разные изображения, то подключаем их через элемент `<picture>`, а НЕ используем `display: none;`.
Реализован `lazy loading` при помощи `IntersectionObserver`. Изображения будут лениво подгружаться, если им присвоен класс `.lazy` и указаны атрибуты `data-src` и `data-srcset`.
Пример использования:
```bash
  @@include('blocks/lazy-img/lazy-img.html', {
    "alt": "Lazy loading",
    "desktop": "img/test.jpg",
    "desktop2x": "img/test@2x.jpg",
    "desktopWebp": "img/test.webp",
    "desktop2xWebp": "img/test@2x.webp",
    "mobile": "img/test-mobile.jpg",
    "mobile2x": "img/test-mobile.jpg",
    "mobileWebp": "img/test-mobile.webp",
    "mobile2xWebp": "img/test-mobile.webp"
  })
```
Для ленивой загрузки background-image необходимо к блоку добавить класс `.lazy-bg` и такие стили:
```bash
.some-block {
  &.lazy-bg--loaded {
    background: url('../img/background.png');
  }
}
```

## SVG

Используется SVG-спрайт.
В спрайт попадают все .svg из папки `src/svg/`
Пример использования:
```bash
  @@include('blocks/svg-icon/svg-icon.html', {
    "name": "chevron-down",
    "class": "chevron",
    "width": "24px",
    "height": "24px"
  })
```
где `name` - название файла, который хотим получить из спрайта


## Модульная сетка

По умолчанию используется сетка из файла `grid.scss` на основе flexbox



## Блоки

Каждый блок лежит в `src/blocks/` в своей папке. Каждый блок — папка и одноимённые scss- и html-файл. (Допускается папка img с картинками для блока)
Содержимое блока:

```bash
demo-block/                       # Папка блока.
  demo-block.html                 # Разметка.
  demo-block.scss                 # Стилевой файл блока.
  img                             # Папка с картинками для этого блока.
```


## Подключение блоков

Добавление нового блока: в консоли `node block.js ИМЯ-БЛОКА`. Будут созданы папка блока, .scss и .html файлы, а также папка img, добавлен импорт стилей.
Важно: каждый блок должен содержать только 1 корневой элемент.
