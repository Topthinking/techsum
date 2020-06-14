# Technical Summary ∙ [![version](https://img.shields.io/npm/v/techsum.svg)](https://www.npmjs.com/package/techsum)

## 基于[`award`](https://github.com/XimalayaCloud/award)框架的文档摘要站点

## 功能

- 支持静态资源部署
- 支持离线搜索
- 支持拼音搜索
- 检索关键词，快速定位
- 采用npm包形式部署，修改版本号即可一键升级新功能

## 使用说明

- 创建文档文件夹`demo`

- `cd demo`

- 初始化

  ```
  $ yarn init -y
  $ yarn add techsum
  ```

- 根目录创建`docs`文件夹，存放如下结构的 MD 文档

  ```
  # 通用

  ## techsum
  - 关键字：techsum
  - 负责人：孙杨杰
  - 文档：https://github.com/Topthinking/techsum
  ```

- 根目录创建`.yaml`文件

   ```yaml
   # 当前静态资源前缀，可以存放cdn资源
   assetPrefixs: /
   
   # 当前页面logo
   logo: https://github.com/fluidicon.png
   
   # 当前项目名称
   name: 名字描述
   
   # 当前项目描述
   description: 描述
   
   # 添加文案地址
   add: https://github.com/Topthinking/techsum/issues/issues/1
   
   # 添加描述
   addDesc: 快速添加您的技术摘要
   
   # 编辑文案地址
   edit: https://github.com/Topthinking/techsum/issues/edit/master
   
   # 当前仓库地址
   gitlab: https://github.com/Topthinking/techsum
   
   # 当前存储key
   localStorage: qd-guide
   
   # pipeline:
   #   url:
   #   img:
   
   # 引导页是否使用按钮点击过渡
   guide-button: 1
   
   ```

- 启动开发命令`yarn ts dev`

- 启动编译导出命令`yarn ts build`，导出目录为`public`

## 贡献指南

```shell
#1. 克隆仓库
$ git clone git@github.com:Topthinking/techsum.git

#2. 安装依赖
$ yarn

#3. 启动页面开发
$ yarn dev

#4. 启动编译导出
$ yarn build
```
