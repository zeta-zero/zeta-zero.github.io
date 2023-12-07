---
title: BLE MESH 的相关信息
series: ble
modtime: 2023/11/21
---

### GATT信息

1.基本信息

|特征服务|数据写入特性|数据通知特性|
|---|---|---|
|1827|0x2ADB|0x2ADC|

******

### MESH 公式与数据定义

#### 1. 公式

##### 1.1 AES-CCM 公式

$chiphertext,mic = AES-CCM_k(n,m,a)$
  - k：128bit Key
  - n：104bit nonce
  - m：要加密和验证的数据
  - a：附加数据，可为0
  - chiphertext：加密后的数据
  - mic：m和a的消息完整性检查值

##### 1.2 s1 ‘盐’产生函数

$s1(M) = AES-CMAC_{ZERO}(M)$
  - ZERO：0 of 128 bit

##### 1.3 s2 ‘盐’产生函数

$s2(M) = HMAC-SHA-256_{ZERO}(M)$
  - ZERO：0 of 256 bit

##### 1.4 k1 推导函数

$T = AES-CMAC_{SALT}(N)$

$K1(N,SALT,P) = AES-CMAC_T(P)$
  - N：0或更多数据
  - SLAT：128 bit
  - P：0或更多数据

##### 1.5 K2 推导函数

$SALT = s1("smk2")$

$T = AES-CMAC_{SALT}(N)$
  - N：128 bit的数据

P：至少1个字节的数据
$T0 = empty string(zero length)$  
$T1 = AES-CMAC_T(T0 || P || 0x01)$  
$T2 = AES-CMAC_T(T1 || P || 0x02)$  
$T3 = AES-CMAC_T(T2 || P || 0x03)$  
$k2(N,P) = (T1 || T2 || T3)mod 2^{263}$

##### 1.6 K3 推导函数

$SALT = s1("smk3")$

$T = AES-CMAC_{SALT}(N)$
  - N：128 bits的数据

$k3(N) = AES-CMAC_T("id64"||0x01)mod 2^{64}$

##### 1.7 K4 推导函数

$SALT = s1("smk4")$

$T = AES-CMAC_{SALT}(N)$
  - N：128 bits的数据

$k4(N) = AES-CMAC_T("id6" || 0x01) mod 2^(6)$

##### 1.8 K5 推导函数

$T = HMAC-SHA-256_{SALT}(N)$

$k5(N,SALT,P) = HMAC-SHA-256_T(P)$

#### 2 数据定义

##### 2.1 Sequence Number / 序号

网络PDU的SEQ字段中包含的序列号是一个24位的值，主要设计用于防止重放攻击。同一节点内的元素可能共享也可能不共享序列号空间。每个消息源（由SRC字段中的单播地址标识）在每个新的网络PDU中都有一个不同的序列号，对于BLE MESH的安全性至关重要。   
使用24位序号，一个元素可以在重复一个nonce之前传输16,777,216条消息。如果一个元素平均每五秒传输一条消息（代表已知用例的相当高频消息），那么该元素可以在nonce重复之前传输2.6年。   
每个元素应该对其生成的网络PDU使用严格递增的序列号。在序列号接近最大值（0xFFFFFF）之前，元素应该使用IV更新程序更新IV索引。这样做是为了确保序列号不会重复。  

#### 2.2 IV Index / IV 索引

IV索引是一个32位的值，是一个共享的网络资源（即，BLE MESH中的所有节点共享同一个IV索引值，并用它来表示他们所属的所有子网）。  
IV索引从0x00000000开始，在IV更新过程中递增。值增加的时机不必精确，因为最不重要的位在每个网络PDU中都会通信。由于IV索引值是一个32位的值，一个BLE MESH可以运行大约5万亿年，直到IV索引包裹。  
IV索引通过安全网络信标或网状私有信标在网络内共享。在子网上接收到的IV更新被处理并传播到该子网。传播是通过设备传输带有该特定子网更新的IV索引的安全网络信标或网状私有信标来实现的。  
如果主子网上的设备在主子网上接收到更新，它应该将IV更新传播到所有其他子网。如果主子网上的设备在任何其他子网上接收到IV更新，该更新应被忽略。 如果一个节点在一段时间内从BLE MESH中缺席，它可以扫描安全网络信标或网状私有信标，或者它可以使用IV索引恢复程序，因此可以自主设置IV索引值。 

#### 2.3 Nonce / 临时标志

Nonce是一个13字节的值，对于每次新的消息加密都是唯一的。这使用了四种不同的nonce。nonce的类型由nonce的第一个字节确定，称为Nonce类型。

|值|类型|说明|
|---|---|---|
|0x00|网络临时标志(Network Nonce)|与EncryptionKey一起用于网络身份验证和加密|
|0x01|应用临时标志(Application Nonce)|与应用程序密钥一起使用，用于上层传输身份验证和加密|
|0x02|设备临时标志(Device Nonce)|Used with a device key for upper transport authentication and
encryption|
|0x03|代理临时标志(Proxy Nonce)|与EncryptionKey一起使用，用于代理身份验证和加密|
|0x04|代理请求临时标志(Proxy Aolicitation Nonce)|与EncryptionKey一起使用，用于代理请求身份验证和加密|
|0x05-0xFF|RFU|保留|

******

### MESH网络信息帧格式

#### 1. 未配网Beacon格式

|Name|Addr|长度|描述|
|---|---|---|---|
|Beacon Type|0x00|1 Byte|未配网设备的信标类型|
|Device UUID|0x01 - 0x10|16 Byte|蓝牙设备的UUID|
|OOB Information|0x11 - 0x12|2 Byte|公开频段信息|
|URI Hash|0x13 - 0x0x16|4|使用URI AD类型发布的关联URI的哈希值|

##### 1.1 OOB(Out of Band)信息内容

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

#### 2. 通用配网PDU格式

|Name|Addr|长度|描述|
|---|---|---|---|
|Bear OPCode|0x00|6 bit|操作码|
|GPCF|0x00|2 bit|通用配网控制格式|
|GPPF||N Byte|通用配网负载|

##### 2.1 事务开始PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|SegN|0x00|6 bit|最后一段的数字|
|GPCF|0x00|2 bit|0b00 - 事务开始标志|
|Total length|0x01|2 Byte|负载中的字节数|
|FCS|0x03|1 Byte|负载中的帧校验序列|

FCS：计算方式 - X8 + x2 + x1 + 1

例子：0x00 0000 00

##### 2.2 事务确认PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Padding|0x00|6 bit|仅为0值|
|GPCF|0x00|2 bit|0b01 - 事务确认标志|

例子：0x01

##### 2.3 事务继续PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Segment Index|0x00|6 bit|事务段号|
|GPCF|0x00|2 bit|0b10 - 事务继续标志|

例子：0x12
事务继续标志的第16号事务段。

##### 2.4 配网承载器控制PDU

|Name|Addr|长度|描述|
|---|---|---|---|
|Bearer OPCode|0x00|6 bit|配网承载器控制码|
|GPCF|0x00|2 bit|0b11 - 配网承载器控制标志|

###### 2.4.1 操作码

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

#### 3. 配网协议PDU格式

|名称|地址|长度|描述|
|---|---|---|---|
|Padding|0x00|2 bit|仅为0值|
|Type|0x00|6 bit|配网PDU类型|
|Parameters|0x01|N Byte|消息参数|

##### 3.1 配网PDU类型

|类型|名称|描述|
|---|---|---|
|0x00|Netwrok PDU|网络 PDU|
|0x01|Mesh Beacon|Mesh 信标|
|0x02|Proxy Configuration|代理设置|
|0x03|Provisioning PDU|配网 PDU|

##### 3.2 Parameters字段

|类型|名称|描述|
|---|---|---|
|0x00|Provisioning Invite|邀请设备加入mesh网络|
|0x01|Provisioning Capabilities|表示入网设备的配网能力|
|0x02|Provisioning Start|表示配网器根据设备能力选择的配网方式(ECDH)|
|0x03|Provisioning Public Key|包含设备或配网器的公钥（两端都要发）|
|0x04|Provisioning Input Complete|表示用户已完成输入值|
|0x05|Provisioning Confirmation|包含设备或配网器的配网确认值|
|0x06|Provisioning Random|包含设备或配网器的配网随机值|
|0x07|Provisioning Data|包括分配的主元素单播地址,网络密钥及索引,标志和IV索引|
|0x08|Provisioning Complete|表示配网完成|
|0x09|Provisioning Failed|表示配网失败|
|0x0A|Provisioning Record Request|表示请求从入网设备检索一个配网记录片段|
|0x0B|Provisioning Record Response|包含配网记录片段或错误状态，作为对配网记录请求的响应|
|0x0C|Provisioning Records Get|表示请求检索被入网设备支持的配网记录ID列表|
|0x0D|Provisioning Records List|包含被入网设备支持的配网记录ID列表|
|0x0E–0xFF|RFU|保留供将来使用|

###### 3.2.1 配网邀请

配网设备发送入网邀请PDU，以向未入网设备指示配置过程正在开始。

|名称|大小|描述|
|---|---|---|
|Attention Duration|1 Byte|通常用于在配对过程中，用于提示或吸引注意力的继续时间|

###### 3.2.2 配网能力/入网配置

入网设备发送入网配置信息的PDU，以向配网设备指示其支持的配置能力。

|名称|大小|描述|
|---|---|---|
|Number of Elements|1|入网设备支持的元素数量|
|Algorithms|2|支持的算法类型|
|Public key Type|1|支持的公钥类型|
|OOB Type|1|主持的非主频道通信的类型|
|Output OOB Size|1|OOB输出的最大长度|
|Output OOB Action|2|OOB支持的输出操作|
|Input OOB Size|1|OOB输入的最大长度|
|Input OOB Action|2|OOB支出的输入操作|

3.2.2-1 Number of Elements / 元素数量

数值范围：1-255，不允许设置为0。

3.2.2-2 Algorithms / 加密算法

|数值(bit)|名称|
|---|---|
|0x0001(0 bit)|BTM_ECDH_P256_CMAC_AES128_AES_CCM|
|0x0002(1 bit)|BTM_ECDH_P256_HMAC_SHA256_AES_CCM|
|0xFFFC|保留|

3.2.2-3 Public Key Type / 公钥类型

数值仅为0，可用的公钥开放式出厂设置信息

3.2.2-4 OOB Type / 带外类型

|数值(bit)|描述|
|---|---|
|0x01(0b0000 0001)|可用的静态OOB信息|
|0x02(0b0000 0010)|仅支持OOB认证的配网设备|
|0xFC(0b1111 1100)|保留|

3.2.2-5 Output/Input OOB Size OOB / 输入输出OOB的最大长度

|数值(Byte)|描述|
|---|---|
|0x00| 不支持OOB输入输出 |
|0x01-0x08|入网设备支持的最大输入输出长度|
|0x09-0xFF|保留|

3.2.2-6 Input/Ouput OOB Action / 输入输出OOB的操作

- 输出

|数值(bit)|描述|数据类型
|---|---|---|
|0x01(0b0000 0001)|闪烁(灯光)|数字|
|0x02(0b0000 0010)|鸣响(声音)|数字|
|0x04(0b0000 0100)|振动(触感)|数字|
|0x08(0b0000 1000)|输出数字|数字|
|0x10(0b0001 0000)|输出字符|字符|
|0xE0(0b1110 0000)|保留|NULL|

- 输入

|数值(bit)|描述|数据类型
|---|---|---|
|0x01(0b0000 0001)|按压|数字|
|0x02(0b0000 0010)|扭动|数字|
|0x04(0b0000 0100)|输入数字|数字|
|0x08(0b0000 1000)|输入字符|字符|
|0xF0(0b1111 0000)|保留|NULL|

###### 3.2.3 开始配网

|名称|大小|描述|
|---|---|---|
|Algorithm|1 Byte|用于配网的加密算法|
|Public Key|1 Byte|使用的公钥|
|Authentication Method|1 Byte|使用的认证方法|
|Authentication Action|1 Byte|选择OOB的输入操作或输出操作或无操作|
|Authentication Size|1 Byte|OOB的输入输出大小或0|

3.2.3-1 Algorithms / 加密算法

|数值|名称|
|---|---|
|0x00|BTM_ECDH_P256_CMAC_AES128_AES_CCM|
|0x01|BTM_ECDH_P256_HMAC_SHA256_AES_CCM|
|0x02-0xFF|保留|

其中，[BTM_ECDH_P256_CMAC_AES128_AES_CCM](https://www.bluetooth.com/mesh-feature-enhancements-summary/#_Toc143179305)使用了基于RFC 4493规范中的FIPS P-256(NIST P-256/secp256r1)参数。

公式：$ y^2 = x^3 + ax + b(mod p) , a = mod(-3,p) $
  - p = 115792089210356248762697446949407573530086143415290314195533631308867097853951
  - r = 115792089210356248762697446949407573529996955224135760342422259061068512044369
  - b = 0x 5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b

- BTM_ECDH_P256_CMAC_AES128_AES_CCM:
  ConfirmationSalt = s1([配网邀请 : 1 Byte][入网配置 : 11 Byte][开始配网 : 5 Byte][本地配网公钥 : 64 Byte][设备配网公钥 : 64 Byte])

- BTM_ECDH_P256_HMAC_SHA256_AES_CCM
  ConfirmationSalt = s2([配网邀请 : 1 Byte][入网配置 : 11 Byte][开始配网 : 5 Byte][本地配网公钥 : 64 Byte][设备配网公钥 : 64 Byte])

3.2.3-2 Public Key / 公钥

|数值(Byte)|描述|
|---|---|
|0x00|没有可用的OOB公钥|
|0x01|有可用的OOB公钥|
|0x02-0xFF|保留|

3.2.3-3 Authentication Method / 认证方法

|数值(Byte)|名称|描述|
|---|---|---|
|0x00|Authentication with No OOB|没有可用的OOB认证|
|0x01|Authentication with Static OOB|使用静态OOB认证|
|0x02|Authentication with Output OOB|使用输出OOB认证|
|0x03|Authentication with Input OOB|使用输入OOB认证|
|0x04-0xFF|Prohibited|禁用|

3.2.3-4 Authentication Action / 认证操作

参考 <font color="#55AA00" >3.2.2-6</font> Input/Ouput OOB Action / 输入输出OOB的操作。
与该章节一样。

3.2.3-5 Authentication Size / 认证大小

参考 <font color="#55AA00" >3.2.2-5</font> Output/Input OOB Size OOB / 输入输出OOB的最大长度。
与该章节一样。

###### 3.2.4 Provisioning Public Key / 配网公共钥匙

配网设备发送一个配网公共钥匙PDU，发送用于ECDH计算的公钥。

|名称|大小|描述|
|---|---|---|
|Public Key X|32 Byte|P-256椭圆曲线公钥的X分量|
|public Key Y|32 Byte|P-256椭圆曲线公钥的Y分量|

###### 3.2.5 Provisioning Input Complete / 配网输入完成

无参数

###### 3.2.6 Provisioning Confirmation / 配网确认

配网设备或入网设备向其对等方发送配网确认PDU，以确认到目前为止交换的值，包括OOB认证值和尚未交换的随机数。

|名称|大小|描述|
|---|---|---|
|Confirmtion|16 / 32 Byte|到目前为止交换的值包括OOB信息等验证值|

Confirmtion中的数据格式：[配网邀请 : 1 Byte][入网配置 : 11 Byte][开始配网 : 5 Byte][本地配网公钥 : 64 Byte][设备配网公钥 : 64 Byte]

###### 3.2.7 Provisioning Random / 配网随机数

配网设备或入网设备发送配网随机数PDU，以使其对等设备能够验证确认信息。

|名称|大小|描述|
|---|---|---|
|Random|16 / 32 Byte|确认最后的输入|

###### 3.2.8 Provisioning Data / 配网数据

配网设备发送一个配网数据PDU，以向入网设备提供配置数据。

|名称|大小|描述|
|---|---|---|
|Encrypted Provisioning Data|25 Byte|经过加密和认证的网络密钥、NetKey索引、密钥刷新标志、IV更新标志、IV索引的当前值和主元素的单播地址。|
|Provisioning Data MIC|8 Byte|PDU完整性校验|

3.2.8-1 Provisioning Data/配网数据格式

|名称|大小|描述|
|---|---|---|
|Network Key|16 Byte|网络密钥|
|Key Index|2 Byte|密钥序号|
|Flags|1 Byte|标志掩码|
|IV Index|4 Byte|IV Index的当前值|
|Unicast Address|2 Byte|主元素的单播地址|

Flags数据：
Key Refresh (bit 0)：0 - Phase0 | 1 - Phase2
IV Update (bit 1)：0 - 常规操作 | 1 - 正在经行VI更新
0xFD：保留

3.2.8-2 消息认证

Salt = s1(ConfirmationSalt || RandomProvisioner || RandomDevice)  
SessionKey = k1(ECDHSecret,Salt,"prsk")  
SessionNonce = K1(ECDHSecret, Salt,"prsn")  

ProvisioningData = NetWorkKey || KeyIndex || Flags || IVIndex || Unicast Address

$Encrypted = AES-CCM_{SessoinKey}(SessionNonce,ProvisiongData)$

###### 3.2.9 Provisioning Complete / 配网完成

无参数

###### 3.2.10 Provisioning Failed / 配网失败

|名称|大小|描述|
|---|---|---|
|Error Code|1 Byte|这表示入网设备在配置协议中遇到的特定错误|

3.2.10-1 Provisioning Error Code / 配网错误代码

|名称|大小|描述|
|---|---|---|
|0x00|Prohibited|禁止|
|0x01|Invalid PDU|设备无法识别配网协议 PDU|
|0x02|Invalid Format|协议 PDU 的参数超出预期值或 PDU 的长度与预期不同|
|0x03|Unexpected PDU|当前配网步骤中不期望收到的 PDU|
|0x04|Confirmation Failed|计算的确认值未成功验证|
|0x05|Out of Resources|由于设备资源不足，无法继续配网协议|
|0x06|Decryption Failed|数据块未成功解密|
|0x07|Unexpected Error|发生了可能无法恢复的意外错误|
|0x08|Cannot AssignAddresses|设备无法为所有元素分配连续的单播地址|
|0x09|Invalid Data|数据块包含了一些由于一般约束条件而无法接受的值|
|0x09–0xFF|RFU|保留供将来使用|

###### 3.2.11 Provisioning Record Request / 配置记录请求

配网设备发送一个配置记录请求PDU，以请求配置记录片段（配置记录的一部分）

|名称|大小|描述|
|---|---|---|
|Record ID|2 Byte|表示所请求的配置记录的ID|
|Fragment Offset|2 Byte|请求的配置记录数据中的起始偏移量|
|Fragment Maximun Size|2 Byte|配网设备可以接收的配置记录片段的最大大小|

###### 3.2.12 Provisioning Record Response / 配网记录响应

|名称|大小|描述|
|---|---|---|
|Stattus|1 Byte|表示请求是否已成功处理|
|Record ID|2 Byte|表示在响应中发送的数据片段的配网记录|
|Fragment Offset|2 Byte|配网记录数据中数据片段的起始偏移量|
|Total Length|2 Byte|配网记录数据中总长度|
|Data|N Byte|配网记录中数据段|

3.2.11-1 Status Code / 状态代码

|代码|描述|
|---|---|
|0x00|Sucess / 成功|
|0x01|Requested Record Is Not Present / 请求记录不存在|
|0x02|Requested Offset Is Out Of Bounds / 请求的偏移量超出界限|
|0x03-0xFF|RFU / 保留|

###### 3.2.13 Provisioning Records Get / 配网记录获取

无参数

###### 3.2.14 Provisioning Records List / 配网记录列表

|名称|大小|描述|
|---|---|---|
|Provisioning Extensions|2 Byte|位掩码，指示配置设备支持的配置扩展|
|Records Lists|Variable|存储在配置体上的配置记录的记录ID列表|

3.2.14-1 Provisioning Extensins / 配置设备支持的配置扩展

|Bits|描述|
|---|---|
|0-15|保留|


******

### 配网流程

1 配网邀请：

1.1. 发送[配网邀请指令]：0x03 00 05
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x00：
    - 邀请设备加入mesh网络
    - 参考：<font color="#55AA00" >3.2</font>
  - 0x05：
    - 提示持续时间为5s
    - 参考：<font color="#55AA00" >3.2.1</font>
  
1.2. 返回[配网能力]数据：0x03 01 01 0001 00 00 00 00 00 00 00 00
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x01：
    - 入网配置
    - 参考：<font color="#55AA00" >3.2</font>
  - 0x01 0001 00 00 00 00 00 00 00 00：
    - 参考：<font color="#55AA00" >3.2.2</font>
    - 0x01:   节点元素数量 1
    - 0x0001: 加密算法 - BTM_ECDH_P256_CMAC_AES128_AES_CCM
    - 0x00：  公钥类型 - 没有可用的公钥OOB信息
    - 0x00：  可用的静态OOB信息 - 没有
    - 0x00：  输出OOB大小 - 0
    - 0x00：  支持的输出OOB操作 - 没有
    - 0x00：  输入OOB大小 - 0
    - 0x00：  支持的输入OOB操作 - 没有

2 配网开始：

2.1 配网设备发送[配网开始]指令：0x03 02 00 00 00 00 00
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x02
    - 配网开始
    - 参考：<font color="#55AA00" >3.2</font>
  - 0x00 00 00 00 00
    - 参考：<font color="#55AA00" >3.2.3</font>
    - 0x00：加密算法 - BTM_ECDH_P256_CMAC_AES128_AES_CCM
    - 0x00：可用的OOB公钥 - 没有 
    - 0x00：OOB认证方法 - 没有
    - 0x00：OOB操作 - 没有
    - 0x00：OOB大小 - 0

2.2 配网设备发送[配网公钥]指令：0x03 0x03 x0[32 Byte] y0[32 Byte]
  - 一共66个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x03：
    - 配网公钥指令
    - <font color="#55AA00" >3.2</font>
  - 0x x0[32 Byte] y0[32 Byte]
    - 参考：<font color="#55AA00" >3.2.4</font>
    - x0[32 Byte]：P-256椭圆曲线公钥的X分量
    - y0[32 Byte]：P-256椭圆曲线公钥的y分量

2.3 入网设备返回[配网公钥]数据：0x03 0x03 x1[32 Byte] y1[32 Byte]
  - 一共66个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x03：
    - 配网公钥指令
    - <font color="#55AA00" >3.2</font>
  - 0x x1[32 Byte] y1[32 Byte]
    - 参考：<font color="#55AA00" >3.2.4</font>
    - x1[32 Byte]：P-256椭圆曲线公钥的X分量
    - y1[32 Byte]：P-256椭圆曲线公钥的y分量

3 身份认证

3.1 配网设备发送[配网确认]指令：0x03 05 v0[32 Byte]
  - 一共34个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x05：
    - 配网确认指令
    - <font color="#55AA00" >3.2</font>
  - 0x v0[32 Byte]
    - 参考：<font color="#55AA00" >3.2.6</font>
    - v0[32 Byte]：*05* 01 0001 00 00 00 00 00 00 00 00 *00 00 00 00 00* x0 y0 x1 y1

3.2 入网设备发送[配网确认]指令：0x03 05 v1[32 Byte]
  - 一共34个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x05：
    - 配网确认指令
    - <font color="#55AA00" >3.2</font>
  - 0x v1[32 Byte]
    - 参考：<font color="#55AA00" >3.2.6</font>
    - v1[32 Byte]：*05* 01 0001 00 00 00 00 00 00 00 00 *00 00 00 00 00* x0 y0 x1 y1


3.3 配网设备发送[配网随机数]指令：0x03 06 v2[32 Byte]
  - 一共34个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x06：
    - 配网随机数指令
    - <font color="#55AA00" >3.2</font>
  - 0x v2[32 Byte]
    - 参考：<font color="#55AA00" >3.2.7</font>
    - v2[32 Byte]：随机数


3.3 入网设备发送[配网随机数]指令：0x03 06 v3[32 Byte]
  - 一共34个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x06：
    - 配网随机数指令
    - <font color="#55AA00" >3.2</font>
  - 0x v3[32 Byte]
    - 参考：<font color="#55AA00" >3.2.7</font>
    - v3[32 Byte]：随机数

4 配网数据

4.1 配网设备发送[配网数据]指令：0x03 07 nk[16 Byte] ki[2 Byte] f[1 Byte] ii[4 Byte] ua[2 Byte] d[8 Byte]
  - 一共37个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x07：
    - 配网数据指令
    - <font color="#55AA00" >3.2</font>
  - 0x nk[16 Byte] ki[2 Byte] f[1 Byte] ii[4 Byte] ua[2 Byte] d[8 Byte]
    - 参考：<font color="#55AA00" >3.2.8</font>
    - nk[16 Byte]：网络密匙
    - ki[2 Byte]: 密匙序列号
    - f[1 Byte]：标志掩码
    - ii[4 Byte]：IV Index 值
    - ua[2 Byte]: 单播地址
    - d[8 Byte]: 完整性校验数据

4.2 入网设备发送[配网完成]指令：0x03 08
  - 一共34个Byte
  - 0x03：
    - 配网PDU
    - 参考：<font color="#55AA00" >3.1</font>
  - 0x08：
    - 配网完成指令
    - <font color="#55AA00" >3.2</font>

******

### 参考链接
1. PDF文件：[BLE Mesh Protocol1.1](https://www.bluetooth.org/DocMan/handlers/DownloadDoc.ashx?doc_id=574298)
2. 网页：[Assigned Numbers](https://www.bluetooth.com/wp-content/uploads/Files/Specification/Assigned_Numbers.pdf?id=3)

- END -