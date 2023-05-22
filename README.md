<h1 align="center">随意影视</h1>

具有用户系统、好友系统、搜索系统、收藏系统的观影app，目前所有影视资源均为
youtube上的预告片。

## 编译运行

1. 更改根目录下.env.sample文件为.env文件，并在其中填入youtube api和tmbd api的key。
2. 更改[后端主机地址](https://github.com/typenoob/hublix/blob/master/src/utils/http.js#L7)为你部署的主机地址。
3. 执行命令`npm install`
4. 执行命令`npm run serve`

## 软件架构

![image](https://user-images.githubusercontent.com/61347081/195332676-e20bd7ec-5d6b-4935-acaf-85ff764d29ef.png)

## 外部api

- [YouTube api](https://developers.google.com/youtube/v3)
- [TMBD api](https://developers.themoviedb.org/3)

## 后端环境

- 采用eggjs框架编写 [点击跳转](https://github.com/typenoob/hublix_backend)

## 快速体验

- 点击进入[随意影视](http://hublix.namu.cf)
[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=typenoob&utm_campaign=oss)

> **Warning**
> 由于域名未实现ssl，而vercel域名强制https，需要访问[后端地址](https://egg.web-framework-ao2f.1627164863551065.cn-hangzhou.fc.devsapp.net)，并同意隐私安全设置
**Warning**

> **Note**
> 您也可以访问[github域名](http://hublix.github.namu.cf/)
**Note**

:heart:

## 界面截图

![image](https://user-images.githubusercontent.com/61347081/189036475-8aef873d-cb06-4b32-86fe-d8659791f563.png)
![image](https://user-images.githubusercontent.com/61347081/189036494-f1ec8f2e-f60f-4ea5-a6f4-2ba68bf3f49d.png)
![image](https://user-images.githubusercontent.com/61347081/189036507-35e16126-7586-4a23-86f6-e7c6af4c6c15.png)

![image](https://user-images.githubusercontent.com/61347081/189036515-709b89b4-88a9-4404-aafd-71228bc23021.png)
![image](https://user-images.githubusercontent.com/61347081/189036524-fd59c857-3d80-4d81-9172-a7cae54831cb.png)

![image](https://user-images.githubusercontent.com/61347081/189036551-e6772acf-55e0-4bc0-b5ac-61be48b683aa.png)
![image](https://user-images.githubusercontent.com/61347081/189036561-9e3d4601-f9fc-4698-b6d6-3cba58cfc14c.png)

