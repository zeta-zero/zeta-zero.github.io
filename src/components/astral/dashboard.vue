<script setup>
defineProps(['basecolor']);

</script>
<template>
    <div class="db-body" >
        <div class="db-content" :style="{'--base-color':basecolor}">
            <div class="db-board" >
                <div class="db-pointer"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.db-body .db-content{
    width: 100%;
    height: 100%;
    padding: 2px;
}

.db-body .db-content .db-board{
    height: 3vb;
    width: 6vb;
    border-radius: 6vb 6vb 0 0;
    border: 1px solid var(--base-color);
    display: flex;
    justify-content: center; /* 水平居中 */
}

.db-body .db-content .db-board .db-pointer{
    height: 2vb;
    width: 1px;
    background-color: var(--base-color);
    align-self: center;
    transform-origin: center bottom;
    animation: pointermove 2s linear infinite alternate;
}

@keyframes pointermove{
    0%{
        transform: rotate(20deg);
    }
    40%{
        transform: rotate(10deg);
    }
    80%{
        transform: rotate(60deg);
    }
    100%{
        transform: rotate(40deg);
    }
}
</style>
