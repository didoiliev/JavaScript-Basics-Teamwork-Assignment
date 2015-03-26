'use strict';
function init() {
	var stage = new createjs.Stage("siteCanvas");
	stage.mouseMoveOutside = false;
	stage.enableMouseOver(10);
	stage.canvas.style.cursor = "none";

	var background = new createjs.Bitmap("background.jpg");
	background.scaleX = 0.2;
	background.scaleY = 0.2;
	stage.addChild(background);

	addTitleMenu(stage);
   	drawBullets(stage);

	var crosshair = new createjs.Bitmap("crosshair.png");
	crosshair.scaleX = 0.03;
	crosshair.scaleY = 0.03;
   	crosshair.x = -9999;
   	crosshair.y = -9999;
   	stage.addChild(crosshair);

 	function tick(event) {
 		stage.update();
	}

	function moveHandler() {
   		crosshair.x = stage.mouseX - 55;
   		crosshair.y = stage.mouseY - 55;
  	}

  	stage.addEventListener("stagemousemove", moveHandler);

	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
 	createjs.Ticker.setFPS(60);
}

function addTitleMenu(stage) {

	var menuBullet = new createjs.Bitmap("menu-bullet.png");
    menuBullet.alpha = 0;
    menuBullet.scaleX = 0.1;
    menuBullet.scaleY = 0.1;
    stage.addChild(menuBullet);

	var menuButtons = [
		new createjs.Text("New Game", "30px Chunk", "#FFFFFF"),
		new createjs.Text("Options", "30px Chunk", "#FFFFFF"),
		new createjs.Text("Credits", "30px Chunk", "#FFFFFF")
	];

	function onHover() {
		menuBullet.alpha = 1;
		menuBullet.x = this.x - 50;
		menuBullet.y = this.y + 5;
		this.shadow = new createjs.Shadow("Yellow", 2, 2, 15);
		this.color = "white";
	}

	function onUnHover() {
		menuBullet.alpha = 0;
		this.color = "white";
		this.shadow = new createjs.Shadow("Red", 2, 2, 15);
	}

	var verticalSpace = 250;
	
	for (var btn in menuButtons) {
		var tempBtn = menuButtons[btn];
		tempBtn.x = 250;
		tempBtn.y = verticalSpace;
		tempBtn.shadow = new createjs.Shadow("Red", 2, 2, 15);
		verticalSpace = verticalSpace + 50;
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("#000").drawRect(0, 0, 
			tempBtn.getMeasuredWidth() + 30, 
			tempBtn.getMeasuredHeight() + 10);
		
		tempBtn.hitArea = hitArea;
		stage.addChild(tempBtn);
	}

	menuButtons[0].on("mouseover", onHover);
	menuButtons[0].on("mouseout", onUnHover);
	menuButtons[1].on("mouseover", onHover);
	menuButtons[1].on("mouseout", onUnHover);
	menuButtons[2].on("mouseover", onHover);
	menuButtons[2].on("mouseout", onUnHover);
}

function drawBullets(stage) {
	var bulletGroup = [];
	var horizontalSpace = 50;
	for (var i = 0; i < 6; i++) {
		var bullet = new createjs.Bitmap("bullet.png");
		bullet.scaleX = 0.09;
		bullet.scaleY = 0.09;
		bullet.x = stage.canvas.width - horizontalSpace;
		bullet.y = stage.canvas.height - 100;
		horizontalSpace = horizontalSpace + 20;
		bulletGroup.push(bullet);
	}

	for (var i in bulletGroup) {
		stage.addChild(bulletGroup[i]);
	}
}