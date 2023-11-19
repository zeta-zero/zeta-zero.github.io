<script setup>
defineProps(['basecolor']);

</script>

<template>
    <div class="as-body">
        <div class="as-bg" :style="{'--base-color':basecolor}">
            <div class="as-bar">
                <div class="as-bar-0" />
            </div>
            <div class="as-bar">
                <div class="as-bar-1" />
            </div>
            <div class="as-bar">
                <div class="as-bar-2" />
            </div>
            <div class="as-scan">
                <div class="as-scan-content"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.as-body .as-bg{
    width: 100%;
    height: 100%;
}

.as-bg{
    display: inline-block;
    position: relative;
    padding: 10px;

}

.as-body .as-bg .as-bar{
    margin: 4%;
    width: 50%;
    height: 14%;
    border-left: 1px solid var(--base-color);
    border-right: 1px solid var(--base-color);
}

$asbar0base:80%;
$asbar0offset:100%-$asbar0base;
.as-body .as-bg .as-bar .as-bar-0{
    margin-left: $asbar0offset;
    width: $asbar0base;
    height: 100%;
    background-color: lightgray;
    animation: bar0change 1s linear infinite alternate;
}

@keyframes bar0change{
    0%{
        width: $asbar0base;
        margin-left: $asbar0offset ;
    }
    20%,60%{
        width: $asbar0base - 5%;
        margin-left: $asbar0offset + 5%;
    }
    30%,100%{
        width: $asbar0base + 5%;
        margin-left: $asbar0offset - 5%;
    }
    50%{
        width: $asbar0base - 10%;
        margin-left: $asbar0offset + 10%;
    }
    80%{
        background-color:lightgray ;
    }
    90%{
        width: $asbar0base + 10%;
        margin-left: $asbar0offset - 10%;
        background-color: darkorange;
    }
}

$asbar1base:20%;
$asbar1offset:100%-$asbar1base;
.as-body .as-bg .as-bar .as-bar-1{
    margin-left: $asbar1offset;
    width: $asbar1base;
    height: 100%;
    background-color: lightgray;
    animation: bar1change 1.4s linear infinite alternate;
}

@keyframes bar1change{
    0%{
        width: $asbar1base + 5%;
        margin-left: $asbar1offset - 5%;
    }
    20%,60%{
        width: $asbar1base - 10%;
        margin-left: $asbar1offset + 10%;
    }
    30%,100%{
        width: $asbar1base - 5%;
        margin-left: $asbar1offset + 5%;
    }
    50%{
        width: $asbar1base + 15%;
        margin-left: $asbar1offset - 15%;
    }
    80%{
        width: $asbar1base + 10%;
        margin-left: $asbar1offset - 10%;
    }
}

$asbar2base:50%;
$asbar2offset:100%-$asbar2base;
.as-body .as-bg .as-bar .as-bar-2{
    margin-left: $asbar2offset;
    width: $asbar2base;
    height: 100%;
    background-color: lightgray;
    animation: bar2change 1.2s linear infinite alternate;
}

@keyframes bar2change{
    0%,100%{
        width: $asbar2base + 5%;
        margin-left: $asbar2offset - 5%;
    }
    20%,70%{
        width: $asbar2base - 5%;
        margin-left: $asbar2offset + 5%;
    }
    50%{
        width: $asbar2base + 2%;
        margin-left: $asbar2offset - 2%;
    }
}

.as-body .as-bg .as-scan{
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30%;
    height: 50%;
    border: 1px solid var(--base-color);;
    border-radius: 20px;
}

.as-body .as-bg .as-scan .as-scan-content{
    align-self: center;
    margin: 0;
    padding: 0;
    width:100%;
    height: 100%;
    border-radius: inherit;
    animation: scanscale 2s linear infinite;
}

@keyframes scanscale{
    0%,5%{
        transform: scale(10%);
        background-color: var(--base-color);
    }
    95%{
        transform: scale(100%);
    }
    100%{
        background-color: transparent;
    }
}

</style>
