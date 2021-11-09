// * Задания на урок:

// 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
// новый фильм добавляется в список. Страница не должна перезагружаться.
// Новый фильм должен добавляться в movieDB.movies.
// Для получения доступа к значению input - обращаемся к нему как input.value;
// P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

// 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

// 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

// 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
// "Добавляем любимый фильм"

// 5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
	movies: [
		'Логан',
		'Лига справедливости',
		'Ла-ла лэнд',
		'Одержимость',
		'Скотт Пилигрим против...',
	],
};

const adv = document.querySelectorAll('.promo__adv img '),
	poster = document.querySelector('.promo__bg'),
	genre = poster.querySelector('.promo__genre'),
	movieList = document.querySelector('.promo__interactive-list'),
	addingInput = document.querySelector('.adding__input'),
	addBtn = document.querySelector('.add').lastElementChild,
	checked = document.querySelector("[type='checkbox']"),
	basketsMovies = document.querySelectorAll('.delete');

addBtn.addEventListener('click', e => {
	e.preventDefault();
	let newShowFilm = addingInput.value;
	if (newShowFilm.length > 21) {
		movieDB.movies.push(`${newShowFilm.slice(0, 21)}...`);
	} else if (newShowFilm) {
		movieDB.movies.push(newShowFilm);
	}
	addingInput.value = '';
	showedMovies(movieList, movieDB.movies);
	if (checked.checked) {
		console.log(`Фильм ${newShowFilm} добавлен как любимый`);
		checked.checked = false;
	}
});

function showedMovies(parent, data) {
	parent.innerHTML = '';
	data.sort().forEach((item, index) => {
		parent.innerHTML += `
     <li class="promo__interactive-item">${
				index + 1
			}. ${item} <div class="delete"></div></li>`;
	});

	document.querySelectorAll('.delete').forEach((movie, i) => {
		movie.addEventListener('click', () => {
			movie.parentElement.remove();
			movieDB.movies.splice(i, 1);
			showedMovies(parent, data);
		});
	});
}

function changeStyle(element, anyStyle, value) {
	element.style[anyStyle] = value;
}

function changeTextContent(anyElement, value) {
	anyElement.textContent = value;
}

function removeElement(anyElement) {
	anyElement.forEach(item => {
		item.remove();
	});
}

changeStyle(poster, 'background', `url(img/bg.jpg) no-repeat center top/cover`);
showedMovies(movieList, movieDB.movies);
changeTextContent(genre, 'драма');
removeElement(adv);

// for (let i = 0; i < movieDB.movies.length; i++) {
// 	movieList.innerHTML += ` <li class="promo__interactive-item">${i + 1}. ${
// 		movieDB.movies[i]
// 	}
//       <div class="delete"></div></li>`;
// }
