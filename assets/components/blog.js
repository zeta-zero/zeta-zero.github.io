---
---

const Blog = {
    template:`
    <!-- 文章列表部分 -->
    <div class="row">
        {% for class in site.classes %}
        <div class="col-md-12">
            <a href="{{ class.url }}" style="text-decoration: none;">
                <div class="card  user-card-setting user-card-anima">
                    <div class="card-body">
                        <h2 class="card-text">{{ class.title }}</h2>
                        <p class="card-text">{{ class.content | markdownify }}</p>
                        <span class="card-text d-flex justify-content-end">{{ class.time }}</span>
                    </div>
                </div>
            </a>
        </div>
        {% endfor %}
        <!-- 添加更多文章卡片 -->
    </div>`
};
      
export default Blog;
