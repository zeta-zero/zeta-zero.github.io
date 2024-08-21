
### 基本
#### 1. OSI七层网络模型

物理层，数据链路层，网络层，传输层（TCP/UDP协议），会话层，表示层，应用层（FTP/Telnet/Email）

主要提供数据传输和交换功能：物理层，数据链路层，网络层，传输层。其中传输层是作为桥梁的存在。
提供用户与应用程序之间的信息和数据处理功能：会话层，表示层，应用层

#### 2.TCP/IP四层模型

主机到网络层，网络互连层，传输层，应用层

2.1 端口
 - 端口号范围为 0-65535，其中0-1023舒玉系统的保留端口
 - 常用协议端口：HTTP:80,FTP:21,TELNET:23

2.2 TCP
  - 三次握手：SYN,SYN_ACK,ACK
  - 四次挥手

TCP头部有20字节。UDP头部有8个字节。

### API接口

套接口 int socket(int domain,int type,int protocol);
  - 返回值   : 成功返回文件描述符，失败返回-1
  - domain   : AF_INET(IPv4),AF_INET6(IPv6)
  - type:    : SOCK_STREAM(TCP),SOCK_DGRAM(UDP)
  - protocol : 协议类型，对于type为TCP/UDP的，该值为0

绑定 int bind(int sockfd,const struct sockaddr *addr,socklen_t addrlen);
  - 返回值    : 成功返回0，失败返回-1
  - sockfd    : 文件描述符
  - addr      : socketaddr_in 或 socketaddr_in6 的地址描述
  - addrlen   : addr数据指针的大小

监听 int listen(int sockfd,int backlog);
  - 返回值    : 成功返回0，失败返回-1
  - sockfd    : 文件描述符
  - backlog   : 默认值128，可等待的最大连接队列数量

接收请求 int accept(int sockfd,struct sockaddr *addr,socklen_t *addrlen);
  - 用于接收一个请求。会阻塞到有连接请求
  - 返回值    : 成功返回另一端的fd，失败返回-1
  - sockfd    : 文件描述符
  - addr      : 接收到数据的 socketaddr_in 或 socketaddr_in6 的地址描述
  - addrlen   : 接收到的addr数据指针的大小

读取数据 ssize_t read(int fd,void *buf,size_t count);
  - 返回值    : 成功返回读取的字节数；0，表示另一端写完毕关闭了socket；-1，出错。
  - fd        : 从accept获取到的fd
  - buf       : 数据缓冲区
  - count     : 数据缓冲区大小

发送数据 ssize_t write(int fd,const void *buf,size_t count);
  - 返回值    : 成功返回发送的字节数；0，表示另一端写完毕关闭了socket；-1，出错。
  - buf       : 要发送的数据
  - count     : 要发送的数据大小

发起连接 int connect(int sockfd,const struct sockaddr *addr,socklen_t addrlen);
  - 向指定地址发起一个连接
  - 返回值    : 成功返回另一端的fd，失败返回-1
  - sockfd    : 文件描述符
  - addr      : 请求到的 socketaddr_in 或 socketaddr_in6 的地址描述
  - addrlen   : 请求到的addr数据指针的大小

关闭接口 int close(int fd);
  - 返回值    : 成功返回0，失败返回-1
  - fd        : 需要关闭的另一端fd

UDP发送数据 ssize_t sendto(int sockfd, const void *buffer, size_t length, int flags,const struct sockaddr *dest_addr, socklen_t addrlen)；
  - 如果是阻塞socket，会一直阻塞直到目标socket读取
  - 返回值    : 成功返回发送的字节数；0，失败返回-1。
  - sockfd    : 文件描述符
  - buffer    : 要发送的数据
  - length    : 要发送的数据大小奥
  - flags     : 
  - dest_addr : 目标 socketaddr_in 或 socketaddr_in6 的地址描述
  - addrlen   : dest_addr 的数据指针大小

UDP接收数据 ssize_t recvfrom(int sockfd, void *buffer, size_t length, int flags,struct sockaddr *src_addr, socklen_t *addrlen);
  - 如果是阻塞socket，会一直阻塞直到目标socket发送
  - 返回值    : 成功返回接收的字节数；0，失败返回-1。
  - sockfd    : 文件描述符
  - buffer    : 接收数据的缓冲区
  - length    : 接收数据的缓冲区大小
  - flags     : 
  - src_addr  : 接收到数据源的 socketaddr_in 或 socketaddr_in6 的地址描述
  - addrlen   : src_addr 的数据指针大小

地址字节转换
  - htonl     : 将主机字节序转换为网络字节序 - ip
  - htons     : 将主机字节序转换为网络字节序 - 端口
  - ntohl     : 网络顺序转换成主机顺序 - ip
  - ntohs     : 网络顺序转换成主机顺序 - 端口
  - inet_ntoa : 接受一个in_addr结构体类型的参数并返回一个以点分十进制格式表示的IP地址字符串
  - inet_addr : 需要一个字符串作为其参数，该字符串指定了以点分十进制格式表示的IP地址（例如：192.168.0.16）

套接口功能设置 int setsockopt(int sock,int level,int optname,const void *optval,socklen_t optlen);
  - 返回值    : 成功执行时，返回0。失败返回-1，errno被设为以下的某个值
    - EBADF        ：sock不是有效的文件描述词
    - EFAULT       ：optval指向的内存并非有效的进程空间
    - EINVAL       ：在调用setsockopt()时，optlen无效
    - ENOPROTOOPT  ：指定的协议层不能识别选项
    - ENOTSOCK     ：sock描述的不是套接字
  - sock      : 将要设置的sock文件描述符
  - level     : 设置的目标协议层
  - optname   ：需要访问的选项名。
  - optval    : 指向包含新选项值的数据缓冲区
  - optlen    : optval的缓冲区大小
  - |level|optname|optval|optlen|描述|
    |---|---|---|---|---|
    |SOL_SOCKET|SO_DEBUG|1 byte|1|0-关闭调试信息；非0-开启调试信息|
    ||SO_REUSEADDR|1 byte|1|0-关闭地址复用；非0-打开地址复用|
    ||SO_DONTROUTE|1 byte|1|0-关闭路由查找功能；非0-打开路由查找功能|
    ||SO_BROADCAST|1 byte|1|0-禁止发送广播数据；非0-允许发送广播数据|
    ||SO_SNDBUF|n byte|n|设置发送缓冲区大小，范围：【2048】 - 【256*(sizeof(struct sk_buff) + 256)】|
    ||SO_RCVBUF|n byte|n|设置接收缓冲区大小，范围：【2048】 - 【256*(sizeof(struct sk_buff) + 256)|
    ||SO_KEEPALIVE|1 byte|1|0-关闭KeepAlive定时器；非0-启动KeepAlive定时器|
    ||SO_OOBINLINE||||
    ||SO_NO_CHECK|1 byte|1|0-关闭校验和；非0-开启校验和|
    ||SO_PRIORITY|0-6|1|设置发送数据的优先级|
    ||SO_LINGER|struct linger|sizeof(struct linger)||
    ||SO_PASSCRED|1 byte|1|0-禁止SCM_CREDENTIAL控制消息接收；非0-允许SCM_CREDENTIAL控制消息接收|
    ||SO_TIMESTAMP|1 byte|1|0-关闭数据中的时间戳接收；非0-启动数据中的时间戳接收|
    ||SO_RCVLOWAT|n byte|n|设置接收数据前的缓冲区最小字节数，Linux中固定为1|
    ||SO_RCVTIMEO|n byte|n|设置接收超时时间|
    ||SO_SNDTIMEO|n byte|n|设置发送超时时间|
    ||SO_BINDTODEVICE|n byte|n|将sock绑定到特定设备上|
    ||SO_ATTACH_FILTER|||数据包过滤|
    ||SO_DETACH_FILTER|||数据包过滤|
    |IPPROTO_IP|IP_MULTICAST_LOOP|1 byte|1|0-禁止数据回流；非0-允许数据回流|
    ||IP_MULTICAST_TTL|1 byte|1|设置多播数据转发次数，1-255|
    ||IP_MULTICAST_IF|n byte|n|发送多播苏韩剧时用的本地接口，默认情况下被设置成了本地接口的第一个地址|
    ||IP_ADD_MEMBERSHIP|struct ip_mreq|sizeof(struct ip_mreq)|用于加入一个多播组|
    ||IP_DROP_MEMBERSHIP|struct ip_mreq|sizeof(struct ip_mreq)|用于脱离一个多播组|
    ||||||


接口控制 int ioctl(int fd,int cmd,...);
  - 返回值  :  函数执行成功时返回 0，失败则返回 -1
    - EBADF不是一个有效的描述符。
    - EFAULT argp引用一个不可访问的内存区域。请求或argp无效。
    - ENOTTY不与字符特殊设备相关联。指定的请求不适用于描述符d引用的对象类型。
  - fd      : 文件描述符
  - cmd     : 交互协议，设备驱动根据cmd执行相应操作
  - ...     ：可变参数arg，依赖cmd指定长度以及类型
  - 例子
    - FIONBIO   : 设置套接口阻塞类型 - 0阻塞，1非阻塞


### 示例

#### UDP

```C
    struct sockaddr_in src_addr;
    struct sockaddr_in local_addr = {
        .sin_addr.s_addr = inet_ntoa("192.168.1.1"),
        .sin_port = htons(12345);
        .sin_family = AF_INET,
    };
    int socket_fd = socket(AF_INET,SOCK_DGRAM,0);
    int ret = bind(socket_fd,(struct sockaddr*)&local_addr,sizeof(struct sockaddr));
    socklen_t slen = sizeof(struct sockaddr_in);
    uint8_t recvbuf[1024];
    int recvlen = recvfrom(socket_fd,recvbuf,1024,0,(struct sockaddr*)&src_addr,&slen);
    uint8_t *sendbuf = "hello";
    ret = sendto(socket_fd,sendbuf,strlen(sendbuf),0,(struct sockaddr*)&src_addr,sizeof(struct sockaddr));
    close(socket_fd);
```

加入多播

```c
    struct sockaddr_in src_addr;
    struct sockaddr_in local_addr = {
        .sin_addr.s_addr = inet_ntoa("192.168.1.1"),
        .sin_port = htons(12345);
        .sin_family = AF_INET,
    };
    int socket_fd = socket(AF_INET,SOCK_DGRAM,0);
    int ret = bind(socket_fd,(struct sockaddr*)&local_addr,sizeof(struct sockaddr));

    struct ip_mreq mreq={
        .imr_multiaddr.s_addr = inet_addr("239.239.239.239"),
        .imr_interface.s_addr = htonl(INADDR_ANY),
    };
    ret = setsockopt(socket_fd,IPPROTO_IP,IP_ADD_MEMBERSHIP,&mreq,sizeof(struct ip_mreq));

    if(ret < 0){
        ESP_LOGW(TAG,"Failed to join multicast group: err-%d",ret);
        goto end;
    }
    socklen_t slen = sizeof(struct sockaddr_in);
    uint8_t recvbuf[1024];
    int recvlen = recvfrom(socket_fd,recvbuf,1024,0,(struct sockaddr*)&src_addr,&slen);
    uint8_t *sendbuf = "hello";
    ret = sendto(socket_fd,sendbuf,strlen(sendbuf),0,(struct sockaddr*)&src_addr,sizeof(struct sockaddr));
    close(socket_fd);
```

#### TCP

服务端

```c
    struct sockaddr_in src_addr;
    struct sockaddr_in local_addr = {
        .sin_addr.s_addr = inet_ntoa("192.168.1.1"),
        .sin_port = htons(12345);
        .sin_family = AF_INET,
    };
    int socket_fd = socket(AF_INET,SOCK_STREAM,0);
    int ret = bind(socket_fd,(struct sockaddr*)&local_addr,sizeof(struct sockaddr));
    socklen_t slen = sizeof(struct sockaddr_in);
    ret = listen(socket_fd,128);

    int new_fd = accept(socket_fd,(struct sockaddr*)&src_addr,sizeof(struct sockaddr));
    uint8_t recvbuf[1024];
    int recvlen = read(new_fd,recvbuf,1024,0);
    uint8_t *sendbuf = "hello";
    ret = write(new_fd,sendbuf,strlen(sendbuf),0);

    close(new_fd);
    close(socket_fd);
```

客户端

```c
    struct sockaddr_in src_addr;
    struct sockaddr_in src_addr = {
        .sin_addr.s_addr = inet_ntoa("192.168.1.1"),
        .sin_port = htons(12345);
        .sin_family = AF_INET,
    };
    int socket_fd = socket(AF_INET,SOCK_STREAM,0);

    int ret = connect(socket_fd,(struct sockaddr*)&src_addr,sizeof(struct sockaddr));
    uint8_t recvbuf[1024];
    int recvlen = read(socket_fd,recvbuf,1024,0);
    uint8_t *sendbuf = "hello";
    ret = write(socket_fd,sendbuf,strlen(sendbuf),0);

    close(socket_fd);
```

### HTTP

HTTP是一种无状态协议。需要浏览器记住Wbe的状态，使用一个教cookie的机制。

#### Get 和 Post区别

|序号|Get|Post|
|---|---|---|
|1|一般用于请求，参数通常添加在URL中发送给服务器。|一般以表单的形式提交，参数通常放在请求体 Body 中。|
|2|因为URL有长度限制，所以Get的数据长度有限制。|因为参数放在body中，所以数据长度无限制。|
|3|会被浏览器主动cache。|如果需要cachepost的数据，需要主动设置。|
|4|浏览器反复回退/前进是无害的。|浏览器反复回退/前进会重复提交表单。|
|5|发送过程中只产生一个TCP数据包。|发送过程中会产生两个TCP数据包。|
|6|http头和数据会一起发送，服务器响应200。|先发http头，等待服务器100响应，在发送数据。服务器响应200。|

- Get中URL的形式：?key=value / ?key1=value1&key2=value2

#### HTTP 1.0 / 1.1 / 2.0

HTTP 1.0
- 是在 1996 年引入的，从那时开始，它的普及率就达到了惊人的效果。
- 仅仅提供了最基本的认证，这时候用户名和密码还未经加密，因此很容易收到窥探。
- 被设计用来使用短链接，即每次发送数据都会经过 TCP 的三次握手和四次挥手，效率比较低。
- 只使用 header 中的 If-Modified-Since 和 Expires 作为缓存失效的标准。
- 不支持断点续传，也就是说，每次都会传送全部的页面和数据。
- 认为每台计算机只能绑定一个 IP，所以请求消息中的 URL 并没有传递主机名

HTTP 1.1
- HTTP 1.1 是 HTTP 1.0 开发三年后出现的，也就是 1999 年，它做出了以下方面的变化
- 使用了摘要算法来进行身份验证
- 默认使用长连接，长连接就是只需一次建立就可以传输多次数据，传输完成后，只需要一次切断连接即可。长连接的连接时长可以通过请求头中的 keep-alive 来设置
- 中新增加了 E-tag，If-Unmodified-Since, If-Match, If-None-Match 等缓存控制标头来控制缓存失效。
- 支持断点续传，通过使用请求头中的 Range 来实现。
- 使用了虚拟网络，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。

HTTP 2.0
- HTTP 2.0 是 2015 年开发出来的标准，它主要做的改变如下
- 头部压缩，由于 HTTP 1.1 经常会出现 User-Agent、Cookie、Accept、Server、Range 等字段可能会占用几百甚至几千字节，而 Body 却经常只有几十字节，所以导致头部偏重。HTTP 2.0 使用 HPACK 算法进行压缩。
- 二进制格式，HTTP 2.0 使用了更加靠近 TCP/IP 的二进制格式，而抛弃了 ASCII 码，提升了解析效率
- 强化安全，由于安全已经成为重中之重，所以 HTTP2.0 一般都跑在 HTTPS 上。
- 多路复用，即每一个请求都是是用作连接共享。一个请求对应一个id，这样一个连接上可以有多个请求。

HTTP 3.0
- QUIC 有自己的一套机制可以保证传输的可靠性的。当某个流发生丢包时，只会阻塞这个流，其他流不会受到影响。
- TLS3 升级成了最新的 1.3 版本，头部压缩算法也升级成了 QPack。
- HTTPS 要建立一个连接，要花费 6 次交互，先是建立三次握手，然后是 TLS/1.3 的三次握手。QUIC 直接把以往的 TCP 和 TLS/1.3 的 6 次交互合并成了 3 次，减少了交互次数

#### 请求头

请求头有四种：通用标头，实体标头，请求标头，响应标头

通用标头主要有三个：Date, Cache-Control 和 Connection
  - **Date** 出现在请求标头和响应标头中，基本格式：Date: Web,21 Oct 2024 09:00:00 GMT
  - **Cache-Control**  出现在请求标头和响应标头中，具有请求标头和响应标头的特性，主要有可缓性，阈值性，重新验证并重新加载和其他特性。
  - **Connection** 决定当前事务（一次三次握手和四次挥手）完成后，是否会关闭网络连接。
    - 一种是持续性连接：Connection：keep-alive
    - 一种是非持续性连接：Connection：close

HTTP 1.1的通用标头格式：Cache-Control,Connection,Date,Pragma,Traiker,Transger-Encoding,Upgrade,Via,Warming。

实体标头是描述消息正文内容的 HTTP 标头。实体标头用于 HTTP 请求和响应中。
包含Content-Length, Content-Language, Content-Encoding,Allow。
- Content-Length 实体报头指示实体主体的大小，以字节为单位，发送到接收方。
- Content-Language 实体报头描述了客户端或者服务端能够接受的语言。
- Content-Encoding 这又是一个比较麻烦的属性，这个实体报头用来压缩媒体类型。Content-Encoding 指示对实体应用了何种编码。  
                   常见的内容编码有这几种： gzip、compress、deflate、identity ，这个属性可以应用在请求报文和响应报文中

请求标头
Host 请求头指明了服务器的域名（对于虚拟主机来说），以及（可选的）服务器监听的 TCP 端口号;如果没有给定端口号，会自动使用被请求服务的默认端口。
例如：Host: developer.mozilla.org
Accpet、 Accept-Language、Accept-Encoding 都是属于内容协商的请求标头

Referer : 当浏览器向 web 服务器发送请求的时候，一般会带上 Referer，告诉服务器该网页是从哪个页面链接过来的，服务器因此可以获得一些信息用于处理。
Referer: https://developer.mozilla.org/testpage.html 

响应标头
Access-Control-Allow-Origin 一个返回的 HTTP 标头可能会具有 Access-Control-Allow-Origin ，Access-Control-Allow-Origin 指定一个来源，它告诉浏览器允许该来源进行资源访问。
Keep-Alive 表示的是 Connection 非持续连接的存活时间，可以进行指定。
Server 服务器标头包含有关原始服务器用来处理请求的软件的信息。
例如  Server: Apache/2.4.1 (Unix) 

#### 流程

本地DNS缓存 -if not-> 本机Hosts -if no-> 发起一个DNS查询


#### HTTPS

HTTPS 的握手过程，其实就是 SSL/TLS 的握手过程。
在进行通信前，首先会进行 HTTP 的三次握手，握手完成后，再进行 TLS 的握手过程。
ClientHello：客户端通过向服务器发送 hello 消息来发起握手过程。这个消息中会夹带着客户端支持的 TLS 版本号(TLS1.0 、TLS1.2、TLS1.3) 、客户端支持的密码套件、以及一串 客户端随机数。
ServerHello：在客户端发送 hello 消息后，服务器会发送一条消息，这条消息包含了服务器的 SSL 证书、服务器选择的密码套件和服务器生成的随机数。
认证(Authentication)：客户端的证书颁发机构会认证 SSL 证书，然后发送 Certificate 报文，报文中包含公开密钥证书。最后服务器发送 ServerHelloDone 作为 hello 请求的响应。第一部分握手阶段结束。
加密阶段：在第一个阶段握手完成后，客户端会发送 ClientKeyExchange 作为响应，这个响应中包含了一种称为 The premaster secret 的密钥字符串，这个字符串就是使用上面公开密钥证书进行加密的字符串。随后客户端会发送 ChangeCipherSpec，告诉服务端使用私钥解密这个 premaster secret 的字符串，然后客户端发送 Finished 告诉服务端自己发送完成了
实现了安全的非对称加密：然后，服务器再发送 ChangeCipherSpec 和 Finished 告诉客户端解密完成，至此实现了 RSA 的非对称加密。

#### 其他

cookies机制和session机制的区别是什么？
- cookies数据保存在客户端，session数据保存在服务端；
- cookies可以减轻服务器压力，但是不安全，容易进行cookies欺骗；
- session安全一点，但是占用服务器资源。

http的请求报文是什么样的？
包含：请求行，请求头部，空行，请求体
请求行包括：请求方法字段、URL字段、HTTP协议版本字段。它们用空格分隔。例如，GET /index.html HTTP/1.1。
请求头部:请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔
 - User-Agent：产生请求的浏览器类型。
 - Accept：客户端可识别的内容类型列表。
 - Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。
请求体: post put等请求携带的数据

http的响应报文是什么样的？
包含：响应行，响应头，空行，响应体
响应行： 由协议版本，状态码和状态码的原因短语组成，例如HTTP/1.1 200 OK。
响应头：响应部首组成
响应体：服务器响应的数据

### MQTT

MQTT协议是一种轻量级的消息传输协议。其特点包括：小巧灵活、易于实现、支持QoS级别、支持订阅/发布模式以及支持SSL/TLS加密等。优势包括：可靠性高、带宽占用低、支持异构网络、易于部署和管理等。

#### 什么是服务质量 QoS ？

QoS 是在消息发送方和消息接收方定义的一种协议，其用于保证特定消息的交付级别。
在 MQTT 中有三种 QoS 级别：
- At most once (0) 最多一次
- At least once (1) 至少一次：发送消息等效PUBACK包
- Exactly once (2) 恰好一次：4次握手，发布消息，等待PUBREC包，发送PUBREL包，发布PUBCOMP包。

在 MQTT 中聊 QoS 时消息流向需要从两个方向考虑：
1. 消息发布客户端 -> 代理服务器
2. 代理服务器 -> 消息订阅客户端

客户端在发布消息到代理 borker 的时候定义了发布消息的 QoS 级别。而代理在将该消息传递给订阅客户端时使用的是订阅客户端在订阅主题时定义的 QoS ，如果订阅客户端的 QoS 比 发布客户端的 QoS 小则该消息会以较低的 QoS 级别进行消息的传递。

单个客户端的数据包标识符 packetId 是唯一的，但在全部的客户端中不唯一。一旦流完成，该 packetId 将可以重用。

MQTT Broker是MQTT协议的核心组件，作为消息的发布/订阅中心，负责接收和转发客户端的消息。常见的开源MQTT Broker包括：Eclipse Mosquitto、Apache ActiveMQ Artemis、EMQ X等。

MQTT客户端连接到Broker时需要提供以下参数：Broker地址、Port端口号、Client ID（客户端标识符）、Username（用户名）、Password（密码）等。其中Client ID是必需的，且需要确保唯一性，其他参数根据需要进行配置。
如果一个MQTT客户端想要订阅多个主题，可以将多个主题名称用“/”（斜杠）分隔开，例如：“topic1/topic2”。这样订阅后，客户端就能接收所有以“topic1”或“topic2”作为前缀的消息。