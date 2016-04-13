[![Travis branch](https://img.shields.io/travis/GreyRook/POM/master.svg?style=flat-square)](https://travis-ci.org/GreyRook/POM)
[![Coverage Status](https://img.shields.io/coveralls/GreyRook/POM/master.svg?style=flat-square)](https://coveralls.io/github/GreyRook/POM?branch=master)

# POM - PIXI.js Object Model

Markup representation of [PIXI.js](http://www.pixijs.com/) objects in JSON.

see http://greyrook.github.io/POM-examples/ for examples how to use it.


## Usage

```javascript
var data = {
    "children":[] //Your JSON Data
} 

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xffffff});
document.body.appendChild(renderer.view);

var manager = new POM.Manager(data);
stage.addChild(manager);

animate();
function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
}
```

Custom Elements:

```javascript
var data = {
    "children":[
        {
        "type":"customType"
        }
    ] //Your JSON Data
} 

var CustomType = function(manager, data){
    POM.ContainerElement.call(this, manager, data)
}

var p = CustomType.prototype = Object.create(POM.ContainerElement.prototype)

p.updateData = function(data){

    //Your Custom Code
    
    POM.ContainerElement.prototype.updateData.call(this, data)
}

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xffffff});
document.body.appendChild(renderer.view);

var manager = new POM.Manager();

manager.registerPrototype("customType", CustomType)
manager.updateData(data)
stage.addChild(manager);

animate();
function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
}
```
