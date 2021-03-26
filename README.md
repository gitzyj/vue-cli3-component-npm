# vue-cli3-component-npm 开箱即用发布vue组件到npm

## Project setup
```
npm install
```
npm run dev
```

### 打包组件
```
npm run lib
```

-----examples // 原 src 目录，改成 examples 用作示例展示
-----packages // 新增 packages 用于编写存放组件
-----public //  公共资源

-----gitignore // 设置git忽略文件

-----npmignore // 设置npm忽略文件
-----vue.config.js // 对内部webpack 配置修改

npm i nrm -g   //一定要全局安装 npm管理工具
nrm add xxx .   http:xxxxx .   添加源地址
nrm  ls  展开源目录 
nrm use xxx 使用源切换仓储
nrm  del  xxxx  删除镜像地址

我们发布到 npm 中，只有编译后的 lib 目录、package.json、README.md才是需要被发布的。所以我们需要设置忽略目录和文件

1 项目编辑器如vscode 登录到 npm （第一次注册的要去邮箱激活）
如果配置了淘宝镜像，先设置回npm镜像：
也可以使用nrm 管理查看 源地址  
2然后在终端执行登录命令，输入用户名、密码、邮箱即可登录
3 npm publish 发布命令
执行后显示发布成功即可在npm官网上找到自己的包，如果没有发布成功，有可能是包名称和社区其他包重复了，改个名字即可。

// main.js

// 导入组件库
import demo from 'vue-cli3-component-npm';
// 注册组件库
Vue.use(demo);

全局调用 如demo-component
<demo-component></demo-component>