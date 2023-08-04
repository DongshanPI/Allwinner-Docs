# 快速开始使用
## 上电启动 登录系统

###  使用串口登录

#### 1.连接串口线

如下图所示，我们需要先使用配套的12V DC电源适配器连接左侧蓝框内`DC供电接口`，此时开发板的红色接口位置 拨动开关拨到左侧，可以给开发板用来供电，供电成功后，核心板上的绿色灯会亮起，此时我们使用一根TypeC线连接至下图右下角所示 蓝框 `Debug接口`将TypeC线一端连接至 板子，另一端连接至电脑 USB2.0接口。

![image-20230215173821475](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230215173821475.png)


#### 2.安装串口驱动程序

连接成功串口type-c 数据线后，Windows会自动安装驱动(安装可能比较慢，等一分钟左右)。

此时可以打开电脑的**设备管理器**，在**端口(COM和LPT)**项下，可以看到下图的(**COM13**)端口号。开发板上的USB串口芯片可能是CP210x或CH9102，它们的性能是一样的。你电脑上显示的COM序号可能不一样，记住你电脑显示的数字。

![image-20230215172832148](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230215172832148.png)

如果电脑没有显示出端口号，就需要手动安装驱动，从驱动精灵官网（[www.drivergenius.com](http://www.drivergenius.com)）下载一个驱动精灵，安装、运行、检测，会自动安装上串口驱动。

#### 3.运行串口工具

串口工具有很多种，这里我们推荐使用Putty或者MobaXterm等串口工具来登录开发板。

* putty工具可以访问页面 https://www.chiark.greenend.org.uk/~sgtatham/putty/ 来获取。

* MobaXterm可以通过访问页面 https://mobaxterm.mobatek.net/ 获取 (推荐使用)。

**使用putty登录串口**

如下图所示，打开软件主界面参考下图红框序号所示，依次 **点击1** 切换到 Serial(串行设备) 界面，之后点击**红框2**输入上一步骤在电脑设备管理器内获取到的 端口号，在后面的**红框 Speed**波特率速率里面输入 `115200`,基本配置完成后，需要切换配置一下 流控设置，点击软件 左侧 蓝框内 **Serial**按钮，切换到 串行设备配置界面，切换成功后，参考下图**红框3** 选择`Flow control `流控项为`None`，最后点击**红框4** Open即可打开开发板对应的串口设备，此时 可以按下 键盘 enter回车 按键  输入 ls 看到系统的目录信息。

![image-20230215175047283](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230215175047283.png)


**使用Mobaxterm登录串口**

打开MobaXterm，点击左上角的`Session`，在弹出的界面选中`Serial`，如下图所示选择端口号（前面设备管理器显示的端口号COM13）、波特率（Speed 115200）、流控（Flow Control: none）,最后点击`OK`即可。步骤如下图所示。 **注意：流控（Flow Control）一定要选择none，否则你将无法在MobaXterm中向串口输入数据**

[![Mobaxterm_serial_set_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Mobaxterm_serial_set_001.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Mobaxterm_serial_set_001.png)

随后显示一个黑色的窗口， 此时打开板子的电源开关，将收到板子串口发过来的数据,如下步骤所示

![image-20230216105452371](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216105452371.png)

#### 4.进入shell

看到上述图片显示的信息后，按下键盘上的 enter 键 即可进入 T113 开发板Linux系统的Shell交互界面。

![image-20230216105514693](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216105514693.png)

### 使用adb登录

#### 1.连接OTG线

​	将开发板配套的两根typec线，一根 直接连接至 开发板 下图红框所示 OTG 位置， 另一头连接至电脑的USB接口，开发板的 拨动开关拨至**右侧** (往OTG口方向),因OTG也可以给整个板子供电，所以此时可以不用接12V DC接口， 系统就会自己启动。

![image-20230216105837566](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216105837566.png)

等待10秒左右，此时你的电脑设备管理器会在 `Android Phone`下多出一项 `Android ADB Interface`设备，这个设备就是T113开发板通过OTG接口模拟出来的 ADB设备，可以通过它来进行登录系统，传输文件等操作。

![image-20230216110202316](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216110202316.png)

**注意：如果没有出现可能是电脑默认没有相关驱动，请使用驱动精灵等工具自动安装。**



#### 2.安装windows板ADB

既然有了ADB设备，那么我们需要在Windows下安装adb工具才可以和T113-PRo开发板交互，点击链接 https://gitlab.com/dongshanpi/tools/-/raw/main/ADB.7z 下载Windows版ADB工具下载完成后解压，可以看到如下目录。

[![adb-tools-dir](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-dir.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-dir.png)

然后 我们单独 拷贝 上一层的 **platform-tools** 文件夹到任意 目录，拷贝完成后，记住这个 目录位置，我们接下来要把这个 路径添加至 Windows系统环境变量里。

[![adb-tools-dir](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-dir-001.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-dir-001.png)

我这里是把它单独拷贝到了 D盘，我的目录是 `D:\platform-tools` 接下来 我需要把它单独添加到Windows系统环境变量里面才可以在任意位置使用adb命令。

[![adb-tools-windows_config_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_001.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_001.png)

添加到 Windows系统环境变量里面 [![adb-tools-windows_config_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_002.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_002.png)

#### 3.打开cmd连接开发板

打开CMD Windows 命令提示符方式有两种
方式1：直接在Windows10/11搜索对话框中输入 cmd 在弹出的软件中点击 `命令提示符`
方式2：同时按下 wind + r 键，输入 cmd 命令，按下确认 就可以自动打开 `命令提示符`

[![adb-tools-windows_config_003](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_003.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_003.png)

打开命令提示符，输出 adb命令可以直接看到我们的adb已经配置成功

[![adb-tools-windows_config_004](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_004.png)](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/adb-tools-windows_config_004.png)

连接好开发板的 OTG 并将其连接至电脑上，然后 输入 adb shell就可以自动登录系统



#### 4.adb登录

如下所示，在Windows 终端内输入 adb shell即可自动登录进入开发板系统内。

![image-20230216111155418](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216111155418.png)

ADB 也可以作为文件传输使用，例如：

```
C:\System> adb push badapple.mp4 /mnt/UDISK   # 将 badapple.mp4 上传到开发板 /mnt/UDISK 目录内
C:\System> adb pull /mnt/UDISK/badapple.mp4   # 将 /mnt/UDISK/badapple.mp4 下拉到当前目录内
```

**注意： 此方法目前只适用于 使用全志Tina-SDK 构建出来的系统。**
