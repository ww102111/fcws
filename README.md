FCWS(Deprecated) 已过时
======

> 本项目目前分为前端和后端分别维护

- 前端在[fcws-ionic](https://github.com/rdmclin2/fcws-ionic)
- 后端在[fcws-backend](https://github.com/rdmclin2/fcws-backend)

> FCWS是一个基于Ionic，Nodejs，Mongodb开发的端到端移动应用。要运行该项目，需要首先安装相应的环境，包括Nodejs,Ionic,Mongodb。以下步骤的测试环境为MacOS,其他系统暂未测试。

# 运行步骤
首先打开Mongod数据库,默认的数据库名称为test

```
//Mac端命令
$ sudo mongod
```

然后添加测试数据并开启服务器，首先安装node_modules，本工程中的node_modules不一定适合你的系统。

```
$ cd server
$ rm -rf node_modules
$ npm install
```

该系统没有提供注册页面，人员录入通过脚本进行。

```
$ cd server/bin
依次执行以下命令:
$ node users_build.js
$ node orgs_build.js
$ node users_get_orgs_build.js
```
你可以用remongo等工具查看数据库中的test collection中是否已经录入数据。然后开启服务器:

```
$ cd ..
$ node server.js
```

最后运行客户端，同样这个工程里也有node_modules，如果无法运行，删除该文件夹重新安装。

```
$ cd client
$ ionic serve
```
运行成功!

#运行截图
![](http://7pun7p.com1.z0.glb.clouddn.com/blog/preview.png)
