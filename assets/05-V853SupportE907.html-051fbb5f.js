import{_ as e,o as i,c as n,e as s}from"./app-5cc5893e.js";const d={},a=s(`<h1 id="开发板支持e907小核开发" tabindex="-1"><a class="header-anchor" href="#开发板支持e907小核开发" aria-hidden="true">#</a> 开发板支持E907小核开发</h1><h2 id="_0-前言" tabindex="-1"><a class="header-anchor" href="#_0-前言" aria-hidden="true">#</a> 0.前言</h2><p>​ 100ASK_V853-PRO开发板的V853芯片集成Arm Cortex-A7和RISC-V E907 双CPU，玄铁E907 是一款完全可综合的高端 MCU 处理器。它兼容 RV32IMAC 指令集，提供可观的整型性能提升以及高能效的浮点性能。E907 的主要特性包括：单双精度浮点单元，以及快速中断响应。下图为RISC-V E907 核的介绍。</p><p><img src="https://bbs.aw-ol.com/assets/uploads/files/1677222896251-934bf475-964e-4113-b4ac-9a19c4bc8783-图片.png" alt="img"></p><p>本章主要讲述如何E907小核进行开发并与Arm A7大核进行通信。</p><p>平头哥E907官网：https://www.t-head.cn/product/E907?spm=a2ouz.12986968.0.0.7bfc2cbdcYnL2b</p><p>E907芯片资源下载中心：https://occ.t-head.cn/community/download?id=3916180248689188864</p><p>全志E907开发指南：https://tina.100ask.net/SdkModule/Linux_E907_DevelopmentGuide-01/</p><p>Yuzuki大佬的V85x E907 小核开发与使用：https://www.gloomyghost.com/live/20230215.aspx</p><h2 id="_1-配置e907环境" tabindex="-1"><a class="header-anchor" href="#_1-配置e907环境" aria-hidden="true">#</a> 1.配置E907环境</h2><p>E907_RTOS BSP包：https://github.com/YuzukiHD/Yuzukilizard/tree/master/Software/BSP/e907_rtos</p><p>E907编译工具链： https://github.com/YuzukiHD/Yuzukilizard/releases/download/Compiler.0.0.1/riscv64-elf-x86_64-20201104.tar.gz</p><p>感谢Yuzuki大佬的V851S的仓库提供的E907_RTOS源码，这里我将E907开发包放在百度网盘中，方便大家获取。链接为：</p><p>链接：https://pan.baidu.com/s/1TX742vfEde9bMLd9IrwwqA?pwd=sp6a 提取码：sp6a</p><p>您可以在百度网盘的V853资料光盘中09_E907开发包中获取到<code>e907_rtos.tar.gz</code></p><h2 id="_1-1-编译e907源码" tabindex="-1"><a class="header-anchor" href="#_1-1-编译e907源码" aria-hidden="true">#</a> 1.1 编译E907源码</h2><p>将下载完成的E907开发包放在任意目录下，假设放在<code>/home/book/workspaces</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ ls
e907_rtos.tar.gz   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解压e907源码压缩包，输入<code>tar -xzvf e907_rtos.tar.gz </code>，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ tar -xzvf e907_rtos.tar.gz 
e907_rtos/
e907_rtos/README.md
e907_rtos/rtos/
e907_rtos/rtos/LICENSE
e907_rtos/rtos/toolchain/
e907_rtos/rtos/toolchain/riscv64-elf-x86_64-20201104/
e907_rtos/rtos/toolchain/riscv64-elf-x86_64-20201104/libexec/
e907_rtos/rtos/toolchain/riscv64-elf-x86_64-20201104/libexec/gcc/
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解压完成后，进入e907源码目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ cd e907_rtos/
book@100ask:~/workspaces/e907_rtos$ ls
README.md  rtos  rtos-hal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入<code>rtos/source/</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos$ cd rtos/source/
book@100ask:~/workspaces/e907_rtos/rtos/source$ ls
disfunc.sh  ekernel   envsetup.sh  Kbuild   Kconfig.melis     Makefile      modules.order  platform.txt  scripts
drivers     emodules  include      Kconfig  Kconfig.platform  melis-env.sh  out            projects      tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置编译环境变量，输入<code>source melis-env.sh</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ source melis-env.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入<code>lunch</code>选中对应的开发板</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ lunch

You&#39;re building on Linux 100ask 5.4.0-148-generic #165~18.04.1-Ubuntu SMP Thu Apr 20 01:14:06 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux

Lunch menu... pick a combo:
The supported board:
    1. v851-e907-lizard
    2. v851-e907-lizard-tinymaix
    3. v853-e907-100ask
    4. v853-e907-100ask-tinymaix
What is your choice? 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时输入3，并按回车。选择<code>v853-e907-100ask</code>方案，选择完成后会如下所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ lunch

You&#39;re building on Linux 100ask 5.4.0-148-generic #165~18.04.1-Ubuntu SMP Thu Apr 20 01:14:06 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux

Lunch menu... pick a combo:
The supported board:
    1. v851-e907-lizard
    2. v851-e907-lizard-tinymaix
    3. v853-e907-100ask
    4. v853-e907-100ask-tinymaix
What is your choice? 3
You have select v853-e907-100ask 
============================================
Project Based On Platform sun20iw3p1 v853-e907-100ask
============================================
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时即可进行编译，输入<code>make</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ make
scripts/kconfig/conf  --silentoldconfig Kconfig
  CHK     include/config/kernel.release
  CHK     include/generated/uapi/melis/version.h
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
  UPD     include/generated/uapi/melis/version.h
  CHK     include/generated/utsrelease.h
  CC      sysconfig.fex
  CC      ekernel/arch/common/common.o
  LD      ekernel/arch/common/built-in.o
  AS      ekernel/arch/riscv/sunxi/blobdata.o
  LD      ekernel/arch/riscv/sunxi/built-in.o
  LD      ekernel/arch/riscv/built-in.o
  LD      ekernel/arch/built-in.o
  LD      ekernel/built-in.o
  LD [M]  ekernel/melis30.o
/home/book/workspaces/e907_rtos/rtos/source/../toolchain/riscv64-elf-x86_64-20201104//bin/riscv64-unknown-elf-ld: ekernel/melis30.o: section .dram_seg.stack lma 0x43c3a2b8 adjusted to 0x43c3a34c
  OBJCOPY ekernel/melis30.bin
  RENAME  ekernel/melis30.o ----&gt; ekernel/melis30.elf
/home/book/workspaces/e907_rtos/rtos/source/../toolchain/riscv64-elf-x86_64-20201104//bin/riscv64-unknown-elf-strip: ekernel/stW7SdkR: section .dram_seg.stack lma 0x43c3a2b8 adjusted to 0x43c3a34c

   text    data     bss     dec     hex filename
 221280   17132   25488  263900   406dc ekernel/melis30.elf

  pack    melis

#### make completed successfully (11 seconds) ####
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译完成后会在当前目录的<code>ekernel/</code>下生成一个<code>melis30.elf</code>文件，该文件即可用于启动小核。</p><h3 id="_1-2-e907配置项" tabindex="-1"><a class="header-anchor" href="#_1-2-e907配置项" aria-hidden="true">#</a> 1.2 E907配置项</h3><p>​ E907开发包的配置与Tina SDK的配置类似，在<code>e907_rtos/rtos/source</code>目录下，执行<code>make menuconfig</code></p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完成后会进入如下界面：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504112330976.png" alt="image-20230504112330976"></p><h2 id="_2-加载e907小核" tabindex="-1"><a class="header-anchor" href="#_2-加载e907小核" aria-hidden="true">#</a> 2.加载E907小核</h2><h3 id="_2-1-tina配置" tabindex="-1"><a class="header-anchor" href="#_2-1-tina配置" aria-hidden="true">#</a> 2.1 Tina配置</h3><h4 id="_2-1-1-设备树配置" tabindex="-1"><a class="header-anchor" href="#_2-1-1-设备树配置" aria-hidden="true">#</a> 2.1.1 设备树配置</h4><p>​ 在Tina根目录下，进入设备树目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ cd device/config/chips/v853/configs/100ask/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编辑设备树</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ vi board.dts 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在设备树文件中找到E907相关的设备树节点，设备树默认设置为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>reserved-memory {
                e907_dram: riscv_memserve {
                        reg = &lt;0x0 0x48000000 0x0 0x00400000&gt;;
                        no-map;
                };

                vdev0buffer: vdev0buffer@47000000 {
                        /* 256k reserved for shared mem pool */
                        compatible = &quot;shared-dma-pool&quot;;
                        reg = &lt;0x0 0x47000000 0x0 0x40000&gt;;
                        no-map;
                };

                vdev0vring0: vdev0vring0@47040000 {
                        reg = &lt;0x0 0x47040000 0x0 0x20000&gt;;
                        no-map;
                };

                vdev0vring1: vdev0vring1@47060000 {
                        reg = &lt;0x0 0x47060000 0x0 0x20000&gt;;
                        no-map;
                };
        };

        e907_rproc: e907_rproc@0 {
                compatible = &quot;allwinner,sun8iw21p1-e907-rproc&quot;;
                clock-frequency = &lt;600000000&gt;;
                memory-region = &lt;&amp;e907_dram&gt;, &lt;&amp;vdev0buffer&gt;,
                                                &lt;&amp;vdev0vring0&gt;, &lt;&amp;vdev0vring1&gt;;

                mboxes = &lt;&amp;msgbox 0&gt;;
                mbox-names = &quot;mbox-chan&quot;;
                iommus = &lt;&amp;mmu_aw 5 1&gt;;

                memory-mappings =
                /* DA            len         PA */
                        /* DDR for e907  */
                        &lt; 0x48000000 0x00400000 0x48000000 &gt;;
                core-name = &quot;sun8iw21p1-e907&quot;;
                firmware-name = &quot;melis-elf&quot;;
                status = &quot;okay&quot;;
        };

        rpbuf_controller0: rpbuf_controller@0 {
                compatible = &quot;allwinner,rpbuf-controller&quot;;
                remoteproc = &lt;&amp;e907_rproc&gt;;
                ctrl_id = &lt;0&gt;;  /* index of /dev/rpbuf_ctrl */
                iommus = &lt;&amp;mmu_aw 5 1&gt;;
                status = &quot;okay&quot;;
        };

        rpbuf_sample: rpbuf_sample@0 {
                compatible = &quot;allwinner,rpbuf-sample&quot;;
                rpbuf = &lt;&amp;rpbuf_controller0&gt;;
                status = &quot;okay&quot;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们需要使用<code>uart3</code>打印E907小核的打印信息，为防止内核抢占<code>uart3</code>，所以需要禁用<code>uart3</code>节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;uart3 {
        pinctrl-names = &quot;default&quot;, &quot;sleep&quot;;
        pinctrl-0 = &lt;&amp;uart3_pins_active&gt;;
        pinctrl-1 = &lt;&amp;uart3_pins_sleep&gt;;
        uart-supply = &lt;&amp;reg_dcdc1&gt;;
        status = &quot;okay&quot;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改设备树复用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>uart3_pins_active: uart3@0 {
                allwinner,pins = &quot;PH0&quot;, &quot;PH1&quot;;
                allwinner,function = &quot;uart3&quot;;
                allwinner,muxsel = &lt;5&gt;;
                allwinner,drive = &lt;1&gt;;
                allwinner,pull = &lt;1&gt;;
        };

        uart3_pins_sleep: uart3@1 {
                allwinner,pins = &quot;PH0&quot;, &quot;PH1&quot;;
                allwinner,function = &quot;gpio_in&quot;;
                allwinner,muxsel = &lt;0&gt;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-内核配置" tabindex="-1"><a class="header-anchor" href="#_2-1-2-内核配置" aria-hidden="true">#</a> 2.1.2 内核配置</h4><p>在Tina根目录下，执行<code>make kernel_menuconfig</code>，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>1.使能硬件支持</strong></p><p>进入内核配置界面后，进入<code>Device Drivers </code>目录，选中<code>Mailbox Hardware Support</code>，如下图所示</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504145616213.png" alt="image-20230504145616213"></p><p>选中后进入<code>Mailbox Hardware Support</code>目录中，选中<code>sunxi Mailbox</code>和<code>sunxi rv32 standby driver</code>，选中完成后如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504145817407.png" alt="image-20230504145817407"></p><p><strong>2.使能RPMsg驱动</strong></p><p>进入如下目录中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Rpmsg drivers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选中如下配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;*&gt; allwinnertech rpmsg driver for v853-e907
&lt;*&gt; allwinnertech rpmsg hearbeat driver
&lt;*&gt; sunxi rpmsg ctrl driver
&lt;*&gt; Virtio RPMSG bus driver 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选中完成后如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504145408205.png" alt="image-20230504145408205"></p><p><strong>3.使能共享内存驱动</strong></p><p>​ 进入如下目录中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Remoteproc drivers 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选中如下配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;*&gt; SUNXI remote processor support  ---&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504150510997.png" alt="image-20230504150510997"></p><p>修改完成后，保存内核配置并退出。</p><h4 id="_2-1-3-编译新镜像" tabindex="-1"><a class="header-anchor" href="#_2-1-3-编译新镜像" aria-hidden="true">#</a> 2.1.3 编译新镜像</h4><p>在Tina根目录下，输入<code>make</code>编译刚刚选中的内核驱动，编译完成后，输入<code>pack</code>，打包生成新镜像。例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make
...
book@100ask:~/workspaces/tina-v853-open$ pack
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成新镜像后，将生成的<code>v853_linux_100ask_uart0.img</code>文件拷贝到Windows主机端。</p><h3 id="_2-2-e907配置" tabindex="-1"><a class="header-anchor" href="#_2-2-e907配置" aria-hidden="true">#</a> 2.2 E907配置</h3><h4 id="_2-2-1-修改e907链接脚本" tabindex="-1"><a class="header-anchor" href="#_2-2-1-修改e907链接脚本" aria-hidden="true">#</a> 2.2.1 修改E907链接脚本</h4><p>​ 进入目录<code>e907_rtos/rtos/source/projects/v853-e907-100ask</code>中，找到<code>kernel.lds</code>文件，该文件保存有E907小核的链接信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source/projects/v853-e907-100ask$ ls
configs  data  epos.img  kernel.lds  src  version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>kernel.lds</code>，找到<code>MEMORY</code>节点，修改起始地址为<code>0x48000000</code>，长度为<code>0x00400000</code>。此参数需要和Tina设备树中的E907内存参数一致，所以可修改<code>MEMORY</code>节点参数为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MEMORY
{
   /*DRAM_KERNEL: 4M */
   DRAM_SEG_KRN (rwx) : ORIGIN = 0x48000000, LENGTH = 0x00400000
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两者对比图如下：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504152546509.png" alt="image-20230504152546509"></p><p>这里使用的<code>0x48000000</code>是假设V853拥有128M的内存，可设置十六进制为为<code>0x48000000</code>；长度为4M，十六进制为<code>0x00400000</code></p><h4 id="_2-2-2-修改e907配置" tabindex="-1"><a class="header-anchor" href="#_2-2-2-修改e907配置" aria-hidden="true">#</a> 2.2.2 修改E907配置</h4><p>进入<code>e907_rtos/rtos/source/projects/v853-e907-100ask/configs</code>目录下，修改<code>defconfig</code>文件，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source/projects/v853-e907-100ask$ cd configs/
book@100ask:~/workspaces/e907_rtos/rtos/source/projects/v853-e907-100ask/configs$ ls
defconfig  sys_config.fex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改下面三个参数为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CONFIG_DRAM_PHYBASE=0x48000000
CONFIG_DRAM_VIRTBASE=0x48000000
CONFIG_DRAM_SIZE=0x0400000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504153420513.png" alt="image-20230504153420513"></p><h4 id="_2-2-3-使用uart3输出信息" tabindex="-1"><a class="header-anchor" href="#_2-2-3-使用uart3输出信息" aria-hidden="true">#</a> 2.2.3 使用uart3输出信息</h4><p><strong>1.修改引脚复用</strong></p><p>配置引脚复用文件，进入<code>e907_rtos/rtos/source/projects/v853-e907-100ask/configs</code>目录下</p><p>修改<code>sys_config.fex</code>文件，通过查询数据手册，查看引脚复用功能，我们使用PH0和PH1作为<code>uart3</code>功能</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504161901226.png" alt="image-20230504161901226"></p><p>修改uart3节点为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[uart3]
uart_tx         = port:PH00&lt;5&gt;&lt;1&gt;&lt;default&gt;&lt;default&gt;
uart_rx         = port:PH01&lt;5&gt;&lt;1&gt;&lt;default&gt;&lt;default&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.修改配置</strong></p><p>在<code>e907_rtos/rtos/source</code>目录下输入<code>make menuconfig</code>，进入E907配置界面</p><p>进入如下目录，选中<code>[*] Support Serial Driver</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> → Kernel Setup 
 	→ Drivers Setup 
 		→ Melis Source Support
 			[*] Support Serial Driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504155321387.png" alt="image-20230504155321387"></p><p>进入如下目录，选中<code>[*] enable sysconfig</code>，启用读取解析 sys_config.fex 功能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> → Kernel Setup 
 	→ Drivers Setup 
 		→ SoC HAL Drivers 
 			→ Common Option 
 				[*] enable sysconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504155644570.png" alt="image-20230504155644570"></p><p>进入如下目录中，启用uart驱动，并使用uart3。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> → Kernel Setup 
 	→ Drivers Setup 
 		→ SoC HAL Drivers 
 			→ UART Devices
 				[*] enable uart driver 
 				[*]   support uart3 device
 				(3)   cli uart port number 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504155927822.png" alt="image-20230504155927822"></p><p>进入如下目录，启用sys_config.fex 解析器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> → Kernel Setup 
 	→ Subsystem support 
 		→ devicetree support 
 			[*] support traditional fex configuration method parser. 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504160213237.png" alt="image-20230504160213237"></p><p>保存并退出E907配置。</p><h4 id="_2-2-4-编译生成新镜像" tabindex="-1"><a class="header-anchor" href="#_2-2-4-编译生成新镜像" aria-hidden="true">#</a> 2.2.4 编译生成新镜像</h4><p>在<code>workspaces/e907_rtos/rtos/source</code>目录下，输入<code>make</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/e907_rtos/rtos/source$ make
  CHK     include/config/kernel.release
  CHK     include/generated/uapi/melis/version.h
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
fatal: not a git repository (or any parent up to mount point /)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
  UPD     include/generated/uapi/melis/version.h
  CHK     include/generated/utsrelease.h
  CC      sysconfig.fex
  CC      ekernel/arch/common/common.o
  LD      ekernel/arch/common/built-in.o
  AS      ekernel/arch/riscv/sunxi/blobdata.o
  LD      ekernel/arch/riscv/sunxi/built-in.o
  LD      ekernel/arch/riscv/built-in.o
  LD      ekernel/arch/built-in.o
  LD      ekernel/built-in.o
  LD [M]  ekernel/melis30.o
/home/book/workspaces/e907_rtos/rtos/source/../toolchain/riscv64-elf-x86_64-20201104//bin/riscv64-unknown-elf-ld: ekernel/melis30.o: section .dram_seg.stack lma 0x4803a2b8 adjusted to 0x4803a34c
  OBJCOPY ekernel/melis30.bin
  RENAME  ekernel/melis30.o ----&gt; ekernel/melis30.elf
/home/book/workspaces/e907_rtos/rtos/source/../toolchain/riscv64-elf-x86_64-20201104//bin/riscv64-unknown-elf-strip: ekernel/stWPSq13: section .dram_seg.stack lma 0x4803a2b8 adjusted to 0x4803a34c

   text    data     bss     dec     hex filename
 221280   17132   25488  263900   406dc ekernel/melis30.elf

  pack    melis

#### make completed successfully (7 seconds) ####
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译完成后会在<code>ekernel</code>目录下生成的<code>melis30.elf</code>。</p><h3 id="_2-3-检查开发板硬件" tabindex="-1"><a class="header-anchor" href="#_2-3-检查开发板硬件" aria-hidden="true">#</a> 2.3 检查开发板硬件</h3><p>​ 经过测试发现在100ASK_V853-PRO开发板上的R36电阻会导致<code>uart3</code>波特率过高，所以需要检查开发板上的R36电阻是否存在，如果存在需要手动去掉该电阻。下图为存在R36电阻的位置情况，红框内即为R36电阻</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230505100755222.png" alt="image-20230505100755222"></p><p>如果电阻存在需要手动去除，下图为去除R36电阻的示意图</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230505111423226.png" alt="image-20230505111423226"></p><p>去除R36电阻后，即可正常访问<code>uart3</code>串口。</p><h3 id="_2-4-开发板内使能e907" tabindex="-1"><a class="header-anchor" href="#_2-4-开发板内使能e907" aria-hidden="true">#</a> 2.4 开发板内使能E907</h3><p>使用全志烧写工具<code>AllwinnertechPhoeniSuit</code>更新Tina新镜像，详情请参考https://forums.100ask.net/t/topic/2882</p><p>更新完成后，打开串口终端进入开发板控制台，将<code>melis30.elf</code>拷贝到<code>/lib/firmware</code>目录下。</p><p>假设我使用ADB功能将文件拷贝到开发板的<code>root/</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cd /root/
root@TinaLinux:~# ls
melis30.elf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将<code>root</code>目录下的<code>melis30.elf</code>拷贝到<code>/lib/firmware</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cp melis30.elf /lib/firmware/
root@TinaLinux:~# ls /lib/firmware/
boot_xr829.bin   fw_xr829.bin     melis30.elf      sdd_xr829.bin
etf_xr829.bin    fw_xr829_bt.bin  regulatory.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拷贝完成后，可以在<code>/lib/firmware</code>目录下，看到小核固件。</p><h4 id="_2-4-1-连接开发板的uart3" tabindex="-1"><a class="header-anchor" href="#_2-4-1-连接开发板的uart3" aria-hidden="true">#</a> 2.4.1 连接开发板的uart3</h4><p>​ 此时需要使用USB转串口模块，连接我们上面设置的<code>uart3</code>。我们需要找到开发板上的PH0、PH1、GND，分别连接到USB转串口模块的RXD、TXD、GND。100ASK_V853-PRO开发板已经将PH0、PH1、GND引出来，位置图图下所示</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504175344715.png" alt="image-20230504175344715"></p><p>具体的引脚可查看开发板背面的丝印，确认引脚位置。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504175534607.png" alt="image-20230504175534607"></p><p>通过背面的丝印可以知道PH0、PH1、GND的位置，如下图所示，PH0、PH1、GND，分别连接到USB转串口模块的RX、TX、GND。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230504180138631.png" alt="image-20230504180138631"></p><p>连接完成后将USB转串口模块插入windows主机端后，使用串口软件打开uart3串口界面，波特率为115200。</p><p>在Tina Linux开发板串口终端输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# echo melis30.elf &gt; /sys/kernel/debug/remoteproc/remoteproc0/firmware 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将<code>melis30.elf</code>固件放在硬件节点<code>firmware </code>下，启动E907固件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# echo start &gt; /sys/kernel/debug/remoteproc/remoteproc0/state
[ 3926.510018]  remoteproc0: powering up e907_rproc
[ 3926.515440]  remoteproc0: failed to parser head (melis30.elf) ret=-2
[ 3926.522674]  remoteproc0: failed to read boot_package item
[ 3926.528930]  remoteproc0: request_firmware failed from boot_package: -14
[ 3926.537528] virtio_rpmsg_bus virtio0: rpmsg host is online
[ 3926.543964]  remoteproc0: registered virtio0 (type 7)
[ 3926.550538]  remoteproc0: remote processor e907_rproc is now up
root@TinaLinux:~# [ 3926.560537] virtio_rpmsg_bus virtio0: creating channel rpbuf-service addr 0x400
[ 3926.569199] virtio_rpmsg_bus virtio0: creating channel sunxi,rpmsg_heartbeat addr 0x401
[ 3926.578725] virtio_rpmsg_bus virtio0: creating channel sunxi,notify addr 0x402
[ 3926.587194] virtio_rpmsg_bus virtio0: creating channel sunxi,rpmsg_ctrl addr 0x403
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使能后可以在另一个串口界面看到如下打印信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|commitid: 
|halgitid: 
|timever : Thu, 04 May 2023 04:22:23 -0400

scheduler startup
msh &gt;Start Rpmsg Hearbeat Timer
rpmsg ctrldev: Start Running...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下回车即可进入终端界面。</p><p>输入<code>ps</code>即可看见小核进程信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;ps
thread                           pri  status      sp     stack size max used left tick  error
-------------------------------- ---  ------- ---------- ----------  ------  ---------- ---
tshell                            21  ready   0x000003e8 0x00004000    19%   0x00000008 000
ctrldev                            6  suspend 0x00000148 0x00001000    08%   0x0000000a 000
rpmsg_srm                          8  suspend 0x000000f8 0x00000800    22%   0x0000000a 000
vring-ipi                         15  suspend 0x00000118 0x00002000    03%   0x0000000a 000
rpbuf_init                         8  suspend 0x000000e8 0x00001000    12%   0x0000000a 000
standby                            1  suspend 0x00000128 0x00001000    07%   0x0000000a 000
tidle                             31  ready   0x00000178 0x00002000    04%   0x0000001e 000
timer                              8  suspend 0x000000d8 0x00000200    73%   0x0000000a 000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-双核通信" tabindex="-1"><a class="header-anchor" href="#_3-双核通信" aria-hidden="true">#</a> 3.双核通信</h2><h3 id="_3-1-e907小核创建通讯节点" tabindex="-1"><a class="header-anchor" href="#_3-1-e907小核创建通讯节点" aria-hidden="true">#</a> 3.1 E907小核创建通讯节点</h3><p>在E907小核串口终端建立两个通讯节点用于监听数据，输入<code>eptdev_bind test 2</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;eptdev_bind test 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看监听节点，输入<code>rpmsg_list_listen</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;rpmsg_list_listen
name             listen  alive
test             2  0
console                  100  0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-大核创建通讯节点" tabindex="-1"><a class="header-anchor" href="#_3-2-大核创建通讯节点" aria-hidden="true">#</a> 3.2 大核创建通讯节点</h3><p>在Tina LInux下也创建两个通讯监听节点，输入以下两个命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo test &gt; /sys/class/rpmsg/rpmsg_ctrl0/open
echo test &gt; /sys/class/rpmsg/rpmsg_ctrl0/open
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输入后，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# echo test &gt; /sys/class/rpmsg/rpmsg_ctrl0/open
[ 5060.227158] virtio_rpmsg_bus virtio0: creating channel sunxi,rpmsg_client addr 0x404
s/rpmsg/rpmsg_ctrl0/openroot@TinaLinux:~# echo test &gt; /sys/class/rpmsg/rpmsg_ctrl0/open
[ 5061.464758] virtio_rpmsg_bus virtio0: creating channel sunxi,rpmsg_client addr 0x405
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在大核TIna Linux中也创建了两个监听节点，输入<code>ls /dev/rpmsg*</code>查看节点信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# ls /dev/rpmsg*
/dev/rpmsg0       /dev/rpmsg1       /dev/rpmsg_ctrl0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建完成后，可以在E907小核终端中查看自动输出的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;ctrldev: Rx 44 Bytes
client: Rx 8 Bytes
rpmsg0: binding
send 0x13131411 to rpmsg0
create rpmsg0 client success
ctrldev: Rx 44 Bytes
client: Rx 8 Bytes
rpmsg1: binding
send 0x13131411 to rpmsg1
create rpmsg1 client success
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-大核传输至e907小核" tabindex="-1"><a class="header-anchor" href="#_3-3-大核传输至e907小核" aria-hidden="true">#</a> 3.3 大核传输至E907小核</h3><p>在Tina LInux下输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &quot;hello 100ASK_V853-PRO&quot; &gt; /dev/rpmsg0
echo &quot;hello Tina Linux&quot; &gt; /dev/rpmsg1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将<code>Linux Message 0</code>信息通过创建的监听节点传输到E907小核，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# echo &quot;hello 100ASK_V853-PRO&quot; &gt; /dev/rpmsg0
root@TinaLinux:~# echo &quot;hello Tina Linux&quot; &gt; /dev/rpmsg1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输入后，打开E907串口终端可以发现，大核传输过来的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rpmsg0: Rx 22 Bytes
Data:hello 100ASK_V853-PRO

rpmsg1: Rx 17 Bytes
Data:hello Tina Linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-e907小核传输至大核" tabindex="-1"><a class="header-anchor" href="#_3-4-e907小核传输至大核" aria-hidden="true">#</a> 3.4 E907小核传输至大核</h3><p>​ 在小核端需要使用命令 <code>eptdev_send</code> 用法 <code>eptdev_send &lt;id&gt; &lt;data&gt;</code>，这里的<code>id</code>号从0开始，我们设置有两个通信节点，所以id号分别为0和1。</p><p>​ 在小核的串口终端输入以下命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eptdev_send 0 &quot;hello E907&quot;
eptdev_send 1 &quot;hello E907&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;eptdev_send 0 &quot;hello E907&quot;
will send hello E907 to rpmsg0
msh &gt;eptdev_send 1 &quot;hello E907&quot;
will send hello E907 to rpmsg1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入完成后，小核会将信息分别传入rpmsg0和rpmsg1两个通讯节点。可以在大核Tina Linux端输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat /dev/rpmsg0
cat /dev/rpmsg1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可查看从E907小核传输过来的信息。例如:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cat /dev/rpmsg0
hello E907
^C
root@TinaLinux:~# cat /dev/rpmsg1
hello E907
^C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下Crtl+C结束监听前持续监听该节点。</p><p>​ 您可以在小核端多次传输信息到该节点，该节点支持持续接受小核传输的信息，例如：</p><p>在E907小核，多次传输信息到监听节点<code>rpmsg0</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
msh &gt;eptdev_send 0 &quot;hello E907 &quot;
will send hello E907  to rpmsg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在大核端则会一直接收到小核传输过来的信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cat /dev/rpmsg0
hello E907 hello E907 hello E907 hello E907 hello E907 hello E907 hello E907 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-关闭通讯" tabindex="-1"><a class="header-anchor" href="#_3-5-关闭通讯" aria-hidden="true">#</a> 3.5 关闭通讯</h3><p>​ 在大核Tina Linux端，操作节点即可，输入以下命令，<code>echo &lt;id&gt;</code>给到rpmsg的控制关闭节点即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo 0 &gt; /sys/class/rpmsg/rpmsg_ctrl0/close
echo 1 &gt; /sys/class/rpmsg/rpmsg_ctrl0/close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# echo 0 &gt; /sys/class/rpmsg/rpmsg_ctrl0/close
[ 6783.156899] virtio_rpmsg_bus virtio0: destroying channel sunxi,rpmsg_client addr 0x404
root@TinaLinux:~# echo 1 &gt; /sys/class/rpmsg/rpmsg_ctrl0/close
root@TinaLinux:~# [ 6784.224740] virtio_rpmsg_bus virtio0: destroying channel sunxi,rpmsg_client addr 0x405
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 此时E907小核端也会自动关闭通信节点，自动输出以下信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>send 0x13131411 to rpmsg0
rpmsg0: unbinding
ctrldev: Rx 44 Bytes
send 0x13131411 to rpmsg1
rpmsg1: unbinding
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,197),l=[a];function r(t,c){return i(),n("div",null,l)}const v=e(d,[["render",r],["__file","05-V853SupportE907.html.vue"]]);export{v as default};
