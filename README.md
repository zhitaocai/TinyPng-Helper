# TinyPng Helper

[![](https://img.shields.io/badge/Release-0.1.0-orange.svg)](CHANGELOG.md)

一个压缩指定文件夹的所有图片大小的工具。

## 使用方法

```
npm run build "imgDirPath=/Users/caizhitao/Desktop/testpngdir"
```

参数格式:

* ``"param1=value1;param2=value2;..."``

参数说明：

* ``imgDirPath``: 图片所在文件夹的路径

## 实现原理

内部实际采用 [TinyPng 的 API](https://tinypng.com/developers/reference/nodejs) 去实现

## 支持一下作者吧

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
