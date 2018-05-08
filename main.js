/**
 * botbscroller - https://github.com/tinybarks/botbscroller
 * To the extent possible under law, the person who associated CC0 with
 * this project has waived all copyright and related or neighboring rights
 * to this project.
 * You should have received a copy of the CC0 legalcode along with this
 * work. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */

// shamelessly cobbled together from examples

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        ready();
    }
};

function ready() {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    const texture = PIXI.Texture.fromImage("botb_bg.png");
    const tilingSprite = new PIXI.extras.TilingSprite(
        texture,
        app.screen.width,
        app.screen.height
    );

    let colorMatrix = new PIXI.filters.ColorMatrixFilter();
    app.stage.filters = [colorMatrix];

    // default matrix:
    // colorMatrix.matrix = [
    //     1, 0, 0, 0, 0,      // r
    //     0, 1, 0, 0, 0,      // g
    //     0, 0, 1, 0, 0,      // b
    //     0, 0, 0, 1, 0];     // a

    // mess around with the logo colors, you could make this dynamic
    colorMatrix.matrix = [
        2.5,  0,   0,   0,   1,      // r
        0,    0.1, 0,   0,   0,      // g
        0,    0,   0.1, 0,   0,      // b
        0,    0,   0,   1,   0];     // a

    // resize/scaling code to maintain size and aspect ratio
    const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        app.renderer.view.style.width = w + "px";
        app.renderer.view.style.height = h + "px";
        app.renderer.resize(w, h);
        // app.screen.width = w;
        // app.screen.height = h;
        tilingSprite.width = w;
        tilingSprite.height = h;
    };

    window.onresize = onResize;
    onResize();

    app.stage.addChild(tilingSprite);

    // main gfx loop
    app.ticker.add(() => {
        tilingSprite.tileScale.x = 2;
        tilingSprite.tileScale.y = 2;
        tilingSprite.tilePosition.x += 1;
        tilingSprite.tilePosition.y += 1;
    });
}
