<script src="./gamectrl.js">
</script>

<template>
    <div id="back-body">

        <div id="content">
            <div class="heading">
                <h1 class="title">2048</h1>
                <div class="scores-container">
                    <div id="score-content">
                        <div id="score-title">SCORE</div>
                        <div class="score-container">{{ CurScoreVal }}</div>
                    </div>
                    <div id="score-content">
                        <div id="score-title">BEST</div>
                        <div class="best-container">{{ BestScoreVal }}</div>
                    </div>
                </div>
            </div>

            <div class="above-game">
                <p class="game-intro">合并方块成为 <strong>2048!</strong></p>
                <button type="button" class="btn btn-user-restart" id="btn-restart" @click="restart">来一把！</button>
            </div>

            <div class="game-container">
                <div class="game-info" ref="GameInfo">
                    <div id="gameover-info">Game Over!</div>
                    <div class="lower">
                        <a class="btn btn-user-retry" id="btn-retry" @click="retry">Try again</a>
                    </div>
                </div>
                <div class="grid-container">
                    <div class="grid-row" v-for="item in 4">
                        <div class="grid-cell" v-for="item in 4" ref="GCells"></div>
                    </div>
                </div>

                <div class="tile-container" ref="TileContainer">
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import './game_2048.css';
</style>



