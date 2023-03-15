/** @module Card */

import InitCard from "./initCard.js";
import UnsplashApi from "./API/unsplashAPI.js";

export default class Card {
    _arrayNameCar = ['BMB', 'Tesla', 'Audi', 'Mazda', 'Ferrari'];
    _isRandomPhoto = false;
    _markupCard = `
    <div class="slide" style="background-image: url('{URLToImage}')">
        <h3>{NameCar}</h3>
    </div>`;
    _regMaskSlide = new RegExp('{[a-zA-Z]+}', 'g');

    /**
     * Создаем экземпляр класса Card
     *
     * @constructor
     * @this {Card}
     * @param {string} container - Класс контейнера слайдера
     * @param {Object} paramsObject - Парраметры галереи
     * */
    constructor(container, paramsObject) {
        this.initCard = new InitCard(container);

        if(paramsObject.isRandomPhoto || this._isRandomPhoto) {
            this.unsplashAPI = new UnsplashApi(paramsObject.apiKey)

            if(paramsObject.arrayNameCar) this._arrayNameCar = paramsObject.arrayNameCar;

            this.init();
        }
    }

    /**
     * Иницилизирует галерею
     *
     * @this {Card}
     * */
    async init() {
        // Очищаем галерею
        this.initCard._container.innerHTML = '';

        const arrayImage = await this.unsplashAPI.getRandPhotos(this._arrayNameCar)
        this.setSlides(arrayImage);
    }

    /**
     * Устанавливает слайды в галерее
     *
     * @this {Card}
     * @param {Array} arrayImage - Массив с объектами изображения
     * */
    setSlides(arrayImage) {
        let iterator = 0;

        arrayImage.forEach(image => {
            const nameCar = this._arrayNameCar[iterator];
            const imageSrc = image.urls.regular;

            this.initCard._container.innerHTML += this.generateMarkupSlide(nameCar, imageSrc);

            iterator++;
        })
    }

    /**
     * Генерирует разметку слайда
     *
     * @this {Card}
     * @param {String} nameCar - Название машины
     * @param {String} imageSrc - Ссылка на картинку
     * @return {String} Строку html слайда
     * */
    generateMarkupSlide (nameCar, imageSrc) {
        return this._markupCard.replaceAll(this._regMaskSlide, id => {
            switch (id) {
                case '{URLToImage}':
                    return imageSrc;
                    break;
                case '{NameCar}':
                    return nameCar;
                    break;
            }
        })
    }
}
