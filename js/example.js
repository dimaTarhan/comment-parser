// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
    let testString = "//My test string";
    let testUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
}

const foo = 'Test string';
const bar = `${foo} //Test string`;

/*Hello from Dmytro Tarhan*/

/*Hello from Dmytro
Tarhan as
FrontEnd Developer*/

// Методы хранятся в прототипе
Animal.prototype.run = function() {
    alert(this.name + " бежит!");
};