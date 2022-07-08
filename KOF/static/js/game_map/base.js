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
}