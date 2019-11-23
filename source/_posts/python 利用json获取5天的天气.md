---
title: python获取5天的天气
date: 2019-11-20 22:10:30
tags: 
    - python
    - requests
    - json
autor: hehung
categories: python
img: 
cover: false
coverImg: 
top: false
summary: 利用python获取天气，使用requests模块获取天气json文件，解析json文件提取5天的天气信息以及穿衣指数。
---

>以前在学习python的时候用python做了一个可以获取5天天气的一个程序，分享在了CSDN的博客上，现在转载到我的个人博客，原链接请点击：[点我跳转](https://blog.csdn.net/hehung/article/details/78229098 "点我跳转")

# 获取天气网址介绍
今天学了学python的json操作，然后就想弄个获取天气的程序试试。

但是要就行天气获取，就要找到天气的json接口文件。在网上搜集了一圈，发现下面的网址可以提供5天的天气查询的json，很实用。

## 获取天气网址
网址：?http://wthrcdn.etouch.cn/weather_mini?city=北京

注意：这个网址的后面的地名可以自己更改，如http://wthrcdn.etouch.cn/weather_mini?city=上海

对了，如果打开的页面是乱码，那是因为问个的显示编码方式不对，在网页单击鼠标右键，选择编码 ?，选择?Unicode（UTF-8），用的浏览器不一样，操作方式应该不一样，只要将网站的显示页面的编码方式改成utf-8就行了

如下图，查找的深圳的天气，直接将后面的北京改成深圳就ok了
![天气网址](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/python获取5天的天气/查询天气.png "天气网址")


这样子看这个文档很不方便，眼睛都看花了，下面我们就用python程序的pprint模块来美化一些这个字典

# 程序实现
## 导入模块

```python
import json, requests
```
这两个模块是必须的:
1、json可以用来将网页的json解析成python能识别的字典表示。
2、requests模块用来获取下载网站，即json的网站页面，用来方便处理。

## 导入链接，获取页面

获取天气查询时候返回的json文本，主要就是对这个文本信息进行处理分析。

```python
weatherJsonUrl = "http://wthrcdn.etouch.cn/weather_mini?city=北京"  #将链接定义为一个字符串
response = requests.get(weatherJsonUrl)      #获取并下载页面，其内容会保存在respons.text成员变量里面
response.raise_for_status() #这句代码的意思如果请求失败的话就会抛出异常，请求正常就上面也不会做
```

## 解析json文件
需要解析的变量就是上一步的成员变量respons.text。
如下所示：
```python
#将json文件格式导入成python的格式
weatherData = json.loads(response.text)
```


## 使用漂亮打印打印转换后的python字典(weatherData变量)
最后我们需要使用print查看一下数据，但是使用原来的语言自带的print不是很方便，看着很难识别字符，所以使用一个模块pprint。

```python
import pprint               #导入pprint模块
pprint.pprint(weatherData)  #漂亮打印出天气字典
```
执行结果如下图所示：（我只截取了一部分图形，太长了）:
![获取的json数据](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/python获取5天的天气/获取的天气数据.png "获取的json数据")


从上面的图形可以看出‘data’是字典的第一个键，其值也是一个字典，这个字典中键'forecast'才是表示天气信息的。

'date':表示日期 ......等 。这些应该都看得懂，就不浪费时间解释了......


## 数据处理
接下来就是对这个字典（weatherData）的数据进行处理
就是平时处理字典与列表的方式即可。

举例：

获取今天的天气：
```python
weatherData['data']['forecast'][0]['type']
#输出>> '晴'
```
获取今天的温度：
```python
weatherData['data']['wendu']
#输出>> '16'
```
原理还是很简单的，用到的只是也不是很多，就是字典数据的处理，json的获取等。

# 源码
下面分享获取天气的源码：
```python
#!python3
#coding:utf-8
import json, sys, requests
 
#输入地点
weatherPlace = input("请输入天气地点：")
if weatherPlace == 'E' or weatherPlace == 'e':
    sys.exit(0);    #关闭程序
#下载天气JSON
weatherJsonUrl = "http://wthrcdn.etouch.cn/weather_mini?city=%s" % (weatherPlace)
response = requests.get(weatherJsonUrl)
try:
    response.raise_for_status()
except:
    print("网址请求出错")
    
#将json文件格式导入成python的格式
weatherData = json.loads(response.text)
 
#以好看的形式打印字典与列表表格
#import pprint
#pprint.pprint(weatherData)
 
w = weatherData['data']
print("地点：%s" % w['city'])
 
#日期
date_a = []
#最高温与最低温
highTemp = []
lowTemp = []
#天气
weather = []
#进行五天的天气遍历
for i in range(len(w['forecast'])):
    date_a.append(w['forecast'][i]['date'])
    highTemp.append(w['forecast'][i]['high'])
    lowTemp.append(w['forecast'][i]['low'])
    weather.append(w['forecast'][i]['type'])
    
    #输出
    print("日期：" + date_a[i])
    print("\t温度：最" + lowTemp[i] + '℃~最' + highTemp[i] + '℃')
    print("\t天气：" + weather[i])
    print("")
    
print("\n今日着装：" + w['ganmao'])
print("当前温度：" + w['wendu'] + "℃")


```
# 运行结果
上述代码在运行的时候要输入 >>  地名 <<  ，如下图：
![输入地点](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/python获取5天的天气/输入地点.png "输入地点")

运行结果如下图所示：
![运行结果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/python获取5天的天气/运行结果.png "运行结果")




