FCWS
======

> FCWS是一个基于Ionic，Nodejs，Mongodb开发的端到端移动应用。要运行该项目，需要首先安装相应的环境，包括Nodejs,Ionic,Mongodb。以下步骤的测试环境为MacOS,其他系统暂未测试。

# 教程

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
数据库数据：
![](./images/mongodb.png)
登录:
![](./images/login.png)
侧边栏:
![](./images/sidemenu.png))