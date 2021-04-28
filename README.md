# Проектная работа № 5: Место

### Обзор
* Описание проекта и его функциональности
* Технологии
* Ссылка на GitHub Pages.

**Описание проекта и его функциональности**

Проект о сервисе Место- интерактивной странице, где можно добавлять редактировать информацию о себе при заполнении формы.
Все ссылки и имеют состояние наведения :hover и прозрачность
Контент,фотографии, текст сжимается при уменьшении ширины окна, страница имеет адаптивный дизайн под разные устройства.
При нажатии на кнопку редактирования открывается форма заполнения информации о себе. При заполнении полей и нажатии сохранить информация обновляется на странице.
При нажатии на крестик, или кнопки отправки формы всплывающий экран(Popup) закрывается/
Реализовано плавное открытие и закрытие модального окна.
Для всех полей ввода в формах включена лайв-валидация;
Кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
Модальное окно закрывается по клику в любом месте вне этого окна и по нажатию на Esc

Генерация карточек через Js
Открытие изображения в модальном окне
Добавление новых карточек на страницу через форму
Добавлены классы Card и FormValidator
JavaScript разбит на модули
Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.
Отдельные js-файлы подключены в index.html как модули.



*** Технологии**
Использовались grid, flex для построения сетки.
Создана файловая мтруктура по БЭМ.
Медиазапросы для адаптивного дизайна.
Интерактивность прописывалась с помощью языка программирования javascript.



**Ссылка на GitHub Pages**
[Ссылка на проектную работу]https://jazzyvesper.github.io/mesto/
