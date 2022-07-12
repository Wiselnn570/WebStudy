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
        this.speedy = -1600;

        this.gravity = 50;
        this.frame_current_cnt = 0;
        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3; // 0:idle, 1:forward, 2:backward, 3:jump, 4:attack, 5: attacked, 6: die
        this.animations = new Map();
        this.hp = 100;
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id} > div`);
        this.$hp.width(this.$hp.parent().width * this.hp / 100);
    }

    start() {
        this.draw();
    }

    collision() {
        let you = this.root.players[1 - this.id];
        let mx1 = this.x, my1 = this.y, mx2 = this.x + this.width, my2 = this.y + this.height;
        let yx1 = you.x, yy1 = you.y, yx2 = you.x + this.width, yy2 = you.y + this.height;
        if(Math.max(mx1, yx1) > Math.min(mx2, yx2))
            return false;
        if(Math.max(my1, yy1) > Math.min(my2, yy2))
            return false;
        return true;
    }

    update_move() {
        if (this.status === 3 || this.status === 5) this.vy += this.gravity;
        let you = this.root.players[1 - this.id];
        // if (this.collision()) {
        //     you.vx += this.vx;
        //     this.vx = you.vx;
        // }
        // console.log(this.vx, this.vy, you.vx, you.vy);
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 400) {
            this.y = 400;
            this.vy = 0;
            this.vx = 0;
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
            if(space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            }
            else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = - this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                if(this.status === 0) this.frame_current_cnt = 0;
                this.status = 1;
            } else if (a) {
                this.vx = - this.speedx;
                if(this.status === 0) this.frame_current_cnt = 0;
                this.status = 1;
            } else {
                this.vx = 0;
                if(this.status === 1) this.frame_current_cnt = 0;
                this.status = 0;
            }
            
        }
    }

    update_direction() {

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    is_attack() {
        this.vx = 0;
        this.status = 5;
        this.frame_current_cnt = 0;
        this.hp -= 50;
        if (this.hp < 0) {
            this.hp = 0;
            this.status = 6;
        }
        
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                   

                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                };
            }

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
             
            };
            
            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }
    }

    is_collision(r1, r2) {
        if(Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if(Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }
    fixed() {
        let x = this.x, y = this.y;
        let width = this.width, height = this.height;
        if (this.status === 3) {
            width *= 1.45;
            height *= 1.45;
            x -= 50;
            y -= 100;
        }
        else if(this.status === 4) {
            width *= 1.6;
            if (this.direction < 0) {
                x -= 75;
            }
        }
        else if(this.status === 5) {
            width *= 1.2;
        }
        else if(this.status === 6) {
            width *= 1.8;
            height *= 1.3;
        }
        return [x, y, width, height];
    }

    render() {
        let status = this.status;
        let obj = this.animations.get(status);
        if(obj && obj.loaded) { 
            if((status === 4 || status === 5) && this.frame_current_cnt === obj.frame_cnt * obj.frame_rate) {
                this.status = 0;
                this.frame_current_cnt = 0;
            }
            if (this.direction > 0) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                let x_y_w_h = this.fixed();
                this.ctx.drawImage(image, x_y_w_h[0], x_y_w_h[1], x_y_w_h[2], x_y_w_h[3]);
                // this.ctx.fillRect(this.x, this.y, this.width, this.height);
                // this.ctx.fill();
            }
            else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                let x_y_w_h = this.fixed();
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - x_y_w_h[0] - x_y_w_h[2], x_y_w_h[1], x_y_w_h[2], x_y_w_h[3]);
                // this.ctx.fillRect(this.root.game_map.$canvas.width() - x_y_w_h[0] - x_y_w_h[2], x_y_w_h[1], this.width, this.height);
                // this.ctx.fill();
                this.ctx.restore();
            }

            // console.log(params[0], params[1]);
            
            
        }
        this.frame_current_cnt ++;

        if (this.status === 6 && this.frame_current_cnt === obj.frame_cnt * obj.frame_rate) {
            this.status = 6;
            this.frame_current_cnt --;
        }
    }

    update() {
        this.update_move();
        this.update_control();
        this.update_direction();
        this.update_attack();
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