<script setup>
import Galaxy from '../astral/galaxy.vue'
import ScanStte from '../astral/scanstate.vue'
import DashBoard from '../astral/dashboard.vue'
import BncCheck from '../astral/bnccheck.vue'
</script>

<template>
    <div class="afv-body">
        <div class="afv-bg">
            <div class="afv-mainscreen">
                <Galaxy class="afv-galaxy" basecolor="royalblue"/>
                <ScanStte class="afv-state-0" basecolor="royalblue"/>
                <DashBoard class="afv-db" basecolor="royalblue"/>
                <DashBoard class="afv-db" basecolor="royalblue"/>
                <BncCheck class="afv-bc" basecolor="royalblue"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.afv-body,
.afv-bg {
    height: 100%;
    width: 100%;
}

.afv-body .afv-bg .afv-mainscreen {
    margin-top: 20%;
    margin-left: 30%;
    height: 30%;
    width: 40%;
    /* border: 2px solid royalblue; */
    box-shadow: 0px 0px 4px 0px royalblue;
    border-radius: 20px;
    background-color: 	whitesmoke;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
}

.afv-body .afv-bg .afv-mainscreen .afv-galaxy {
    grid-row: span 1;
    grid-column: span 2;
    display: inline-block;
    height: 100%;
    width: 100%;
}

.afv-body .afv-bg .afv-mainscreen .afv-state-0 {
    grid-row: span 1;
    grid-column: span 2;
    margin: 0;
    width: 100%;
    height: 100%;
}

.afv-body .afv-bg .afv-mainscreen .afv-db {
    grid-row: span 1;
    grid-column: span 1;
    padding-left: 4px;
    padding-top: 2vb;
    width: 100%;
    height: 100%;
}
.afv-body .afv-bg .afv-mainscreen .afv-bc {
    grid-row: span 1;
    grid-column: span 2;
    padding: 4px;
    width: 100%;
    height: 100%;
}
</style>
