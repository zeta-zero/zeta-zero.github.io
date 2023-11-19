<script setup>
import { onMounted, nextTick } from 'vue';
defineProps(['basecolor']);


</script>

<template>
    <div class="ab-body">
        <div class="ab-bg" :style="{ '--base-color': basecolor }">
            <div class="ab-item" v-for="i in 3">
                <div class="ab-item-led" />
                <div class="ab-item-check" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.ab-bg{
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    position: relative;
}

.ab-bg .ab-item{
    display: inline-flex;
    width: 100%;
    height: 26%;
    padding:5%;
}

.ab-bg .ab-item .ab-item-led{
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: var(--base-color);
}

.ab-bg .ab-item .ab-item-check{
    margin-left: 5%;
    width: 6%;
    height: 100%;
    background-color: var(--base-color);
    animation: checkmove 1s linear infinite alternate;
}

@keyframes checkmove{
    0%{
        margin-left: 5%;
        width: 10%;
    }
    45%{
        width: 30%;
        margin-left: 5%;
        background-color: white;
    }
    55%{
        margin-left: 60%;
        width: 30%;
        background-color: white;
    }
    100%{
        margin-left: 80%;
        width: 10%;
        background-color: var(--base-color);
    }

}

</style>

