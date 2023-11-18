<template>
    <div class="br-container">
        <div class="br-item-move" v-for="n in 5">
        </div>
    </div>
</template>

<script>
export default{

}
</script>


<style lang="scss">
.br-container{
    --br-box-size:30px;
    --br-box-interval:6px;
    --br-box-interval_f:12px;
    --br-box-radius:6px;
    --br-box-total-width:162px;
    --br-move-time: 2s;

    min-width: var(--br-box-total-width);
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.br-item-move{
    width:var(--br-box-size);
    height: var(--br-box-size);
    position: relative;
    display: block;
    border-radius: var(--br-box-radius);
    margin: 0 var(--br-box-interval);
    transform-origin: -50% center;
    top: 0;
    right: 0;
    border-radius: var(--br-box-radius);
    background-color: rgb(190, 224, 254);
    box-shadow: 0px 0px 10px 0px rgba(190, 224, 254,0.886);
}


@for $i from 1 through 5 {
    .br-item-move:nth-of-type(#{$i}){
        @if $i == 1 {
            margin: 0 var(--br-box-interval_f);
            animation: slide var(--br-move-time) ease-in-out infinite alternate;
        } @else {
            animation: moveBounce#{$i} var(--br-move-time) linear infinite alternate;
        }
    }
}

@keyframes slide {
    0% { transform: translateX(0px); }
    100% { transform: translateX(var(--br-box-total-width));}
}

@for $i from 2 through 5 {
    $percentage: (($i - 1) * 0.15) * 100%;

    @keyframes moveBounce#{$i} {
        0%, #{$percentage} {
            transform: rotate(0deg) translateX(0);
        }
        #{$percentage + 5%} {
            transform: scale(140%, 60%) translate(-40%, 40%);
        }
        #{$percentage + 8%} {
            transform: scale(60%, 140%) translate(40%, -40%);
        }
        #{$percentage + 15%} {
            transform: rotate(-170deg) scale(60%, 140%) translate(40%, 40%);
        }
        #{$percentage + 22%} {
            transform: rotate(-180deg) scale(140%, 60%) translate(-40%, -40%);
        }
        #{$percentage + 25%}, 100% {
            transform: rotate(-180deg);
        }
    }
}
</style>