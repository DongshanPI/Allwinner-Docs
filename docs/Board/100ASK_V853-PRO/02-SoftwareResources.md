# 软件资源简介

V853 芯片官方支持 Tina Linux v5.0 系统。

Tina Linux 是全志科技基于Linux内核开发的针对智能硬件类产品的嵌入式软件系统。

Tina Linux v5.0 中包含 Linux 系统开发用到的 boot 源码、内核源码、驱动、工具、系统中间件与应用程序包。可以方便的定制、编译、打包生成Linux固件镜像。

Tina Linux v5.0 可以支持构建 openWrt 和 buildroot 不同构建系统；也支持单独编译 BSP（Board Support Package，板级支持包）；能够打包生成固件包，烧录到相应设备中并运行。

（1） 支持多构建系统

完整的SDK可以支持 openWrt 以及 buildroot，部分定制化SDK则可能只保留着 openWrt 或者 buildroot，甚至没有任何构建系统，只支持编译简单的BSP。

（2） BSP高度复用

Tina Linux v5.0 中BSP(boot,kernel代码，编译打包工具等)是独立的存在，可支持单独编译打包，快速生成一个的固件镜像。

（3）openWrt 改造

Tina Linux v5.0 对 openWrt 进行了较多改造，例如与内核编译解耦合，编译产物的目录调整，软件包及方案目录的独立仓库化等等,可以更加友好的单独构建rootfs，裁剪SDK。

 

**注意：**

openWrt 是一个开源的嵌入式 Linux 系统自动构建框架，是由 Makefile 脚本和 Kconfig 配置文件构成的。使得用户可以通过 menuconfig 灵活配置软件包。



**目录结构**

Tina Linux v5.0 目录结构主要有构建工具、构建系统、配置工具、工具链、芯片配置目录、内核及boot目录等组成。

Tina Linux v5.0 内置快速跳转指令，可以快速进入相关文件夹进行编辑修改。

下面按照目录顺序与快速跳转指令做简单介绍。

```
TinaLinux/
  ├── brandy                               # 存放boot0，uboot等代码。
  ├── build                                # 存放Tina Linux的系统构建脚本
  ├── buildroot                            # 存放buildroot相关的配置文件以及原生builroot代码
  ├── build.sh -> build/top_build.sh       # 超链接至build/top_build.sh
  ├── device                               # 存放芯片方案的配置文件
  ├── kernel                               # 存放不同版本的内核代码
  ├── openwrt                              # 存放openWrt原生代码，及软件包、芯片方案目录
  ├── out                                  # 存放编译相关的临时文件和最终镜像文件
  ├── platform                             # 存放着一些软件包源码
  ├── prebuilt                             # 存放一些预编译好的工具
  └── tools                                # 存放一些host端工具，下载打包工具
```

