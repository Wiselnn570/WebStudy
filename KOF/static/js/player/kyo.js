import { Player } from '/KOF/static/js/player/base.js';
import {GIF} from '/KOF/static/js/utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsety;
        for (let i = 0; i < 7; i ++) {
            let gif = GIF();
            gif.load(`/KOF/static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,
                frame_rate: 8,
                offset_y: 10,
                loaded: false,
                scale: 2,
            });

            gif.onload = () => {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
            }
        }
    }
}