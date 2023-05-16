class Application {
    player = null;
    opponent = null;
    mouse = null;

    scenes = {};
    activeScene = null;
    
    constructor(scenes = {}) {
        const player = new BattlefieldView();
        const opponent = new BattlefieldView();
        const mouse = new Mouse(document.body);

        Object.assign(this, {mouse, player, opponent});

        document.querySelector('[data-side="player"]').append(player.root);
        document.querySelector('[data-side="opponent"]').append(opponent.root);

        for( const[sceneName, SceneClass] of Object.entries(scenes) ) {
            this.scenes[sceneName] = new SceneClass(sceneName, this);
        }

        for( const scene of Object.values(this.scenes) ) {
            scene.init();
        }

        requestAnimationFrame(() => {this.tick()});
    }

    tick() {
        requestAnimationFrame(() => this.tick());

        if(this.activeScene) {
            this.activeScene.update();
        }

        this.mouse.tick();
    }

    start(sceneName) {
        // мы тут убеждаемся, что сцены нет
        if(this.activeScene && this.activeScene.name === sceneName) {
            return false;
        }

        // тут убеждаемся, что существует сцена для запуска, т.е. есть имя сцены
        if(!this.scenes.hasOwnProperty(sceneName)) {
            return false;
        }

        // перед тем как запустить другую сцену нам нужно остановить текущую сцену
        if(this.activeScene) {
            this.activeScene.stop();
        }

        // теперь находим сцену, которую хотим запустить
        const scene = this.scenes[sceneName];
        scene.start();

        this.activeScene =  scene;

        // возвращаем true потому, что запуск успешно произведен
        return true;


    }
}