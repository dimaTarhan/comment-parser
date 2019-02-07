// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// Методы хранятся в прототипе
Animal.prototype.run = function() {
    alert(this.name + " бежит!");
};

// --------- Класс-потомок -----------
// Конструктор потомка
function Rabbit(name) {
    Animal.apply(this, arguments);
}

// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);

// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;

// Методы потомка
Rabbit.prototype.run = function() {
    // Вызов метода родителя внутри своего
    Animal.prototype.run.apply(this);
    alert( this.name + " подпрыгивает!" );
};

// Готово, можно создавать объекты
var rabbit = new Rabbit('Кроль');
rabbit.run();

function CoffeeMachine(power) {
    // свойства конкретной кофеварки
    this._power = power;
    this._waterAmount = 0;
}

// свойства и методы для всех объектов класса
CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._getTimeToBoil = function() {
    return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};

CoffeeMachine.prototype.run = function() {
    setTimeout(function() {
        alert( 'Кофе готов!' );
    }, this._getTimeToBoil());
};

CoffeeMachine.prototype.setWaterAmount = function(amount) {
    this._waterAmount = amount;
};

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();