# Knowledge

## Typings
大部分的参数如CurrentUser都被保存在[typings](src/services/ant-design-pro/typings.d.ts)里,调用时只需要用API.CurrentUser等直接调用即可

其被视为一个全局变量，当login时根据输入信息对其进行修改，app.tsx中调用其查看用户的登录态

## 框架关系
Ant Design 组件库 => 基于 React 实现

Ant Design Procomponents => 基于 Ant Design 实现 可以去Procomponents官网找一些相关组件用

Ant Design Pro 后台管理系统 => 基于 Ant Design + React + Ant Design Procomponents + 其他的库实现

## Ant Design Pro（Umi 框架）权限管理
app.tsx 项目全局入口文件，定义了整个项目中使用的公共数据（比如用户信息），在这个项目中其行为如下:
1. 获取用户的登录态,验证用户是否为登陆状态

access.ts 控制用户的访问权限

api.ts 定义了与后端链接的api入口，调用相关API来与后端进行交互
