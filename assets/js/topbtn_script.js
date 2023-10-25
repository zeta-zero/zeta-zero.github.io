// 获取返回顶部按钮
var scrollToTopButton = document.getElementById("scrollToTop");

// 当页面滚动时，检查滚动位置以显示/隐藏按钮
window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop > 400) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

// 当按钮被点击时，滚动到页面顶部
scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // 使用平滑滚动
    });
});
