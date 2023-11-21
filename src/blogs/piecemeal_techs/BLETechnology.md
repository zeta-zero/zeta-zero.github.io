---
title: BLE MESH 的相关信息
series: techs
modtime: 2023/11/21
---

### GATT信息

1.基本信息

|特征服务|数据写入特性|数据通知特性|
|---|---|---|
|1827|0x2ADB|0x2ADC|

******

### MESH网络信息帧格式

1. 未配网Beacon格式

|Name|Addr|长度|描述|
|---|---|---|---|
|Beacon Type|0x00|1 Byte|未配网设备的信标类型|
|Device UUID|0x01 - 0x10|16 Byte|蓝牙设备的UUID|
|OOB Information|0x11 - 0x12|2 Byte|公开频段信息|
|URI Hash|0x13 - 0x0x16|4|使用URI AD类型发布的关联URI的哈希值|

1.1 OOB(Out of Band)信息内容
|bit|描述|
|---|---|
|0x00|杂项/其他|
|0x01|Electronic / URI|
|0x02|二维码|
|0x03|条形码|
|0x04|NFC|
|0x05|数字|
|0x06|字符|
|0x07|基于证书的配置支持|
|0x08|支持配置记录|
|0x09|保留|
|0x10|保留|
|0x11|在模块上|
|0x12|在模块中|
|0x13|在纸上|
|0x14|在手册内|
|0x15|附于设备上|

2. 通用配网PDU格式

|Name|Addr|长度|描述|
|---|---|---|---|
|Bear OPCode|0x00|6 bit|操作码|
|GPCF|0x00|2 bit|通用配网控制格式|
|GPPF||N Byte|通用配网负载|

2.1 事务开始PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|SegN|0x00|6 bit|最后一段的数字|
|GPCF|0x00|2 bit|0b00 - 事务开始标志|
|Total 长度gth|0x01|2 Byte|负载中的字节数|
|FCS|0x03|1 Byte|负载中的帧校验序列|

FCS：计算方式 - X8 + x2 + x1 + 1

例子：0x00 0000 00

2.2 事务确认PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Padding|0x00|6 bit|仅为0值|
|GPCF|0x00|2 bit|0b01 - 事务确认标志|

例子：0x01

2.3 事务继续PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Segment Index|0x00|6 bit|事务段号|
|GPCF|0x00|2 bit|0b10 - 事务继续标志|

例子：0x12
事务继续标志的第16号事务段。

2.4 配网承载器控制PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Bearer OPCode|0x00|6 bit|配网承载器控制码|
|GPCF|0x00|2 bit|0b11 - 配网承载器控制标志|

2.4.1 操作码

|Name|Val|描述|
|---|---|---|
|Link Open|0x00|打开一个会话|
|Link ACK|0x01|会话应答|
|Link Close|0x02|关闭会话|
|RFU|0xFC|保留|

- Link Open 
  - Val: 0x00
  - 打开一个会话
  - |Code|Device UUID|
    |---|---|
    |0x03|[...]16 Byte|
- Link Ack
  - Val: 0x01
  - 会话应答
  - |Code|
    |---|
    |0x07|
- Link Close
  - Val: 0x02
  - 关闭应答
  - |Code|Reason|
    |---|---|
    |0x0B|[0x00:Sucess]/[0x01:Timeout]/[0x02:Fail]|

3. 配网协议PDU格式

|名称|地址|长度|描述|
|---|---|---|---|
|Padding|0x00|2 bit|仅为0值|
|Type|0x00|6 bit|配网PDU类型|
|Parameters|0x01|N Byte|消息参数|

3.1 配网PDU类型

|类型|名称|描述|
|---|---|---|
|0x00|Netwrok PDU|网络 PDU|
|0x01|Mesh Beacon|Mesh 信标|
|0x02|Proxy Configuration|代理设置|
|0x03|Provisioning PDU|配网 PDU|

3.2 Parameters字段

|类型|名称|描述|
|---|---|---|
|0x00|Provisioning Invite|邀请设备加入mesh网络|
|0x01|Provisioning Capabilities|表示设备的配网能力|
|0x02|Provisioning Start|表示配网器根据设备能力选择的配网方式(ECDH)|
|0x03|Provisioning Public Key|包含设备或配网器的公钥（两端都要发）|
|0x04|Provisioning Input Complete|表示用户已完成输入值|
|0x05|Provisioning Confirmation|包含设备或配网器的配网确认值|
|0x06|Provisioning Random|包含设备或配网器的配网随机值|
|0x07|Provisioning Data|包括分配的主元素单播地址,网络密钥及索引,标志和IV索引|
|0x08|Provisioning Complete|表示配网完成|
|0x09|Provisioning Failed|表示配网失败|
|0x0A–0xFF|RFU|保留供将来使用|


******

### 配网流程

1. 发送配网邀请指令：0x03 00 05
   - 0x03：
     - 0bxxxxxx-- - Bearer Opcode
     - 0b------11 - GPCF - Set to Provisioning Bearer Control
   - 0x00：Link Open - 在带有未配置设备的承载设备上打开会话
   - 0x05：
2. 返回数据：0x03 01 01 00 01 00 00 00 00 00 00 00 00
    - 0x03：
    - 0x01：节点元素的数量 1
    - 0x01：加密类型 FIPS P-256 Elliptic Curve
    - 0x00: 没有公钥
    - 0x00：没有静态OOB类型
    - 