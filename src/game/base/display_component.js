class DisplayData {
    constructor(
        {
            is_displayed = true,
            canvas_name = 'main',
            display_type = 'rectangle',
            filled = true,
            color = 'black',
            width = 0,
            height = 0,
        }
    ) {
        this.is_displayed = is_displayed;
        this.canvas_name = canvas_name;
        this.display_type = display_type;
        this.filled = filled;
        this.color = color;
        this.width = width;
        this.height = height;
    }
}