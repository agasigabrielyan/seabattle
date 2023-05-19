function getRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max-min+1));
}

function getRandomFrom(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index];
}

function isUnderPoint(point, element) {

    // из элемента нам нужно достать положение этого элемента, любой элемент в js это прямоугольник с шириной и высотой и отступами слева и сверху от левого верхнего угла

    // метод getBoundingClientRect возвращает объект - прямоугольник и в нем есть x и y ширина и высота
    const { left, top, width, height } = element.getBoundingClientRect();
    // чтобы понять, что точка находится внутри элемента нам нужно убедиться, что координаты точки находятся между точками ширины и высоты элемента.
    // т.е. point.x должна находится между element.left и (element.left + element.width)
    // а y должна находится между top и (top + height)

    // если точка находится над элементом, то возвращает true в противном случае false
    // точка у нее должна быть координата x и y с помощью деструктуризации мы их достаем
    const {x, y} = point;

    return left <= x && x <= left + width && top <= y && y <= top + height;
}