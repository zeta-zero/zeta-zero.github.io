<script setup>
import { onMounted, shallowRef } from 'vue';

const ProjectSchedule = shallowRef([
    { Title: 'Total', Progress: 0,DoProgress:0 },
    { Title: 'Home', Progress: 1,DoProgress:9 },
    { Title: 'Blog', Progress: 90,DoProgress:1 },
    { Title: 'Releax', Progress: 1,DoProgress:0 },
    { Title: 'About', Progress: 30,DoProgress:15 },
])

const Calculate = ()=>{
    var val0 = 0;
    var val1 = 0;
    var buf = ProjectSchedule.value;
    for(let i=1;i<4;i++){
        val0 += buf[i].Progress;
        val1 += buf[i].DoProgress;
    }
    buf[0].Progress = val0 / 4;
    buf[0].DoProgress = val1 / 4;
};

Calculate();

</script>


<template>
    <div class="hs-body">
        <div class="hs-content">
            <ul>
                <li class="hs-total" v-for=" (item, i) of ProjectSchedule" >
                    <span class="hs-title">{{ item.Title }}</span>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="'width:' + (item.Progress ? item.Progress + '%' : '0%')" 
                        :aria-valuenow="item.Progress || 0" aria-valuemin="0" aria-valuemax="100">{{ item.Progress }}</div>
                        <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" 
                             role="progressbar" :style="'width:' + (item.Progress ? item.DoProgress + '%' : '0%')"  
                             :aria-valuenow="item.DoProgress" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.hs-body .hs-content{
    width: 50vw;
    height: auto;
    padding: 20px;
    border: 3px solid lightskyblue;
    border-radius: 20px;
    align-self: center;
}

.hs-body .hs-content li:nth-of-type(1){
    padding-bottom: 20px;
}

.hs-body .hs-content li:nth-of-type(1) .hs-title{
    font-size: 24px;
    font-weight: bold;
}


</style>
