<template>
    <div class="game-container">
        <div class="canvas-container" ref="canvas_container">
            <canvas v-bind:id="layer.name"
                    v-bind:height="layer.height"
                    v-bind:width="layer.width"
                    v-bind:style="{ height: layer.height, width: layer.width, 'z-index': layer.zindex }"
                    v-bind:key="layer.name"
                    class="graphics-layer"
                    v-for="layer in layers"/>
        </div>
    </div>
</template>

<script>
    import { layers, scale } from '../game/game';

    export default {
        name: "Game",
        data: function () {
            return {
                layers: []
            }
        },
        mounted: function () {
            const max_width = this.$refs.canvas_container.clientWidth;
            layers.forEach((layer) => {
                if (layer.size === 'auto') {
                    layer.width = max_width;
                    layer.height = max_width / scale;
                }
                this.layers.push(layer);
            });
        }
    }
</script>

<style scoped>
    .game-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .canvas-container {
        width: 100%;
    }

    .graphics-layer {}
</style>