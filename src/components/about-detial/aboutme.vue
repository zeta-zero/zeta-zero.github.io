<script setup>
import { ref } from 'vue'

const PersonalInfo = ref({
    Name: '假人',
    Info: '一个什么都会点的嵌入式软件工程师',
    Intro: '怀疑你们背着我偷偷学习'
});

</script>am-info
<template>
    <div class="am-body">
        <div id="am-photo">
            <div id="circle">
                <img alt="me" src="/src/assets/imgs/profilephoto.png" class="am-photo-img" />
            </div>
        </div>
        <div class="am-info">
            <div id="am-personal-info">
                <h2>{{ PersonalInfo.Name }}</h2>
                <p class="am-personal-subinfo">{{ PersonalInfo.Info }}</p>
                <p>{{ PersonalInfo.Intro }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.am-body {
    flex: 1;
    position: relative;
    padding: 10px;
    width: 100%;
    height: auto;
    background-color: #60bae4;
    padding: 0;
    margin: 0;
}

.am-info #am-personal-info .am-personal-subinfo {
    padding: 10px;
    font-size: 12px;
    font-weight: lighter;
    color: #D0D0D0;
}

.am-body #am-photo {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.am-body #am-photo #circle {
    background: white;
    border-radius: 50%;
    width: 12vw;
    height: 12vw;
}

.am-body #am-photo #circle .am-photo-img {
    display: inline;
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.am-body .am-info {
    display: flex;
    justify-content: center;
    /*水平*/
    color: white;
    font-weight: bold;
    top: 0;
}

.am-info #am-personal-info {
    text-align: center;
}</style>
