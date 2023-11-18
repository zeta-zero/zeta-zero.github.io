<script setup>
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import { ref, shallowRef, markRaw, onMounted } from 'vue'

const BlogTechs = markRaw([
    { BlogName: 'Lua In Mcu', Content: null },
    { BlogName: 'AC5 To AC6', Content: null },
    { BlogName: 'STM32', Content: null },
]);

const BlogRTOSList = markRaw([
    { BlogName: '从零开始设计RTOS - 序章', Content: null },
    { BlogName: '从零开始设计RTOS - 第一章', Content: null },
    { BlogName: '从零开始设计RTOS - 第二章', Content: null },
    { BlogName: '从零开始设计RTOS - 第三章', Content: null },
    { BlogName: '从零开始设计RTOS - 第四章', Content: null },
]);

const BlogOtherList = [shallowRef(null)];

const BolgCollection = markRaw([
    { ClassName: '零碎的技术合集', ClassList: BlogTechs },
    { ClassName: '从零开始设计RTOS', ClassList: BlogRTOSList },
    { ClassName: '万象', ClassList: BlogOtherList },

]);

const Property = { BlogSeries: 'series' };
const BlogSets = shallowRef(new Map());
const BlogList = shallowRef([]);

function SetBlogSerial(_name, _title) {
    BlogSets.value.set(_name, { Title: _title, List: [] });
}

function AddToBlog(_head, _data) {
    try {
        let name = _head['series'];
        if (BlogSets.value.has(name) == false) {
            name = 'others';
        }
        const info = new Map();
        info.set('title', _head['title']);
        info.set('date', _head['modtime']);
        const blogset = BlogSets.value.get(name);
        if (blogset) {
            blogset.List.push({ Info: info, Blog: _data });
        } else {
            console.error(`BlogSet with name ${name} not found.`);
        }
    } catch (err) {
        console.log(err);
    }
}

function SortOfBlog() {
    BlogSets.value.forEach((value) => {
        value.List.sort((item1, item2) => {
            const a = item1.Info.get('date');
            const b = item2.Info.get('date');
            if (a < b) {
                return 1;
            }
            else if (a > b) {
                return -1;
            }
            else {
                return 0;
            }
        })
    })
}

async function onLoad() {
    try {
        const serialListModule = await import('/src/blogcfg/serials.md');
        const metaList = serialListModule.frontmatter;

        if (metaList && metaList[Property.BlogSeries]) {
            Object.entries(metaList[Property.BlogSeries]).forEach(([key, value]) => {
                SetBlogSerial(key, value);
            });
        }

        const srcFileList = import.meta.glob("/src/blogs/**/*.md");
        const promises = Object.values(srcFileList).map((loadModule) => {
            return loadModule().then((mod) => {
                const meta = mod.frontmatter;
                AddToBlog(meta, mod.default);
            });
        });

        await Promise.all(promises);
        SortOfBlog();
        BlogList.value = BlogSets.value.values();
        console.log(BlogSets.value.values());
    } catch (error) {
        console.error(error);
    }
}


onMounted(async () => {
    onLoad();
});


const emit = defineEmits(['blog-content']);

function onselectevent(value) {
    emit("blog-content", value);
}

</script>

<template>
    <div class="bl-content">

        <div class="list-group list-group-flush">
            <div class="accordion accordion-flush" id="bl-accordionFlush-obj">
                <div class="accordion-item" v-for="(blogset, index) in BlogList" :key="index">
                    <h2 class="accordion-header" :id="'bl-flush-heading-' + index">
                        <a class="accordion-button collapsed list-custom-btn" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#flush-collapse-' + index" aria-expanded="false"
                            :aria-controls="'flush-collapse-' + index">
                            {{ blogset.Title }}
                        </a>
                    </h2>
                    <div :id="'flush-collapse-' + index" class="accordion-collapse collapse  bl-item"
                        :aria-labelledby="'bl-flush-heading-' + index" data-bs-parent="#bl-accordionFlush-obj">
                        <a href="#" v-for="(blogitem, subindex) of blogset.List" @click="onselectevent(blogitem)"
                            :key="subindex" class="list-group-item list-group-item-action 'bl-item-'+subindex "
                            data-bs-toggle="list">
                            <div class="bl-title">
                                {{ blogitem.Info.get('title') }}
                            </div>
                            <div class="bl-date">
                                {{ blogitem.Info.get('date') }}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bl-content {
    overflow: auto;
    height: 100%;
    padding-bottom: 20px;
}

.bl-item {
    text-align: left;
}

.bl-item a .bl-title {
    font-weight: bold;
}


.bl-item a .bl-date {
    font-size: small;
    color: gray;
}


.list-group-item {
    border: 0;
    margin-bottom: 10px;
}

.list-group-item:hover {
    color: var(--z-leftbar-btn-secondry);
    background-color: transparent;
    font-weight: bold;
}

.list-group-item.active {
    background-color: var(--z-leftbar-btn-secondry);
    color: white;
    border: 0;
    font-weight: bold;
}

.list-group-item.active .bl-date {
    color: whitesmoke;
    font-weight: bold;
}

.bl-content .list-group-item .accordion-header .list-custom-btn,a{
    text-decoration: none;
}
</style>