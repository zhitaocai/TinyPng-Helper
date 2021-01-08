# TinyPng Helper

[![](https://img.shields.io/badge/Release-0.1.0-orange.svg)](CHANGELOG.md)

一个压缩指定文件夹的所有图片大小的工具。

## 一、使用方法

```
npm run build "imgDirPath=this_project_abs_path/testimg;tinyKey=xxx"
```

参数格式:

* ``"param1=value1;param2=value2;..."``

参数说明：

* ``imgDirPath``: 图片所在文件夹的绝对路径
* ``tinyKey``: Tiny 的 API Key，在 [Ting 官网申请](https://tinypng.com/) 即可（很简单，填邮箱即可注册获取到 API Key）

## 二、注意事项

* 由于内部压缩采用的是 [TinyPng 的 API](https://tinypng.com/developers/reference/nodejs) 去实现，**申请回来的 Tiny Png API Key 每个月只能免费压缩 500个 图片**，如果该月已经超过这个压缩数量，将不能压缩图片。解决这个问题的一些参考方法：
  * 花钱提升每个月的图片压缩数量
  * 等下个月，又可以重新获取 500 个额度
  * 多用几个邮箱注册多几个账号以获取多个 API Key
* 目前仅支持以下类型图片的压缩
  * .png
  * .jpg
  * .jpeg

## 三、支持一下作者吧

如果此项目对你有帮助，不妨支持一下我吧~

![](static/PAY.png)


## LICENSE

    MIT License

    Copyright (c) 2021 Zhitao Cai

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
