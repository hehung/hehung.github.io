---
title: STM32使用之OLED显示屏驱动
date: 2019-11-23 19:49:01
tags: 
        - STM32
        - OLED
        - IIC
autor: hehung
categories: STM32
img: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/display_oled.jpg
cover: false
coverImg: https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/display_oled.jpg
top: false
summary: OLED12864是一个基于OLED技术的128X64的显示屏，通过IIC进行驱动，本文介绍了如何通过STM32来驱动OLED模块。
---

>现在开始使用普中的STM32进行研究学习了，STM32的使用方式与51单片机还是有许多的相似之处的，但是STM32的功能更强大，ADC，定时器，flash等等，先不多说了，开始进入主题：使用IIC操作OLED进行显示。

# 前言

&emsp;&emsp;OLED相信大家都不陌生，这个显示器现在很流行，我现在使用的OLED显示屏就是12864的IIC操作的OLED，为什么选择使用IIC的呢？因为足够简单。IIC大家都知道，他的协议就不多说了，不会的小伙伴可以自行百度哦。

&emsp;&emsp;我是用的是<font color=red>模拟IIC</font>，没有使用STM32的硬件IIC，传说STM32的硬件IIC是很大的BUG。具体我也不太清楚，反真是用模拟IIC操作起来也是一样的。

>以前发帖在电子芯巴克。原帖子链接：[点我跳转](https://bbs.icxbk.com/thread-100342-1-1.html)

# 原理图

&emsp;&emsp;在操作之前，需要先了解STM32的引脚排布，在硬件IO扣上并没有标注引脚号，所以需要查看原理图，这点很不友好，应该在每个IO口旁边编著上引脚号，方便操作，不然每次都要查看一下原理图：

![原理图](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/yuanlitu.png "原理图")

我选用的IIC驱动引脚是PB6和PB7。
<font color=red size=2>
+ PB6--SCL
+ PB7--SDA
</font>

# 初始化

## IIC引脚定义

``` C
//初始化IIC
void IIC_Init(void)
{                                             
        GPIO_InitTypeDef GPIO_InitStructure;
        //RCC->APB2ENR|=1<<4;//先使能外设IO PORTA时钟 
        RCC_APB2PeriphClockCmd(        RCC_APB2Periph_GPIOB, ENABLE );        
           
        GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6|GPIO_Pin_7;
        GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP ;   //推挽输出
        GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
        GPIO_Init(GPIOB, &GPIO_InitStructure);

        IIC_SCL=1;
        IIC_SDA=1;

}

/**
**  SDA输出
**/
void SDA_OUT(void)
{
    GPIO_InitTypeDef GPIO_InitStructer;
    GPIO_InitStructer.GPIO_Pin= GPIO_Pin_7;
    GPIO_InitStructer.GPIO_Speed=GPIO_Speed_50MHz;
    GPIO_InitStructer.GPIO_Mode=GPIO_Mode_Out_PP;
    GPIO_Init(GPIOB, &GPIO_InitStructer);
}


/**
**  SDA输入
**/
void SDA_IN(void)
{
    GPIO_InitTypeDef GPIO_InitStructer;
    GPIO_InitStructer.GPIO_Pin= GPIO_Pin_7;
    GPIO_InitStructer.GPIO_Speed=GPIO_Speed_50MHz;
    GPIO_InitStructer.GPIO_Mode=GPIO_Mode_IPU;
    GPIO_Init(GPIOB, &GPIO_InitStructer);
}
```

## OLED初始化

``` C
void OLED_Init(void)
{
        delay_ms(500);

        OLED_WrCmd(0xAE); //关闭显示
        OLED_WrCmd(0xD5); //设置时钟分频因子,震荡频率
        OLED_WrCmd(80);   //[3:0],分频因子;[7:4],震荡频率
        OLED_WrCmd(0xA8); //设置驱动路数
        OLED_WrCmd(0X3F); //默认0X3F(1/64) 
        OLED_WrCmd(0xD3); //设置显示偏移
        OLED_WrCmd(0X00); //默认为0

        OLED_WrCmd(0x40); //设置显示开始行 [5:0],行数.
                                                                                                            
        OLED_WrCmd(0x8D); //电荷泵设置
        OLED_WrCmd(0x14); //bit2，开启/关闭
        OLED_WrCmd(0x20); //设置内存地址模式
        OLED_WrCmd(0x02); //[1:0],00，列地址模式;01，行地址模式;10,页地址模式;默认10;
        OLED_WrCmd(0xA1); //段重定义设置,bit0:0,0->0;1,0->127;
        OLED_WrCmd(0xC0); //设置COM扫描方向;bit3:0,普通模式;1,重定义模式 COM[N-1]->COM0;N:驱动路数
        OLED_WrCmd(0xDA); //设置COM硬件引脚配置
        OLED_WrCmd(0x12); //[5:4]配置
                 
        OLED_WrCmd(0x81); //对比度设置
        OLED_WrCmd(0xEF); //1~255;默认0X7F (亮度设置,越大越亮)
        OLED_WrCmd(0xD9); //设置预充电周期
        OLED_WrCmd(0xf1); //[3:0],PHASE 1;[7:4],PHASE 2;
        OLED_WrCmd(0xDB); //设置VCOMH 电压倍率
        OLED_WrCmd(0x30); //[6:4] 000,0.65*vcc;001,0.77*vcc;011,0.83*vcc;

        OLED_WrCmd(0xA4); //全局显示开启;bit0:1,开启;0,关闭;(白屏/黑屏)
        OLED_WrCmd(0xA6); //设置显示方式;bit0:1,反相显示;0,正常显示                                                               
        OLED_WrCmd(0xAF); //开启显示         
}
```

&emsp;&emsp;上面只粘贴了部分程序：由于篇幅原因，代码我会上传附件。

# 字模提取

## 取模工具
&emsp;&emsp;下面说一说中文字模的提取吧，如果要显示汉字的话，需要用工具进行取模。
&emsp;&emsp;首先需要一个中文字模的提取软件，如果自己写字模的话，可是一件耗时的工程。

软件下载：[点我下载](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/OLED_Project.7z)


&emsp;&emsp;取模操作方式：<font color=blue size=2>取字方式 -- 共阴、逐列式、顺向输出</font>

## 软件使用

1、打开软件

&emsp;&emsp;如下图所示：

![打开软件](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/word_setting.png "打开软件")

2、选择取模方式

![选择取模方式](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/sample_method.png "选择取模方式")

3、生成汉字数组

![选择取模方式](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/generate_hanzi.png "选择取模方式")

》》最后将生成的代码复制到程序中就可以使用了

## 汉字显示程序

&emsp;&emsp;下面是显示汉字的程序。

``` C
//在指定位置显示一个汉字
//x:0~127
//y:0~63                         
//chr:汉字的索引
//mode:0,反白显示;1,正常显示        
void OLED_ShowHz(u8 x,u8 y,u8 chr,u8 mode)
{
        u8 temp,t,t1;
        u8 y0=y;
        u8 csize=32;                //得到字体一个字符对应点阵集所占的字节数
        chr=chr*2;//得到偏移后的值                 
    for(t=0;t<csize;t++)
    {   
                temp=Hz[chr][t];        
        for(t1=0;t1<8;t1++)
                {
                        if(temp&0x80)
                                OLED_DrawPoint(x,y,mode);
                        else OLED_DrawPoint(x,y,!mode);
                        temp<<=1;
                        y++;
                        if((y-y0)==16)
                        {
                                y=y0;
                                x++;
                                break;
                        }
                }           
    }                   
}
```

注意：汉字字库（也就是刚才使用汉字生成工具生成的数据）的名字就是Hz[][16]。

# 演示结果展示

![演示效果](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/generate_hanzi.png "演示效果")

# 附件

附上程序：[点我下载STM32 OLED驱动程序](https://cdn.jsdelivr.net/gh/hehung/cdn-jsDelivr-hehung-blog-sources/STM32-OLED/OLED_Project.7z)

