<template>
    <div class="game-container">
        <div class="fps-counter">
            <span class="frame-time-label">Frame time: </span>
            <span class="frame-time" id="frame-time">0</span>
        </div>
        <div class="canvas-container" ref="canvas_container">
            <canvas v-bind:id="layer.slug"
                    v-bind:height="layer.height"
                    v-bind:width="layer.width"
                    v-bind:style="{ height: layer.visible_height, width: '100%', 'z-index': layer.zindex }"
                    v-bind:key="layer.slug"
                    class="graphics-layer"
                    v-for="layer in layers"/>
        </div>
    </div>
</template>

<script>
    import { LAYERS, CONSTANTS, start_game, current_held_keys } from '../game/main';

    export default {
        name: "Game",
        data: function () {
            return {
                layers: []
            }
        },
        mounted: function () {
            const max_width = this.$refs.canvas_container.clientWidth;
            LAYERS.forEach((layer) => {
                if (layer.size === 'auto') {
                    layer.width = max_width;
                    layer.height = Math.floor(max_width / CONSTANTS.scale);
                    layer.visible_height = layer.height;
                }
                this.layers.push(layer);
            });

            window.addEventListener('resize', () => {
                const max_width = this.$refs.canvas_container.clientWidth;
                this.layers.forEach((layer) => {
                    if (layer.size === 'auto') {
                        layer.visible_height = Math.floor(max_width / CONSTANTS.scale);
                    }
                });
            });

            document.addEventListener('keydown', function (event) {
                current_held_keys.add(event.code);
                console.log(current_held_keys);
            });

            document.addEventListener('keyup', function (event) {
                current_held_keys.delete(event.code);
                console.log(current_held_keys);
            });

            this.$nextTick().then(() => {
                start_game(max_width)
            });
        }
    }
</script>

<style scoped lang="scss">
    .game-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .fps-counter {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }

    .canvas-container {
        width: 100%;
        position: relative;
    }

    .graphics-layer {
        position: absolute;
        top: 0;
        left: 0;

        &:first-of-type {
            position: relative;
        }
    }
</style>