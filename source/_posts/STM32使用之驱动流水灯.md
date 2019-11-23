---
title: STM32使用之驱动流水灯
date: 2019-11-23 19:11:00
tags: 
        - STM32
autor: hehung
categories: STM32
img: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/STM32_core.jpg
cover: false
coverImg: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/STM32_core.jpg
top: false
summary: 使用普中ARM+51单片机开发板进行STM32的开发测试，测试了流水灯以及stm32的使用方式。
---

>普中的这个开发板除了可以使用51单片机进行开发之外，还可以使用开发套件提供的STM32核心进行开发，提供的STM32的最小系统板采用的是STM32F103C8T6，这是一种最普片使用的低成本的STM32单片机。

>以前发帖在电子芯巴克。原帖子链接：[点我跳转](https://bbs.icxbk.com/thread-100338-1-1.html)

# STM32核心

&emsp;&emsp;这个STM32的最小系统板长这样

![STM32核心](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/STM32_core.jpg "STM32核心")

&emsp;&emsp;方向插对，之后就可以正常的进行开发了，从图中可以看到明显的J_LINK插口，可以方便的使用J_LINK进行程序的下载，但是一个J_LINK也是极贵的所，所以本文选择使用USB串口下载程序。

# 程序下载

## 接线

&emsp;&emsp;如下图所示，<font color=red>stm32最小系统上的RTS与DTR粉笔与开发板上面的RTS与DTR相连接</font>

![连接USB下载线](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/STM32_Download_Pin.jpg "连接USB下载线")

## 下载工具
&emsp;&emsp;连接好后就可以通过USB下载程序了，与51单片机的使用方式是一样的，利用hex文件下载软件，直接下载hx文件吗，官方已经给我们提供了一个普中的下载软件。

&emsp;&emsp;软件的名字叫做：PZ-ISP普中自动下载软件.exe，提供给你们附件如下，有需要的小伙伴可以下载使用.
[点我下载普中开发板下载器](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/PZ-ISP_Download_tool.zip)

## 下载方式

&emsp;&emsp;具体的下载方式如下所示：
&emsp;&emsp;<font color=red>这里还有以下是需要注意的，就是供电跳线帽要打到3.3V的位置，因为STM32是3.3V供电的，如果不改变跳线帽的话可能回烧坏stm32。</font>

![下载方式](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/Download_setting.jpg "下载方式")

+ 打开下载器软件，连接USB线。
+ 选择单片机型号，如下图所示；
+ 选择串口，这个一般是不需要选择的，如果没有显示可用的串口的话，应该是驱动没有安装好，下载一个USB_ttl驱动安装就可以了；
+ 选择波特率115200；
+ 选择hex文件，编译程序生成的hex文件；
+ 最后就是下载程序了，直接点击下载即可，在程序代码量比较下的时候，直接使用USB进行下载还是挺快的，但是当程序变得很大的时候，下载就会很慢，有可能还会达到几分钟。所以有JLINK的伙伴还是使用J_LINK进行下载吧。

![选择单片机型号](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/download_select.jpg "选择单片机型号")

&emsp;&emsp;程序下载好了就可以进行演示查看了，我选择的是流水灯的程序。直接使用的官方的流水灯程序。P0口连线如下：
![连线](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/wire_connect.jpg "连线")

emsp;&emsp;其实STM32的开发与51单片机的的开发还是比较相似的，只不过STM32的运行速度很快，而STM32还提供许多内置设备，如PWM，AD/DA等。还有一点就是STM32进行GPIO扣得初始化还是比较复杂的。

emsp;&emsp;<font color=red size=2>开发STM32必须使用KEIL5(MDK5)软件进行，并且软件是不内置芯片支持库的，需要自行安装，可以到官网去下载stm32f103的支持包就可以正常的编译程序了，不然程序只能查看是不能进行编译运行的。</font>


# 演示结果展示

![演示效果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/display1.gif "演示效果")

![演示效果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/display2.gif "演示效果")

# 附件

附上程序：[点我下载STM32流水灯程序](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/stm32-Running_water_light/PZ-ISP_Download_tool.zip)

