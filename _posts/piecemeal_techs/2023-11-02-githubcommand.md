---
layout: post
title: 关于github的一些命令
series: techs
modtime: 2023/11/06
---

#### reset

提示错误：you need to resolve your current index first
解决方法：git reset --merge

强制恢复本地代码为修改前：
git reset --hard [branch name]

#### checkout

临时切换版本

1. git log
    > commit [key-value]
2. git checkout [key-value]
