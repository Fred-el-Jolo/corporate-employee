import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
// import { Application, Sprite, Assets } from 'pixi.js';

/*document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`*/

// let app = new Application({ width: 640, height: 360 });
// document.querySelector<HTMLDivElement>('#app').appendChild(app.view);

// const bunny = Sprite.from('https://pixijs.com/assets/bunny.png');
// app.stage.addChild(bunny)

// // center the sprite's anchor point
// bunny.anchor.set(0.5)

// // move the sprite to the center of the screen
// bunny.x = app.screen.width / 2
// bunny.y = app.screen.height / 2

// // Listen for animate update
// app.ticker.add((delta) => {
//     // just for fun, let's rotate mr rabbit a little
//     // delta is 1 if running at 100% performance
//     // creates frame-independent transformation
//     bunny.rotation += 0.1 * delta;
// });






/*let sprite = Sprite.from('./sample.png');
app.stage.addChild(sprite);

// Add a variable to count up the seconds our demo has been running
let elapsed = 0.0;
// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add((delta) => {
  // Add the time to our total elapsed time
  elapsed += delta;
  // Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});*/

let start: number = -1;
let previousTimestamp: DOMHighResTimeStamp = 0;

const limit = 500;
let value = 0;
let n = 1;
let previouslyUpdated = true;
const step = (timeStamp: DOMHighResTimeStamp) => {
  if (previouslyUpdated && value % 5 > 1) {
    previouslyUpdated = false;
  }

  if (start === -1) {
    start = timeStamp;
  }
  const elapsed = timeStamp - start;
  const delta = timeStamp - previousTimestamp;

  if (previousTimestamp !== timeStamp) {
    value += n * delta / 1000;

    // console.log(`timeStamp=${timeStamp}`);
    // console.log(`previousTimestamp=${previousTimestamp}`);
    // console.log(`start=${start}`);
    // console.log(`elapsed=${elapsed}`);
    // console.log(`delta=${delta}`);
    // console.log(`value=${value}`);
    // console.log(`n=${n}`);
    // console.log(`previouslyUpdated=${previouslyUpdated}`);
    //console.log(`value % 5=${value % 5}`);

    document.querySelector<HTMLDivElement>('#app')!.innerText = Math.min(value, limit).toFixed(2);

    if (!previouslyUpdated && value % 5 < 1) {
      previouslyUpdated = true;
      n++;
    }

    if (value < limit) {
      previousTimestamp = timeStamp;
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);