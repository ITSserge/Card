/** @module InitCard */

export default class InitCard {
    /**
     * Создаем экземпляр класса InitCard
     *
     * @constructor
     * @this {InitCard}
     * @param {string} container - Класс контейнера слайдера
     * */
    constructor(container) {
        this._container = document.querySelector(container);

        this._container.addEventListener('click', this.handleSlideClick.bind(this))
    }

    /**
     * Callback функция для обработчика событий, при нажатии на слайд
     *
     * @this {InitCard}
     * @param {Object} event - Объект ивента
     * */
    handleSlideClick(event) {
        const currentSlide = event.target.closest('.slide');
        if(!currentSlide) throw new Error('Не найден слайд')

        this.addClass(currentSlide);
        this.removeClass(currentSlide);
    }

    /**
     * Очищает класс active у каждого слайда
     *
     * @this {InitCard}
     * @param {Object} currentSlide - Активный слайд
     * */
    removeClass(currentSlide) {
        const slides = this._container.children;

        [...slides].forEach(slide => {
            if(slide !== currentSlide) slide.classList.remove('active');
        })
    }

    /**
     * Добавлять класс слайду
     *
     * @this {InitCard}
     * @param {Object} currentSlide - Активный слайд
     * */
    addClass(currentSlide) {
        if(!currentSlide.classList.contains('active')) { // Если у слайда нет класса active
            currentSlide.classList.add('active');
            return;
        }

        currentSlide.classList.remove('active')
    }
}