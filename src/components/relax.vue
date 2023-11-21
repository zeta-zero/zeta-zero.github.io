<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="r-body">
        <div class="row">
            <!-- 第一列 -->
            <div class="col-md-3">
                <router-link to="/relax/game2048">
                    <!-- <a href="/relax-game2048" style="text-decoration: none;"> -->
                    <div class="card mb-3">
                        <div class="card-header user-card-header d-flex align-items-center">
                            <img src="/src/pages/game/game2048/game_2048.png" class="card-img-setting" />
                        </div>
                        <div class="card-body card-body-setting user-card-anima">
                            <h2 class="card-text d-flex"> 2048 </h2>
                            <p class="card-text"> 益智小游戏 </p>
                        </div>
                    </div>
                    <!-- </a> -->
                </router-link>
            </div>
            <!-- 添加更多的卡片列，当空间不够时会自动换行 -->
        </div>
    </div>
</template>

<style scoped>
#GameBody {
    height: fit-content;
}


.user-card-header {
    background-color: lightgray;
    height: 200px;
    display: flex;
    justify-content: center;

}

.user-card-anima:hover {
    background-color: var(--user-card-bgcolr-hover);
    color: white;
}

.container {
    padding: 20px;
}

.card-body-setting {
    padding: 10px;
}

.card-img-setting {
    max-height: 200px;
    width: inherit;
}

#bar-setting {
    height: 5vh;
    padding-left: 100px;
    /* 左侧宽度 + 20px 间隔 */
    top: 0;
    background-color: #F0F0F0;
}

#bar-content {
    padding-left: 10px;
    padding-top: 6px;
}
</style>
