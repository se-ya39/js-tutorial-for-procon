const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const GameArea = new Vector2(720, 1280);
MainCanvas.width = GameArea.x
MainCanvas.height = GameArea.y
let Objects = [];
Objects[0] = new CanvasObject({
  ctx: MainContext,
  img: "assets/Oyama_logo.png",
  position: new Vector2(GameArea.x / 2, GameArea.y / 2),
});
Objects[0].update = function () {
  this.rotate += 10;
};

function main() {
  // your code goes here
}

if (GameArea.x >= GameArea.y)
  MainCanvas.style.height = `calc(100vw * ${GameArea.y / GameArea.x})`;
else MainCanvas.style.width = `calc(100vh * ${GameArea.x / GameArea.y})`;
const GameLoop = new GameLoopManager(() => {
  main();
  MainContext.clearRect(0, 0, GameArea.x, GameArea.y);
  for (let i = 0; i < Objects.length; i++) {
    let targ = Objects[i];
    targ.render();
    targ.update();
  }
  GameLoop.done();
}, 30);
GameLoop.start();
