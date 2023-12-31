---
layout: post
title: Keil 换 Arm Compiler 6 注意事项
series: techs
modtime: 2023/02/09
---

AC6版本速度比AC5版本编译速度快很多，但 Arm Compiler 6 使用的工具链和 Arm Compiler 5的不一样。
所以，将 Keil 的 Arm Compiler 5 换成 Arm Compiler 6，需要有以下的更改。  

<br />

### 一，编译器版本判断失效

 Arm Compiler 6 默认定义了__GNUC__，所以需要将宏判断改为
```c
 #if defined __CC_ARM
  // Arm Compiler 5
 #elif defined(__ARMCC_VERSION) && (__ARMCC_VERSION >= 6010050)
  // Arm Compiler 6
 #elif defined __GNUC
  // Normal GCC
```
 或者
```c
#if defined(__CC_ARM) || (defined(__ARMCC_VERSION) && (__ARMCC_VERSION >= 6010050))
    // Arm Compiler 5 or 6
#elif defined __GNUC__
    // Normal GCC
#endif
```
