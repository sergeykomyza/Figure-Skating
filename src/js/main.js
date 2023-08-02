// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
// 	const header = document.querySelector(".js-mMenu")
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.js-scrollToSection').click(function () {
// 		header.classList.remove("is-open");
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const mMenu = () => {
	const menu = document.querySelector(".js-mMenu")
	const header = document.querySelector('.header')

	document.querySelector(".js-mMenuOpen").addEventListener("click", () => {
		menu.classList.add("is-open");
	});
	document.querySelector(".js-mMenuClose").addEventListener("click", () => {
		menu.classList.remove("is-open");
	});

	$('.js-scrollToSection').click(function () {
		menu.classList.remove("is-open");
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top
        }, 1000);
    });

	function headerActiveToggle() {
		const scrollSize = window.pageYOffset
		scrollSize > 80 ? menu.classList.add('is-scroll') : menu.classList.remove('is-scroll')
		if(document.documentElement.clientWidth < 800){
			scrollSize > 80 ? header.classList.add('is-scroll') : header.classList.remove('is-scroll')
		}
	}
	window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
	window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
	$(".js-maskPhone").inputmask({
		mask: "+7 999 999 99 99",
		clearIncomplete: true,
	});
	$(".email").inputmask({
		mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
		clearIncomplete: true,
		//     greedy: false,
		//     onBeforePaste: function (pastedValue, opts) {
		//         pastedValue = pastedValue.toLowerCase();
		//         return pastedValue.replace("mailto:", "");
		//     },
		//     definitions: {
		//         '*': {
		//             validator: "[0-9A-Za-z-а-я-]",
		//             casing: "lower"
		//         }
		//     }
	});
	$(".js-maskDate").inputmask({
		mask: "99/99/9999",
		clearIncomplete: true,
		placeholder: "dd/mm/yyyy",
	});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started)
const sliders = () => {
	const swiper0 = new Swiper(".js-sliderGroups ", {
		slidesPerView: 1,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			clickable: true,
		},
		breakpoints: {
			565: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
	const swiper1 = new Swiper(".js-sliderLocations ", {
		slidesPerView: 1,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			clickable: true,
		},
		breakpoints: {
			565: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
	const swiper2 = new Swiper(".js-sliderReviews ", {
		slidesPerView: 1,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			clickable: true,
		},
		breakpoints: {
			565: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		},
	});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ОТЗЫВЫ
const reviewsToggle = () => {
	document
		.querySelector(".js-sliderReviews")
		.addEventListener("click", function (e) {
			if (e.target.classList.contains("js-reviewToggle")) {
				const currentSlide = e.target.closest(".review");
				const currentHiddenContent =
					currentSlide.querySelector(".js-reviewHidden");
				const currentVisibleContent =
					currentSlide.querySelector(".js-reviewVisible");
				e.target.classList.toggle("is-open");
				if (e.target.classList.contains("is-open")) {
					currentVisibleContent.classList.add("is-active");
					currentHiddenContent.style.height =
						currentHiddenContent.scrollHeight + "px";
					e.target.innerText = "Скрыть отзыв";
				} else {
					currentVisibleContent.classList.remove("is-active");
					currentHiddenContent.style.height = 0;
					e.target.innerText = "Читать отзыв";
				}
			}
		});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ АККОРДЕОН

const accordeons = (box, item, header, content, openedClass, closedClass) => {
	const accordeon = document.querySelector(box);

	const accItem = accordeon.querySelectorAll(item);

	accItem.forEach((item) => {
		// перебираем все блоки аккордеона
		const accContent = item.querySelector(content);
		accContent.style.cssText = `
		overflow: hidden;
		transition: all .3s;
	  `;
		item.className = closedClass;
		accContent.style.maxHeight = 0;
		item.addEventListener("click", toggle);
	});

	accItem[0].className = openedClass;
	accItem[0].querySelector(content).style.maxHeight =
		accItem[0].querySelector(content).scrollHeight + "px";

	function toggle(e) {
		let target = e.target;
		e.preventDefault();
		const thisClass = this.className;
		const itsAccHeader =
			target == this.querySelector(header) ||
			this.querySelector(header).contains(target);
		const accHeader = this.querySelector(header);
		const accContent = this.querySelector(content);

		accItem.forEach((item) => {
			const accHeader = item.querySelector(header);
			const accContent = item.querySelector(content);
			if (itsAccHeader) {
				item.className = closedClass;
				accContent.style.maxHeight = 0;
			}
		});

		if (thisClass == closedClass) {
			this.className = openedClass;
			this.querySelector(content).style.maxHeight =
				this.querySelector(content).scrollHeight + "px";
		}
	}
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {
	setTimeout(function () {
		var headID = document.getElementsByTagName("body")[0];
		var newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
		headID.appendChild(newScript);
	}, 1000);
	setTimeout(function () {
		var myMap = new ymaps.Map(
			"map",
			{
				center: [55.917879, 37.806326],
				zoom: 13,
				controls: ["smallMapDefaultSet"],
			},
			{
				searchControlProvider: "yandex#search",
			}
		);

		myGeoObject = new ymaps.GeoObject({
			geometry: {
				type: "Point",
			},
		});
		myMap.geoObjects.add(myGeoObject).add(
			new ymaps.Placemark(
				[55.917879, 37.806326],
				{
					balloonContent: "<strong></strong>",
					iconCaption: "М.О., г. Королев, ул. Ленина 12",
				},
				{
					preset: "islands#blueCircleDotIconWithCaption",
					iconCaptionMaxWidth: "200",
				}
			)
		);

		myMap.setType("yandex#publicMap");

		myMap.behaviors.disable("scrollZoom");
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable("drag");
		}
	}, 2000);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mMenu()
sliders()
inputMask()
reviewsToggle()
accordeons(
	".accordeon",
	".accordeon__item",
	".accordeon__header",
	".accordeon__content",
	"accordeon__item opened",
	"accordeon__item closed"
)
map()
