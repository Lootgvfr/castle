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

    collision_type (other_collision_box) {
        /* Calculates collision status between this box and the given box
         * Returns null if there's no collision, otherwise - value
         * 'left', 'right', 'bottom', 'top' */
        let pos_x = this.pos_x;
        let pos_y = this.pos_y;
        let other_pos_x = other_collision_box.pos_x;
        let other_pos_y = other_collision_box.pos_y;
        if (pos_x + this.width >= other_pos_x) {
            return 'right';
        }
        if (pos_x <= other_pos_x + other_collision_box.width) {
            return 'left';
        }
        if (pos_y + this.height >= other_pos_y) {
            return 'top';
        }
        if (pos_y <= other_pos_y + other_collision_box.height) {
            return 'bottom';
        }
        return null;
    }
}

export { CollisionBox };