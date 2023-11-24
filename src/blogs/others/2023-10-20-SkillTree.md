---
layout: post
title: 技能树/Skill Tree
series: others
modtime: 2023/11/06
---
这是关于个人技能知识的记录。
包括了编程语言，程序开发技术等，文档操作等等

******

#### Programming Language

##### 1. C/C++

###### C99

- 复数(complex.h)
- 定制初始化(Designated Initializers)
- 可变长数组(Variable Length Arrays)
  - val[0]/val[]
  - struct{...;val[0]/val[]}

###### C11

- 字节对齐(Alignment)
- 无返回声明(_Noreturn)
  - stdnoreturn.h
  - attribute((noreturn))
- 静态断言(_Static_assert())
- 原子操作(_Atomic)
  - stdatomic.h

###### C17/C18

- 对C11标准进行补充和修正

###### Linux

- Socket(TCP/IP)
  - WebServer
- IO Control(/dev/*)

###### MCU

- STM32: F1/F4/BlueNRG2
  - CubeMX
  - TouchGFX Designer
  - Linux-GCC
  - Keil
- NRF52832
  - Keil
- ESP32
  - IDF(VScode)
  - Arduino IDE
- Base
  - GPDIO/IIC/UART/SPI/SDIO/USB
  - PWM/TIMER/ADC/FLASH/Watchdog
    - [PWM] Moto Control(Dead Band)
- Libs
  - TouchGFX(STM32)
  - lvgl
  - M5Unified(EPS32)
  - BLE(BlueNRG2/NRF52832/ESP32)
  - BLE Mesh(ESP32)
  - USB
    - TinyUSB
    - ST USB
  - WiFi
  - FreeRTOS
  - CJson
  - Lwip
  - miniLZO(Compression Algorithm)
  - QuickLZ(Compression Algorithm)
  - Bsdiff(Difference Algorithm)
  - Segger RTT
  - ThreadX(Azure RTOS)
    - NetX
    - NetX Duo
    - FileX
    - GUIX
    - USBX
    - TraceX

###### 第三方库/框架(Libs)

- OpenCV
- Qt
  - emit/signas
- OpenSSL
  - 同类：Libsodium/Botan/Crypto++/GnuTLS
- mbedtls(轻量级加密库)


###### 算法(Algorithm)

- BP神经网络(BP Netural Network)
- Q-Learning

###### 自开发组件(Self Create)

- RTOS(STM32F1/F4)
  - 一个用于学习RTOS知识的玩具
- OTA(STM32/NRF52832)
- Button Manager
- EEPROM DATA Manager
  - 用于管理容量较大的EEPROM的数据管理
- Communication Protocol
  - 用于芯片间/PC/手机通信

##### 2. Cs

###### Base

- delegate/event(委托与事件)

###### WPF/UWP

- DotNet
- XMAL
  - DataBinding
  - Style/Template
  - Command
- Libs
  - LiveCharts
  - System.IO.Ports
  - System.Drawing.Common

###### 通信功能

- USB
  - HID
- BLE(蓝牙)
- Serial Port(串口)
- Internet(网络)

###### 第三方库/框架

###### 应用

- Unity3D
- Godot

##### 3. goland

- WebServer

##### 4. Python

##### 5. Lua

- Using in STM32

##### 6. HTML/CSS/JavaScript

- Level: 3/5
- github page
- Vue.js
- Bootstrap
- crypto-js

#### Tool

##### Visual Studio

###### Windows Install

- Wix Cover

##### PCB Designer

- Altium Designer
- 立创EDA

******

##### 文档处理(document processing)

###### VSCode

- Markmap
- Mardown Preview Enhanced
- Embedded Tools

###### Draw.io

##### 说明

###### 熟练度

- 0/5：不了解，不熟悉，但听过
- 1/5：入门，会基本语法
- 2/5：能实现一个作业级别的项目
- 3/5：能实现一个较复杂的项目
- 4/5：熟练掌握高级用法
- 5/5：...

******

### 导图式样

 <iframe height="600px" width="100%"
  src="/assets/web/other/skilltree.html"  
  frameborder=0  allowfullscreen> </iframe>
