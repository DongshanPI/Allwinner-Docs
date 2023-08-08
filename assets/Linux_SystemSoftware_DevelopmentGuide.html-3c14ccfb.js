import{_ as e,o as i,c as n,e as t}from"./app-5cc5893e.js";const a={},d=t(`<h1 id="tina-sdk开发" tabindex="-1"><a class="header-anchor" href="#tina-sdk开发" aria-hidden="true">#</a> Tina-SDK开发</h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1 概述</h2><p>编写目的：本文档作为Allwinner Tina Linux系统平台开发指南，旨在帮助软件开发工程师、技术支持工程师快速上手，熟悉Tina Linux系统的开发及调试流程。</p><p>适用范围：Tina Linux v3.5及以上版本。</p><h2 id="_2-tina系统资料" tabindex="-1"><a class="header-anchor" href="#_2-tina系统资料" aria-hidden="true">#</a> 2 Tina系统资料</h2><h3 id="_2-1-概述" tabindex="-1"><a class="header-anchor" href="#_2-1-概述" aria-hidden="true">#</a> 2.1 概述</h3><p>Tina SDK发布的文档旨在帮助开发者快速上手开发及调试，文档中涉及的内容并不能涵盖所有的开发知识和问题。文档列表也正在不断更新。</p><p>Tina SDK提供丰富的文档资料，包括硬件参考设计文档、Flash等基础器件支持列表、量产工具使用说明、软件开发与制定介绍文档、芯片研发手册等资料。</p><h3 id="_2-2-文档列表" tabindex="-1"><a class="header-anchor" href="#_2-2-文档列表" aria-hidden="true">#</a> 2.2 文档列表</h3><p>请以全志科技全志客户服务平台最新列表为准。</p><h2 id="_3-tina系统概述" tabindex="-1"><a class="header-anchor" href="#_3-tina系统概述" aria-hidden="true">#</a> 3 Tina系统概述</h2><h3 id="_3-1-概述" tabindex="-1"><a class="header-anchor" href="#_3-1-概述" aria-hidden="true">#</a> 3.1 概述</h3><p>Tina Linux系统是基于openwrt-14.07的版本的软件开发包，包含了Linux系统开发用到的内核源码、驱动、工具、系统中间件与应用程序包。openwrt是一个开源的嵌入式Linux系统自动构建框架，是由Makefile脚本和Kconfig配置文件构成的。使得用户可以通过menuconfig配置，编译出一个完整的可以直接烧写到机器上运行的Linux系统软件。</p><h3 id="_3-2-系统框图" tabindex="-1"><a class="header-anchor" href="#_3-2-系统框图" aria-hidden="true">#</a> 3.2 系统框图</h3><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-3-1.jpg" alt="图3-1: Tina Linux系统框图"></p><p>Tina系统软件框图如图所示，从下至上分为Kernel &amp;&amp; Driver、Libraries、System Ser-vices、Applications四个层次。各层次内容如下：</p><ol><li>Kernel&amp;&amp;Driver主要提供Linux Kernel的标准实现。Tina平台的Linux Kernel 采用Linux3.4、linux3.10、linux4.4、linux4.9等内核(不同硬件平台可能使用不同内核版本)。提供安全性，内存管理，进程管理，网络协议栈等基础支持；主要是通过Linux内核管理设备硬件资源，如CPU调度、缓存、内存、I/O等。</li><li>Libraries层对应一般嵌入式系统，相当于中间件层次。包含了各种系统基础库，及第三方开源程序库支持，对应用层提供API接口，系统定制者和应用开发者可以基于Libraries层的API开发新的应用。</li><li>System Services层对应系统服务层，包含系统启动管理、配置管理、热插拔管理、存储管理、多媒体中间件等。</li><li>Applications层主要是实现具体的产品功能及交互逻辑，需要一些系统基础库及第三方程序库支持，开发者可以开发实现自己的应用程序，提供系统各种能力给到最终用户。</li></ol><h3 id="_3-3-开发流程" tabindex="-1"><a class="header-anchor" href="#_3-3-开发流程" aria-hidden="true">#</a> 3.3 开发流程</h3><p>Tina Linux 系统是基于 Linux Kernel，针对多种不同产品形态开发的 SDK。可以基于本 SDK，有效地实现系统定制和应用移植开发。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-3-2.jpg" alt="图3-2: Tina Linux系统开发流程"></p><p>如上图所示，开发者可以遵循上述开发流程，在本地快速构建Tina Linux系统的开发环境和编译 代码。下面将简单介绍下该流程：</p><ol><li>检查系统需求：在下载代码和编译前，需确保本地的开发设备能够满足需求，包括机器的硬件能力，软件系统，工具链等。目前Tina Linux系统只支持Ubuntu操作系统环境下编译，并仅提供Linux环境下的工具链支持，其他如MacOS，Windows等系统暂不支持。</li><li>搭建编译环境：开发机器需要安装的各种软件包和工具，详见开发环境章节，获知TinaLinux已经验证过的操作系统版本，编译时依赖的库文件等。</li><li>选择设备：在编译源码前，开发者需要先导出预定义环境变量，然后根据开发者根据的需求，选择对应的硬件板型，详见编译章节。</li><li>系统定制：开发者可以根据使用的硬件板子、产品定义，定制U-Boot、Kernel及Open-wrt，请参考后续章节中相关开发指南和配置的描述。</li><li>编译与打包：完成设备选择、系统定制之后执行编译命令，包括整体或模块编译以及编译清理等工作，进一步的，将生成的boot/内核二进制文件、根文件系统、按照一定格式打包成固件。详见编译打包章节。</li><li>烧录并运行：继生成镜像文件后，将介绍如何烧录镜像并运行在硬件设备，进一步内容详见系统烧写章节。</li></ol><h2 id="_4-tina开发环境" tabindex="-1"><a class="header-anchor" href="#_4-tina开发环境" aria-hidden="true">#</a> 4 Tina开发环境</h2><h3 id="_4-1-概述" tabindex="-1"><a class="header-anchor" href="#_4-1-概述" aria-hidden="true">#</a> 4.1 概述</h3><p>嵌入式产品开发流程中，通常有两个关键的步骤，编译源码与烧写固件。源码编译需要先准备好</p><p>编译环境，而固件烧写则需要厂家提供专用烧写工具。本章主要讲述这如何搭建环境来实现Tinasdk的编译、烧写。</p><h3 id="_4-2-编译环境搭建" tabindex="-1"><a class="header-anchor" href="#_4-2-编译环境搭建" aria-hidden="true">#</a> 4.2 编译环境搭建.</h3><p>一个典型的嵌入式开发环境包括本地开发主机和目标硬件板。</p><ul><li>本地开发主机作为编译服务器，需要提供Linux操作环境，建立交叉编译环境，为软件开发提供代码更新下载，代码交叉编译服务。</li><li>本地开发主机通过串口或USB与目标硬件板连接，可将编译后的镜像文件烧写到目标硬件板，并调试系统或应用程序。</li></ul><h4 id="_4-2-1-开发主机配置" tabindex="-1"><a class="header-anchor" href="#_4-2-1-开发主机配置" aria-hidden="true">#</a> 4.2.1 开发主机配置.</h4><p>Tina Linux SDK是在ubuntu14.04开发测试的，因此我们 <strong>推荐使用Ubuntu 14.04</strong> 主机环境进行源码编译，其他版本没有具体测试，可能需要对软件包做相应调整。</p><h4 id="_4-2-2-软件包配置" tabindex="-1"><a class="header-anchor" href="#_4-2-2-软件包配置" aria-hidden="true">#</a> 4.2.2 软件包配置.</h4><p>编译Tina Linux SDK 之前，需要先确定编译服务器安装了gcc，binutils，bzip2，flex，python，perl，make，ia32-libs，find，grep，diff，unzip，gawk，getopt，subver-sion，libz-dev，libc headers。</p><p>ubuntu可直接执行以下命令安装：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo apt-get install build-essential subversion git-core libncurses5-dev zlib1g-dev gawkflex quilt libssl-dev xsltproc libxml-parser-perl mercurial bzr ecj cvs unzip ia32-libslib32z1 lib32z1-dev lib32stdc++6 libstdc++6 -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ubuntu 16.04及以上版本，执行下面命令安装软件包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo apt-get install build-essential subversion git-core libncurses5-dev zlib1g-dev gawk flex quilt libssl-dev xsltproc libxml-parser-perl mercurial bzr ecj cvs unzip lib32z1 lib32z1-dev lib32stdc++ libstdc++6 -y libc6:i386 libstdc++6:i386 lib32ncurses5 lib32z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-tina系统获取" tabindex="-1"><a class="header-anchor" href="#_5-tina系统获取" aria-hidden="true">#</a> 5 Tina系统获取</h2><h3 id="_5-1-概述" tabindex="-1"><a class="header-anchor" href="#_5-1-概述" aria-hidden="true">#</a> 5.1 概述</h3><h3 id="_5-2-sdk获取" tabindex="-1"><a class="header-anchor" href="#_5-2-sdk获取" aria-hidden="true">#</a> 5.2 SDK获取</h3><p>Allwinner Tina Linux SDK通过全志代码服务器对外发布。客户需要向业务/技术支持窗口申请SDK下载权限。申请需同步提供SSH公钥进行服务器认证授权，获得授权后即可同步代码。</p><h3 id="_5-3-sdk结构" tabindex="-1"><a class="header-anchor" href="#_5-3-sdk结构" aria-hidden="true">#</a> 5.3 SDK结构</h3><p>Tina Linux SDK主要由构建系统、配置工具、工具链、host工具包、目标设备应用程序、文档、脚本、linux内核、bootloader部分组成，下文按照目录顺序介绍相关的组成组件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Tina-SDK/
    ├── build
    ├── config
    ├── Config.in
    ├── device
    ├── dl
    ├── docs
    ├── lichee
    ├── Makefile
    ├── out
    ├── package
    ├── prebuilt
    ├── rules.mk
    ├── scripts
    ├── target
    ├── tmp
    ├── toolchain
    └── tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-1-build目录" tabindex="-1"><a class="header-anchor" href="#_5-3-1-build目录" aria-hidden="true">#</a> 5.3.1 build目录</h4><p>build目录存放Tina Linux的构建系统文件，此目录结构下主要是一系列基于Makefile规格编 写的mk文件。主要的功能是：</p><ol><li>检测当前的编译环境是否满足Tina Linux的构建需求。</li><li>生成host包编译规则。</li><li>生成工具链的编译规则。</li><li>生成target包的编译规则。</li><li>生成linux kernel的编译规则。</li><li>生成系统固件的生成规则。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>build/
    ├── autotools.mk
    ├── aw-upgrade.mk
    ├── board.mk
    ├── cmake.mk
    ├── config.mk
    ├── debug.mk
    ├── depends.mk
    ├── device.mk
    ├── device_table.txt
    ├── download.mk
    ├── dumpvar.mk
    ├── envsetup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-2-config目录" tabindex="-1"><a class="header-anchor" href="#_5-3-2-config目录" aria-hidden="true">#</a> 5.3.2 config目录</h4><p>config目录主要存放Tina Linux中配置菜单的界面以及一些固定的配置项，该配置菜单基于内 核的mconf规格书写。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>config/
    ├── Config-build.in
    ├── Config-devel.in
    ├── Config-images.in
    ├── Config-kernel.in
    └── top_config.in
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-3-devices目录" tabindex="-1"><a class="header-anchor" href="#_5-3-3-devices目录" aria-hidden="true">#</a> 5.3.3 devices目录</h4><p>devices目录用于存放方案的配置文件，包括内核配置，env配置，分区表配置，sys_config.fex， board.dts等。</p><p>这些配置在旧版本上是保存于target目录下，新版本挪到device目录。</p><p>注意defconfig仍保存在target目录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>device/
    └── config
        ├── chips
        ├── common
        └── rootfs_tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快捷跳转命令：cconfigs</p><h4 id="_5-3-4-docs目录" tabindex="-1"><a class="header-anchor" href="#_5-3-4-docs目录" aria-hidden="true">#</a> 5.3.4 docs目录</h4><p>docs目录主要存放用于开发的文档，以markdown格式书写。</p><p>本目录不再更新，请以全志客户服务平台系统文档为准。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docs/
    ├── build.md
    ├── config.md
    ├── init-scripts.md
    ├── Makefile
    ├── network.md
    ├── tina.md
    ├── wireless.md
    └── working.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-5-lichee目录" tabindex="-1"><a class="header-anchor" href="#_5-3-5-lichee目录" aria-hidden="true">#</a> 5.3.5 lichee目录</h4><p>lichee目录主要存放bootloader，内核，arisc，dsp等代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lichee/
    ├── bootloader
    │ ├── uboot_2011_sunxi_spl
    │ └── uboot_2014_sunxi_spl
    ├── brandy
    │ ├── u-boot-2011.09
    │ └── u-boot-2014.07
    ├── brandy-2.0
    │ ├── spl
    │ ├── tools
    │ └── u-boot-2018
    ├── linux-3.4
    ├── linux-3.10
    ├── linux-4.4
    ├── linux-4.9
    ├── arisc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快捷跳转命令：ckernel，cboot，cboot0，carisc。</p><h4 id="_5-3-6-package目录" tabindex="-1"><a class="header-anchor" href="#_5-3-6-package目录" aria-hidden="true">#</a> 5.3.6 package目录</h4><p>package目录存放target机器上的软件包源码和编译规则，目录按照目标软件包的功能进行分 类。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package/
    ├── allwinner
    ├── base-files
    ├── devel
    ├── dragonst
    ├── firmware
    ├── kernel
    ├── ......
    └── utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-7-prebuilt目录" tabindex="-1"><a class="header-anchor" href="#_5-3-7-prebuilt目录" aria-hidden="true">#</a> 5.3.7 prebuilt目录</h4><p>prebuild目录存放预编译交叉编译器，目录结构如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prebuilt/
    └── gcc
        └── linux-x86
            ├── aarch64
            │   ├── toolchain-sunxi-musl
            │   └── toolchain-sunxi-glibc
            ├── arm
            │   ├── toolchain-sunxi-arm9-glibc
            │   ├── toolchain-sunxi-arm9-musl
            │   ├── toolchain-sunxi-glibc
            │   ├── toolchain-sunxi-musl
            └── host
            └── host-toolchain.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-8-scripts目录" tabindex="-1"><a class="header-anchor" href="#_5-3-8-scripts目录" aria-hidden="true">#</a> 5.3.8 scripts目录</h4><p>scripts目录用于存放一些构建编译相关的脚本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scripts/
    ├── arm-magic.sh
    ├── brcmImage.pl
    ├── bundle-libraries.sh
    ├── checkpatch.pl
    ├── clang-gcc-wrapper
    ├── cleanfile
    ├── clean-package.sh
    ├── cleanpatch
    ├── ......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-9-target目录" tabindex="-1"><a class="header-anchor" href="#_5-3-9-target目录" aria-hidden="true">#</a> 5.3.9 target目录</h4><p>target目录用于存放目标板相关的配置以及sdk和toolchain生成的规格。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>target/
    ├── allwinner
    ├── Config.in
    ├── imagebuilder
    ├── Makefile
    ├── sdk
    └── toolchain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快捷跳转命令：cdevice。</p><h4 id="_5-3-10-toolchain目录" tabindex="-1"><a class="header-anchor" href="#_5-3-10-toolchain目录" aria-hidden="true">#</a> 5.3.10 toolchain目录.</h4><p>toolchain目录包含交叉工具链构建配置、规则。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>toolchain/
    ├── binutils
    ├── Config.in
    ├── fortify-headers
    ├── gcc
    ├── gdb
    ├── glibc
    ├── info.mk
    ├── insight
    ├── kernel-headers
    ├── Makefile
    ├── musl
    └── wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-11-tools目录" tabindex="-1"><a class="header-anchor" href="#_5-3-11-tools目录" aria-hidden="true">#</a> 5.3.11 tools目录.</h4><p>tools目录用于存放host端工具的编译规则。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tools/
    ├── autoconf
    ├── automake
    ├── aw_tools
    ├── b43-tools
    ├── ......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-12-out目录" tabindex="-1"><a class="header-anchor" href="#_5-3-12-out目录" aria-hidden="true">#</a> 5.3.12 out目录.</h4><p>out目录用于保存编译相关的临时文件和最终镜像文件，编译后自动生成此目录，例如编译方案 r328s2-perf1。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>out/
    ├── r328s2-perf
    └── host
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中host目录用于存放host端的工具以及一些开发相关的文件。</p><p>r328s2-perf1目录为方案对应的目录。方案目录下的结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>out/r328s2-perf
    ├── boot.img
    ├── compile_dir
    ├── image
    ├── md5sums
    ├── packages
    ├── r328s2-perf1-boot.img
    ├── r328s2-perf1-uImage
    ├── r328s2-perf1-zImage
    ├── rootfs.img
    ├── sha256sums
    ├── staging_dir
    └── tina_r328s2-perf1_uart0.img
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>boot.img为最终烧写到系统boot分区的数据，可能为boot.img格式也可能为uImage格式。</li><li>rootfs.img为最终烧写到系统rootfs分区的数据，该分区默认为squashfs格式。</li><li>r328s2-perf1-zImage为内核的zImage格式镜像，用于进一步生成uImage。</li><li>r328s2-perf1-uImage为内核的uImage格式镜像，若配置为uImage格式，则会拷贝成boot.img。</li><li>r328s2-perf1-boot.img为内核的boot.img格式镜像，若配置为boot.img格式，则会拷贝成boot.img</li><li>compile_dir为sdk编译host，target和toolchain的临时文件目录，存有各个软件包的源码。</li><li>staging_dir为sdk编译过程中保存各个目录结果的目录。</li><li>packages目录保存的是最终生成的ipk软件包。</li><li>tina_r328s2-perf1_uart0.img为最终固件包(系统镜像)，串口信息通过串口输出</li><li>若使用pack -d，则生成的固件包为xxx_card0.img，串口信息转递到tf卡座输出。</li></ul><p>快捷跳转命令：cout。</p><h3 id="_5-4-sdk更新" tabindex="-1"><a class="header-anchor" href="#_5-4-sdk更新" aria-hidden="true">#</a> 5.4 SDK更新</h3><p>SDK更新分为两类：一类是以补丁的形式发布到一号通，发布后系统以邮件形式通知开发者；另一类是定期（半年或季度）的小版本迭代升级，将过往的补丁合入到SDK中，发布后以系统邮件通知开发者，可基于干净的SDK包通过repo sync命令更新。</p><h3 id="_5-5-问题反馈" tabindex="-1"><a class="header-anchor" href="#_5-5-问题反馈" aria-hidden="true">#</a> 5.5 问题反馈</h3><p>Allwinner提供全志客户服务平台（https://open.allwinnertech.com），用来登记客户遇到的问题以及解决状态。方便双方追踪，使问题处理更加高效。后续SDK</p><p>问题、技术问题、技术咨询等都可以提交到此系统上，Allwinner技术服务会及时将问题进行分发、处理和跟踪。</p><p>注：系统登录帐号需要与Allwinner开通确认。</p><h2 id="_6-tina编译打包" tabindex="-1"><a class="header-anchor" href="#_6-tina编译打包" aria-hidden="true">#</a> 6 Tina编译打包</h2><h3 id="_6-1-概述" tabindex="-1"><a class="header-anchor" href="#_6-1-概述" aria-hidden="true">#</a> 6.1 概述</h3><h3 id="_6-2-编译系统" tabindex="-1"><a class="header-anchor" href="#_6-2-编译系统" aria-hidden="true">#</a> 6.2 编译系统</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1) source build/envsetup.sh
(2) lunch
(3) make [-jN]
(4) pack [-d]

其中，
步骤(1)建立编译环境，导出编译变量。
步骤(2)提示需要选择你想要编译的方案。
步骤(3)参数N为并行编译进程数量，依赖编译服务器CPU核心数，如 4 核PC，可&quot;make -j4&quot;
步骤(4)打包固件，-d参数使生成固件包串口信息转到tf卡座输出。
编译完成后系统镜像会打包在out/&lt;board&gt;/目录下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-编译boot" tabindex="-1"><a class="header-anchor" href="#_6-3-编译boot" aria-hidden="true">#</a> 6.3 编译boot</h3><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">命令有效目录</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">mboot</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">编译boot0和uboot</td></tr><tr><td style="text-align:left;">mboot0</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">编译boot0</td></tr><tr><td style="text-align:left;">muboot</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">编译uboot</td></tr></tbody></table><h3 id="_6-4-编译内核" tabindex="-1"><a class="header-anchor" href="#_6-4-编译内核" aria-hidden="true">#</a> 6.4 编译内核</h3><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">命令有效目录</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">mkernel</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">编译内核</td></tr></tbody></table><h3 id="_6-5-编译arisc" tabindex="-1"><a class="header-anchor" href="#_6-5-编译arisc" aria-hidden="true">#</a> 6.5 编译arisc</h3><p>arisc是AW平台对cpus代码环境的代称，主要功能是负责休眠，关机等底层操作。它包含 cpus运行所需的驱动，库及工具链等，编译产生scp.bin，然后打包在Tina镜像中，有boot- loader在启动时加载到cpus域运行。</p><p>Tina中提供了如下与arisc相关的跳转、编译命令</p><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">命令有效目录</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">carisc</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">跳转到cpus代码工程目录</td></tr><tr><td style="text-align:left;">mkarisc</td><td style="text-align:left;">tina下任意目录</td><td style="text-align:left;">编译cpus代码</td></tr></tbody></table><p>在Tina中，编译arisc代码有两种方式，如下：</p><p>第一种方式，跳转到arisc代码路径下，使用make编译</p><p>arisc代码库具有独立的工具链和构建体系，因此对arisc代码的编译，也可以cd到对应的路径 下，执行make命令。但需注意，此时需要手动将生成的scp.bin文件拷贝到SDK的bin文件 路径下，覆盖对应的文件（一般路径是tina/device/config/chips/\${平台名}/bin）。</p><p>操作如下，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>step1
使用carisc或cd命令跳转到arisc代码环境下，一般为tina/lichee/arisc/ar100s。

step2
生成必要的配置。在arch/configs/下，存在许多defconfig默认配置文件，可根据AXP型号选择使用，例如make sun50iw10p1_axp803_defconfig。此操作将会在arisc根目录生成.config。

step3
修改默认配置，可使用make menuconfig。此操作会生成配置菜单，按需选择配置即可，该操作会修改.config。如需重新使用默认配置，重新执行step2即可。

step4
使用make命令编译

step5
将scp.bin拷贝到Tina的bin目录，即cbin可跳转的目录即可。如/tina/device/config/chips/r818/binstep6

若需清理工程，可使用make clean

step7
如需提交defconfig配置修改，可使用make savedefconfig命令。此命令会根据.config在arisc根目录生成 defconfig。将defconfig拷贝到arch/configs/下，覆盖对应配置文件即可。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><p>一般来说，arisc执行的功能较为底层，多与休眠，关机等操作相关，对稳定性要求较高。我们不 建议客户自己修改任何相关配置和代码，如必须，请与我司联系或执行足够的稳定性测试。</p><p>第二种方式，使用mkarisc命令</p><p>如上述方法所述，Tina为了解决arisc编译后还需手动拷贝的问题，Tina提供了这个快捷命令 mkarisc。需要指出的是：目前只支持R818、MR813的arisc代码编译。</p><p>操作如下，较为简单</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>step1
配置tina环境，如soure build/envsetup.sh, lunch等操作。

step2
使用mkarisc编译即可或直接编译Tina,在编译Tina时，也会自动调用mkarisc命令。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><p>使用mkarisc命令编译时，会自动读取board.dts获取AXP型号，然后使用对应的默认配置文 件编译。如board.dts中指定使用“x-powers,axp803”时，mkarsic命令会使用arisc工程环 境下的sun50iw10p1_axp803_defconfig配置文件编译。此时，若您需要修改该arisc配置， 只能先修改该配置文件后编译，除此外不接受其他配置修改的方式。</p><h3 id="_6-6-编译e907固件-v85x平台异构amp核" tabindex="-1"><a class="header-anchor" href="#_6-6-编译e907固件-v85x平台异构amp核" aria-hidden="true">#</a> 6.6 编译E907固件(V85x平台异构AMP核)</h3><p>E907是V85x平台AMP CPU的代称，其主要功能是提供通用算力补充、辅助Linux实现快起 等。它包含E907运行所需的驱动、库及工具链等，编译产生riscv.fex，打包到Tina镜像中， 由bootloader在启动时加载到RISC-V核上运行。</p><p>在Tina SDK中，编译E907 RISCV代码如下：</p><p>E907 RISCV 代码库具有独立的工具链和构建体系，因此对 E907 固件的编译，也可以跳 转到对应的路径下，执行命令。但需注意，此时需要手动将生成的 melis30.elf 文件拷贝 到 SDK 的 bin 文件路径下，覆盖对应的文件（一般路径是 device/config/chips/\${平台 名}/configs/default/riscv.fex）。</p><p>操作如下，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>step1
使用cd命令跳转到e907代码环境下，一般为rtos-dev/lichee/melis-v3.0/source

step2
source melis-env.sh

step3
lunch v853-e907-ver1-board

step4
make menuconfig

step5
make -j

step6
如需减少存储空间，可裁剪调试信息，在melis source目录执行：riscv64-unknown-elf-strip ekernel/melis30.elf

step7
拷贝并重命名成riscv.fex替换掉tina/device/config/chips/v853/configs/default目录下的riscv.fex

cp ekernel/melis30.elf /home/xxx/tina/device/config/chips/v853/configs/default/riscv.fex

step8
Tina系统目录执行打包命令pack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-7-重编应用" tabindex="-1"><a class="header-anchor" href="#_6-7-重编应用" aria-hidden="true">#</a> 6.7 重编应用</h3><p>请确保进行过一次固件的编译，确保SDK基础已经编译，才能单独重编应用包。重编应用包应用场景一般为： 只修改了应用，不想重新烧写固件，只需要安装应用安装包即可 。请确保在编译前已加载tina环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ source build/envsetup.sh
$ lunch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-7-1-方法一" tabindex="-1"><a class="header-anchor" href="#_6-7-1-方法一" aria-hidden="true">#</a> 6.7.1 方法一</h4><p>当在应用包的目录（包括其子目录）中，可执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ mm [-B]
=&gt; B参数则先clean此应用临时文件再编译
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：假设软件包路径为：tina/package/utils/rwcheck，则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cd tina/package/utils/rwcheck
$ mm -B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译出应用安装包保存路径为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina/out/&lt;方案&gt;/packages/base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-7-2-方法二" tabindex="-1"><a class="header-anchor" href="#_6-7-2-方法二" aria-hidden="true">#</a> 6.7.2 方法二</h4><p>当在tina的根目录，可执行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ make &lt;应用包的路径&gt;/clean，==&gt;清空应用包临时文件
$ make &lt;应用包的路径&gt;/install，==&gt;编译软件包
或者
$ make &lt;应用包的路径&gt;/{clean，install}，==&gt;先清空临时文件再编译
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：假设软件包的路径为：tina/package/utils/rwcheck，则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cd tina
$ make package/utils/rwcheck/{clean，install}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-8-其他命令" tabindex="-1"><a class="header-anchor" href="#_6-8-其他命令" aria-hidden="true">#</a> 6.8 其他命令</h3><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">命令有效目录</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">make</td><td style="text-align:left;">tina根目录 编译整个sdk</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">make</td><td style="text-align:left;">menuconfig tina根目录 启动软件包配置界面</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">make</td><td style="text-align:left;">kernel_menuconfig tina根目录 启动内核配置界面</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">mkarisc</td><td style="text-align:left;">tina下任意目录 编译cpus源码，根据AXP型号选择对应的默认配置</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">printfconfig</td><td style="text-align:left;">tina下任意目录 打印当前SDK的配置</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">croot</td><td style="text-align:left;">tina下任意目录 快速切换到tina根目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cconfigs</td><td style="text-align:left;">tina下任意目录 快速切换到方案的bsp配置目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cdevice</td><td style="text-align:left;">tina下任意目录 快速切换到方案配置目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">carisc</td><td style="text-align:left;">tina下任意目录 快速切换到cpus代码目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cgeneric</td><td style="text-align:left;">tina下任意目录 快速切换到方案generic目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cout</td><td style="text-align:left;">tina下任意目录 快速切换到方案的输出目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cboot</td><td style="text-align:left;">tina下任意目录 快速切换到bootloader目录</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">cgrep</td><td style="text-align:left;">tina下任意目录 在c／c++／h文件中查找字符串</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">minstall</td><td style="text-align:left;">path/to/package/ tina根目录 编译并安装软件包</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">mclean</td><td style="text-align:left;">path/to/package/ tina根目录 clean软件包</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">mm [-B]</td><td style="text-align:left;">软件包目录 编译软件包，-B指编译前先clean</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">pack</td><td style="text-align:left;">tina根目录 打包固件</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">m</td><td style="text-align:left;">tina下任意目录 make的快捷命令，编译整个sdk</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">p</td><td style="text-align:left;">tina下任意目录 pack的快捷命令，打包固件</td><td style="text-align:left;"></td></tr></tbody></table><h2 id="_7-tina系统烧写" tabindex="-1"><a class="header-anchor" href="#_7-tina系统烧写" aria-hidden="true">#</a> 7 Tina系统烧写</h2><h3 id="_7-1-概述" tabindex="-1"><a class="header-anchor" href="#_7-1-概述" aria-hidden="true">#</a> 7.1 概述</h3><p>本章节主要介绍如何将构建完成的镜像文件(image)烧写并运行在硬件设备上的流程。</p><p>SDK中的烧录工具不再更新，后续会删除，请优先选择从全志客户服务平台下载最新烧录工具。</p><p>windows工具均集成在APST中，下载安装APST即可，APST的工具均自带文档。</p><h3 id="_7-2-烧录工具" tabindex="-1"><a class="header-anchor" href="#_7-2-烧录工具" aria-hidden="true">#</a> 7.2 烧录工具</h3><p>Tina提供的几种镜像烧写工具介绍如表所示，用户可以选择合适的烧写方式进行烧写。</p><table><thead><tr><th style="text-align:left;">工具</th><th style="text-align:left;">运行系统</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">PhoenixSuit</td><td style="text-align:left;">windows</td><td style="text-align:left;">分分区升级及整个固件升级工具</td></tr><tr><td style="text-align:left;">PhoenixCard</td><td style="text-align:left;">windows</td><td style="text-align:left;">卡固件制作工具</td></tr><tr><td style="text-align:left;">PhoenixUSBpro</td><td style="text-align:left;">windows</td><td style="text-align:left;">量产升级工具，支持USB一拖 8 烧录</td></tr><tr><td style="text-align:left;">LiveSuit</td><td style="text-align:left;">ubuntu</td><td style="text-align:left;">固件升级工具</td></tr></tbody></table><p>对于ubuntu：</p><ul><li>64bit主机使用LiveSuitV306_For_Linux64.zip。</li><li>32bit主机使用LiveSuitV306_For_Linux32.zip。</li></ul><p>具体烧录工具和使用说明，请到全志客户服务平台下载。</p><h3 id="_7-3-进入烧录模式" tabindex="-1"><a class="header-anchor" href="#_7-3-进入烧录模式" aria-hidden="true">#</a> 7.3 进入烧录模式.</h3><p>设备需进入烧录模式，以下几种情况会进入烧录模式：</p><ol><li>BROM无法读取到boot0，例如新换的flash不包含数据，或者上电时短路flash阻断通信。</li><li>在串口中按 2 进入烧录。即，在串口工具输出框中，按住键盘的’2’，不停输出字符’2’，上电启动。boot0检测到此字符，会跳到烧录模式。</li><li>在uboot控制台，执行efex。</li><li>在linux控制台，执行reboot efex。</li><li>adb可用的情况下，可使用adb shell reboot efex，或点击烧录工具上的“立即烧录”按钮。</li><li>当完整配置[fel_key]下fel_key_max和fel_key_min时，按下键值在范围内按键，之后上电。</li><li>当板子有FEL按键时，按住FEL按键上电。</li><li>制作特殊的启动卡，从卡启动再进入烧录模式。</li></ol><h2 id="_8-tina-uboot定制开发" tabindex="-1"><a class="header-anchor" href="#_8-tina-uboot定制开发" aria-hidden="true">#</a> 8 Tina uboot定制开发</h2><h3 id="_8-1-概述" tabindex="-1"><a class="header-anchor" href="#_8-1-概述" aria-hidden="true">#</a> 8.1 概述</h3><p>本章节简单介绍uboot基本配置、功能裁剪、编译打包、常用命令的使用，帮助客户了解Tina 平台uboot框架，为boot定制开发提供基础。</p><p>目前Tina SDK共有三版uboot，分别是uboot-2011、uboot-2014、uboot-2018，分别在不 同硬件平台上使用，客户拿到SDK需要根据开发的硬件平台核对版本信息。</p><h3 id="_8-2-代码路径" tabindex="-1"><a class="header-anchor" href="#_8-2-代码路径" aria-hidden="true">#</a> 8.2 代码路径</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TinaSDK/
├── brandy
│   ├── ...
│   ├── u-boot-2011
│   └── u-boot-2014
├── brandy-2.0
│   ├── ...
│   └── u-boot-2018
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-uboot功能" tabindex="-1"><a class="header-anchor" href="#_8-3-uboot功能" aria-hidden="true">#</a> 8.3 uboot功能</h3><p>TinaSDK中，bootloader/uboot在内核运行之前运行，可以初始化硬件设备、建立内存空间映 射图，从而将系统的软硬件环境带到一个合适状态，为最终调用linux内核准备好正确的环境。 在Tina系统平台中，除了必须的引导系统启动功能外，uboot还提供烧写、升级等其它功能。</p><ul><li>引导内核能从存储介质（nand/mmc/spinor）上加载内核镜像到DRAM指定位置并运行。</li><li>量产&amp;升级包括卡量产，USB量产，私有数据烧录，固件升级。</li><li>电源管理包括进入充电模式时的控制逻辑和充电时的显示画面。</li><li>开机提示信息开机能显示启动logo图片(BMP格式)。</li><li>Fastboot功能实现fastboot的标准命令，能使用fastboot刷机。</li></ul><h3 id="_8-4-uboot配置" tabindex="-1"><a class="header-anchor" href="#_8-4-uboot配置" aria-hidden="true">#</a> 8.4 uboot配置</h3><p>以uboot-2018为例，各项功能可以通过defconfig或配置菜单menuconfig进行开启或关闭， 具体配置方法如下：</p><h4 id="_8-4-1-defconfig方式" tabindex="-1"><a class="header-anchor" href="#_8-4-1-defconfig方式" aria-hidden="true">#</a> 8.4.1 defconfig方式</h4><h5 id="_8-4-1-1-defconfig配置步骤" tabindex="-1"><a class="header-anchor" href="#_8-4-1-1-defconfig配置步骤" aria-hidden="true">#</a> 8.4.1.1 defconfig配置步骤</h5><ol><li>vim /TinaSDK/lichee/brandy2.0/u-boot-2018/configs/sun8iw18p1_defconfig (若是spinor方案则打开sun8iw18p1_nor_defconfig)</li><li>打开sun8iw18p1_defconfig或sun8iw18p1_nor_defconfig后，在相应的宏定义前去掉或添加&quot;#&quot;即可将相应功能开启或关闭。</li></ol><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-1.jpg" alt="图8-1: defconfig配置图"></p><p>如上图，只要将CONFIG_SUNXI_NAND前的#去掉即可支持NAND相关功能，其他宏定义的开启关闭也类似。</p><h5 id="_8-4-1-2-defconfig配置宏介绍" tabindex="-1"><a class="header-anchor" href="#_8-4-1-2-defconfig配置宏介绍" aria-hidden="true">#</a> 8.4.1.2 defconfig配置宏介绍.</h5><p>如下图是sun8iw18p1_defconfig/sun8iw18p1_nor_defconfig中的基本宏定义的介绍：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-2.jpg" alt="图8-2: defconfig基本宏定义介绍图"></p><h4 id="_8-4-2-menuconfig方式" tabindex="-1"><a class="header-anchor" href="#_8-4-2-menuconfig方式" aria-hidden="true">#</a> 8.4.2 menuconfig方式</h4><p>通过menuconfig方式配置的方法步骤如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /TinaSDK/lichee/brandy2.0/u-boot-2018/
make ARCH=arm menuconfig或make ARCH=arm64 menuconfig

注意：arm针对 32 位平台，arm64针对 64 位平台。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述命令会弹出menuconfig配置菜单，如下图所示，此时即可对各模块功能进行配置，配 置方法menuconfig配置菜单窗口中有说明。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-3.jpg" alt="图8-3: menuconfig配置菜单图"></p><h3 id="_8-5-uboot编译" tabindex="-1"><a class="header-anchor" href="#_8-5-uboot编译" aria-hidden="true">#</a> 8.5 uboot编译</h3><h4 id="_8-5-1-方法一" tabindex="-1"><a class="header-anchor" href="#_8-5-1-方法一" aria-hidden="true">#</a> 8.5.1 方法一</h4><p>在tina目录下即可编译uboot。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>source build/envsetup.sh(见详注1)
lunch (见详注2)
muboot(见详注3)
详注：
1 加载环境变量及tina提供的命令。
2 输入编号，选择方案。
3 编译uboot，编译完成后自动更新uboot binary到TinaSDK/target/allwinner/$(BOARD)-common/bin/。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-5-2-方法二" tabindex="-1"><a class="header-anchor" href="#_8-5-2-方法二" aria-hidden="true">#</a> 8.5.2 方法二</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>source build/envsetup.sh(见详注1)
lunch (见详注2)
cboot(见详注3)
make XXX_config(见详注4)
make -j

详注：
3 跳转到Uboot源码目录。
4 选择方案配置，如果是使用norflash，运行make XXX_nor_config。
5 执行编译uboot的动作。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-6-uboot的配置" tabindex="-1"><a class="header-anchor" href="#_8-6-uboot的配置" aria-hidden="true">#</a> 8.6 uboot的配置</h3><h4 id="_8-6-1-sys-config配置" tabindex="-1"><a class="header-anchor" href="#_8-6-1-sys-config配置" aria-hidden="true">#</a> 8.6.1 sys_config配置.</h4><p>sys_config.fex是对不同模块参数进行配置的重要文件，对各模块重要参数的更改及更新提供了 极大的方便。其文档存放路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TinaSDK/target/allwinner/$(BOARD)/configs/sys_config.fex
TinaSDK/device/config/chips/$(CHIP)/configs/$(BOARD)/sys_config.fex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_8-6-1-1-sys-config-fex结构介绍" tabindex="-1"><a class="header-anchor" href="#_8-6-1-1-sys-config-fex结构介绍" aria-hidden="true">#</a> 8.6.1.1 sys_config.fex结构介绍</h5><p>sys_config.fes主要由主键和子键构成，主键是某项功能或模块的主标识，由[]括起，子键是对 该功能或模块中各个参数的配置项，如下图所示，dram_para是主键，dram_clk、dram_type 和dram_zp是子键。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-4.jpg" alt="图8-4: sysconfig.fex基本结构图"></p><h5 id="_8-6-1-2-sys-config-fex配置实例" tabindex="-1"><a class="header-anchor" href="#_8-6-1-2-sys-config-fex配置实例" aria-hidden="true">#</a> 8.6.1.2 sys_config.fex配置实例</h5><p>[platform]：平台相关配置项。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-5.jpg" alt="图8-5: platform配置图"></p><p>例如，debug_mode =1表示开启uboot的调试模式，开启后会在log中打印出对应的调试信 息。next_work=2表示烧录完成后系统的下一步执行动作(0x1表示正常启动、0x2表示重启、 0x3表示关)，其他配置可以查看[platform]前的提示说明。</p><p>[target]：目标平台相关功能配置项</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-6.jpg" alt="图8-6: target配置图"></p><p>上图中的可以通过配置boot_clock配置cpu的频率大小。</p><p>[uart_para]：串口配置项，uart_para配置项是uboot串口打印调试时用到的重要配置</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-7.jpg" alt="图8-7: uart_para配置图"></p><p>上图中的uart_debug_port=0表示使用的是uart0，uart_debug_tx/uart_debug_rx配置的gpio口（PA04/PA05）需要根据对应的GPIO DATASHEET进行配置。</p><h5 id="_8-6-1-3-sys-config-fex解析流程" tabindex="-1"><a class="header-anchor" href="#_8-6-1-3-sys-config-fex解析流程" aria-hidden="true">#</a> 8.6.1.3 sys_config.fex解析流程</h5><p>在uboot2014/2018中sys_config.fex最终会被转化为dtb（device tree binary，linux内核配置方式），dtb最终会被打包烧录至flash中，启动过程中会将该文件加载至内存，之前在sys_config.fex中配置的参数已转化为dtb节点，最终会调用fdt_getprop_32()函数对dtb中的节点进行解析。</p><h4 id="_8-6-2-环境变量配置" tabindex="-1"><a class="header-anchor" href="#_8-6-2-环境变量配置" aria-hidden="true">#</a> 8.6.2 环境变量配置.</h4><p>uboot的环境变量就是一个个的键值对，操作接口为：getenv()，setenv()，saveenv()。环境变量的形式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>boot_normal=sunxi_flash read 40007800 boot;boota 4000780\\
boot_recovery=sunxi_flash read 40007800 recovery;boota 40007800\\
boot_fastboot= fastboot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_8-6-2-1-环境变量作用" tabindex="-1"><a class="header-anchor" href="#_8-6-2-1-环境变量作用" aria-hidden="true">#</a> 8.6.2.1 环境变量作用.</h5><p>可以把一些参数信息或者命令序列定义在该环境变量中。在环境变量中定义UBOOT命令序列，</p><p>可以把UBOOT各个功能模块按顺序组合在一起执行，从而完成某个重要功能。</p><p>例如，如果执行了上述提到的 boot_normal 环境变量对应的命令，Uboot 则会先调用 sunxi_flash命令从存储介质的boot分区上加载内核到DRAM的0x40007800位置；然后调 用boota命令完成内核的引导。</p><p>uboot启动时调用环境变量方式下如图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-8.jpg" alt="图8-8: uboot启动调用环境变量方式图"></p><h5 id="_8-6-2-2-环境变量配置示例介绍" tabindex="-1"><a class="header-anchor" href="#_8-6-2-2-环境变量配置示例介绍" aria-hidden="true">#</a> 8.6.2.2 环境变量配置示例介绍.</h5><p>TinaSDK中，环境变量配置文件保存在TinaSDK/target/allwinner/$(BOARD)/configs/env.cfg 文件，用户使用的时候，可能会看到env-4.4.cfg、env-4.9.cfg等文件，env-xxx后缀数字表示在不同内核版本上的配置。打开后其内容示例如下，</p><ul><li>bootdelay=0，改环境变量bootdelay（即boot启动时log中的倒计时延迟时间）值的大小，为便于调试，bootdelay的值一般不要等于 0 ，这样在小机上电后按下任意键才能进入uboot shell命令状态。</li><li>boot_normal=sunxi_flash read 40007800 boot;boota 4000780，设置启动内核命令，即将boot分区读到内存0x40007800地址处，然后从内存0x40007800地址处启动内核。</li><li>Setargs_nand=setenv bootargs earlyprintk=\${earlyprink}....... ，设置内核相关环境变量，该变量在启动至内核的log中会打印处理，即cmdline如下图：</li></ul><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-8-9.jpg" alt="图8-9: kernel cmdline图"></p><ul><li>loglevel=8，设置内核log打印等级。</li></ul><h4 id="_8-6-3-sys-partition-fex分区配置" tabindex="-1"><a class="header-anchor" href="#_8-6-3-sys-partition-fex分区配置" aria-hidden="true">#</a> 8.6.3 sys_partition.fex分区配置</h4><p>分区配置文件是一个规划磁盘分区的文件，烧录过程会按照该分区配置文件将各分区数据烧录至flash中。</p><p>TinaSDK中，分区配置文件路径TinaSDK/target/allwinner/$(BOARD)/configs/sys_partition.fex。有些方案可以看到sys_partition.fex、sys_partition_nor.fex两个分区配置文件，若是打包Tina非nor固件，则使用的是sys_partition_linux.fex配置文件，若是打包nor固件，则使用的是sys_partition_nor.fex。</p><h5 id="_8-6-3-1-sys-partition-fex分区配置介绍" tabindex="-1"><a class="header-anchor" href="#_8-6-3-1-sys-partition-fex分区配置介绍" aria-hidden="true">#</a> 8.6.3.1 sys_partition.fex分区配置介绍</h5><p>一个分区的属性，包含名称、分区大小、下载文件与用户属性。以下是文件中所描述的一个分区的属性：</p><ul><li>name，分区名称由用户自定义。当用户在定义一个分区的时候，可以把这里改成自己希望的字符串，但是长度不能超过 16 个字节。</li><li>size，定义该分区的大小，以扇区的单位(1扇区=512bytes，如上图给env 分区分配了32768 个扇区，即32768*512/1024/1024 = 16M)，注意，为了字节对齐，这里分配的扇区大小应当能整除 128 。</li><li>downloadfile，下载文件的路径和名称。可以使用相对路径，相对是指相对于image.cfg文件所在分区。也可以使用绝对路径。</li><li>user_type，提供给操作系统使用的属性。目前，每个操作系统在读取分区的时候，会根据用户属性来判断当前分区是不是属于自己的然后才进行操作。这样设计的目的是为了避免在多系统同时存在的时候，A操作系统把B操作系统的系统分区进行了不应该的读写操作，导致B操作系统无法正常工作。</li></ul><p>更具体的说明，可参考《TinaLinux存储管理开发指南》。</p><h2 id="_9-tina-kernel定制开发" tabindex="-1"><a class="header-anchor" href="#_9-tina-kernel定制开发" aria-hidden="true">#</a> 9 Tina kernel定制开发</h2><h3 id="_9-1-概述" tabindex="-1"><a class="header-anchor" href="#_9-1-概述" aria-hidden="true">#</a> 9.1 概述</h3><p>本章节简单介绍kernel基本配置、功能裁剪、常用命令的使用，帮助客户了解Tina平台linux 内核，为内核定制开发提供基础。</p><p>目前Tina SDK共有 4 版linux kernel，分别是linux-3.4、linux-3.10、linux-4.4、linux- 4.9，分别在不同硬件平台上使用，客户拿到SDK需要根据开发的硬件平台核对内核信息。</p><h3 id="_9-2-代码路径" tabindex="-1"><a class="header-anchor" href="#_9-2-代码路径" aria-hidden="true">#</a> 9.2 代码路径</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TinaSDK/
    ├── ...
    ├── linux-3.10
    ├── linux-3.4
    ├── linux-4.4
    └── linux-4.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-模块开发文档" tabindex="-1"><a class="header-anchor" href="#_9-3-模块开发文档" aria-hidden="true">#</a> 9.3 模块开发文档.</h3><p>详阅BSP开发文档，文档目录包括常用内核模块使用与开发说明。</p><h3 id="_9-4-内核配置" tabindex="-1"><a class="header-anchor" href="#_9-4-内核配置" aria-hidden="true">#</a> 9.4 内核配置</h3><p>客户在定制化产品时，通常需要更改linux内核配置，在TinaSDK中，打开内核配置的方式如 下，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>croot
make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完后，shell控制台会跳出配置菜单。如下图所示，</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-9-1.jpg" alt="图9-1: TinaLinux内核配置菜单"></p><h2 id="_10-tina系统定制开发" tabindex="-1"><a class="header-anchor" href="#_10-tina系统定制开发" aria-hidden="true">#</a> 10 Tina系统定制开发</h2><h3 id="_10-1-tina-procd-init与busybox-init切换" tabindex="-1"><a class="header-anchor" href="#_10-1-tina-procd-init与busybox-init切换" aria-hidden="true">#</a> 10.1 Tina procd-init与busybox-init切换.</h3><p>tina默认为procd-init：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make menuconfig进行配置：
1.System init 选择procd-init

2.以下一步步选中
Base system ---&gt;
    &lt;*&gt;block-mount
    &lt;*&gt;busybox................................ Core utilities for embedded Linux ---&gt;
        Init Utilities ---&gt;
            [ ] init 此处不选
        Coreutils ---&gt;
            [*] head
        Miscellaneous Utilities ---&gt;
            [*] strings
    &lt;*&gt; uci
    &lt;*&gt; logd

3.env.cfg修改
init=/sbin/init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>busybox-init自启动方式配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make menuconfig进行配置：
1.System init 选择busy-init

2.以下一步步选中
Base system ---&gt;
    &lt;*&gt;busybox................................ Core utilities for embedded Linux ---&gt;
    Init Utilities ---&gt;
    [* ] init 此处选上

3.env.cfg修改
    init=/init
    rdinit=/rdinit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-2应用移植" tabindex="-1"><a class="header-anchor" href="#_10-2应用移植" aria-hidden="true">#</a> 10.2应用移植</h2><p>在Tina Linux SDK中一个软件包目录下通常包含如下两个目录和一个文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package/&lt;分类&gt;/&lt;软件包名&gt;/Makefile
package/&lt;分类&gt;/&lt;软件包名&gt;/patches/ [可选]
package/&lt;分类&gt;/&lt;软件包名&gt;/files/ [可选]
其中，
patches 保存补丁文件，在编译前会自动给源码打上所有补丁
files 保存软件包的源码，在编译时会对应源码覆盖源码中的源文件
Makefile 编译规则文件，
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-1-makefile范例" tabindex="-1"><a class="header-anchor" href="#_10-2-1-makefile范例" aria-hidden="true">#</a> 10.2.1 Makefile范例</h3><p>该Makefile的功能是<strong>软件源码的准备，编译和安装的过程，提供给Tina Linux识别和管理软件包的接口</strong>，软件的编译逻辑是由软件自身的Makefile决定，理论上和该Makefile(该Makefile只执行make命令和相关参数)无实质关系。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-10-2-1.jpg" alt="图10-2-1"></p><p>详注：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.如果是开源软件，软件包版本建议与下载软件包的版本一致。
2.以PKG开头的变量主要告诉编译系统去哪里下载软件包。
3.md5sum用于校验下载下来的软件包是否正确，如果正确，在编译该软件的时候，就会在PKG_BUILD_DIR下找到该软件包的源码。
4.Package/&lt;name&gt;: &lt;name&gt;用来指定该Package的名字，该名字会在配置系统中显示。
5.使用依赖包的名字&lt;name&gt;来指定依赖关系，如果是扩展包，前面添加一个”+”号，如果是内核版本依赖使用@LINUX_2_&lt;minor version&gt;。
6.如果该值为 1 ，该包将不会出现在配置菜单中，但会作为固定编译，可选。
7.在开源软件中一般用来生成Makefile，其中参数可以通过CONFIGURE_VARS来传递。
8.在开源软件中一般相当于执行make，其中有两个参数可以使用:MAKE_FLAGS和MAKE_VARS。
9.内置的几个关键字如下：
    INSTALL_DIR相当于install -d m0755
    INSTALL_BIN相当于install -m0755
    INSTALL_DATA相当于install -m0644
    INSTALL_CONF相当于install -m0600
10.该Makefile的所有define部分都是为该宏的参数做的定义.上层Makefile通过调用此宏进行编译。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-2-自启动设置" tabindex="-1"><a class="header-anchor" href="#_10-2-2-自启动设置" aria-hidden="true">#</a> 10.2.2 自启动设置</h3><p>在Tina Linux中支持两种格式的初始化脚本，一种是busybox式或者sysV式的初始化脚本， 一种是procd式的初始化脚本。一般我们把<strong>由初始化脚本启动的应用叫做服务</strong>。</p><p>初始化脚本以shell脚本的编程语言组织，shell脚本作为基础知识在此不展开说明。一般情况 下，初始化脚本源码保存在软件的files目录，且后缀为“.init”，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina/package/system/fstools/files/fstab.init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Makefile的install中把初始化脚本安装到小机端的/etc/init.d中，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>define Package/block-mount/install
$(INSTALL_DIR) $(1)/etc/init.d/
$(INSTALL_BIN) ./files/fstab.init $(1)/etc/init.d/fstab
endef
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-2-2-1调用自启动脚本" tabindex="-1"><a class="header-anchor" href="#_10-2-2-1调用自启动脚本" aria-hidden="true">#</a> 10.2.2.1调用自启动脚本.</h4><ul><li>手动调用方式在启动的时候会有太多的log，且log信息已被logd守护进程收集，不利于我们 调试初始化脚本，此时可通过小机端的命令行手动调用的形式来调试，例如：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux: /# /etc/init.d/fstab start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_10-2-2-2-sysv格式脚本" tabindex="-1"><a class="header-anchor" href="#_10-2-2-2-sysv格式脚本" aria-hidden="true">#</a> 10.2.2.2 sysV格式脚本</h4><p>sysV式的初始化脚本保存在小机端的/etc/init.d/目录下，实现开机自启动。下例以最小内容的初 始化脚本作示例讲解，核心是实现start/stop函数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh /etc/rc.common
# Example script
# Copyright (C) 2007 OpenWrt.org
START=10
STOP=15
DEPEND=xxxx
start() {
#commands to launch application
}
stop() {
#commands to kill application
}
注意：
START=10， 指明开机启动优先级(序列) [数值越小， 越先启动]，取值范围0-99。
STOP=15， 指明关机停止优先级(序列) [数值越小， 越先关闭]，取值范围0-99。
DEPEND=xxxx， 指明初始化脚本会并行执行，通过此项配置确保执行的依赖。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">属性</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;">start</td><td style="text-align:left;">必须实现</td><td style="text-align:left;">启动一个服务</td></tr><tr><td style="text-align:left;">stop</td><td style="text-align:left;">必须实现</td><td style="text-align:left;">停止一个服务</td></tr><tr><td style="text-align:left;">reload</td><td style="text-align:left;">可选实现</td><td style="text-align:left;">重启一个服务</td></tr><tr><td style="text-align:left;">enable</td><td style="text-align:left;">可选实现</td><td style="text-align:left;">重新加载服务</td></tr><tr><td style="text-align:left;">disable</td><td style="text-align:left;">可选实现</td><td style="text-align:left;">禁用服务</td></tr></tbody></table><p>在shell里面可以使用如下的命令来操作相关的服务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ root@TinaLinux:/# /etc/init.d/exmple restart|start|stop|reload|enable|disable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_10-2-2-3-procd格式脚本" tabindex="-1"><a class="header-anchor" href="#_10-2-2-3-procd格式脚本" aria-hidden="true">#</a> 10.2.2.3 procd格式脚本</h4><p>以下例的初始化脚本作示例讲解，主要是实现函数start_service：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh /etc/rc.common
USE_PROCD=1
PROG=xxxx
START=10
STOP=15
DEPEND=xxxx
start_service() {
procd_open_instance
procd_set_param command $PROG -f
......
procd_close_instance
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>详细的介绍可以参考：https://wiki.openwrt.org/inbox/procd-init-scripts。</p><h2 id="_10-3应用调试" tabindex="-1"><a class="header-anchor" href="#_10-3应用调试" aria-hidden="true">#</a> 10.3应用调试</h2><p>新添加的软件默认配置为不使能，此时需要手动配置使能软件包。通过在tina的根目录执行 make menuconfig进入软件包的配置界面：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-10-1.jpg" alt="图10-1:应用配置主界面"></p><p>软件包的所在路径与软件包的Makefile中的定义有关，以fstools为例，在Makefile中定义 为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>define Package/fstools
    SECTION:=base
    CATEGORY:=Base system
    DEPENDS:=+ubox +USE_GLIBC:librt +NAND_SUPPORT:ubi-utils
    TITLE:=OpenWrt filesystem tools
    MENU:=1
endef
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，只需要在menuconfig界面中进入Basy system即可找到fstools的软件包。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/OpenRemoved_Tina_Linux_System_software_development_Guide-10-2.jpg" alt="图10-2:软件包所在界面"></p><p>前缀符号含义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[*] 或&lt;*&gt; ： 编译进入SDK
[ ] 或&lt; &gt; ： 不包含
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>支持操作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Y或y：选择包含
N或n：取消选择
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-4应用编译" tabindex="-1"><a class="header-anchor" href="#_10-4应用编译" aria-hidden="true">#</a> 10.4应用编译</h2><p>详见重编应用章节。</p><h2 id="_10-5应用安装" tabindex="-1"><a class="header-anchor" href="#_10-5应用安装" aria-hidden="true">#</a> 10.5应用安装</h2><ol><li>获取安装包</li></ol><p>安装包一般位于目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina/out/&lt;方案&gt;/packages/base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装包命名格式为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;应用名&gt;_&lt;应用版本&gt;-&lt;应用释放版本&gt;_sunxi.ipk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>安装应用包</li></ol><p>通过adb推送安装包到小机：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ adb push &lt;安装包路径&gt; &lt;推送到小机路径&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装应用包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ opkg install &lt;安装包路径&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_10-6分区与挂载" tabindex="-1"><a class="header-anchor" href="#_10-6分区与挂载" aria-hidden="true">#</a> 10.6分区与挂载</h2><ul><li>升级分区</li></ul><table><thead><tr><th style="text-align:left;">分区</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;">boot分区</td><td style="text-align:left;">存内核镜像</td></tr><tr><td style="text-align:left;">rootfs分区</td><td style="text-align:left;">基础系统镜像分区，包含/lib，/bin，/etc等</td></tr><tr><td style="text-align:left;">recovery分区</td><td style="text-align:left;">存放恢复系统镜像，仅大容量方案有，详见OTA文档</td></tr><tr><td style="text-align:left;">extend分区</td><td style="text-align:left;">存放恢复系统镜像及rootfs的usr部分，仅小容量方案有，详见OTA文档</td></tr></tbody></table><ul><li>不升级分区</li></ul><table><thead><tr><th style="text-align:left;">分区</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;">private分区</td><td style="text-align:left;">存储SN号分区</td></tr><tr><td style="text-align:left;">misc分区</td><td style="text-align:left;">系统状态、刷机状态分区</td></tr><tr><td style="text-align:left;">UDISK分区</td><td style="text-align:left;">用户数据分区，一般挂载在/mnt/UDISK</td></tr><tr><td style="text-align:left;">overlayfs分区</td><td style="text-align:left;">存储overlayfs覆盖数据</td></tr></tbody></table><ul><li>默认挂载点</li></ul><table><thead><tr><th style="text-align:left;">分区</th><th style="text-align:left;">挂载点</th><th style="text-align:left;">备注</th></tr></thead><tbody><tr><td style="text-align:left;">/dev/by-name/boot</td><td style="text-align:left;">/boot</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">/dev/by-name/boot-res</td><td style="text-align:left;">/boot-res</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">/dev/by-name/UDISK</td><td style="text-align:left;">/mnt/UDISK</td><td style="text-align:left;">用户数据分区</td></tr><tr><td style="text-align:left;">/dev/mmcblk0或/dev/mmcblk0p1</td><td style="text-align:left;">/mnt/SDCARD</td><td style="text-align:left;">Tf卡挂载点</td></tr><tr><td style="text-align:left;">/dev/by-name/rootfs_data</td><td style="text-align:left;">/overlay</td><td style="text-align:left;">存储overlayfs覆盖数据</td></tr></tbody></table>`,307),l=[d];function s(r,c){return i(),n("div",null,l)}const o=e(a,[["render",s],["__file","Linux_SystemSoftware_DevelopmentGuide.html.vue"]]);export{o as default};
