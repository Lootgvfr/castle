const REVERSE_SIDES = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
};

class CollisionBox {
    is_active; // should the collisions be calculated with this element

    // possible values of type:
    // - body
    // - attack
    type;

    width;
    height;
    offset_x; // offset in X from the entity's position
    offset_y; // offset in Y from the entity's position
    entity; // entity owning this collision box

    constructor(
        {
            entity,
            is_active = true,
            type = 'body',
            width = 0,
            height = 0,
            offset_x = 0,
            offset_y = 0
        }
    ) {
        this.entity = entity;
        this.is_active = is_active;
        this.type = type;
        this.width = width;
        this.height = height;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
    }

    get pos_x () {
        return this.entity.pos_x + this.offset_x;
    }

    get pos_y () {
        return this.entity.pos_y + this.offset_y;
    }

    collision_details (other_collision_box, calculate_side) {
        /* Calculates collision status between this box and the given box
         * Returns null if there's no collision, otherwise - value
         * 'left', 'right', 'bottom', 'top' */
        // TODO optimize this first part?
        const this_x1 = this.pos_x;
        const this_x2 = this.pos_x + this.width;
        const this_y1 = this.pos_y;
        const this_y2 = this.pos_y + this.height;
        const other_x1 = other_collision_box.pos_x;
        const other_x2 = other_collision_box.pos_x + other_collision_box.width;
        const other_y1 = other_collision_box.pos_y;
        const other_y2 = other_collision_box.pos_y + other_collision_box.height;

        let dxr = this_x2 - other_x1; // how much this box passes into the other on the right
        let dxl = other_x2 - this_x1; // how much this box passes into the other on the left
        let dyt = this_y2 - other_y1; // how much this box passes into the other on the top
        let dyb = other_y2 - this_y1; // how much this box passes into the other on the bottom

        if (!calculate_side && (dxl >= 0 && dxr >= 0 && dyt >= 0 && dyb >= 0)) {
            // return right side by default if no need to calculate side and there is any collision
            return { side: 'right', distance: 0 };
        }

        dxr = dxr > other_collision_box.width ? -1 : dxr;
        dxl = dxl > other_collision_box.width ? -1 : dxl;
        dyt = dyt > other_collision_box.height ? -1 : dyt;
        dyb = dyb > other_collision_box.height ? -1 : dyb;

        if (dxl < 0 && dxr < 0 && dyt < 0 && dyb < 0) {
            // no passing on either of the sides
            return null;
        }

        const is_other_inside_horizontally = other_x1 >= this_x1 && other_x2 <= this_x2;

        if (dxr >= 0 && dxl >= 0 || is_other_inside_horizontally) {
            // horizontally one of the boxes is inside of another
            if (dyt >= 0) {
                return { side: 'top', distance: 0 };
            } else if (dyb >= 0) {
                return { side: 'bottom', distance: 0 };
            }
            return null;
        }

        const is_other_inside_vertically = other_y1 >= this_y1 && other_y2 <= this_y2;

        if (dyt >= 0 && dyb >= 0 || is_other_inside_vertically) {
            // vertically one of the boxes is inside of another
            if (dxr >= 0) {
                return { side: 'right', distance: 0 };
            } else if (dxl >= 0) {
                return { side: 'left', distance: 0 };
            }
            return null;
        }

        if (dxr >= 0 && dyt >= 0) {
            // right-top corner collision
            // return whichever side collided less
            return dxr > dyt ? { side: 'top', distance: 0 } : { side: 'right', distance: 0 };
        }

        if (dxr >= 0 && dyb >= 0) {
            // right-bottom corner collision
            return dxr > dyb ? { side: 'bottom', distance: 0 } : { side: 'right', distance: 0 };
        }

        if (dxl >= 0 && dyt >= 0) {
            // left-top corner collision
            return dxl > dyt ? { side: 'top', distance: 0 } : { side: 'left', distance: 0 };
        }

        if (dxl >= 0 && dyb >= 0) {
            // left-bottom corner collision
            return dxl > dyb ? { side: 'bottom', distance: 0 } : { side: 'left', distance: 0 };
        }

        return null;
    }

    reverse_collision_side (collision_side) {
        return REVERSE_SIDES[collision_side];
    }
}

export { CollisionBox };