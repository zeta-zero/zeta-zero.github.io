---
layout: post
title: MariaDB数据库
series: techs
modtime: 2024/08/20
---

### 1. 安装
- 命令：apt-get install mariadb-server
运行 mysql_secure_installation 脚本以解决默认MariaDB安装中的几个安全问题：

### 2. 登录
- 登录 : mysql -u root -p
- 重置ROOT密码 : service mariadb stop && mysqld_safe --skip-grant-tables &

### 3. 命令
- 创建数据库:    CREATE DATABASE _DATABASENAME_;
- 创建用户:      CREATE USER '_USERNAME_'@'_IP_' IDENTIFIED BY '_PASSWORD_';
- 删除用户:      DROP USER '_USERNAME_'@'_IP_';
- 用户数据库权限: GRANT _AUTHORITY_ ON _DATABASENAME_.* TO '_USERNAME_' IDENTIFIED BY '_PASSWORD_';
    - _AUTHORITY_ : ALL , SELECT , UPDATE , INSERT , CREATE ,ALTER , DELETE , DROP , GRANT , REVOKE , INDEX
    - 常用密码：enB3MTk5Mw==

- 查看数据库: SHOW DATABASES:
- 查看数据表：SHOW TABLES;
- 显示用户权限：show grants;
- 数据库状态：show status;
- 显示用户：select user,host from _DATABASENAME_.user; // select * from mysql.user;
- 查询用户：show processlist;