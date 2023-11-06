---
layout: post
title: 一个按键的自白（MCU按键功能开发）
series: techs
modtime: 2023/10/26
---

我是一个平平无奇的按键，但哪哪都有我的存在。比如在墙上，比如在键盘里，比如在某些电动玩具的遥控器上……

我作为一个按键，只有一个非常简单的功能——“啪嗒”一声，一次互动就结束了；“啪~嗒”，这是一次时间长一丢丢的互动。

就是如此的朴实无华，平平无奇。放在MCU开发领域，也只是第二个入门级的功能；第一个入门级功能，是我大哥，LED——被点亮。

******

## 1. 一般处理方式
作为一个普普通通的按键，我在代码里面的形象大概是这样的。

//这是一个抽象的按键，使用不同的MCU或工具，内在实现也不一样。
{% highlight c linenos %}
uint8_t hal_btn_isOn(void); 
{% endhighlight %}
在STM32中，使用寄存器的版本。

{% highlight c linenos %}
/* 省略了初始化部分 */
uint8_t hal_btn_isOn(void)
{
    return ((GPIOA_IDR&(1<<0))?1:0);
}
{% endhighlight %}

在STM32中，使用HAL库的版本。

{% highlight c linenos %}
/* 省略了初始化部分 */ 
uint8_t hal_btn_isOn(void)
{
    return HAL_GPIO_ReadPin(GPIOA,GPIO_Pin_0);
}
{% endhighlight %}

在ESP32中，使用IDF的版本。

{% highlight c linenos %}
/* 省略了初始化部分 */ 
uint8_t hal_btn_isOn(void)
{
    return gpio_get_level(GPIO_NUM_0);
}
{% endhighlight %}

在ESP32中，使用arduino的版本。

{% highlight c linenos %}
/* 省略了初始化部分 */ 
int hal_btn_isOn(void)
{
    return digitalRead(0);
}
{% endhighlight %}

理想状态下，我每次的被按下，反馈出去的信号应该是一条平滑的直线。

但实际上，我作为一个机械部件，由于触点的弹性作用，开关不会马上稳定接通或一下子断开，反馈出去的信号带有明显的波动。

如果没有硬件帮我消除这一步波动，就需要在软件上处理这部分的波动，保证作为按键的我，能稳妥的完成按键开关的工作。

{% highlight c linenos %}
// 通过延时消抖
uint8_t btn_isClick(void)
{
    uint8_t res = 0;
    if(hal_btn_isOn() == 0){
        goto end;
    }
    // 消抖延时一般是20ms-200ms
    delay_ms(20);
    if(hal_btn_isOn() == 1){
        res = 1;
    }
end:
    return res;
}
// 通过计数消抖
uint8_t btn_isClick(void)
{
    uint8_t res = 0;
    uint8_t count = 0;
    if(hal_btn_isOn() == 0){
        goto end;
    }
    for(int i = 0;i<20;i++){
        if(hal_btn_isOn() == 1){
            count++;
        }
        // 通过计算有效次数来判断按键按下是否有效
        if(count > 12){
            res = 1;
            break;
        }
        delay_ms(1);
    }
end:
    return res;
}
{% endhighlight %}

在这两种消除波动的方法中，我更喜欢第一种，毕竟处理起来更简单。

在需要我和我的小伙伴们（组合键）一起工作的程序，可能稍显麻烦。

{% highlight c linenos %}
if(btnA_isClick() == 1 && btnB_isClick() == 1){
    // do something
}
// 等效于
uint8_t btnGroup_isClick(void)
{
    uint8_t res = 0;
    if(hal_btnA_isOn() == 0){
        goto end;
    }
    delay_ms(20);
    if(hal_btnA_isOn() == 0){
        goto end;
    }
    if(hal_btnB_isOn() == 0){
        goto end;
    }
    delay_ms(20);
    if(hal_btnB_isOn() == 1){
        res = 1;
    }
end:
    return res;
}
// 以上可以优化成以下
uint8_t btnGroup_isClick(void)
{
    uint8_t res = 0;
    if(hal_btnA_isOn() == 0 || hal_btnB_isOn() == 0){
        goto end;
    }
    delay_ms(20);
    if(hal_btnA_isOn() == 1 && hal_btnB_isOn() == 1){
        res = 1;
    }
end:
    return res;
}
{% endhighlight %}

不过在搭配方式（组合方式，比如ctrl+c,ctrl+v）少的程序重，还是比较简单明了，修改也方便。

******

## 2. 花式处理方式
除了这些方式外，我还参与过更加灵活的方案，当然，会比上面的情况复杂些。

{% highlight c linenos %}
static uint32_t ClickTime = 0;
static uint8_t Click = 0;

uint8_t btn_isClick(void)
{
    return Click;
}

// _ms : 每次调用的时间间隔
void btn_tick(uint32_t _ms)
{
    if(hal_btn_isOn() == 0){
        ClickTime = 0;
        Click = 0;
        goto end;
    }
    ClickTime += _ms;
    if(ClickTime > 20){
        Click = 1;
    }
end:
    return;
}
{% endhighlight %}

这种方式有个优点，不会阻塞程序，适合用在任务比较重的程序，适合我和我的小伙伴们（组合键）一起工作的程序，彼此之间相互合作也不需要专门的优化工作流程。

如果担心这种方式的实时性不高，或处理不及时的话，添加一个回调函数，可以很好的解决这种情况。

{% highlight c linenos %}
#define BUTTON_NUM   3
static uint32_t ClickTime[BUTTON_NUM] = {0};
static uint8_t Click[BUTTON_NUM] = {0};
typedef void(* btn_event_callback)(uint8_t _btn_num);
btn_event_callback btn_event_handle;
 
// _ms : 每次调用的时间间隔
void btn_tick(uint32_t _ms)
{
    if(hal_btnA_isOn() == 1){
        ClickTime[0] += _ms;
    }
    else{
        Click[0] = 0;
        ClickTime[0] = 0;
    }
    if(hal_btnB_isOn() == 1){
        ClickTime[1] += _ms;
    }
    else{
        Click[1] = 0;
        ClickTime[2] = 0;
    }
    if(hal_btnC_isOn() == 1){
        ClickTime[2] += _ms;
    }
    else{
        Click[2] = 0;
        ClickTime[2] = 0;
    }
    for(int i = 0;i< BUTTON_NUM;i++){
        if(ClickTime[i] > 20){
            Click[i] = 1;
            if(btn_event_handle!= 0){
                btn_event_handle(i);
            }
        }
    }
end:
    return;
}
{% endhighlight %}

这是调整了在有多个按键的情况的代码，需要增加一个我的小伙伴（按键），只需要在btn_tick中添加就好了。

或许会疑惑，如果想要知道我和我的小伙伴们那几个（组合键）在一起工作，这该怎么？最简单的方式，再加一个回调函数。

{% highlight c linenos %}
#define BUTTON_NUM   2
static uint32_t ClickTime[BUTTON_NUM] = {0};
static uint8_t Click[BUTTON_NUM] = {0};
typedef void(* btn_event_callback)(uint8_t _btn_num);
typedef void(* btnlist_event_callback)(uint8_t _btnlist[BUTTON_NUM]);
static btn_event_callback btn_event_handle;
static btnlist_event_callback btnlist_event_handle;
 
// _ms : 每次调用的时间间隔
void btn_tick(uint32_t _ms)
{
    if(hal_btnA_isOn() == 1){
        ClickTime[0] += _ms;
    }
    else{
        Click[0] = 0;
        ClickTime[0] = 0;
    }
    if(hal_btnB_isOn() == 1){
        ClickTime[1] += _ms;
    }
    else{
        Click[1] = 0;
        ClickTime[2] = 0;
    }
    for(int i = 0;i< BUTTON_NUM;i++){
        if(ClickTime[i] > 20){
            Click[i] = 1;
            if(btn_event_handle!= 0){
                btn_event_handle(i);
            }
        }
    }
    if(btnlist_event_handle!= 0){
        btnlist_event_handle(Click);
    }
end:
    return;
}
{% endhighlight %}

这种方式如何使用呢？也不是很难。

{% highlight c linenos %}
void btn_event(uint8_t _btn)
{
    switch(_btn){
        case 0:{
            // do something
        }break;
        case 1:{
            // do something
        }break;
       default:break;
    }
}

void btnList_event(uint8_t _btnlist[BUTTON_NUM])
{
    if(_btnlist[0] == 1 && _btnlist[1] == 1){
        // do something
    }
}

int main(void)
{
    btn_event_callback = btn_event;
    btnlist_event_callback = btnList_event;

    while(1){
        btn_tick(1);
        // do something
        delay_ms(1);
    }
    return 0;
}
{% endhighlight %}

这种处理方式是我的按键生涯最合适的了吗？当然，不是。

******

## 3. 现代化管理
作为一个现代化的按键，管理流程也有现代化的解决方案，只要在花式处理方式上，添加一点功能，就可以实现现代化管理。

首先给我和我的小伙伴们（按键）定制一套工牌（结构体），包含我们的基本信息。

{% highlight c linenos %}
typedef uint8_t(*btn_isclick_t)(void);
typedef void(* btn_event_cb_t)(uint8_t _btn_num,uint8_t _state);
typedef struct{
    btn_isclick_t;
    btn_event_cb_tEvent;
    uint8_t ID;    // 从1开始，0代表空信息
    uint8_t State; //按下：1 | 松开：0
    uint32_t StartPressTime;
}btn_obj_t;
{% endhighlight %}

工牌里的信息，包含了我本人（按键函数），我的即时反馈（事件函数），我的ID，我的状态，我被按下的持续时间。

有了这些信息后，就可以把我和我的小伙伴们（按键）进行统一管理了。但在这之前，需要注册和保存我们的信息。

{% highlight c linenos %}
#define BUTTON_LIST_MAX 10
btn_obj_t BtnObjList[BUTTON_LIST_MAX ]; 
int btnmgr_reg(uint8_t _id,btn_isClick _btn,btn_event_callback _cb)
{
    int res = 0;
    if(_id == 0 ||  _id > BUTTON_LIST_MAX || _btn == 0){
        res = -1;
        goto end;
    }
    if(BtnObjList[_id - 1].ID != 0){
        res = -2;
        goto end;
    }
    BtnObjList[_id - 1].ClickOn = _btn;
    BtnObjList[_id - 1].Event= _cb;
    BtnObjList[_id - 1].ID= _id;
    BtnObjList[_id - 1].State= 0;
    BtnObjList[_id - 1].StartPressTime= 0;
end:
    return res;
}
{% endhighlight %}

完成了注册功能后，再添加个管理功能。

{% highlight c linenos %}
void btnmgr_tick(uint32_t _ms)
{
    for(int i = 0;i<BUTTON_LIST_MAX;i++){
        if(BtnObjList[i].ID == 0){
            continue;
        }
        if(BtnObjList[i].ClickOn == 0){
            continue;
        }
        if(BtnObjList[i].ClickOn() == 1){
            BtnObjList[i].StartPressTime += _ms;
        }
        else if(BtnObjList[i].StartPressTime != 0){
             BtnObjList[i].State = 0;
             BtnObjList[i].StartPressTime = 0;
            if(BtnObjList[i].Event != 0 && BtnObjList[i].StartPressTime > 20){
                BtnObjList[i].Event(BtnObjList[i].ID,BtnObjList[i].State);
            }
        }
        if(BtnObjList[i].StartPressTime > 20){
            BtnObjList[i].State = 1;
            if(BtnObjList[i].Event != 0){
                BtnObjList[i].Event(BtnObjList[i].ID,BtnObjList[i].State);
            }
        }
    }
}
{% endhighlight %}

管理部分的功能，并不复杂。循环遍历列表，一个一个检查有效信息，找到有效信息后，接下来的流程跟花式处理方式大同小异。

最后，再添加协同合作（组合键），就完成了现代化管理的基本功能了。

{% highlight c linenos %}
#define BTNGROUP_NUM_MAX  5 
typedef struct{
    btn_obj_t *List[BTNGROUP_NUM_MAX];
    int Num;
    btn_event_cb_t Event;
    uint8_t GID;    // 从1开始，0代表空信息
    uint8_t State ; //按下：1 | 松开：0
}btn_group_t;

#define BTNGROUP_LIST_MAX 5
btn_group_t BtnGroupList[BTNGROUP_LIST_MAX]; 
// 按键组注册
int btnmgr_group_reg(uint8_t _id,btn_event_callback _cb)
{
    int res = 0;
    if(_id == 0 ||  _id > BTNGROUP_LIST_MAX ){
        res = -1;
        goto end;
    }
    if(BtnGroupList[_id - 1].ID != 0){
        res = -2;
        goto end;
    }
    BtnGroupList[_id - 1].Event= _cb;
    BtnGroupList[_id - 1].GID= _id;
    BtnGroupList[_id - 1].State= 0;
end:
    return res;
}
// 按键组添加按键
int btnmgr_group_addBtn(uint8_t _gid,uint8_t _bid)
{
    int res = 0;
    if(_gid== 0 || _bid == 0 ||  
       _gid > BTNGROUP_LIST_MAX || _bid > BUTTON_LIST_MAX){
        res = -1;
        goto end;
    }
    if( BtnGroupList[_gid - 1].GID == 0 ||
        BtnObjList[_bid].ID == 0){
        res = -2;
        goto end;
    }
    if(BtnGroupList[_gid - 1].Num >= BTNGROUP_NUM_MAX ){
        res = -3;
        goto end;
    }
    BtnGroupList[_gid - 1].List[BtnGroupList[_gid - 1].Num] = &BtnObjList[_bid-1];
end:
    return res;
}

void btnmgr_group_tick(void)
{
    int count_g = 0;
    for(int i = 0;i<BTNGROUP_LIST_MAX ; i++){
        if(BtnGroupList[i].GID == 0){
            continue;
        }
        if(BtnGroupList[i].Num == 0){
            continue;
        }
        count_g = 0;
        for(int count_g  = 0;count_g <BtnGroupList[i].Num ;count_g ++){
            if(BtnGroupList[i].List[i] == 0){
                continue;
            }
            if(BtnGroupList[i].List[i].State == 0){
                continue;
            }
            count_g++;
        }
        if(count_g == BtnGroupList[i].Num){
            BtnGroupList[i].State = 1;
            if(BtnGroupList[i].Event != 0){
                BtnGroupList[i].Event(BtnGroupList[i].GID,BtnGroupList[i].State);
            }
        }
        else if(count_g == 0 && BtnGroupList[i].State != 0){
            BtnGroupList[i].State = 0;
            if(BtnGroupList[i].Event != 0){
                BtnGroupList[i].Event(BtnGroupList[i].GID,BtnGroupList[i].State);
            }
        }
    }
}
{% endhighlight %}

将 btnmgr_group_tick() 添加到 btnmgr_tick() 函数尾部，这样就完成了协同工作（按键组）的部分了。

{% highlight c linenos %}
void btnmgr_tick(uint32_t _ms)
{
    ......
    btnmgr_group_tick();
}
{% endhighlight %}

接下来就可以愉快地使用了。

{% highlight c linenos %}
// 按键事件
void btn_event(uint8_t _id,uint8_t _state)
{
    switch(_id){
        case 1:{
            // do something
        }break;
        case 2:{
            // do something
        }break;
        case 3:{
            // do something
        }break;
        case 4:{
            // do something
        }break;
       default:break;
    }
}

// 按键组事件
void btn_group_event(uint8_t _id,uint8_t _state)
{
    switch(_id){
        case 1:{
            // do something
        }break;
        case 2:{
            // do something
        }break;
        case 3:{
            // do something
        }break;
       default:break;
    }
}

int main(void)
{
    btnmgr_reg(1,hal_btnA_isOn,btn_event);
    btnmgr_reg(2,hal_btnB_isOn,btn_event);
    btnmgr_reg(3,hal_btnC_isOn,btn_event);
    btnmgr_reg(4,hal_btnD_isOn,btn_event);

    btnmgr_group_reg(1,btn_group_event);
    btnmgr_group_addBtn(1,1);
    btnmgr_group_addBtn(1,2);

    btnmgr_group_reg(2,btn_group_event);
    btnmgr_group_addBtn(2,2);
    btnmgr_group_addBtn(2,3);

    btnmgr_group_reg(3,btn_group_event);
    btnmgr_group_addBtn(3,1);
    btnmgr_group_addBtn(3,2);
    btnmgr_group_addBtn(3,3);
    btnmgr_group_addBtn(3,4);

    while(1){
        btnmgr_tick(1);
        // do something
        delay_ms(1);
    }
    return 0;
}
{% endhighlight %}

这是作为按键的我，在处理复杂按键功能中，遇到的最适合的解决思路。以上并不是最优的，将数组更换为链表，管理方式会更加灵活，对内存的利用率也会更高。

******

## 4. 小结
在不同的代码逻辑中，我有不一样的处理方式。不同的使用场景，有更适合的处理方式。比如，在使用第3节的方式处理，如果只有一两个按键的话，性价比比较低，相对来说，处理负担较大。

合适的才是最好的。

<br/>
我只是一个平平无奇的按键。