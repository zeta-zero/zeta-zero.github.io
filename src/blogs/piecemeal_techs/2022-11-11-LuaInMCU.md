---
layout: post
title: lua脚本在单片机中使用
series: techs
modtime: 2022/11/11
---

简单介绍了如何将lua解释器移植到单片机中，和如何在单片机中使用。

## 一，将lua解释器移植到单片机

1. [必须] 删除src文件夹种的lua.c和luac.c文件
2. [可选] lauxlib.c - 把l_alloc函数调用的free和realloc替换为自定义的内存管理函数。或增大heap size。
3. [可选] init.c - 通过loadedlibs删除不需要的功能/注释,如luaopen_os,luaopen_io,luaopen_debug。可添加自己的功能库。
4. [必须] luaconf.h 使能#define LUA_32BITS。
5. [必须] 修改堆栈大小，stack size设为4Ki。
6. [必须] 添加头文件 "lua.h","lualib.h"和"lauxlib.h"
7. [必须] 实现函数time()。

******

## 二，简单使用

- 运行lua

```c
char buf[] = "";
lua_State *L = NULL;
//建立lua运行环境
L = luaL_newstate();
if(L != NULL)
{
    //注册各种库函数
    luaL_openlibs(L);
    //运行基础库
    luaopen_base(L);
    //运行lua脚本
    luaL_dostring(L,buf);
    //关闭lua
    lua_close(L);
}
```

- 接口函数形式

```c
static int func1(lua_State *L)
{
    //返回结果数量
    return 1;
}
```

- 注册接口函数方式1

```c
lua_register(L,"name",func1);
```

- 注册接口函数方式2

```c
static const luaL_Reg mylib[]={
    {"name",func1},
    {NULL,NULL}
};
//添加open函数
LUALIB_API int luaopen_mylib(lua_State *L)
{
    luaL_newlib(L,mylib);
    return 1;
}
//注册函数
lua_requiref(L,"mylib",luaopen_mylib,1);
lua_pop(L,1);
```

******

## 三，lua C语言 API

- 判断类

```c
//函数
lua_isfunction(L,n);
//表类型
lua_istable(L,n);
//轻用户数据
lua_islightuserdata(L,n);
//零
lua_isnil(L,n);
//布尔型
lua_isboolean(L,n);
//线程
lua_isthread(L,n);
//空
lua_isnone(L,n);
//零或空
lua_isnoneornil(L,n);
//整形
lua_isinteger(L,n);
//浮点型
lua_isnumber(L,n);
//字符串
lua_isstring(L,n);
//用户数据
lua_isuserdata(L,n);
```

- 压入返回结果

```C
//压入零
lua_pushnil(L);
//浮点数
lua_pushnumber(L,n);
//整型
lua_pushinteger(L,n);
//字符串
lua_pushlstring(L,s,len);
//字符串
lua_pushstring(L,s);
//字符串
lua_pushvfstring(L,fmt,ragp);
//字符串
lua_pushfstring(L,fmt,...);
//c函数闭包
lua_pushcclosure(L,fn,n);
//布尔
lua_pushboolean(L,n);
//轻用户数据
lua_pushlightuserdata(L,n);
//线程
lua_pushthread(L);
```
