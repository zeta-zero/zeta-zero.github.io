---
title: 电子相关资料
series: techs
modtime: 2023/12/07
---



#### 三极管

|类型|截至区|放大区|饱和区|
|---|---|---|---|
|NPN|Vbe < Von,Vce = Vcc|Vbe >= Von,Vbe <= Vce|Vbe > Von,Vbe >= Vce|
|PNP|Veb < Von,Vec = Vcc|Veb >= Von,Veb <= Vec|Veb > Von,Veb >= Vec|

NPN:  
放大状态：发射结(Vbe)正偏，集电结(Vcb)反偏  
饱和状态：发射结(Vbe)正偏，集电结(Vcb)正偏  
截止状态：发射结(Vbe)反偏，集电结(Vcb)反偏  

电流关系：  
Ie = Ic + Ib,Ic = βIb  
Ie = (Vbg - Vbe)/Re
  - Vbe是发射结BE的饱和电压。
  - Re是发射极处连接的对地电阻

Ib = Ie / (放大倍数+1)  
Vc = Vcc - Ie * Rc  
  - Rc是集电极处连接的对地电阻。  
<img src="/src/assets/imgs/npn01.png" width="10%" style="margin-left:10%" />

******

#### MOSTFET

饱和区：
  - NMOS：Vgs>Vth (低端驱动)
  - PMOS：Vgs<Vth (高端驱动)

Vgs 与 Von 成反比


