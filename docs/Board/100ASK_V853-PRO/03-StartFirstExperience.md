# 开发板启动初体验

在后面的操作里，都是通过串口与板子进行“交流”。串口是串行接口的简称，是指数据一位一位地顺序传送，其特点是通信线路简单。

## 1.上电启动开发板

如3.3所示连接一根12V电源线到电源接口位置，连接一根TypeC线到串口位置，电源接口用来供电，TypeC线为串口线，用来调试输出。连接成功后，需要将底板上的电源切换开关拨至靠近电源接口方向，此时核心板上的红色电源灯也会亮起，灯亮起表示设备已经可以正常通电工作。

![image-20230627113339987](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113339987.png)

<center>图 四.2 连接示意图</center>

## 2.使用串口工具登录系统

接好type-c usb数据线后，Windows会自动安装驱动(安装可能比较慢，等一分钟左右)。打开电脑的“设  备管理器”，在“端口(COM和LPT)”项下，可以看到如3.3中的“(COM13)”。开发板上的USB串口芯片可能是CP210x或CH9102，它们的性能是一样的。你电脑上显示的COM序号可能不一样，记住你电脑显示的数字。

![image-20230627113415107](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113415107.png)

<center>图 四.3 串口在设备管理器中的表示</center>

​		如果电脑没有显示出端口号，就需要手动安装驱动，从驱动精灵官网（[www.drivergenius.com](http://www.drivergenius.com)）下载一个驱动精灵，安装、运行、检测，会自动安装上串口驱动。

​		打开MobaXterm，点击左上角的“Session”，在弹出的界面选中“Serial”，如下图所示选择端口号（前面设备管理器显示的端口号COM13）、波特率（Speed 115200）、流控（Flow Control: none）,最后点击“OK”即可。步骤如图3.4所示。

注意：流控（Flow Control）一定要选择none，否则你将无法在MobaXterm中向串口输入数据。

![image-20230627113535098](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113535098.png)

<center>图 四.4 Mobaxterm设置串口</center>

随后显示一个黑色的窗口， 此时打开板子的电源开关，将收到板子串口发过来的数据，如图3.5所示。

![image-20230627113554675](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113554675.png) 	

<center>图 四.5 串口数据在Mobaxterm上的显示</center>

开发板默认登录名是root，无需密码。

开发板如图3.6所示启动后，按下回车即可进入命令行模式。

![image-20230627113626752](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113626752.png)

<center>图 四.6 开发板登录界面图</center>

进入命令行后，就可以执行各种Linux命令了，如图3.7所示：

![image-20230627113646895](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113646895.png)

<center>图 四.7通过串口在开发板上体验Linux命令</center>

## 3.通过adb传输文件

adb命令全称Android Debug Bridge，起到调试桥的作用，是一个客户端-服务器端程序。其中客户端是用来操作的电脑，服务端是Android设备。   ADB也是Android SDK中的一个工具，可以直接操作管理Android模拟器或者真实的Android设备或开发板。我们可以通过adb命令将Ubuntu的文件传输到开发板上运行。

 我们需要将开发板的两根typeC线一端连接至开发板，另一端连接至电脑USB接口，这样才可以使用ADB命令，如下图所示，主要是 蓝色标号17 的线。

![image-20230627113730801](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113730801.png)

打开Ubuntu虚拟机，接入OTG线，如图3.所示，虚拟机会弹出检测到新的USB设备Google Tina ADB，点击“连接到虚拟机”，选择虚拟机的名称“100ASK_V853_ubuntu_18.04_x64”,最后点击确定即可。

![image-20230627113739717](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113739717.png)

<center>图 四.8通过OTG连接虚拟机</center>

 

打开终端输入adb devices，检查是否连接成功，成功后即可使用adb命令将文件传输至开发板。

![image-20230627113807732](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113807732.png)

图 四.9检测OTG链接虚拟机



示例：

将test1.txt文件传输至V853开发板。

可使用

```
adb push test1.txt /root/
```

传输成功后可在MobaXterm软件中查看。过程如图3.9所示。

Ubuntu终端：

![image-20230627113828720](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113828720.png)

开发板shell终端：

![image-20230627113836660](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627113836660.png)

图3.9 adb命令文件传输过程



## 4.测试RJ45联网

测试RJ45有线网卡，我们需要准备一个网线，一个可以上网并且支持dhcp分配网络功能的路由器，首先我们先将网线一端连接至 如下图标号 7 的网口位置，另一端连接至路由器的 LAN 接口。

![image-20230627114003341](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627114003341.png)

连接完成后，可以进入开发板系统，输入ifconfig eth0 up使能网口，执行 udhcpc -i eth0 命令 就会自动获取到IP地址，获取到 IP 地址 可以使用 ifconfig 查看,并尝试ping通百问网验证网络通信，使用Crtl+C结束测试。

注意： # 后面 才是操作命令。 

```
root@TinaLinux:/# ifconfig eth0 up
[  452.569557] libphy: gmac0: probed
[  452.619408] sunxi-gmac gmac0 eth0: eth0: Type(6) PHY ID 001cc816 at 0 IRQ poll (gmac0-0:00)
[  452.639897] IPv6: ADDRCONF(NETDEV_UP): eth0: link is not ready
root@TinaLinux:/# udhcpc -i eth0
udhcpc: started, v1.27.2
udhcpc: sending discover
udhcpc: sending select for 192.168.1.16
udhcpc: lease of 192.168.1.16 obtained, lease time 86400
udhcpc: ifconfig eth0 192.168.1.16 netmask 255.255.255.0 broadcast +
udhcpc: setting default routers: 192.168.1.1
root@TinaLinux:/# ifconfig
eth0      Link encap:Ethernet  HWaddr C6:C1:06:76:89:BE
          inet addr:192.168.1.16  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::c4c1:6ff:fe76:89be/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:35 errors:0 dropped:0 overruns:0 frame:0
          TX packets:13 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:4670 (4.5 KiB)  TX bytes:2086 (2.0 KiB)
          Interrupt:58

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
root@TinaLinux:/# ping www.100ask.net
PING www.100ask.net (118.25.119.100): 56 data bytes
64 bytes from 118.25.119.100: seq=0 ttl=52 time=33.588 ms
64 bytes from 118.25.119.100: seq=1 ttl=52 time=34.009 ms
64 bytes from 118.25.119.100: seq=2 ttl=52 time=43.339 ms
^C
--- www.100ask.net ping statistics ---
6 packets transmitted, 6 packets received, 0% packet loss
round-trip min/avg/max = 33.170/35.178/43.339 ms
```

## 5.测试WiFi联网

如下图所示，WIFI芯片是XR829模组，标号为23，其中蓝色标号24 是 ANT 天线座子，默认情况下已经帮您装好，确认天线连接好以后，请进入串口终端下，执行如下命令进行操作。

注意：XR829 WIFI只支持2.4Ghz频率路由器，并不支持5Ghz频率路由器。

![image-20230627114052002](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627114052002.png)

注意： # 后面 才是操作命令。

第一步：执行ifconfig wlan0 up，再执行wifi -s，进行扫描WiFi，注意扫描的WiFi必须为2.4Ghz频率的

```
root@TinaLinux:~# ifconfig wlan0 up

root@TinaLinux:~# wifi -s
```

 第二步：执行 wifi -c ssid [passwd]建立网络连接，其中ssid为WIFI的名称， [passwd]为WIFI的密码。

```
root@TinaLinux:~# wifi -c Programmers 123456
```

连接正确后会自动执行udhcpc获取ip地址

 第三步：执行 iw wlan0 link来查看连接状态，如下所示，表示已经连接到路由器。

```
root@TinaLinux:~# iw wlan0 link
Connected to 94:d9:b3:b7:c9:0a (on wlan0)
        SSID: Programmers
        freq: 2442
        RX: 755675 bytes (4331 packets)
        TX: 2330 bytes (19 packets)
        signal: -25 dBm
        tx bitrate: 120.0 MBit/s MCS 5 40MHz short GI

        bss flags:      short-preamble short-slot-time
        dtim period:    1
        beacon int:				     100

```

第五步：最后就可以使用 ping -I wlan0 www.100ask.net 来验证网络通信。

```
root@TinaLinux:~# ping -I wlan0 www.100ask.net
PING www.100ask.net (118.25.119.100): 56 data bytes
64 bytes from 118.25.119.100: seq=0 ttl=51 time=35.777 ms
64 bytes from 118.25.119.100: seq=1 ttl=51 time=50.659 ms
64 bytes from 118.25.119.100: seq=2 ttl=51 time=44.681 ms
^C
--- www.100ask.net ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 35.777/43.705/50.659 ms
```

## 6.测试usb功能

如下图所示，开发板板载4个TypeA USB接口，可以连接USB 2.0设备，可以使用U盘等设备连接至开发板进行测试。

**注意：**测试前需要断开OTG口的Type-C线的连接，以防止与USB设备产生冲突

![image-20230627114221450](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627114221450.png)

输入cat /sys/devices/platform/soc/usbc0/usb_host切换系统为Host模式。

接下来 使用U盘插入 标号为 5或6的 USB接口，此时 开发板 终端会有如下提示，当然您也可以执行lsusb在插拔USB设备前后进行对比。

```
root@TinaLinux:/# cat /sys/devices/platform/soc/usbc0/usb_host
[   46.045421]
[   46.045421] insmod_host_driver
[   46.045421]
[   46.052167] [ehci0-controller]: sunxi_usb_enable_ehci
[   46.057937] [sunxi-ehci0]: probe, pdev->name: 4101000.ehci0-controller, sunxi_ehci: 0xc0a7d548, 0x:e0848000, irq_no:137
[   46.070612] sunxi-ehci 4101000.ehci0-controller: SW USB2.0 'Enhanced' Host Controller (EHCI) Driver
[   46.081176] sunxi-ehci 4101000.ehci0-controller: new USB bus registered, assigned bus number 1
[   46.091238] sunxi-ehci 4101000.ehci0-controller: irq 311, io mem 0xc0a00000
[   46.125502] sunxi-ehci 4101000.ehci0-controller: USB 0.0 started, EHCI 1.00
[   46.134492] hub 1-0:1.0: USB hub found
[   46.138939] hub 1-0:1.0: 1 port detected
[   46.143975] [ohci0-controller]: sunxi_usb_enable_ohci
[   46.149713] [sunxi-ohci0]: probe, pdev->name: 4101000.ohci0-controller, sunxi_ohci: 0xc0a7d76c
[   46.159716] sunxi-ehci 4101000.ehci0-controller: ehci_irq: highspeed device connect
[   46.168748] sunxi-ohci 4101000.ohci0-controller: SW USB2.0 'Open' Host Controller (OHCI) Driver
[   46.178753] sunxi-ohci 4101000.ohci0-controller: new USB bus registered, assigned bus number 2
[   46.188518] sunxi-ohci 4101000.ohci0-controller: irq 312, io mem 0x00000000
[   46.270548] hub 2-0:1.0: USB hub found
[   46.274964] hub 2-0:1.0: 1 port detected
host_chose finished!
[   49.945431] usb 2-1: new full-speed USB device number 2 using sunxi-ohci
[   50.168452] usb 2-1: not running at top speed; connect to a high speed hub
[   50.185855] hub 2-1:1.0: USB hub found
[   50.191467] hub 2-1:1.0: 4 ports detected
root@TinaLinux:/# lsusb
Bus 002 Device 002: ID 05e3:0608
Bus 001 Device 001: ID 1d6b:0002
Bus 002 Device 001: ID 1d6b:0001
[  147.985422] usb 2-1.2: new full-speed USB device number 3 using sunxi-ohci
[  148.152449] usb 2-1.2: not running at top speed; connect to a high speed hub
[  148.173819] usb-storage 2-1.2:1.0: USB Mass Storage device detected
[  148.181455] scsi host0: usb-storage 2-1.2:1.0
[  150.225528] scsi 0:0:0:0: Direct-Access              SD Card Reader   1.00 PQ: 0 ANSI: 6
[  150.244497] sd 0:0:0:0: [sda] 62333952 512-byte logical blocks: (31.9 GB/29.7 GiB)
[  150.257497] sd 0:0:0:0: [sda] Write Protect is off
[  150.262885] sd 0:0:0:0: [sda] Mode Sense: 03 00 00 00
[  150.273483] sd 0:0:0:0: [sda] No Caching mode page found
[  150.279765] sd 0:0:0:0: [sda] Assuming drive cache: write through
[  150.382513]  sda: sda1
[  150.410487] sd 0:0:0:0: [sda] Attached SCSI removable disk

root@TinaLinux:/# lsusb
Bus 002 Device 003: ID 067b:2731
Bus 002 Device 002: ID 05e3:0608
Bus 001 Device 001: ID 1d6b:0002
Bus 002 Device 001: ID 1d6b:0001
```

## 7. 测试LCD显示功能

测试LCD显示功能需要连接 屏幕模块，我们目前只支持 7寸 RGB屏幕和4寸MIPI屏，此次测试只使用7寸 RGB屏幕，这个屏幕和我们的NXP 6ull ST157 是同一款，如果没有准备 则不能测试。

连接前需要保证开发板处于**断电状态**，将屏幕排线一段连接至屏幕，另一端排线连接至开发板，注意我们的排线都是下压链接，也就是排线有针脚那面朝下。

![image-20230627114342987](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627114342987.png)

连接成功后，可以启动开发板，输入lv_examples 1，同时也可以通过触摸屏幕进行测试。

```
root@TinaLinux:/# lv_examples 1
wh=1024x600, vwh=1024x1200, bpp=32, rotated=0
Turn on double buffering.
Turn on 2d hardware acceleration.
Turn on 2d hardware acceleration rotate.
```

## 8.测试camera摄像功能

注意下面方法为老版本测试，新版本可访问：https://forums.100ask.net/t/topic/3560

测试camera摄像功能需要连接MIPI摄像头模块，我们目前只支持GC2053摄像头模块，此摄像头可以在百问网官方店铺购买，如果没有此类型的摄像头模块则不能测试。

连接前需要保证开发板处于**断电状态**，将屏幕排线一段连接至摄像头模块，另一端排线连接至开发板，注意我们的排线都是下压链接，也就是排线有针脚那面朝下。注意连接时的排线线序是否正确。

![image-20230627114422169](http://photos.100ask.net/allwinner-docs/v853/Basic/image-20230627114422169.png)

连接成功后，可以启动开发板，启动完成后，输入camerademo NV21 1920 1088 30 bmp /tmp 5拍摄五张照片，照片放在/tmp目录下，可以通过U盘或TF卡的形式传到电脑端查看。

```
root@TinaLinux:/# camerademo NV21 1920 1088 30 bmp /tmp 
[CAMERA]**********************************************************
[CAMERA]*                                                        *
[CAMERA]*              this is camera test.                      *
[CAMERA]*                                                        *
[CAMERA]**********************************************************
[CAMERA]**********************************************************
[CAMERA] open /dev/video0!
[CAMERA]**********************************************************
[CAMERA]**********************************************************
[CAMERA] The path to data saving is /tmp.
[CAMERA] The number of captured photos is 5.
[CAMERA] save bmp format
[CAMERA]**********************************************************
[CAMERA] Using format parameters NV21.
[CAMERA] camera pixelformat: NV21
[CAMERA] Resolution size : 1920 * 1088
[CAMERA] The photo save path is /tmp.
[CAMERA] The number of photos taken is 5.
begin ion_alloc_open
pid: 1143, g_alloc_context = 0x2ecd0
[CAMERA] Camera capture framerate is 20/1
[CAMERA] VIDIOC_S_FMT succeed
[CAMERA] fmt.type = 9
[CAMERA] fmt.fmt.pix_mp.width = 1920
[CAMERA] fmt.fmt.pix_mp.height = 1088
[CAMERA] fmt.fmt.pix_mp.pixelformat = NV21
[CAMERA] fmt.fmt.pix_mp.field = 1
[CAMERA] stream on succeed
[CAMERA] camera0 capture num is [0]
[CAMERA_PROMPT] the time interval from the start to the first frame is 179 ms
[CAMERA] camera0 capture num is [1]
[CAMERA] camera0 capture num is [2]
[CAMERA] camera0 capture num is [3]
[CAMERA] camera0 capture num is [4]
[CAMERA] Capture thread finish
[CAMERA] close /dev/video0
ion_alloc_close
pid: 1143, release g_alloc_context = 0x2ecd0
root@TinaLinux:/# ls /tmp/
UNIX_WIFI.domain  bmp_NV21_3.bmp    lib               wpa_ctrl_1055-1
bmp_NV21_1.bmp    bmp_NV21_4.bmp    lock              wpa_ctrl_1055-2
bmp_NV21_2.bmp    bmp_NV21_5.bmp    run
```

上述的bmp_NV21_1.bmp、bmp_NV21_2.bmp、bmp_NV21_3.bmp、bmp_NV21_4.bmp、bmp_NV21_5.bmp即为刚刚所拍摄的五张照片。

 