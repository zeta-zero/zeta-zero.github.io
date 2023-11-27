<script setup>
import { ref } from 'vue'


const PersonalState = ref({
    EXP: 'Calculating',
    State: 'Alive',
    Position: 'Earth',
});
</script>

<template>
    <!-- 描述 -->
        <table class="as-table">
            <tr>
                <td>经验值 </td>
                <td>:</td>
                <td>{{ PersonalState.EXP }}</td>
            </tr>
            <tr>
                <td>状态 </td>
                <td>:</td>
                <td> {{ PersonalState.State }}</td>
            </tr>
            <tr>
                <td>坐标 </td>
                <td>:</td>
                <td> {{ PersonalState.Position }}</td>
            </tr>
            <tr>
                <td>访问量</td>
                <td>:</td>
                <td>(｡･∀･)ﾉﾞHi</td>
            </tr>
        </table>
</template>

<style scoped>
.as-table{
    height: 100%;
    padding: 10px;
    border-width: 0px;
    display: inline;
    background-color: rgb(253, 141, 169);
    color: #FFF;
    font-weight: bold; 
}

.as-table tr{
    width: 100%;
    text-align: left;
}

.as-table td{
    padding-right: 10px;
    padding-bottom: 10px;
}


</style>
