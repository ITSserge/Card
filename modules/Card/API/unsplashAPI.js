/** @module UnsplashApi */

export default class UnsplashApi {
    _linkAPI = 'https://api.unsplash.com{method}?{query}';
    _methodsUrl = {
        randomPhotos : '/photos/random'
    }
    _defaultParamsConnection = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Version' : 'v1',
            'orientation' : 'landscape'
        },
    }
    _regMaskUrl = new RegExp('{[a-zA-Z]+}', 'g')

    /**
     * Создаем экземпляр класса UnsplashApi
     *
     * @constructor
     * @this {UnsplashApi}
     * @param {String} apiKey - Ключ api
     * @param {Object} objectParams - Объект парраметров запроса
     * */
    constructor(apiKey) {
        this._apiKey = apiKey;
        this._defaultParamsConnection.headers['Authorization'] = `Client-ID ${this._apiKey}`;
    }

    /**
     * Получает рандоманые картинки от API
     *
     * @this {UnsplashApi}
     * @param {Array} arrayNameCar - Массив с названиями машин
     * @return {Array} Массив с информацией полученной от API
     * */
    async getRandPhotos(arrayNameCar) {
        /**
         * TODO: Видо изменить код. Например:
         * 1. Переписать под цепочки промисов
         * 2. Создать отлельную функцуию, т.к имееться повтряющий код.
         * */
        // Отправляем запросы на сервер
        const requestsArray = arrayNameCar.map(car => {
            const currentUrl = this._generateCurrentUrl('randomPhotos', {
                query: car
            });

            return this._fetchAPI(currentUrl, this._defaultParamsConnection)
        })
        const resolveArray = await Promise.allSettled(requestsArray);

        // Обрабатываем возращенные результаты
        const dataArray = [...resolveArray].map(resolvePromise => resolvePromise.value)

        return dataArray;
    }

    /**
     * Отправляет запрос к API Unsplash
     *
     * @this {UnsplashApi}
     * @param {String} url - Корректный url для запроса
     * @param {Object} paramsConnection - Параммеры для отправки запроса
     * @return {Promise} Промис для обработки запроса
     * */
    async _fetchAPI(url, paramsConnection) {
        const response = await fetch(url, paramsConnection);
        const data = await response.json();

        return data;
    }

    /**
     * Генерирует url для запроса
     *
     * @this {UnsplashApi}
     * @param {String} method - Название метода (типа запроса) ... Например convert
     * @param {Object} queryObject - Данные для парраметров запроса
     * @return {String} Готовый url адресс, для отправки запроса
     * */
    _generateCurrentUrl(method, queryObject) {
        const currentUrl = this._linkAPI
            .replaceAll(this._regMaskUrl, value => {
                switch (value) {
                    case '{method}':
                        return this._methodsUrl[method]
                        break;
                    case '{query}':
                        return this._generateParamsUrl(queryObject);
                        break;
                }
            });

        return currentUrl;
    }

    /**
     * Генерирует строку из объекта для url запроса
     *
     * @this {UnsplashApi}
     * @param {Object} objectParams - Объект параметров
     * @return {String} Строку параметров в виде url запроса
     * */
    _generateParamsUrl(objectParams) {
        let result = new URLSearchParams(objectParams);

        return result.toString();
    }
}