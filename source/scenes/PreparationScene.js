const shipDatas = [
    {size: 4, direction:'row', startX: 10, startY: 345},
    {size: 3, direction:'row', startX: 10, startY: 390},
    {size: 3, direction:'row', startX: 120, startY: 390},
    {size: 2, direction:'row', startX: 10, startY: 435},
    {size: 2, direction:'row', startX: 88, startY: 435},
    {size: 2, direction:'row', startX: 167, startY: 435},
    {size: 1, direction:'row', startX: 10, startY: 480},
    {size: 1, direction:'row', startX: 55, startY: 480},
    {size: 1, direction:'row', startX: 100, startY: 480},
    {size: 1, direction:'row', startX: 145, startY: 480},
];

class PreparationScene extends Scene {
    draggedShip = null;
    // а так же мы будем инициализировать сцену
    init() {
        const { player } = this.app;
        for( const {size, direction, startX, startY} of shipDatas ) {
            const ship = new ShipView(size, direction, startX, startY);
            player.addShip(ship);
        }
    }

    // мы будем запускать сцену
    start() {
        console.log('Preparation scene start');
    }


    // мы будем обновлять сцену
    update() {
        const {mouse, player} = this.app;

        debugger;

        // Потенциально хотим начать тянуть корабль
        if( !this.draggedShip  && mouse.left && !mouse.pLeft) {
            // надо определить находится ли мышка над одним из кораблей
            const ship = player.ships.find((ship) => ship.isUnder(mouse));
            if( ship ) {
                this.draggedShip = ship;
            }
        }


        // если у нас прожата левая клавиша и у нас есть перетаскиваемы корабль
        if(mouse.left && this.draggedShip) {
            const {left, top} = player.root.getBoundingClientRect();

            this.draggedShip.div.style.left = `${mouse.x}px`;
            this.draggedShip.div.style.top = `${mouse.y}px`;
        }

        // если у нас mouse.left не зажата, но все еще есть перетаскиваемый корабль, то это означает, что мы хотим его бросить
        if( !mouse.left && this.draggedShip ) {
            this.draggedShip = null;
        }


    }

    // мы будем останавливать сцену
    stop() {}
}