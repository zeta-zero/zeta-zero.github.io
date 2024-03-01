
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
  - 三次握手
  - 四次挥手


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
