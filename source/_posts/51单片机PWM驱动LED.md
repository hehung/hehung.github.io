---
title: 51单片机PWM驱动LED
date: 2019-11-23 16:50:00
tags: 
        - 单片机
        - C语言
        - PWM
autor: hehung
categories: 51单片机
img: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/51-PWM//display1.gif
cover: false
coverImg: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/51-PWM//display1.gif
top: false
summary: 使用51单片机的定时器模拟PWM功能，实现LED的不同亮度的控制。
---

>PWM控制广泛的运用在单片机领域，LED灯光亮度驱动，电机速度驱动等都会用到，51单片机没有继承PWM模块，所以需要使用定时器进行模拟，本文就讲述如何使用定时器来模拟PWM功能实现对LED的亮度的控制。以前发帖在电子芯巴克。原帖子链接：[点我跳转](https://bbs.icxbk.com/thread-100307-1-1.html)

# 前言

&emsp;&emsp;本文中使用的是定时器0，通过配置定时器0为定时模式就可以了，然后在程序中打开定时器，定时时间间隔设置的小一点，设置的太大会造成不流畅的情况。

&emsp;&emsp;我在程序中设置的是0.01ms，周期为100，通过变量duty就可以改变占空比。如果要控制舵机运动的话，可以将定时时间设置成0.2ms，这样100次就是20ms，因为舵机控制需要周期为20ms的方波驱动，然后通过设置占空比就可以控制舵机运动了。

# 51单片机PWM原理

&emsp;&emsp;因为51单片机没有硬件PWM，所以采用定时器0来控制，控制原理就是通过周期性的输出高低电平来控制输出高电平和低电平的时间，周期一般要小于30ms，因为人的眼睛的刷新频率就差不多是30ms，如果大于30ms就会出现闪烁的效果，达不到理想的效果。

&emsp;&emsp;使用PWM还需要知道一个知识点就是占空比，占空比就是在一个周期中输出的高电平占整个周期的比值。

&emsp;&emsp;这个需要看驱动的LED是阴极驱动还是阳极驱动，如果是阴极驱动，占空比越大，LED亮度越低反之越高，阳极控制的相反。

# 程序编写

&emsp;&emsp;接下来就是写程序了。

``` C
#include <reg52.h>

#define uchar unsigned char
#define uint  unsigned int

sbit pwm = P3^7;                //定义PWM引脚为P3.7
uchar duty = 100;

void timer0_Init(void);
void Set_Duty(void);
void delay_ms(uint ms);

int main()
{
        int i;
        
        timer0_Init();
        
        while(1)
        {
                for(i=100;i>0;i-=1)
                {
                        duty = i;
                        delay_ms(1);
                }        
                for(i=0;i<10;i+=1)
                {
                        duty = i;
                        delay_ms(1);
                }
        }
}

//延时函数
void delay_ms(int ms)
{
        uint i;
        for(;ms>0;ms--)
                for(i=0;i<110;i++);
}
        
//定时器0初始化
void timer0_Init(void)
{
        TMOD|=0X01;                        //选择为定时器0模式，工作方式1，仅用TR0打开启动。

        TH0=(65536-20)/256;        //给定时器赋初值，50us
        TL0=(65536-20)%256;        
        ET0=1;                                //允许定时器中断0
        EA=1;                                //打开总中断
        TR0=1;                                //打开定时器                        
}

//使用定时0模拟PWM
void timer0() interrupt 1
{        
        static uint pwm_count = 0;
        
        TH0=(65536-10)/256;        //给定时器赋初值，50us
        TL0=(65536-10)%256;        
        
        pwm_count ++;        

        if(pwm_count >= 100)
        {
                pwm_count = 0;
        }else if(pwm_count <= duty)
        {
                pwm = 0;
        }else
        {
                pwm = 1;
        }
}
```

程序说明：duty变量就是占空比的控制变量，通过调节该值可以控制占空比大小，该值最大为100。



# 运行结果

&emsp;&emsp;如下图，可以看到LED呈现明暗的变化

![运行结果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/51-PWM//display1.gif "运行结果")

![运行结果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/51-PWM//display1.gif "运行结果")



