<script setup>
import { ref,shallowRef } from 'vue'
import  AboutMe  from './about-detial/aboutme.vue'
import AboutState from './about-detial/ablutstate.vue'
import AboutCreating from './about-detial/aboutcreating.vue'
import AboutFunyView from './about-detial/aboutfunyview.vue'

const ItemsTitle = shallowRef([
    { Title: 'Me',Content: AboutMe }, 
    { Title: 'Description',Content: AboutFunyView  }, 
    { Title: 'Skill',Content: AboutCreating  },
    { Title: 'State',Content: AboutState  }, 
    { Title: 'Empty 2',Content: AboutCreating  }, 
    { Title: 'Empty 3',Content: AboutCreating  }]);
</script>

<template>
    <div class="about-contianer">
        <div v-for="(item,index) in ItemsTitle" :key="index" class="about-item">
            <div class="about-item-title">{{ item.Title }}</div>
            <component :is="item.Content"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

.about-item-title{
    min-height: 40px;
    border-bottom: 2px solid #bbb;
    padding-top: 6px;
    margin: 0;
    color: white;
    background-color: #a7c957;
}

@media screen and (min-width:1000px) {

    .about-contianer {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        height: 100%;
    }

    .about-contianer .about-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-radius: 10px;
        padding: 0;
        margin: 0;
        text-align: center;
        overflow: hidden;
        box-shadow: 0px 0px 4px 0px #bbb;
    }

    .about-contianer .about-item:nth-of-type(1) {
        grid-row: span 2;
        grid-column: span 1;
    }

    .about-contianer .about-item:nth-of-type(2) {
        grid-row: span 2;
        grid-column: span 2;
    }

    .about-contianer .about-item:nth-of-type(3) {
        grid-row: span 3;
        grid-column: span 1;
    }

    @for $i from 4 through 6 {
        .about-contianer .about-item:nth-of-type(#{$i}) {
            grid-row: span 1;
            grid-column: span 1;
        }
    }
}
</style>
