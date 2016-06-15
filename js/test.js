
var auto1 = new Entity('Auto 1');
var auto2 = new Entity('Auto 2', 2);

var block = new Area(1,1,32,32);

block.addSections([ 
    new Section(2, 3, 10, 3, 1),
    new Section(10, 3, 10, 20, 3),
    new Section(10, 20, 30, 30, 2),
    new Section(30, 30, 2, 30, 2)
  ]);

block.addCar(auto1);
block.addCar(auto2); 

var objects = [
    block
  ];

var v = new View("canvas");
v.setObjects(objects);

function move1() {
  auto1.move();
}
function move2() {
  auto2.move();
}
function moveBoth() {
  auto1.move();
  auto2.move();
}