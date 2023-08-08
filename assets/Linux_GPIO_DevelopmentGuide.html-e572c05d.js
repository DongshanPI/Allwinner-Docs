import{_ as t,r as l,o as a,c as r,d as i,w as s,b as d,e}from"./app-5cc5893e.js";const p={},c=e('<h1 id="gpio开发手册" tabindex="-1"><a class="header-anchor" href="#gpio开发手册" aria-hidden="true">#</a> GPIO开发手册</h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1 概述</h2><h3 id="_1-1-编写目的" tabindex="-1"><a class="header-anchor" href="#_1-1-编写目的" aria-hidden="true">#</a> 1.1 编写目的</h3><p>本文档对内核的 GPIO 接口使用进行详细的阐述，让用户明确掌握 GPIO 配置、申请等操作的编程方法。</p><h3 id="_1-2-适用范围" tabindex="-1"><a class="header-anchor" href="#_1-2-适用范围" aria-hidden="true">#</a> 1.2 适用范围</h3>',5),u=e('<table><thead><tr><th>内核版本</th><th>驱动文件</th></tr></thead><tbody><tr><td>Linux-4.9 及以上</td><td>pinctrl-sunxi.c</td></tr></tbody></table><h3 id="_1-3-相关人员" tabindex="-1"><a class="header-anchor" href="#_1-3-相关人员" aria-hidden="true">#</a> 1.3 相关人员</h3><p>本文档适用于所有需要在 Linux 内核 sunxi 平台上开发设备驱动的相关人员。</p><h2 id="_2-模块介绍" tabindex="-1"><a class="header-anchor" href="#_2-模块介绍" aria-hidden="true">#</a> 2 模块介绍</h2><p>Pinctrl 框架是 linux 系统为统一各 SoC 厂商 pin 管理，避免各 SoC 厂商各自实现相同 pin 管理子系统而提出的。目的是为了减少 SoC 厂商系统移植工作量。</p><h3 id="_2-1-模块功能介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-模块功能介绍" aria-hidden="true">#</a> 2.1 模块功能介绍</h3><p>许多 SoC 内部都包含 pin 控制器，通过 pin 控制器，我们可以配置一个或一组引脚的功能和特性。在软件上，Linux 内核 pinctrl 驱动可以操作 pin 控制器为我们完成如下工作：</p><p><em>•</em> 枚举并且命名 pin 控制器可控制的所有引脚；</p><p><em>•</em> 提供引脚的复用能力</p><p><em>•</em> 提供配置引脚的能力，如驱动能力、上拉下拉、数据属性等。</p><p><em>•</em> 与 gpio 子系统的交互</p><p><em>•</em> 实现 pin 中断</p><h3 id="_2-2-相关术语介绍" tabindex="-1"><a class="header-anchor" href="#_2-2-相关术语介绍" aria-hidden="true">#</a> 2.2 相关术语介绍</h3>',13),v=e('<table><thead><tr><th>术语</th><th>解释说明</th></tr></thead><tbody><tr><td>SUNXI</td><td>Allwinner 一系列 SOC 硬件平台</td></tr><tr><td>Pin controller</td><td>是对硬件模块的软件抽象，通常用来表示硬件控制器。能够处理引脚复用、属性配置等功能</td></tr><tr><td>Pin</td><td>根据芯片不同的封装方式，可以表现为球形、针型等。软件上采用常用一组无符号的整数 [0-maxpin] 来表示</td></tr><tr><td>Pin groups</td><td>外围设备通常都不只一个引脚，比如 SPI，假设接在 SoC 的 {0,8,16,24} 管脚，而另一个设备 I2C 接在 SoC 的 {24,25} 管脚。我们可以说这里有两个pin groups。很多控制器都需要处理 pin groups。因此管脚控制器子系统需要一个机制用来枚举管脚组且检索一个特定组中实际枚举的管脚</td></tr><tr><td>Pinconfig</td><td>管脚可以被软件配置成多种方式，多数与它们作为输入/输出时的电气特性相关。例如，可以设置一个输出管脚处于高阻状态，或是 “三态”（意味着它被有效地断开连接）。或者可以通过设置将一个输入管脚与 VDD 或 GND 相连 (上拉/下拉)，以便在没有信号驱动管脚时使管脚拥有确认值</td></tr><tr><td>Pinmux</td><td>引脚复用功能，使用一个特定的物理管脚（ball/pad/finger/等等）进行多种扩展复用，以支持不同功能的电气封装习惯</td></tr><tr><td>Device tree</td><td>犹如它的名字，是一棵包括 cpu 的数量和类别、内存基地址、总线与桥、外设连接，中断控制器和 gpio 以及 clock 等系统资源的树，Pinctrl 驱动支持从device tree 中定义的设备节点获取 pin 的配置信息</td></tr></tbody></table><h3 id="_2-3-总体框架" tabindex="-1"><a class="header-anchor" href="#_2-3-总体框架" aria-hidden="true">#</a> 2.3 总体框架</h3><p>Sunxi Pinctrl 驱动模块的框架如下图所示，整个驱动模块可以分成 4 个部分：pinctrl api、pinctrl common frame、sunxi pinctrl driver，以及 board configuration。（图中最上面一层 device driver 表示 Pinctrl 驱动的使用者）</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_001.png" alt=""></p><p>​ 图 2-1: pinctrl 驱动整体框架图</p><p>Pinctrl api: pinctrl 提供给上层用户调用的接口。</p><p>Pinctrl framework：Linux 提供的 pinctrl 驱动框架。</p><p>Pinctrl sunxi driver：sunxi 平台需要实现的驱动。</p><p>Board configuration：设备 pin 配置信息，一般采用设备树进行配置。</p><h3 id="_2-4-state-pinmux-pinconfig" tabindex="-1"><a class="header-anchor" href="#_2-4-state-pinmux-pinconfig" aria-hidden="true">#</a> 2.4 state/pinmux/pinconfig</h3><p>Pinctrl framework 主要处理 pinstate、pinmux 和 pinconfig 三个功能，pinstate 和 pinmux、pinconfig 映射关系如下图所示。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_002.png" alt=""></p>',12),m=e(`<p>系统运行在不同的状态，pin 配置有可能不一样，比如系统正常运行时，设备的 pin 需要一组配置，但系统进入休眠时，为了节省功耗，设备 pin 需要另一组配置。Pinctrl framwork 能够有效管理设备在不同状态下的引脚配置。</p><h3 id="_2-5-源码结构介绍" tabindex="-1"><a class="header-anchor" href="#_2-5-源码结构介绍" aria-hidden="true">#</a> 2.5 源码结构介绍</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>linux
|
|-- drivers
| |-- pinctrl
| | |-- Kconfig
| | |-- Makefile
| | |-- core.c
| | |-- core.h
| | |-- devicetree.c
| | |-- devicetree.h
| | |-- pinconf.c
| | |-- pinconf.h
| | |-- pinmux.c
| | \`-- pinmux.h
| \`-- sunxi
| |-- pinctrl-sunxi-test.c
| |-- pinctrl-sun*.c
| \`-- pinctrl-sun*-r.c
\`-- include
\`-- linux
\`-- pinctrl
|-- consumer.h
|-- devinfo.h
|-- machine.h
|-- pinconf-generic.h
|-- pinconf.h
|-- pinctrl-state.h
|-- pinctrl.h
\`-- pinmux.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-模块配置" tabindex="-1"><a class="header-anchor" href="#_3-模块配置" aria-hidden="true">#</a> 3 模块配置</h2><h3 id="_3-1-kernel-menuconfig-配置" tabindex="-1"><a class="header-anchor" href="#_3-1-kernel-menuconfig-配置" aria-hidden="true">#</a> 3.1 kernel menuconfig 配置</h3><p>进入 longan 根目录，执行./build.sh menuconfig</p><p>进入配置主界面，并按以下步骤操作:</p><p>首先，选择 Device Drivers 选项进入下一级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_003.png" alt=""></p><p>​ 图 3-1: 内核 menuconfig 根菜单</p><p>选择 Pin controllers, 进入下级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_004.png" alt=""></p><p>​ 图 3-2: 内核 menuconfig device drivers 菜单</p><p>选择 Allwinner SoC PINCTRL DRIVER, 进入下级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_005.png" alt=""></p><p>​ 图 3-3: 内核 menuconfig pinctrl drivers 菜单</p><p>Sunxi pinctrl driver 默认编译进内核，如下图（以 sun50iw9p1 平台为例，其他平台类似）所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_006.png" alt=""></p><p>​ 图 3-4: 内核 menuconfig allwinner pinctrl drivers 菜单</p><h3 id="_3-2-device-tree-源码结构和路径" tabindex="-1"><a class="header-anchor" href="#_3-2-device-tree-源码结构和路径" aria-hidden="true">#</a> 3.2 device tree 源码结构和路径</h3><p>对于 Linux4.9：</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM64 CPU 而言，设备树的路径为：kernel/{KERNEL}/arch/arm64/boot/dts/sunxi/sun*-pinctrl.dtsi。</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM32 CPU 而言，设备树的路径为：kernel/{KERNEL}/arch/arm32/boot/dts/sun*-pinctrl.dtsi。</p><p><em>•</em> 板级设备树 (board.dts) 路径：/device/config/chips/{IC}/configs/{BOARD}/board.dts</p><p>device tree 的源码结构关系如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>board.dts
|--------sun*.dtsi
		     |------sun*-pinctrl.dtsi
		     |------sun*-clk.dtsi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 Linux5.4:</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM64 CPU 而言，5.4 内核中不再维护单独的 pinctrl 的 dtsi，直接将 pin 的信息放在了：kernel/{KERNEL}/arch/arm32/boot/dts/sun*.dtsi</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM32 CPU 而言，5.4 内核中不再维护单独的 pinctrl 的 dtsi，直接将 pin 的信息放在了：kernel/{KERNEL}/arch/arm32/boot/dts/sun*.dtsi</p><p><em>•</em> 板级设备树 (board.dts) 路径：/device/config/chips/{IC}/configs/{BOARD}/board.dts</p><p><em>•</em> device tree 的源码包含关系如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>board.dts
    |--------sun*.dtsi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-1-device-tree-对-gpio-控制器的通用配置" tabindex="-1"><a class="header-anchor" href="#_3-2-1-device-tree-对-gpio-控制器的通用配置" aria-hidden="true">#</a> 3.2.1 device tree 对 gpio 控制器的通用配置</h4><p>在 kernel/{KERNEL}/arch/arm64/boot/dts/sunxi/sun*-pinctrl.dtsi* 文件中 <em>(Linux5.4</em> 直接放在 <em>sun</em>.dtsi 中)，配置了该 SoC 的 pinctrl 控制器的通用配置信息，一般不建议修改，有 pinctrl 驱动维护者维护。目前，在 sunxi 平台，我们根据电源域，注册两个 pinctrl 设备：r_pio 设 备 (PL0 后的所有 pin) 和 pio 设备 (PL0 前的所有 pin)，两个设备的通用配置信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>r_pio: pinctrl@07022000 {
	compatible = &quot;allwinner,sun50iw9p1-r-pinctrl&quot;; //兼容属性，用于驱动和设备绑定
	reg = &lt;0x0 0x07022000 0x0 0x400&gt;; //寄存器基地址0x07022000和范围0x400
    clocks = &lt;&amp;clk_cpurpio&gt;;          //r_pio设置使用的时钟 
    device_type = &quot;r_pio&quot;;            //设备类型属性 
    gpio-controller;                  //表示是一个gpio控制器 
    interrupt-controller;             //表示一个中断控制器，不支持中断可以删除 
    #interrupt-cells = &lt;3&gt;;           //pin中断属性需要配置的参数个数，不支持中断可以删除 
    #size-cells = &lt;0&gt;;                //没有使用，配置0
    #gpio-cells = &lt;6&gt;;                //gpio属性配置需要的参数个数,对于linux-5.4为3

    /*
     * 以下配置为模块使用的pin的配置，模块通过引用相应的节点对pin进行操作
     * 由于不同板级的pin经常改变，建议通过板级dts修改（参考下一小节）
     */
    s_rsb0_pins_a: s_rsb0@0 {
        allwinner,pins = &quot;PL0&quot;, &quot;PL1&quot;;
        allwinner,function = &quot;s_rsb0&quot;;
        allwinner,muxsel = &lt;2&gt;;
        allwinner,drive = &lt;2&gt;;
        allwinner,pull = &lt;1&gt;;
    };

    /*
     * 以下配置为linux-5.4模块使用pin的配置，模块通过引用相应的节点对pin进行操作
     * 由于不同板级的pin经常改变，建议将模块pin的引用放到board dts中
     *（类似pinctrl-0 = &lt;&amp;scr1_ph_pins&gt;;),并使用scr1_ph_pins这种更有标识性的名字）。
     */
    scr1_ph_pins: scr1-ph-pins {
        pins = &quot;PH0&quot;, &quot;PH1&quot;;
        function = &quot;sim1&quot;;
        drive-strength = &lt;10&gt;;
        bias-pull-up;
    };
};

pio: pinctrl@0300b000 {
    compatible = &quot;allwinner,sun50iw9p1-pinctrl&quot;; //兼容属性，用于驱动和设备绑定
    reg = &lt;0x0 0x0300b000 0x0 0x400&gt;; //寄存器基地址0x0300b000和范围0x400
    interrupts = &lt;GIC_SPI 51 IRQ_TYPE_LEVEL_HIGH&gt;, /* AW1823_GIC_Spec: GPIOA: 83-32=51 */
            &lt;GIC_SPI 52 IRQ_TYPE_LEVEL_HIGH&gt;,
            &lt;GIC_SPI 53 IRQ_TYPE_LEVEL_HIGH&gt;,
            &lt;GIC_SPI 54 IRQ_TYPE_LEVEL_HIGH&gt;,
            &lt;GIC_SPI 55 IRQ_TYPE_LEVEL_HIGH&gt;,
            &lt;GIC_SPI 56 IRQ_TYPE_LEVEL_HIGH&gt;,
            &lt;GIC_SPI 57 IRQ_TYPE_LEVEL_HIGH&gt;; //该设备每个bank支持的中断配置和gic中断号，每个中断号对应一个支持中断的bank
    device_type = &quot;pio&quot;; //设备类型属性
    clocks = &lt;&amp;clk_pio&gt;, &lt;&amp;clk_losc&gt;, &lt;&amp;clk_hosc&gt;; //该设备使用的时钟
    gpio-controller;          //表示是一个gpio控制器
    interrupt-controller;     //表示是一个中断控制器
    #interrupt-cells = &lt;3&gt;;   //pin中断属性需要配置的参数个数，不支持中断可以删除
    #size-cells = &lt;0&gt;;        //没有使用
    #gpio-cells = &lt;6&gt;;        //gpio属性需要配置的参数个数,对于linux-5.4为3
    /* takes the debounce time in usec as argument */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-2-board-dts-板级配置" tabindex="-1"><a class="header-anchor" href="#_3-2-2-board-dts-板级配置" aria-hidden="true">#</a> 3.2.2 board.dts 板级配置</h4><p>board.dts 用于保存每个板级平台的设备信息 (如 demo 板、demo2.0 板等等)，以 demo 板为例，board.dts 路径如下：</p><p>/device/config/chips/{CHIP}/configs/demo/board.dts</p><p>在 board.dts 中的配置信息如果在 *.dtsi 中 (如 sun50iw9p1.dtsi 等) 存在，则会存在以下覆盖规则：</p><p><em>•</em> 相同属性和结点，board.dts 的配置信息会覆盖 *.dtsi 中的配置信息。</p><p><em>•</em> 新增加的属性和结点，会追加到最终生成的 dtb 文件中。</p><p>linux-4.9 上面 pinctrl 中一些模块使用 board.dts 的简单配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pio: pinctrl@0300b000 {
    input-debounce = &lt;0 0 0 0 0 0 0&gt;; /*配置中断采样频率，每个对应一个支持中断的bank，单位us*/
    
    spi0_pins_a: spi0@0 {
        allwinner,pins = &quot;PC0&quot;, &quot;PC2&quot;, &quot;PC4&quot;; 
        allwinner,pname = &quot;spi0_sclk&quot;, &quot;spi0_mosi&quot;, &quot;spi0_miso&quot;; 
        allwinner,function = &quot;spi0&quot;; 
    };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 linux-5.4，不建议采用上面的覆盖方式，而是修改驱动 pinctrl-0 引用的节点。</p><p>linux-5.4 上面 board.dts 的配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;pio{
    input-debounce = &lt;0 0 0 0 1 0 0 0 0&gt;; //配置中断采样频率，每个对应一个支持中断的bank，单位us
    vcc-pe-supply = &lt;&amp;reg_pio1_8&gt;; //配置IO口耐压值，例如这里的含义是将pe口设置成1.8v耐压值 
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-模块接口说明" tabindex="-1"><a class="header-anchor" href="#_4-模块接口说明" aria-hidden="true">#</a> 4 模块接口说明</h2><h3 id="_4-1-pinctrl-接口说明" tabindex="-1"><a class="header-anchor" href="#_4-1-pinctrl-接口说明" aria-hidden="true">#</a> 4.1 pinctrl 接口说明</h3><h4 id="_4-1-1-pin4ctrl-get" tabindex="-1"><a class="header-anchor" href="#_4-1-1-pin4ctrl-get" aria-hidden="true">#</a> 4.1.1 pin4ctrl_get</h4><p><em>•</em> 函数原型：struct pinctrl *pinctrl_get(struct device *dev);</p><p><em>•</em> 作用：获取设备的 pin 操作句柄，所有 pin 操作必须基于此 pinctrl 句柄。</p><p><em>•</em> 参数：</p><ul><li>dev: 指向申请 pin 操作句柄的设备句柄。</li></ul><p><em>•</em> 返回：</p><ul><li><p>成功，返回 pinctrl 句柄。</p></li><li><p>失败，返回 NULL。</p></li></ul><h4 id="_4-1-2-pinctrl-put" tabindex="-1"><a class="header-anchor" href="#_4-1-2-pinctrl-put" aria-hidden="true">#</a> 4.1.2 pinctrl_put</h4><p><em>•</em> 函数原型：void pinctrl_put(struct pinctrl *p)</p><p><em>•</em> 作用：释放 pinctrl 句柄，必须与 pinctrl_get 配对使用。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> p: 指向释放的 pinctrl 句柄。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 没有返回值。</p><p><strong>!</strong> 警告</p><p>必须与 <strong>pinctrl_get</strong> 配对使用。</p><h4 id="_4-1-3-devm-pinctrl-get" tabindex="-1"><a class="header-anchor" href="#_4-1-3-devm-pinctrl-get" aria-hidden="true">#</a> 4.1.3 devm_pinctrl_get</h4><p><em>•</em> 函数原型：struct pinctrl *devm_pinctrl_get(struct device *dev)</p><p><em>•</em> 作用：根据设备获取 pin 操作句柄，所有 pin 操作必须基于此 pinctrl 句柄，与 pinctrl_get功能完全一样，只是 devm_pinctrl_get 会将申请到的 pinctrl 句柄做记录，绑定到设备句柄信息中。设备驱动申请 pin 资源，推荐优先使用 devm_pinctrl_get 接口。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> dev: 指向申请 pin 操作句柄的设备句柄。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 pinctrl 句柄。</p><p>​ <em>•</em> 失败，返回 NULL。</p><h4 id="_4-1-4-devm-pinctrl-put" tabindex="-1"><a class="header-anchor" href="#_4-1-4-devm-pinctrl-put" aria-hidden="true">#</a> 4.1.4 devm_pinctrl_put</h4><p><em>•</em> 函数原型：void devm_pinctrl_put(struct pinctrl *p)</p><p><em>•</em> 作用：释放 pinctrl 句柄，必须与 devm_pinctrl_get 配对使用。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> p: 指向释放的 pinctrl 句柄。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 没有返回值。</p><p><strong>!</strong> 警告</p><p>必须与 <strong>devm_pinctrl_get</strong> 配对使用，可以不显式的调用该接口。</p><h4 id="_4-1-5-pinctrl-lookup-state" tabindex="-1"><a class="header-anchor" href="#_4-1-5-pinctrl-lookup-state" aria-hidden="true">#</a> 4.1.5 pinctrl_lookup_state</h4><p><em>•</em> 函数原型：struct pinctrl_state *pinctrl_lookup_state(struct pinctrl *p, const char *name)</p><p><em>•</em> 作用：根据 pin 操作句柄，查找 state 状态句柄。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> p: 指向要操作的 pinctrl 句柄。</p><p>​ <em>•</em> name: 指向状态名称，如 “default”、“sleep” 等。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回执行 pin 状态的句柄 struct pinctrl_state *。</p><p>​ <em>•</em> 失败，返回 NULL。</p><h4 id="_4-1-6-pinctrl-select-state" tabindex="-1"><a class="header-anchor" href="#_4-1-6-pinctrl-select-state" aria-hidden="true">#</a> 4.1.6 pinctrl_select_state</h4><p><em>•</em> 函数原型：int pinctrl_select_state(struct pinctrl *p, struct pinctrl_state *s)</p><p><em>•</em> 作用：将 pin 句柄对应的 pinctrl 设置为 state 句柄对应的状态。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> p: 指向要操作的 pinctrl 句柄。</p><p>​ <em>•</em> s: 指向 state 句柄。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 0。</p><p>​ <em>•</em> 失败，返回错误码。</p><h4 id="_4-1-7-devm-pinctrl-get-select" tabindex="-1"><a class="header-anchor" href="#_4-1-7-devm-pinctrl-get-select" aria-hidden="true">#</a> 4.1.7 devm_pinctrl_get_select</h4><p><em>•</em> 函数原型：struct pinctrl *devm_pinctrl_get_select(struct device *dev, const char *name)</p><p><em>•</em> 作用：获取设备的 pin 操作句柄，并将句柄设定为指定状态。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> dev: 指向管理 pin 操作句柄的设备句柄。</p><p>​ <em>•</em> name: 要设置的 state 名称，如 “default”、“sleep” 等。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 pinctrl 句柄。</p><p>​ <em>•</em> 失败，返回 NULL。</p><h4 id="_4-1-8-devm-pinctrl-get-select-default" tabindex="-1"><a class="header-anchor" href="#_4-1-8-devm-pinctrl-get-select-default" aria-hidden="true">#</a> 4.1.8 devm_pinctrl_get_select_default</h4><p><em>•</em> 函数原型：struct pinctrl *devm_pinctrl_get_select_default(struct device *dev)</p><p><em>•</em> 作用：获取设备的 pin 操作句柄，并将句柄设定为默认状态。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> dev: 指向管理 pin 操作句柄的设备句柄。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 pinctrl 句柄。</p><p>​ <em>•</em> 失败，返回 NULL。</p><h4 id="_4-1-9-pin-config-get" tabindex="-1"><a class="header-anchor" href="#_4-1-9-pin-config-get" aria-hidden="true">#</a> 4.1.9 pin_config_get</h4><p><em>•</em> 作用：获取指定 pin 的属性。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> dev_name: 指向 pinctrl 设备。</p><p>​ <em>•</em> name: 指向 pin 名称。</p><p>​ <em>•</em> config: 保存 pin 的配置信息。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 pin 编号。</p><p>​ <em>•</em> 失败，返回错误码。</p><p><strong>!</strong> 警告</p><p>该接口在 <strong>linux-5.4</strong> 已经移除。</p><h4 id="_4-1-10-pin-config-set" tabindex="-1"><a class="header-anchor" href="#_4-1-10-pin-config-set" aria-hidden="true">#</a> 4.1.10 pin_config_set</h4><p><em>•</em> 作用：设置指定 pin 的属性。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> dev_name: 指向 pinctrl 设备。</p><p>​ <em>•</em> name: 指向 pin 名称。</p><p>​ <em>•</em> config:pin 的配置信息。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 0。</p><p>​ <em>•</em> 失败，返回错误码。</p><p><strong>!</strong> 警告</p><p>该接口在 <strong>linux-5.4</strong> 已经移除。</p><h3 id="_4-2-gpio-接口说明" tabindex="-1"><a class="header-anchor" href="#_4-2-gpio-接口说明" aria-hidden="true">#</a> 4.2 gpio 接口说明</h3><h4 id="_4-2-1-gpio-request" tabindex="-1"><a class="header-anchor" href="#_4-2-1-gpio-request" aria-hidden="true">#</a> 4.2.1 gpio_request</h4><p><em>•</em> 函数原型：int gpio_request(unsigned gpio, const char *label)</p><p><em>•</em> 作用：申请 gpio，获取 gpio 的访问权。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> gpio:gpio 编号。</p><p>​ <em>•</em> label:gpio 名称，可以为 NULL。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 0。</p><p>​ <em>•</em> 失败，返回错误码。</p><h4 id="_4-2-2-gpio-free" tabindex="-1"><a class="header-anchor" href="#_4-2-2-gpio-free" aria-hidden="true">#</a> 4.2.2 gpio_free</h4><p><em>•</em> 函数原型：void gpio_free(unsigned gpio)</p><p><em>•</em> 作用：释放 gpio。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> gpio:gpio 编号。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 无返回值。</p><h4 id="_4-2-3-gpio-direction-input" tabindex="-1"><a class="header-anchor" href="#_4-2-3-gpio-direction-input" aria-hidden="true">#</a> 4.2.3 gpio_direction_input</h4><p><em>•</em> 函数原型：int gpio_direction_input(unsigned gpio)</p><p><em>•</em> 作用：设置 gpio 为 input。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> gpio:gpio 编号。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 0。</p><p>​ <em>•</em> 失败，返回错误码。</p><h4 id="_4-2-5-gpio-get-value" tabindex="-1"><a class="header-anchor" href="#_4-2-5-gpio-get-value" aria-hidden="true">#</a> 4.2.5 __gpio_get_value</h4><p><em>•</em> 函数原型：int __gpio_get_value(unsigned gpio)</p><p><em>•</em> 作用：获取 gpio 电平值 (gpio 已为 input/output 状态)。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> gpio:gpio 编号。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 返回 gpio 对应的电平逻辑，1 表示高, 0 表示低。</p><h4 id="_4-2-6-gpio-set-value" tabindex="-1"><a class="header-anchor" href="#_4-2-6-gpio-set-value" aria-hidden="true">#</a> 4.2.6 __gpio_set_value</h4><p><em>•</em> 函数原型：void __gpio_set_value(unsigned gpio, int value)</p><p><em>•</em> 作用：设置 gpio 电平值 (gpio 已为 input/output 状态)。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> gpio:gpio 编号。</p><p>​ <em>•</em> value: 期望设置的 gpio 电平值，非 0 表示高, 0 表示低。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 无返回值</p><h4 id="_4-2-7-of-get-named-gpio" tabindex="-1"><a class="header-anchor" href="#_4-2-7-of-get-named-gpio" aria-hidden="true">#</a> 4.2.7 of_get_named_gpio</h4><p><em>•</em> 函数原型：int of_get_named_gpio(struct device_node *np, const char *propname, int index)</p><p><em>•</em> 作用：通过名称从 dts 解析 gpio 属性并返回 gpio 编号。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> np: 指向使用 gpio 的设备结点。</p><p>​ <em>•</em> propname:dts 中属性的名称。</p><p>​ <em>•</em> index:dts 中属性的索引值。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 gpio 编号。</p><p>​ <em>•</em> 失败，返回错误码。</p><h4 id="_4-2-8-of-get-named-gpio-flags" tabindex="-1"><a class="header-anchor" href="#_4-2-8-of-get-named-gpio-flags" aria-hidden="true">#</a> 4.2.8 of_get_named_gpio_flags</h4><p><em>•</em> 函数原型：int of_get_named_gpio_flags(struct device_node *np, const char *list_name, int index,</p><p>enum of_gpio_flags *flags)</p><p><em>•</em> 作用：通过名称从 dts 解析 gpio 属性并返回 gpio 编号。</p><p><em>•</em> 参数：</p><p>​ <em>•</em> np: 指向使用 gpio 的设备结点。</p><p>​ <em>•</em> propname:dts 中属性的名称。</p><p>​ <em>•</em> index:dts 中属性的索引值</p><p>​ <em>•</em> flags: 在 sunxi 平台上，必须定义为 struct gpio_config * 类型变量，因为 sunxi pinctrl的 pin 支持上下拉， 驱动能力等信息，而内核 enum of_gpio_flags * 类型变量只能包含输入、输出信息，后续 sunxi 平台 需要标准化该接口。</p><p><em>•</em> 返回：</p><p>​ <em>•</em> 成功，返回 gpio 编号。</p><p>​ <em>•</em> 失败，返回错误码。</p><p><strong>警告</strong></p><p>该接口的 <strong>flags</strong> 参数，在 <strong>sunxi linux-4.9</strong> 及以前的平台上，必须定义为 <strong>struct gpio_config</strong> 类型变量。<strong>linux-5.4</strong> 已经标准化该接口，直接采用 <strong>enum of_gpio_flags</strong> 的定义。</p><h2 id="_5-使用示例" tabindex="-1"><a class="header-anchor" href="#_5-使用示例" aria-hidden="true">#</a> 5 使用示例</h2><h3 id="_5-1-使用-pin-的驱动-dts-配置示例" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-pin-的驱动-dts-配置示例" aria-hidden="true">#</a> 5.1 使用 pin 的驱动 dts 配置示例</h3><p>对于使用 pin 的驱动来说，驱动主要设置 pin 的常用的几种功能，列举如下：</p><p><em>•</em> 驱动使用者只配置通用 GPIO, 即用来做输入、输出和中断的</p><p><em>•</em> 驱动使用者设置 pin 的 pin mux，如 uart 设备的 pin,lcd 设备的 pin 等，用于特殊功能</p><p><em>•</em> 驱动使用者既要配置 pin 的通用功能，也要配置 pin 的特性</p><p>下面对常见使用场景进行分别介绍。</p><h4 id="_5-1-1-配置通用-gpio-功能-中断功能" tabindex="-1"><a class="header-anchor" href="#_5-1-1-配置通用-gpio-功能-中断功能" aria-hidden="true">#</a> 5.1.1 配置通用 GPIO 功能/中断功能</h4><p>用法一：配置 GPIO，中断，device tree 配置 demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>soc{
    ...
    gpiokey {
        device_type = &quot;gpiokey&quot;; 
        compatible = &quot;gpio-keys&quot;;
        
        ok_key {
            device_type = &quot;ok_key&quot;;
            label = &quot;ok_key&quot;;
            gpios = &lt;&amp;r_pio PL 0x4 0x0 0x1 0x0 0x1&gt;; //如果是linux-5.4，则应该为gpios = &lt;&amp;r_pio 0 4 GPIO_ACTIVE_HIGH&gt;;
            linux,input-type = &quot;1&gt;&quot;;
            linux,code = &lt;0x1c&gt;;
            wakeup-source = &lt;0x1&gt;;
            };
        };
    ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>说明：gpio in/gpio out/ interrupt采用dts的配置方法，配置参数解释如下：
对于linux-4.9:
gpios = &lt;&amp;r_pio PL 0x4 0x0 0x1 0x0 0x1&gt;;
            |    |  |   |   |   |   \`---输出电平，只有output才有效
            |    |  |   |   |   \`-------驱动能力，值为0x0时采用默认值
            |    |  |   |   \`-----------上下拉，值为0x1时采用默认值
            |    |  |   \`---------------复用类型
            |    |  \`-------------------当前bank中哪个引脚
            |    \`-----------------------哪个bank
            \`---------------------------指向哪个pio，属于cpus要用&amp;r_pio
使用上述方式配置gpio时，需要驱动调用以下接口解析dts的配置参数：
int of_get_named_gpio_flags(struct device_node *np, const char *list_name, int index,
enum of_gpio_flags *flags)
拿到gpio的配置信息后(保存在flags参数中，见4.2.8.小节)，在根据需要调用相应的标准接口实现自己的功能
对于linux-5.4:
gpios = &lt;&amp;r_pio 0 4 GPIO_ACTIVE_HIGH&gt;;
            |   |      |
            |   |      \`-------------------gpio active时状态，如果需要上下拉，还可以或上
            GPIO_PULL_UP、GPIO_PULL_DOWN标志
            |   \`-----------------------哪个bank
            \`---------------------------指向哪个pio，属于cpus要用&amp;r_pio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-2-用法二" tabindex="-1"><a class="header-anchor" href="#_5-1-2-用法二" aria-hidden="true">#</a> 5.1.2 用法二</h4><p>用法二：配置设备引脚，device tree 配置 demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>device tree对应配置
soc{
    pio: pinctrl@0300b000 {
        ...
        uart0_ph_pins_a: uart0-ph-pins-a {
            allwinner,pins = &quot;PH7&quot;, &quot;PH8&quot;; 
            allwinner,function = &quot;uart0&quot;; 
            allwinner,muxsel = &lt;3&gt;;
            allwinner,drive = &lt;0x1&gt;;
            allwinner,pull = &lt;0x1&gt;;
        };
        /* 对于linux-5.4 请使用下面这种方式配置 */
        mmc2_ds_pin: mmc2-ds-pin {
            pins = &quot;PC1&quot;;
            function = &quot;mmc2&quot;;
            drive-strength = &lt;30&gt;;
            bias-pull-up;
        };
        ...
    }；
    ...
    uart0: uart@05000000 {
        compatible = &quot;allwinner,sun8i-uart&quot;;
        device_type = &quot;uart0&quot;;
        reg = &lt;0x0 0x05000000 0x0 0x400&gt;;
        interrupts = &lt;GIC_SPI 49 IRQ_TYPE_LEVEL_HIGH&gt;;
        clocks = &lt;&amp;clk_uart0&gt;;
        pinctrl-names = &quot;default&quot;, &quot;sleep&quot;;
        pinctrl-0 = &lt;&amp;uart0_pins_a&gt;;
        pinctrl-1 = &lt;&amp;uart0_pins_b&gt;;
        uart0_regulator = &quot;vcc-io&quot;;
        uart0_port = &lt;0&gt;;
        uart0_type = &lt;2&gt;;
    };
    ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><p><em>•</em> pinctrl-0 对应 pinctrl-names 中的 default，即模块正常工作模式下对应的 pin 配置</p><p><em>•</em> pinctrl-1 对应 pinctrl-names 中的 sleep，即模块休眠模式下对应的 pin 配置</p><h3 id="_5-2-接口使用示例" tabindex="-1"><a class="header-anchor" href="#_5-2-接口使用示例" aria-hidden="true">#</a> 5.2 接口使用示例</h3><h4 id="_5-2-1-配置设备引脚" tabindex="-1"><a class="header-anchor" href="#_5-2-1-配置设备引脚" aria-hidden="true">#</a> 5.2.1 配置设备引脚</h4><p>一般设备驱动只需要使用一个接口 devm_pinctrl_get_select_default 就可以申请到设备所有pin 资源。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">sunxi_pin_req_demo</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">platform_device</span> <span class="token operator">*</span>pdev<span class="token punctuation">)</span>
<span class="token punctuation">{</span> 
	<span class="token keyword">struct</span> <span class="token class-name">pinctrl</span> <span class="token operator">*</span>pinctrl<span class="token punctuation">;</span>
	<span class="token comment">/* request device pinctrl, set as default state */</span>
	pinctrl <span class="token operator">=</span> <span class="token function">devm_pinctrl_get_select_default</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pdev<span class="token operator">-&gt;</span>dev<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">IS_ERR_OR_NULL</span><span class="token punctuation">(</span>pinctrl<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token operator">-</span>EINVAL<span class="token punctuation">;</span>

	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-2-获取-gpio-号" tabindex="-1"><a class="header-anchor" href="#_5-2-2-获取-gpio-号" aria-hidden="true">#</a> 5.2.2 获取 GPIO 号</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_pin_req_demo(struct platform_device *pdev)
{
    struct device *dev = &amp;pdev-&gt;dev;
    struct device_node *np = dev-&gt;of_node;
    unsigned int gpio;
    
    #get gpio config in device node.
    gpio = of_get_named_gpio(np, &quot;vdevice_3&quot;, 0);
    if (!gpio_is_valid(gpio)) {
    	if (gpio != -EPROBE_DEFER)
    		dev_err(dev, &quot;Error getting vdevice_3\\n&quot;);
		return gpio;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-3-gpio-属性配置" tabindex="-1"><a class="header-anchor" href="#_5-2-3-gpio-属性配置" aria-hidden="true">#</a> 5.2.3 GPIO 属性配置</h4><p>通过 pin_config_set/pin_config_get/pin_config_group_set/pin_config_group_get 接口单独控制指定 pin 或 group 的相关属性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int pctrltest_request_all_resource(void)
{
    struct device *dev;
    struct device_node *node;
    struct pinctrl *pinctrl;
    struct sunxi_gpio_config *gpio_list = NULL;
    struct sunxi_gpio_config *gpio_cfg;
    unsigned gpio_count = 0;
    unsigned gpio_index;
    unsigned long config;
    int ret;

    dev = bus_find_device_by_name(&amp;platform_bus_type, NULL, sunxi_ptest_data-&gt;dev_name);
    if (!dev) {
        pr_warn(&quot;find device [%s] failed...\\n&quot;, sunxi_ptest_data-&gt;dev_name);
        return -EINVAL;
    }

    node = of_find_node_by_type(NULL, dev_name(dev));
    if (!node) {
        pr_warn(&quot;find node for device [%s] failed...\\n&quot;, dev_name(dev));
        return -EINVAL;
    }
    dev-&gt;of_node = node;

    pr_warn(&quot;++++++++++++++++++++++++++++%s++++++++++++++++++++++++++++\\n&quot;, __func__);
    pr_warn(&quot;device[%s] all pin resource we want to request\\n&quot;, dev_name(dev));
    pr_warn(&quot;-----------------------------------------------\\n&quot;);

    pr_warn(&quot;step1: request pin all resource.\\n&quot;);
    pinctrl = devm_pinctrl_get_select_default(dev);
    if (IS_ERR_OR_NULL(pinctrl)) {
        pr_warn(&quot;request pinctrl handle for device [%s] failed...\\n&quot;, dev_name(dev));
        return -EINVAL;
    }

    pr_warn(&quot;step2: get device[%s] pin count.\\n&quot;, dev_name(dev));
    ret = dt_get_gpio_list(node, &amp;gpio_list, &amp;gpio_count);
    if (ret &lt; 0 || gpio_count == 0) {
        pr_warn(&quot; devices own 0 pin resource or look for main key failed!\\n&quot;);
        return -EINVAL;
    }

    pr_warn(&quot;step3: get device[%s] pin configure and check.\\n&quot;, dev_name(dev));
    for (gpio_index = 0; gpio_index &lt; gpio_count; gpio_index++) {
        gpio_cfg = &amp;gpio_list[gpio_index];

        /*check function config */
        config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_FUNC, 0xFFFF);
        pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
        if (gpio_cfg-&gt;mulsel != SUNXI_PINCFG_UNPACK_VALUE(config)) {
            pr_warn(&quot;failed! mul value isn&#39;t equal as dt.\\n&quot;);
            return -EINVAL;
        }

        /*check pull config */
        if (gpio_cfg-&gt;pull != GPIO_PULL_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_PUD, 0xFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;pull != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! pull value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }

        /*check dlevel config */
        if (gpio_cfg-&gt;drive != GPIO_DRVLVL_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_DRV, 0XFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;drive != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! dlevel value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }

        /*check data config */
        if (gpio_cfg-&gt;data != GPIO_DATA_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_DAT, 0XFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;data != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! pin data value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }
    }

    pr_warn(&quot;-----------------------------------------------\\n&quot;);
    pr_warn(&quot;test pinctrl request all resource success!\\n&quot;);
    pr_warn(&quot;++++++++++++++++++++++++++++end++++++++++++++++++++++++++++\\n\\n&quot;);
    return 0;
}
注：需要注意，存在SUNXI_PINCTRL和SUNXI_R_PINCTRL两个pinctrl设备，cpus域的pin需要使用
SUNXI_R_PINCTRL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>!</strong> 警告</p><p><strong>linux5.4</strong> 中 使 用 <strong>pinctrl_gpio_set_config</strong> 配 置 <strong>gpio</strong> 属 性， 对 应 使 用<strong>pinconf_to_config_pack</strong> 生成 <strong>config</strong> 参数：</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_FUNC</strong> 已不再生效，暂未支持 <strong>FUNC</strong> 配置（建议使用 <strong>pinctrl_select_state</strong>接口代替）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_PUD</strong> 更新为内核标准定义（<strong>PIN_CONFIG_BIAS_PULL_UP/PIN_CONFIG_BIAS_PULL_DOWN</strong>）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_DRV</strong> 更新为内核标准定义（<strong>PIN_CONFIG_DRIVE_STRENGTH</strong>），相应的 <strong>val</strong> 对应关系为（<strong>4.9-&gt;5.4: 0-&gt;10, 1-&gt;20…</strong>）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_DAT</strong> 已不再生效，暂未支持 <strong>DAT</strong> 配置（建议使用 <strong>gpio_direction_output</strong>或者 <strong>__gpio_set_value</strong> 设置电平值）</p><h3 id="_5-3-设备驱动使用-gpio-中断功能" tabindex="-1"><a class="header-anchor" href="#_5-3-设备驱动使用-gpio-中断功能" aria-hidden="true">#</a> 5.3 设备驱动使用 GPIO 中断功能</h3><p>方式一：通过 gpio_to_irq 获取虚拟中断号，然后调用申请中断函数即可目前 sunxi-pinctrl 使用 irq-domain 为 gpio 中断实现虚拟 irq 的功能，使用 gpio 中断功能时，设备驱动只需要通过 gpio_to_irq 获取虚拟中断号后，其他均可以按标准 irq 接口操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_gpio_eint_demo(struct platform_device *pdev)
{ 
    struct device *dev = &amp;pdev-&gt;dev;
    int virq;
    int ret;
    /* map the virq of gpio */
    virq = gpio_to_irq(GPIOA(0));
    if (IS_ERR_VALUE(virq)) {
	    pr_warn(&quot;map gpio [%d] to virq failed, errno = %d\\n&quot;,
    											GPIOA(0), virq);
        return -EINVAL;
    }
    pr_debug(&quot;gpio [%d] map to virq [%d] ok\\n&quot;, GPIOA(0), virq);
    /* request virq, set virq type to high level trigger */
    ret = devm_request_irq(dev, virq, sunxi_gpio_irq_test_handler,
                                IRQF_TRIGGER_HIGH, &quot;PA0_EINT&quot;, NULL);
    if (IS_ERR_VALUE(ret)) {
        pr_warn(&quot;request virq %d failed, errno = %d\\n&quot;, virq, ret);
        return -EINVAL;
    }
    
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：通过 dts 配置 gpio 中断，通过 dts 解析函数获取虚拟中断号，最后调用申请中断函数即可，demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dts配置如下：
soc{
	...
    Vdevice: vdevice@0 {
        compatible = &quot;allwinner,sun8i-vdevice&quot;;
        device_type = &quot;Vdevice&quot;;
        interrupt-parent = &lt;&amp;pio&gt;; /*依赖的中断控制器(带interrupt-controller属性的结 点)*/
        interrupts = &lt; PD 3 IRQ_TYPE_LEVEL_HIGH&gt;;
                        | |   \`------------------中断触发条件、类型
                        | \`-------------------------pin bank内偏移
                        \`---------------------------哪个bank
        pinctrl-names = &quot;default&quot;;
        pinctrl-0 = &lt;&amp;vdevice_pins_a&gt;;
        test-gpios = &lt;&amp;pio PC 3 1 2 2 1&gt;;
        status = &quot;okay&quot;;
	};
	...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在驱动中，通过 platform_get_irq() 标准接口获取虚拟中断号，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_pctrltest_probe(struct platform_device *pdev)
{ 
    struct device_node *np = pdev-&gt;dev.of_node;
    struct gpio_config config;
    int gpio, irq;
    int ret;

    if (np == NULL) {
        pr_err(&quot;Vdevice failed to get of_node\\n&quot;);
        return -ENODEV;
    }
    ....
    irq = platform_get_irq(pdev, 0);
    if (irq &lt; 0) {
        printk(&quot;Get irq error!\\n&quot;);
        return -EBUSY;
    }
	.....
	sunxi_ptest_data-&gt;irq = irq;
	......
	return ret;
}

//申请中断：
static int pctrltest_request_irq(void)
{
    int ret;
    int virq = sunxi_ptest_data-&gt;irq;
    int trigger = IRQF_TRIGGER_HIGH;

    reinit_completion(&amp;sunxi_ptest_data-&gt;done);

    pr_warn(&quot;step1: request irq(%s level) for irq:%d.\\n&quot;,
	    trigger == IRQF_TRIGGER_HIGH ? &quot;high&quot; : &quot;low&quot;, virq);
	ret = request_irq(virq, sunxi_pinctrl_irq_handler_demo1,
			trigger, &quot;PIN_EINT&quot;, NULL);
    if (IS_ERR_VALUE(ret)) {
        pr_warn(&quot;request irq failed !\\n&quot;);
        return -EINVAL;
    }

    pr_warn(&quot;step2: wait for irq.\\n&quot;);
    ret = wait_for_completion_timeout(&amp;sunxi_ptest_data-&gt;done, HZ);
    
    if (ret == 0) {
        pr_warn(&quot;wait for irq timeout!\\n&quot;);
        free_irq(virq, NULL);
        return -EINVAL;
    }

    free_irq(virq, NULL);

    pr_warn(&quot;-----------------------------------------------\\n&quot;);
    pr_warn(&quot;test pin eint success !\\n&quot;);
    pr_warn(&quot;+++++++++++++++++++++++++++end++++++++++++++++++++++++++++\\n\\n\\n&quot;);

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-设备驱动设置中断-debounce-功能" tabindex="-1"><a class="header-anchor" href="#_5-4-设备驱动设置中断-debounce-功能" aria-hidden="true">#</a> 5.4 设备驱动设置中断 debounce 功能</h3><p>方式一：通过 dts 配置每个中断 bank 的 debounce，以 pio 设备为例，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;pio {
    /* takes the debounce time in usec as argument */
    input-debounce = &lt;0 0 0 0 0 0 0&gt;;
                      | | | | | | \`----------PA bank
                      | | | | | \`------------PC bank
                      | | | | \`--------------PD bank
                      | | | \`----------------PF bank
                      | | \`------------------PG bank
                      | \`--------------------PH bank
                      \`----------------------PI bank
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：input-debounce 的属性值中需把 pio 设备支持中断的 bank 都配上，如果缺少，会以bank 的顺序设置相应的属性值到 debounce 寄存器，缺少的 bank 对应的 debounce 应该是默认值（启动时没修改的情况）。sunxi linux-4.9 平台，中断采样频率最大是 24M, 最小 32k，debounce 的属性值只能为 0 或 1。对于 linux-5.4，debounce 取值范围是 0~1000000（单位 usec）。</p><p>方式二：驱动模块调用 gpio 相关接口设置中断 debounce</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static inline int gpio_set_debounce(unsigned gpio, unsigned debounce);
int gpiod_set_debounce(struct gpio_desc *desc, unsigned debounce);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在驱动中，调用上面两个接口即可设置 gpio 对应的中断 debounce 寄存器，注意，debounce 是以 ms 为单位的 (linux-5.4 已经移除这个接口)。</p>`,249);function o(_,g){const n=l("center");return a(),r("div",null,[c,i(n,null,{default:s(()=>[d("表 1-1: 适用产品列表")]),_:1}),u,i(n,null,{default:s(()=>[d("表 2-1: Pinctrl 模块相关术语介绍")]),_:1}),v,i(n,null,{default:s(()=>[d("图 2-2: pinctrl 驱动 framework 图")]),_:1}),m])}const h=t(p,[["render",o],["__file","Linux_GPIO_DevelopmentGuide.html.vue"]]);export{h as default};
