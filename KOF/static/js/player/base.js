import { GameObject } from "/KOF/static/js/game_object/base.js";

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
        this.cnt = 0;
        this.direction = 1;
        this.vx = 0;
        this.vy = 0;

        this.speedx = 400;
        this.speedy = -2000;

        this.gravity = 50;
        this.frame_current_cnt = 0;
        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3; // 0:idle, 1:forward, 2:backward, 3:jump, 4:attack, 5: attacked, 6: die
        this.animations = new Map();
        
    }

    start() {
        this.draw();
    }

    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 400) {
            this.y = 400;
            this.vy = 0;
            
            if (this.status === 3) this.status = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
        if(this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
            this.vx = 0;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }
        if (this.status === 0 || this.status === 1) {
            if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = - this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = - this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    fixed() {
        let x = this.x, y = this.y;
        let width = this.width, height = this.height;
        if (this.status === 3) {
            width *= 1.45;
            height *= 1.45;
            x -= 50;
        }
        return [x, y, width, height];
    }

    render() {
        let status = this.status;
        let obj = this.animations.get(status);
        if(obj && obj.loaded) {
            let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
            let image = obj.gif.frames[k].image;
            let x_y_w_h = this.fixed();
            // console.log(params[0], params[1]);
            this.ctx.drawImage(image, x_y_w_h[0], x_y_w_h[1], x_y_w_h[2], x_y_w_h[3]);
        }
        this.frame_current_cnt ++;
    }

    update() {
        this.update_move();
        this.update_control();
        this.render();
    }
    draw() {
        this.root.game_map.ctx.fillStyle = this.color;
        this.root.game_map.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.root.game_map.ctx.fill();

    }
    destroy() {

    }
}