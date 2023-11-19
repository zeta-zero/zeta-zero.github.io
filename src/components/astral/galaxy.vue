<script setup>
defineProps(['basecolor']);

</script>

<template>
    <div class="ag-body">
        <div class="ag-bg" :style="{'--base-color':basecolor}">
            <div class="ag-center">
            </div>
            <div class="ag-item" v-for="n in 3">
                <div :class="'ag-obit-' + n" />
                <div :class="'ag-planet-' + n" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

$alloffset:50px;
.ag-bg {
    width: 100%;
    height: 100%;
    position: relative;
    transform: skew(45deg,0deg) scale(50%) translateY(-30%);
}

.ag-bg .ag-center {
    position: absolute;
    display: inline;
    top:$alloffset;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--base-color);
}

.ag-item {
    position: absolute;
    display: inline;
}

@for $i from 1 through 3 {
    $topoffset: (15px + 15 * $i) + $alloffset;
    $offset: -(5px + 15px * $i);
    $time: (3s+$i*1s);

    .ag-item .ag-planet-#{$i} {
        position: absolute;
        display: inline;
        width: 10px;
        height: 10px;
        left: 5px;
        border-radius: 5px;
        background-color: var(--base-color);

        transform-origin: center $offset;
        top: $topoffset;
        animation: planetCircle $time linear infinite;
    }

    $obitradius: (10px + 15px * $i);
    $obitsize: $obitradius * 2;
    $obitoffset: -(15px * $i);

    .ag-item .ag-obit-#{$i} {
        position: absolute;
        display: inline;
        border: 1px solid var(--base-color);

        width: $obitsize;
        height: $obitsize;
        border-radius: $obitradius;
        top: $obitoffset + $alloffset;
        left: $obitoffset;
    }
}

@keyframes planetCircle {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
