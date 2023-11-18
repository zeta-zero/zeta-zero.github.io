<script setup>
import { ref, shallowRef, defineAsyncComponent } from 'vue'
import BlogList from './blog-detial/bloglist.vue'

const ItemsTitle = shallowRef([
    { Title: 'Content', Content: null },
    { Title: 'Blog List', Content: BlogList }]);

let BlogTitle = 'Blog --->';
const blogcontent = shallowRef(null);

async function recvBlogContent(_value) {
    BlogTitle = _value.Info.get('title');
    blogcontent.value = _value.Blog;
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
    background-color:oldlace;
    font-weight: bold;
}

.blog-item-content .markdown-body table tbody tr td, thead tr th{
    padding-left: 6px;
    border: 1px solid black;
}

.blog-item-content .markdown-body table thead tr th {
    background-color: skyblue;
    color: white;
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
