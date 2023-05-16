class Scene {
    name = null;
    app = null;

    constructor(name, app) {
        Object.assign(this, {name, app});
    }

    // а так же мы будем инициализировать сцену
    init() {}

    // мы будем запускать сцену
    start() {}


    // мы будем обновлять сцену
    update() {}

    // мы будем останавливать сцену
    stop() {}
}