import { GameObject } from "../game_object/base";

export class Player extends GameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.direction = 1;

        this.vx = 0;
        this.vy = 0;

        this.speedx = 400;
        this.speedy = -1000;

        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed.keys;

        this.status = 3; // 0:idle, 1:forward, 2:backward, 3:jump, 4:attack, 5: attacked, 6: die
        this.animations = new Map();
        

        start() {

        }

        update_move() {
            
        }
    }
}