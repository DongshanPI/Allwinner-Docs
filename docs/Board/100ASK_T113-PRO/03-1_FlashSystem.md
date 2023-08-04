# 更新开发系统

## 更新烧录TF卡系统

**注意：T113的TF卡启动优先级高于板载SPI NAND，如果您需要使用SPI NAND系统启动，就需要先把TF卡拔掉。**

* 准备工作

  - 硬件： 100ASK_T113-PRO主板 x1

  - 硬件：USB Type-C线 x2

  - 硬件：TF卡读卡器 x1

  - 硬件：8GB以上的 Micro TF卡 x1

  - 软件：Tina系统TF卡烧录工具: [PhoenixCard-V2.8](https://gitlab.com/dongshanpi/tools/-/raw/main/PhoenixCard-V2.8.zip)

  - 软件：SDcard格式化工具：[SDCardFormatter5](https://gitlab.com/dongshanpi/tools/-/raw/main/SDCardFormatter5.0.1Setup.exe)

  - 软件：TinaTF卡最小系统镜像：[tina_t113-100ask_uart3](https://gitlab.com/dongshanpi/tools/-/raw/main/tina_t113-100ask_uart3.zip)



#### 1. 运行烧写软件烧写

首先需要下载 **win32diskimage SDcard专用格式化** 这两个烧写TF卡的工具，然后获取到TF卡系统镜像文件**tina_t113-100ask_uart3.zip**，获取到以后，先安装 **SDcard专用格式化 SDCardFormatter5** 这个工具，同时可以解压 一下TF卡系统的镜像文件 **tina_t113-100ask_uart3.zip**，可以得到一个 **tina_t113-100ask_uart3.img**文件，这个文件就是我们要烧写的镜像。 同时解压缩  Tina系统TF卡烧录工具  **PhoenixCard-V2.8**，解压完成后，进入到烧写工具目录内，双击运行 `PhoenixCard.exe`烧录工具。

步骤一： 将TF卡插进读卡器内，同时将读卡器插到电脑USB接口，使用SD CatFormat格式化TF卡，注意备份卡内数据。参考下图所示，点击刷新找到TF卡，然后点击 Format 在弹出的 对话框 点击 **是(Yes)**等待格式完成即可。




![](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/SDCardFormat_001.png)





步骤二：格式化完成后，使用**PhoenixCard.exe**工具来烧录镜像，参考下图步骤，找到自己的TF卡盘符，点击 `左上角红框1` 固件，选择已经解压过的 `tina_t113-100ask_uart3.img` 镜像，然后点击 `红框2 启动卡`，最后点击`红框3 烧录` 等待烧录完成即可。

![image-20230216162130989](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216162130989.png)

如下图为烧录成功示意图。

![PhoenixCard_Config_002](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/d1s/PhoenixCard_Config_002.png)

烧录完成以后，就可以弹出TF卡，并将其插到开发板。



#### 2. TF卡接入开发板

​	参考下图所示，将烧写好固件的TF卡从电脑中弹出，然后插入下图左侧红框 **TF卡卡槽** 位置，之后按下 右侧红框 **系统硬件复位** 按钮，开发板会自动从烧写好镜像的TF卡内启动。

![image-20230216164700325](http://photos.100ask.net/allwinner-docs/t113-s3/basic/image-20230216164700325.png)



#### 2. 启动系统

如下为TF卡系统启动信息，可以使用串口工具打开此串口，之后重启开发板即可查看完整的TF卡启动logs。

```
[30]HELLO! BOOT0 is starting!
[33]BOOT0 commit : 88480af-dirty
[36]set pll start
[42]periph0 has been enabled
[45]set pll end
[46][pmu]: bus read error
[49]board init ok
[50]ZQ value = 0x30
[52]get_pmu_exist() = -1
[55]ddr_efuse_type: 0xa
[57]trefi:7.8ms
[59][AUTO DEBUG] single rank and full DQ!
[63]ddr_efuse_type: 0xa
[66]trefi:7.8ms
[68][AUTO DEBUG] rank 0 row = 13
[71][AUTO DEBUG] rank 0 bank = 8
[74][AUTO DEBUG] rank 0 page size = 2 KB
[78]DRAM BOOT DRIVE INFO: V0.33
[81]DRAM CLK = 936 MHz
[83]DRAM Type = 3 (2:DDR2,3:DDR3)
[87]DRAMC read ODT  off.
[89]DRAM ODT value: 0x42.
[92]ddr_efuse_type: 0xa
[95]DRAM SIZE =128 M
[97]dram_tpr4:0x0
[98]PLL_DDR_CTRL_REG:0xf8004d00
[101]DRAM_CLK_REG:0xc0000000
[104][TIMING DEBUG] MR2= 0x20
[112]DRAM simple test OK.
[114]rtc standby flag is 0x0, super standby flag is 0x0
[119]dram size =128
[122]card no is 0
[123]sdcard 0 line count 4
[126][mmc]: mmc driver ver 2021-05-21 14:47
[135][mmc]: Wrong media type 0x0
[138][mmc]: ***Try SD card 0***
[157][mmc]: HSSDR52/SDR25 4 bit
[160][mmc]: 50000000 Hz
[162][mmc]: 30436 MB
[164][mmc]: ***SD/MMC 0 init OK!!!***
[239]Loading boot-pkg Succeed(index=0).
[242]Entry_name        = u-boot
[248]Entry_name        = optee
[252]Entry_name        = dtb
[255]mmc not para
[256]Jump to second Boot.
M/TC: OP-TEE version: 6aef7bb2-dirty (gcc version 5.3.1 20160412 (Linaro GCC 5.3-2016.05)) #1 Fri Jul 23 09:25:11 UTC 2021 arm


U-Boot 2018.05-g24521d6-dirty (Feb 07 2023 - 01:44:41 -0500) Allwinner Technology

[00.310]CPU:   Allwinner Family
[00.313]Model: sun8iw20
I2C:   FDT ERROR:fdt_set_all_pin:[twi0]-->FDT_ERR_BADPATH
FDT ERROR:fdt_set_all_pin:[twi1]-->FDT_ERR_BADPATH
ready
[00.334]DRAM:  128 MiB
[00.337]Relocation Offset is: 04f01000
[00.356]secure enable bit: 0
[00.359]smc_tee_inform_fdt failed with: -65526[00.364]CPU=1008 MHz,PLL6=600 Mhz,AHB=200 Mhz, APB1=100Mhz  MBus=300Mhz
[00.370]gic: sec monitor mode
[00.373]flash init start
[00.375]workmode = 0,storage type = 1
[00.378][mmc]: mmc driver ver uboot2018:2021-11-19 15:38:00
[00.384][mmc]: get sdc_type fail and use default host:tm1.
[00.390][mmc]: can't find node "mmc0",will add new node
[00.395][mmc]: fdt err returned <no error>
[00.398][mmc]: Using default timing para
[00.402][mmc]: SUNXI SDMMC Controller Version:0x50310
[00.428][mmc]: card_caps:0x3000000a
[00.431][mmc]: host_caps:0x3000003f
[00.436]sunxi flash init ok
[00.446]Loading Environment from SUNXI_FLASH... OK
[00.478]Item0 (Map) magic is bad
[00.481]the secure storage item0 copy0 magic is bad
[00.499]Item0 (Map) magic is bad
[00.502]the secure storage item0 copy1 magic is bad
[00.506]Item0 (Map) magic is bad
secure storage read widevine fail
[00.512]secure storage read widevine fail with:-1
secure storage read ec_key fail
[00.520]secure storage read ec_key fail with:-1
secure storage read ec_cert1 fail
[00.527]secure storage read ec_cert1 fail with:-1
secure storage read ec_cert2 fail
[00.534]secure storage read ec_cert2 fail with:-1
secure storage read ec_cert3 fail
[00.542]secure storage read ec_cert3 fail with:-1
secure storage read rsa_key fail
[00.549]secure storage read rsa_key fail with:-1
secure storage read rsa_cert1 fail
[00.557]secure storage read rsa_cert1 fail with:-1
secure storage read rsa_cert2 fail
[00.564]secure storage read rsa_cert2 fail with:-1
secure storage read rsa_cert3 fail
[00.572]secure storage read rsa_cert3 fail with:-1
[00.576]usb burn from boot
delay time 0
weak:otg_phy_config
[00.587]usb prepare ok
[00.754]usb sof ok
[00.756]usb probe ok
[00.757]usb setup ok
set address 0x11
set address 0x11 ok
set address 0xf
set address 0xf ok
try to update
[03.762]do_burn_from_boot usb : have no handshake
root_partition is rootfs
set root to /dev/mmcblk0p5
[03.773]update part info
[03.776]update bootcmd
[03.779]change working_fdt 0x43ec0e70 to 0x43ea0e70
disable nand error: FDT_ERR_BADPATH
[03.801]update dts
Hit any key to stop autoboot:  0
[04.972]no vendor_boot partition is found
Android's image name: t113-100ask
[04.982]Starting kernel ...

[04.985][mmc]: MMC Device 2 not found
[04.988][mmc]: mmc 2 not find, so not exit
[    0.000000] Booting Linux on physical CPU 0x0
[    0.000000] Linux version 5.4.61 (book@ubuntu1804) (arm-openwrt-linux-muslgnueabi-gcc.bin (OpenWrt/Linaro GCC 6.4-2017.11 2017-11) 6.4.1, GNU ld (GNU Binutils) 2.27) #25 SMP PREEMPT Thu Feb 16 08:03:58 UTC 2023
[    0.000000] CPU: ARMv7 Processor [410fc075] revision 5 (ARMv7), cr=10c5387d
[    0.000000] CPU: div instructions available: patching division code
[    0.000000] CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
[    0.000000] OF: fdt: Machine model: sun8iw20
[    0.000000] printk: bootconsole [earlycon0] enabled
[    0.000000] Memory policy: Data cache writealloc
[    0.000000] cma: Reserved 8 MiB at 0x47800000
[    0.000000] On node 0 totalpages: 32768
[    0.000000]   Normal zone: 256 pages used for memmap
[    0.000000]   Normal zone: 0 pages reserved
[    0.000000]   Normal zone: 32768 pages, LIFO batch:7
[    0.000000] psci: probing for conduit method from DT.
[    0.000000] psci: PSCIv1.0 detected in firmware.
[    0.000000] psci: Using standard PSCI v0.2 function IDs
[    0.000000] psci: MIGRATE_INFO_TYPE not supported.
[    0.000000] psci: SMC Calling Convention v1.0
[    0.000000] percpu: Embedded 15 pages/cpu s30348 r8192 d22900 u61440
[    0.000000] pcpu-alloc: s30348 r8192 d22900 u61440 alloc=15*4096
[    0.000000] pcpu-alloc: [0] 0 [0] 1
[    0.000000] Built 1 zonelists, mobility grouping on.  Total pages: 32512
[    0.000000] Kernel command line: earlyprintk=sunxi-uart,0x02500C00 clk_ignore_unused initcall_debug=0 console=ttyS3,115200 loglevel=8 root=/dev/mmcblk0p5 init=/pseudo_init partitions=boot-resource@mmcblk0p1:env@mmcblk0p2:env-redund@mmcblk0p3:boot@mmcblk0p4:rootfs@mmcblk0p5:private@mmcblk0p6:rootfs_data@mmcblk0p7:UDISK@mmcblk0p8 cma=8M snum= mac_addr= wifi_mac= bt_mac= specialstr= gpt=1 androidboot.mode=normal androidboot.hardware=sun8iw20p1 boot_type=1 androidboot.boot_type=1 gpt=1 uboot_message=2018.05-g24521d6-dirty(02/07/2023-01:44:41) androidboot.dramsize=128
[    0.000000] Dentry cache hash table entries: 16384 (order: 4, 65536 bytes, linear)
[    0.000000] Inode-cache hash table entries: 8192 (order: 3, 32768 bytes, linear)
[    0.000000] mem auto-init: stack:off, heap alloc:off, heap free:off
[    0.000000] Memory: 108612K/131072K available (6144K kernel code, 264K rwdata, 1504K rodata, 1024K init, 1164K bss, 14268K reserved, 8192K cma-reserved)
[    0.000000] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=2, Nodes=1
[    0.000000] rcu: Preemptible hierarchical RCU implementation.
[    0.000000]  Tasks RCU enabled.
[    0.000000] rcu: RCU calculated value of scheduler-enlistment delay is 10 jiffies.
[    0.000000] NR_IRQS: 16, nr_irqs: 16, preallocated irqs: 16
[    0.000000] random: get_random_bytes called from start_kernel+0x264/0x3e8 with crng_init=0
[    0.000000] arch_timer: cp15 timer(s) running at 24.00MHz (phys).
[    0.000000] clocksource: arch_sys_counter: mask: 0xffffffffffffff max_cycles: 0x588fe9dc0, max_idle_ns: 440795202592 ns
[    0.000006] sched_clock: 56 bits at 24MHz, resolution 41ns, wraps every 4398046511097ns
[    0.008007] Switching to timer-based delay loop, resolution 41ns
[    0.014185] clocksource: timer: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 79635851949 ns
[    0.023890] Calibrating delay loop (skipped), value calculated using timer frequency.. 48.00 BogoMIPS (lpj=240000)
[    0.034238] pid_max: default: 32768 minimum: 301
[    0.038979] Mount-cache hash table entries: 1024 (order: 0, 4096 bytes, linear)
[    0.046309] Mountpoint-cache hash table entries: 1024 (order: 0, 4096 bytes, linear)
[    0.054640] CPU: Testing write buffer coherency: ok
[    0.059838] /cpus/cpu@0 missing clock-frequency property
[    0.065162] /cpus/cpu@1 missing clock-frequency property
[    0.070501] CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
[    0.076658] Setting up static identity map for 0x40100000 - 0x40100060
[    0.083320] rcu: Hierarchical SRCU implementation.
[    0.088524] smp: Bringing up secondary CPUs ...
[    0.094150] CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
[    0.094268] smp: Brought up 1 node, 2 CPUs
[    0.104090] SMP: Total of 2 processors activated (96.00 BogoMIPS).
[    0.110267] CPU: All CPU(s) started in SVC mode.
[    0.115344] devtmpfs: initialized
[    0.129556] VFP support v0.3: implementor 41 architecture 2 part 30 variant 7 rev 5
[    0.137664] clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 19112604462750000 ns
[    0.147537] futex hash table entries: 512 (order: 3, 32768 bytes, linear)
[    0.154770] pinctrl core: initialized pinctrl subsystem
```



## 烧写固件至SPI NAND

**注意此方式烧录进的文件系统是ubifs文件系统，如果操作 需要网络文件系统挂载或者使用TF卡，不推荐使用。**

## 准备工作

1. 东山哪吒STU开发板主板 x1
2. 下载全志线刷工具AllwinnertechPhoeniSuit： https://gitlab.com/dongshanpi/tools/-/raw/main/AllwinnertechPhoeniSuit.zip
3. TypeC线 X2
4. 下载SPI NAND最小系统镜像：https://gitlab.com/dongshanpi/tools/-/raw/main/buildroot_linux_nand_uart3.zip
5. 下载全志USB烧录驱动：https://gitlab.com/dongshanpi/tools/-/raw/main/AllwinnerUSBFlashDeviceDriver.zip

## 连接开发板

* 参考下图所示，将两个TypeC线分别连至 开发板 串口接口 与 OTG烧写接口，另一端 连接至 电脑USB接口，连接成功后，可以将下载好的 烧写工具和 SPI NAND最小系统镜像解压缩 使用。

![T113-Pro_FlashSystem](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/100ask_t113_pro/T113-Pro_FlashSystem.png)



* 使用镊子或者杜邦线短接 核心板 SPI NAND FLASH  5-6脚，也就是 MOSI 与SCLK，短接的同时，可以按下 底板上的 RESET 按键，这个时候开发板会进入到FEL烧写模式，进入烧写模式后，我们就可以继续往下安装 专门的烧录驱动。

![T113-Pro_FlashSystem_002](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/100ask_t113_pro/T113-Pro_FlashSystem_002.png)


## 安装usb驱动

在我们连接好开发板以后，先按住 **FEL** 烧写模式按键，之后按一下 **RESET** 系统复位键，就可以自动进入烧写模式。

这时我们可以看到设备管理器  **通用串行总线控制器** 弹出一个  未知设备 ，这个时候我们就需要把我们提前下载好的 **全志USB烧录驱动** 进行修改，然后将解压缩过的 **全志USB烧录驱动**  压缩包，解压缩，可以看到里面有这么几个文件。

```bash
InstallUSBDrv.exe
drvinstaller_IA64.exe
drvinstaller_X86.exe
UsbDriver/          
drvinstaller_X64.exe   
install.bat
```

对于wind7系统的同学，只需要以管理员 打开   `install.bat` 脚本，等待安装，在弹出的 是否安装驱动的对话框里面，点击安装即可。

对于wind10/wind11系统的同学，需要在设备管理器里面进行手动安装驱动。

如下图所示，在第一次插入OTG设备，进入烧写模式设备管理器会弹出一个未知设备。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_001.png)

接下来鼠标右键点击这个未知设备，在弹出的对话框里， 点击浏览我计算机以查找驱动程序软件。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_002.png)

之后在弹出新的对话框里，点击浏览找到我们之前下载好的 usb烧录驱动文件夹内，找到 `UsbDriver/` 这个目录，并进入，之后点击确定即可。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_007.png)

注意进入到  `UsbDriver/`  文件夹，然后点击确定，如下图所示。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_003.png)

此时，我们继续点击 **下一页** 按钮，这时系统就会提示安装一个驱动程序。 
在弹出的对话框里，我们点击 始终安装此驱动程序软件 等待安装完成。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_004.png)

安装完成后，会提示，Windows已成功更新你的驱动程序。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_005.png)

最后我们可以看到，设备管理器 里面的未知设备 变成了一个 `USB Device(VID_1f3a_efe8)`的设备，这时就表明设备驱动已经安装成功。

![Windows_FlashDevice_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_006.png)


## 运行软件烧写

将下载下来的全志线刷工具 **AllwinnertechPhoeniSuit** 解压缩，同时将**SPI NAND最小系统镜像**下载下来也进行解压缩。

解压后，得到一个 **buildroot_linux_nand_uart3.img** 镜像，是用于烧录到SPI NAND镜像得。另一个是**AllwinnertechPhoeniSuit**文件夹。

首先我们进入到 **AllwinnertechPhoeniSuit\AllwinnertechPhoeniSuitRelease20201225** 目录下 找到 **PhoenixSuit.exe** 双击运行。

打开软件后 软件主界面如下图所示

![PhoenixSuit_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_001.png)


​	接下来 我们需要切换到 **一键刷机**窗口，如下图所示，点击红框标号1，在弹出的新窗口内，我们点击 红框2 **浏览** 找到我们刚才解压过的 SPI NAND 最小系统镜像  **buildroot_linux_nand_uart3.img**，选中镜像后，点击红框3 **全盘擦除升级** ，最后点击红框4  **立即升级**。

​	点击完成后，不需要理会 弹出的信息，这时 我们拿起已经连接好的开发板，先按住 **FEL** 烧写模式按键，之后按一下 **RESET** 系统复位键，就可以自动进入烧写模式并开始烧写。

![PhoenixSuit_002](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_002.png)


​	烧写时会提示烧写进度条，烧写完成后 开发板会自己重启。

![PhoenixSuit_003](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_003.png)


## 启动系统

一般情况下，烧写成功后 都会自动重启 启动系统，此时我们进入到 串口终端，可以看到它的启动信息，等所有启动信息加载完成，输入 root 用户名即可登录烧写好的系统内。

![spinand-flashsystem_001](https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/spinand-flashsystem_001.png)

**系统的登录用户名 root 密码为空**

**系统的登录用户名 root 密码为空**

**系统的登录用户名 root 密码为空**
