---
layout: post
title: STM32系列 零碎的知识点
series: techs
modtime: 2023/10/27
---

非常非常零碎的知识点

#### 一. 备份SRAM

##### 1，介绍

当主要的 VDD 电源断电时，该 SRAM 可由 VBAT 电源供电。
当有 VBAT （通常在电池供电应用中）时该备份 SRAM 可作为内部 EEPROM （无任何额外软件）使用，并具有以 CPU 频率进行高速存取的优势。
而当备份 SRAM 另作他用且 / 或该应用不用 VBAT 供电时，片上 Flash（采用专门软件算法）可以用于模拟 EEPROM 存储器使用。

***STM32，不是所有的系列都具有备份SRAM的功能，使用前需要查询官方手册***

##### 2，操作备份SRAM

1. 将 RCC_APB1ENR 寄存器中的 PWREN 位置 1，使能电源接口时钟（分别参见手册第 6.3.15 节和第 6.3.16 节了解 STM32F405xx/07xx 和 STM32F415xx/17xx 和 STM32F42xxx 和 STM32F43xxx）。
2. 将用于 STM32F405xx/07xx 和 STM32F415xx/17xx 的 PWR 电源控制寄存器 (PWR_CR) 和用于STM32F42xxx 和 STM32F43xxx 的 PWR 电源控制寄存器 (PWR_CR) 中的 DBP 位置 1，使能对备份域的访问。
3. 通过将 RCC AHB1 外设时钟使能寄存器 (RCC_AHB1ENR) 中的 BKPSRAMEN 位置 1，使能备份 SRAM 时钟。

```c
    // 备份SRAM 时钟使能
    __HAL_RCC_BKPSRAM_CLK_ENABLE();
    // 电源 时钟使能
    __HAL_RCC_PWR_CLK_ENABLE();
    // 使能备份SRAM调节器
    HAL_PWREx_EnableBkUpReg();
    // 使能备份SRAM写入
    HAL_PWR_EnableBkUpAccess();

    /*后备SRAM地址*/  
    /*!< Backup SRAM(4 KB) base address in the alias region*/
    #define BKPSRAM_BASE          0x40024000UL
```

#### 二. Debug相关

##### 1， 入栈寄存器值

STM32中指向栈顶的指针有PSP和MSP，在逻辑电路上，它们都是R13(SP)寄存器。任何时刻只能使用到其中一个。
在带有操作系统的芯片中：MSP用于OS内核和异常处理，PSP用于应用任务。

当从应用任务切换到中断时，PSP指向的是进入中断前，应用任务的数据。而且这部分数据会按以下顺序进行入栈。
R0,R1,R2,R3,R12,R14(LR),PC,xPSR
可以通过读取PSP指向的地址中的值，来获取入栈的数据。通过_get_PSP()可以获得PSP指向的栈顶地址。
其中，PC指的是入栈前，或应用任务进入中断前，代码运行的对应位置。

#### 2， Breakpoint/断点

在调试时，Keil中Debug选项卡下的Breakpoints是断点管理器，可以添加删除断点，和增加简单的逻辑断点（这部分，不是所有的芯片都支持。）

