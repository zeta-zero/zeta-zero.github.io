
Bluetooth 4.0 传输距离提升到100米

#### BLE的整体连接的步骤
1. 开始扫描
2. 开始连接设备
3. 等待获取连接状态
4. 获取或更改MTU包大小
5. 获取Services信息
6. 获取Characteristic信息

disconnect()的作用
是用来断开连接的，但是用它断开连接后，连接所占用的资源并没有被释放，而只是暂时的断开连接，可以调用connect()方法进行重连
close()的作用
用来释放连接所占用的资源即释放BluetootheGatt的所有资源，一旦调用了该方法就不能再使用connect()方法进行重连了


#### HID Report

HID的服务UUID是0x1812，
Rerport Protocl的Characteristic的UUID是0x2A4E，其特性是0x00表示Boot Protocol，0x01表示Report Protocol
Report Characteristic的UUID是0x2A4D，用来传输Input Report，OutReport，Feature Report的。具有Notify功能。
Report Reference Characteristic的UUID是0x2908，两个字节，用于设置Report类型。

蓝牙HID report分为三种
1) Input report：从hid device发送给hid host的封包
2) Output report：从hid host发送给hid device的封包
可以看出以上两种封包的input/output的方向都是就hid host而言的，而且要求低时延
3) Feature report：特性封包，是双向的

HID有两条逻辑链路：
1) HID Control：这个通道主要用于传输控制封包，在这个通道传输的封包称为同步封包（synchronous reports）,L2CAP的psm为0x0011
2) HID Interrupt：在这个通道传输的封包不需要确认，所以称为异步封包（asynchronous reports）,L2CAP的psm为0x0013

HID封包命令
HID的封包格式header field只有一个byte,4bit的message type,4bit的parameter格式如下：
HIDP MEssage Type(7-4) Parameter(3-0)

message type如下
|Hex|Message Type|Sent By|Length(Octets)|
|---|---|---|---|
|0|HANDSHAKE|Device|1|
|1|HID_CONTROL|Device and Host|1|
|2-3|Reserved|N/A||
|4|GET_REPORT|Host|1-4|
|5|SET_PEPORT|Host|1+Report Data Payload|
|6|GET_PROTOCOL|Host|1|
|7|SET_PROtOCOL|Host|1|
|A|DATA|Device and Host|1+Report Data Palyoad|

1. HANDSHAKE封包
   这个消息是只能从hid device的control channel发出，用于回复以下封包
  1）SET_REPORT, SET_IDLE and SET_PROTOCOL requests
  2）GET_REPORT, GET_PROTOCOL and GET_IDLE requests if an error is detected in
  the parameters of the initial request
  3）a request with an unsupported message type
2. HID_CONTROL封包
  1) SUSPEND/EXIT SUSPEND
  这个是hid host发送给hid device进入省电模式/退出省电模式的命令，比如hid host发送给hid mouse发送SUSPEND的时候，mouse关闭LED等进入省电模式或者hid host发送给hid keyboard SUSPEND的时候，keyboard降低扫描按键的频率
  2）VITUAL_CABLE_UNPLUG
  这个命令是双向命令，hid host可以发送给hid device，同样hid device也可以发送给hid host，收到后断开连线
3 .GET_REPORT封包
  这个封包是hid host发送给hid device的消息。hid device接受到这个封包后，需要在control通道上回复包含requeset信息的DATA type封包
4. SET_REPORT封包
  这个封包是hid host发送给hid device的消息。
5. GET_PROTOCOL封包
  用来获取Bluetooth HID device的Protocol Mode，然后Bluetooth HID device response一个DATA payload说明当前的Protocol Mode。
6. SET_PROTOCOL封包
7. DATA封包




