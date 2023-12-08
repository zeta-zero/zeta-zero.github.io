<script setup>
import { ref, shallowRef, defineAsyncComponent } from 'vue'
import BlogList from './blog-detial/bloglist.vue'
import BncRect from './BncRect.vue'

const ItemsTitle = shallowRef([
    { Title: 'Content', Content: null },
    { Title: 'Blog List', Content: BlogList }]);

let BlogTitle = 'Blog --->';
const blogcontent = shallowRef(null);

async function recvBlogContent(_value) {
    BlogTitle = _value.Info.get('title');
    let flag = false;
    _value.Blog().then((data) => {
        flag = true;
        blogcontent.value = data.default;
    })
    if (flag == false) {
        blogcontent.value = BncRect;
    }
}

</script>

<template>
    <div class="blog-contianer">
        <div class="blog-item">
            <div class="blog-item-title"> {{ BlogTitle }}</div>
            <div class="blog-item-content">
                <component :is="blogcontent" />
            </div>
        </div>
        <div class="blog-item">
            <div class="blog-item-title"> Blogs </div>
            <BlogList @blog-content="recvBlogContent" />
        </div>
    </div>
</template>

<style>
.blog-contianer .blog-item .blog-item-title {
    height: 40px;
    width: 100%;
    padding: 0px;
    padding-top: 6px;
    border-bottom: 1px solid black;
    background-color:#6a994e;
    font-weight: bold;
    color: white;
}

.blog-item-content .markdown-body h3{
    padding: 10px 0;
}

.blog-item-content .markdown-body h6 {
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #555;
}

.blog-item-content .markdown-body p {
    margin-left: 20px;
}

.blog-item-content .markdown-body .md-blog-details{
    padding: 0px;
}

.blog-item-content .markdown-body .md-blog-details .md-blog-summary{
    padding: 0px 10px 10px 10px;
    color: gray;
}

.blog-item-content .markdown-body table  {
    margin: 20px;
    min-width: 40vw;
}

.blog-item-content .markdown-body table tbody tr td, thead tr th{
    padding: 6px;
    border: 1px solid black;
}

.blog-item-content .markdown-body table thead tr th {
    background-color: #219ebc;
    color: white;
}


.blog-item-content .markdown-body ul {
    margin-left: 16px;
}


.blog-item-content .markdown-body ul > li {
    list-style-type: disc;
}

.blog-item-content .markdown-body ul li > ul li {
    list-style-type: circle;
    margin-left: -10px;
}

.blog-item-content .markdown-body ul li > ul li > ul li {
    list-style-type: '- ';
    margin-left: -20px;
}

.blog-item-content .markdown-body ol > li {
    list-style-type:decimal;
}

@media screen and (min-width:800px) {
    .blog-contianer {
        display: grid;
        grid-template-rows: repeat(1, 1fr);
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        height: 100%;
    }

    .blog-contianer .blog-item {
        border-radius: 10px;
        padding: 0;
        padding-bottom: 20px;
        margin: 0;
        overflow: hidden;
        text-align: center;
        height: 100%;
        box-shadow: 0px 0px 4px 0px #bbb;
    }

    .blog-contianer .blog-item .blog-item-content {
        height: 100%;
        overflow: auto;
        text-align: left;
        padding: 30px;
        background-color: #fff;
    }

    .blog-contianer .blog-item:nth-of-type(1) {
        grid-row: span 1;
        grid-column: span 3;
    }

    .blog-contianer .blog-item:nth-of-type(2) {
        grid-row: span 1;
        grid-column: span 1;
    }

}
</style>
