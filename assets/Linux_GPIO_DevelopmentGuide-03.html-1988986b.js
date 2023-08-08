import{_ as i,o as n,c as e,e as s}from"./app-5cc5893e.js";const l={},d=s(`<h2 id="_3-模块配置" tabindex="-1"><a class="header-anchor" href="#_3-模块配置" aria-hidden="true">#</a> 3 模块配置</h2><h3 id="_3-1-kernel-menuconfig-配置" tabindex="-1"><a class="header-anchor" href="#_3-1-kernel-menuconfig-配置" aria-hidden="true">#</a> 3.1 kernel menuconfig 配置</h3><p>进入 longan 根目录，执行./build.sh menuconfig</p><p>进入配置主界面，并按以下步骤操作:</p><p>首先，选择 Device Drivers 选项进入下一级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_003.png" alt=""></p><p>​ 图 3-1: 内核 menuconfig 根菜单</p><p>选择 Pin controllers, 进入下级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_004.png" alt=""></p><p>​ 图 3-2: 内核 menuconfig device drivers 菜单</p><p>选择 Allwinner SoC PINCTRL DRIVER, 进入下级配置，如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_005.png" alt=""></p><p>​ 图 3-3: 内核 menuconfig pinctrl drivers 菜单</p><p>Sunxi pinctrl driver 默认编译进内核，如下图（以 sun50iw9p1 平台为例，其他平台类似）所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_006.png" alt=""></p><p>​ 图 3-4: 内核 menuconfig allwinner pinctrl drivers 菜单</p><h3 id="_3-2-device-tree-源码结构和路径" tabindex="-1"><a class="header-anchor" href="#_3-2-device-tree-源码结构和路径" aria-hidden="true">#</a> 3.2 device tree 源码结构和路径</h3><p>对于 Linux4.9：</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM64 CPU 而言，设备树的路径为：kernel/{KERNEL}/arch/arm64/boot/dts/sunxi/sun*-pinctrl.dtsi。</p><p><em>•</em> 设备树文件的配置是该 SoC 所有方案的通用配置，对于 ARM32 CPU 而言，设备树的路径为：kernel/{KERNEL}/arch/arm32/boot/dts/sun*-pinctrl.dtsi。</p><p><em>•</em> 板级设备树 (board.dts) 路径：/device/config/chips/{IC}/configs/{BOARD}/board.dts</p><p>device tree 的源码结构关系如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>board.dts
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),t=[d];function r(a,c){return n(),e("div",null,t)}const p=i(l,[["render",r],["__file","Linux_GPIO_DevelopmentGuide-03.html.vue"]]);export{p as default};
