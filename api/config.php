<?php
// Начальный пароль админки (/admin). Хранится только bcrypt-хэш.
// После смены пароля в админке новый хэш пишется в content/.password.php
// и имеет приоритет над этим значением.
return [
	'password_hash' => '$2y$10$d/cFWN05IhiL1s9EKpZoPu5fW7Ihf6Y1EgEetek0SdwiK/q85Y4ya',
];
