---
layout: post
title: 一些软件的命令
series: techs
modtime: 2024/08/20
---
### Docker
#### 1. 容器生命周期管理
- run - 创建并启动一个新的容器。
    - -d: 后台运行容器并返回容器 ID。
    - -it: 交互式运行容器，分配一个伪终端。
    - --name: 给容器指定一个名称。
    - -p: 端口映射，格式为 host_port:container_port。
    - -v: 挂载卷，格式为 host_dir:container_dir。
    - --rm: 容器停止后自动删除容器。
    - --env 或 -e: 设置环境变量。
    - --network: 指定容器的网络模式。
    - --restart: 容器的重启策略（如 no、on-failure、always、unless-stopped）。
    - -u: 指定用户。
- start/stop/restart - 这些命令主要用于启动、停止和重启容器。
- kill - 立即终止一个或多个正在运行的容器
- rm - 于删除一个或多个已经停止的容器。
- pause/unpause - 暂停和恢复容器中的所有进程。
- create - 创建一个新的容器，但不会启动它。
- exec - 在运行中的容器内执行一个新的命令。
    - -d, --detach: 在后台运行命令。
    - --detach-keys: 覆盖分离容器的键序列。
    - -e, --env: 设置环境变量。
    - --env-file: 从文件中读取环境变量。
    - -i, --interactive: 保持标准输入打开。
    - --privileged: 给这个命令额外的权限。
    - --user, -u: 以指定用户的身份运行命令。
    - --workdir, -w: 指定命令的工作目录。
    - -t, --tty: 分配一个伪终端。

#### 2. 容器操作
- ps - 列出 Docker 容器
- inspect - 获取 Docker 对象（容器、镜像、卷、网络等）的详细信息。
- top - 显示指定容器中的正在运行的进程。
- attach - 允许用户附加到正在运行的容器并与其交互。
- events - 获取 Docker 守护进程生成的事件。
- logs - 获取和查看容器的日志输出。
- wait - 允许用户等待容器停止并获取其退出代码。
- export - 将容器的文件系统导出为 tar 归档文件。
- port - 显示容器的端口映射信息。
- stats - 实时显示 Docker 容器的资源使用情况。

#### 3. 容器root文件系统（rootfs）命令
- commit - 允许用户将容器的当前状态保存为新的 Docker 镜像。
- cp - 用于在容器和宿主机之间复制文件或目录。
- diff - 显示 Docker 容器文件系统的变更。

#### 4. 镜像仓库
-login/logout - 管理 Docker 客户端与 Docker 注册表的身份验证。
-pull - 从 Docker 注册表（例如 Docker Hub）中拉取（下载）镜像到本地。
-push - 将本地构建的 Docker 镜像推送（上传）到 Docker 注册表（如 Docker Hub 或私有注册表）。
-search - 用于在 Docker Hub 或其他注册表中搜索镜像。

#### 5. 本地镜像管理
- images - 列出本地的 Docker 镜像。
- rmi - 删除不再需要的镜像。
- tag - 创建本地镜像的别名（tag）。
- build - 从 Dockerfile 构建 Docker 镜像。
- history - 查看指定镜像的历史层信息。
- save - 将一个或多个 Docker 镜像保存到一个 tar 归档文件中。
- load - 从由 docker save 命令生成的 tar 文件中加载 Docker 镜像。
- import - 从一个 tar 文件或 URL 导入容器快照，从而创建一个新的 Docker 镜像。
- info - 显示 Docker 的系统级信息，包括当前的镜像和容器数量。
- version - 显示 Docker 客户端和服务端的版本信息。

#### 6. 网络命令
- docker network ls: 列出所有网络。
- docker network create <network>: 创建一个新的网络。
- docker network rm <network>: 删除指定的网络。
- docker network connect <network> <container>: 连接容器到网络。
- docker network disconnect <network> <container>: 断开容器与网络的连接。

#### 7. 卷命令
- docker volume ls: 列出所有卷。
- docker volume create <volume>: 创建一个新的卷。
- docker volume rm <volume>: 删除指定的卷。
- docker volume inspect <volume>: 显示卷的详细信息。

******

### WSL
- 安装linux发行版
    - wsl --install <Distribution Name> 
        - --distribution：指定安装的linux发行版
        - --no-launch: 安装完成后，不启动
        - --web-download: 通过联机渠道安装，而不是使用 Microsoft Store 安装
- 列出可用的linux发行版
    - wsl --list --online / wsl -l-o
- 列出已安装的 Linux 发行版
    - wsl --list --verbose / wsl -l -b
        - --all: 列出所有发行版
        - --running: 列出当前在运行的发行版
        - --quiet: 仅显示发行版名称
- 设置默认linux发行版
    - wsl --set-default \<Dsitribution Name\>
- 运行特定的 Linux 发行版
    - wsl --distribution \<Distribution Name\> --user \<User Name\>
- 更新 WSL
    - wsl --update
- 检查 WSL 状态
    - wsl --status
- 检查 WSL 版本
    - wsl --version
- Help 命令
    - wsl --help
- 以特定用户的身份运行
    - wsl --user <Username>
- 更改发行版的默认用户
    - <DistributionName> config --default-user <Username>
- 关闭
    - wsl --shutdown
- Terminate
    - wsl --terminate <Distribution Name>
- 标识 IP 地址
    - wsl hostname -I
- 导出分发版
    - wsl --import <Distribution Name> <InstallLocation> <FileName>
        - --vhd：指定导出分发版应为 .vhdx 文件而不是 tar 文件（这仅在使用 WSL 2 的情况下受支持）
- 导入分发版
    - wsl --import <Distribution Name> <InstallLocation> <FileName>
        - --vhd：指定导入分发版应为 .vhdx 文件而不是 tar 文件（这仅在使用 WSL 2 的情况下受支持）
        - --version <1/2>：指定将分发版导入为 WSL 1 还是 WSL 2 分发版
- 就地导入发行版
    - wsl --import-in-place <Distribution Name> <FileName>
- 注销或卸载 Linux 发行版
    - wsl --unregister <DistributionName>
- 装载磁盘或设备
    - wsl --mount <DiskPath>
        - --vhd：指定 <Disk> 引用虚拟硬盘。
        - --name：使用装入点的自定义名称装载磁盘
        - --bare：将磁盘附加到 WSL2，但不进行装载。
        - --type <Filesystem>：装载磁盘时使用的文件系统类型默认为 ext4（如果未指定）。 此命令也可输入为：wsl --mount -t <Filesystem>。可以使用 blkid <BlockDevice> 命令检测文件系统类型，例如：blkid <dev/sdb1>。
        - --partition <Partition Number>：要装载的分区的索引号默认为整个磁盘（如果未指定）。
        - --options <MountOptions>：装载磁盘时，可以包括一些特定于文件系统的选项。 例如，wsl --mount -o "data-ordered" 或 wsl --mount -o "data=writeback 之类的 ext4 装载选项。 但是，目前仅支持特定于文件系统的选项。 不支持通用选项，例如 ro、rw 或 noatime。
- 卸载磁盘
    - wsl --unmount <DiskPath>

### Linux
#### apt-get
- apt-get update / apt-get upgrade
- apt-get install iproute2  / 安装网络命令
- apt-get install -y dotnet-sdk-8.0 && apt-get install -y aspnetcore-runtime-8.0

#### 开机启动
1.1 vi /etc/systemd/system/rc-local.service
- 编辑文件内容：
```
[Unit]
Description=My custom service
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/path/to/your/script.sh

[Install]
WantedBy=multi-user.target
```
    - Description：描述服务
    - After：指定服务启动的依赖
    - Type：服务类型，oneshot 表示只执行一次
    - RemainAfterExit：服务退出后是否保留进程
    - ExecStart：执行的脚本
    - WantedBy：服务被哪个目标所需要

1.2 vi /etc/rc.local
1.3 chmod +x /etc/rc.local

2.1 在/etc/init.d目录下添加自启动脚本