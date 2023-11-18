<script setup>
import { ref } from 'vue'

const getInitialItems = () => [' ', ' ', ' ', ' ', ' ']
const items = ref(getInitialItems());
const show = ref(false);

function SoLoaded(){
    show != show;
    console.log("mounted");
};
</script>

<template>
    <div id="so-content" @hook:mounted="SoLoaded">
        <TransitionGroup name="so-list" tag="ul">
            <li v-for="n in 5" :key="item" class="so-item" style="animation-delay: {{n}} s;" v-if="ｎshow">
            </li>
        </TransitionGroup>
    </div>
</template>

<style>
#so-content {
    z-index: 5;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
}

#so-content ul,li {
    width: 100%;
    height: 100%;
    padding: 0;
    list-style: none;
}

#so-content .so-item {
    background-color: darkseagreen;
    width: 0%;
    height: 20%;
    padding: 0;
    list-style: none;
}

.so-list-enter-active,
.so-list-leave-active {
    animation: so-slide 3s;
}

@keyframes so-slide {
    0% {
        width: 0%;
        margin-left: 0%;
    }

    40% {
        width: 100%;
        margin-left: 0%;
    }

    60% {
        width: 100%;
        margin-left: 0%;
    }

    100% {
        width: 0%;
        margin-left: 100%;
    }
}
</style>
