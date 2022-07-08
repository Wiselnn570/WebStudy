import { GameObject } from "/KOF/static/js/game_object/base.js"
import { Controller } from "/KOF/static/js/controller/base.js";
export class GameMap extends GameObject {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $('<canvas id="tutorial" width="1280" height="720" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
        this.controller = new Controller(this.$canvas);
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
        this.ctx.fill();
    }

    start() {
        this.draw();
    }

    update() {
        this.draw();
    }

    destroy() {

    }
}