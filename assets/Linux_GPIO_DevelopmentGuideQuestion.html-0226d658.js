import{_ as e,o as i,c as n,e as l}from"./app-5cc5893e.js";const d={},s=l(`<h1 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h1><h2 id="_6-faq" tabindex="-1"><a class="header-anchor" href="#_6-faq" aria-hidden="true">#</a> 6 FAQ</h2><h3 id="_6-1-常用-debug-方法" tabindex="-1"><a class="header-anchor" href="#_6-1-常用-debug-方法" aria-hidden="true">#</a> 6.1 常用 debug 方法</h3><h4 id="_6-1-1-利用-sunxi-dump-读写相应寄存器" tabindex="-1"><a class="header-anchor" href="#_6-1-1-利用-sunxi-dump-读写相应寄存器" aria-hidden="true">#</a> 6.1.1 利用 sunxi_dump 读写相应寄存器</h4><p>需要开启 SUNXI_DUMP 模块：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make kernel_menuconfig
	---&gt; Device Drivers
		---&gt; dump reg driver for sunxi platform (选中)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /sys/class/sunxi_dump
1.查看一个寄存器
echo 0x0300b048 &gt; dump ;cat dump
2.写值到寄存器上
echo 0x0300b058 0xfff &gt; write ;cat write
3.查看一片连续寄存器
echo 0x0300b000,0x0300bfff &gt; dump;cat dump

4.写一组寄存器的值
echo 0x0300b058 0xfff,0x0300b0a0 0xfff &gt; write;cat write

通过上述方式，可以查看，修改相应gpio的寄存器，从而发现问题所在。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-1-2-利用-sunxi-pinctrl-的-debug-节点" tabindex="-1"><a class="header-anchor" href="#_6-1-2-利用-sunxi-pinctrl-的-debug-节点" aria-hidden="true">#</a> 6.1.2 利用 sunxi_pinctrl 的 debug 节点</h4><p>需要开启 DEBUG_FS：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make kernel_menuconfig
	---&gt; Kernel hacking
		---&gt; Compile-time checks and compiler options
			---&gt; Debug Filesystem (选中)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>挂载文件节点，并进入相应目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mount -t debugfs none /sys/kernel/debug
cd /sys/kernel/debug/sunxi_pinctrl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>1.查看 pin 的配置:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo PC2 &gt; sunxi_pin
cat sunxi_pin_configure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_007.png" alt=""></p><p>​ 图 6-1: 查看 pin 配置图</p><p>2.修改 pin 属性</p><p>每个 pin 都有四种属性，如复用 (function)，数据 (data)，驱动能力 (dlevel)，上下拉 (pull)，</p><p>修改 pin 属性的命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo PC2 1 &gt; pull;cat pull
cat sunxi_pin_configure  //查看修改情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后结果如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_008.png" alt=""></p><p>​ 图 6-2: 修改结果图</p><p>注意：在 sunxi 平台，目前多个 pinctrl 的设备，分别是 pio 和 r_pio 和 axpxxx-gpio，当操作 PL 之后的 pin 时，请通过以下命令切换 pin 的设备，否则操作失败，切换命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo pio &gt; /sys/kernel/debug/sunxi_pinctrl/dev_name //切换到pio设备 
cat /sys/kernel/debug/sunxi_pinctrl/dev_name
echo r_pio &gt; /sys/kernel/debug/sunxi_pinctrl/dev_name //切换到r_pio设备 
cat /sys/kernel/debug/sunxi_pinctrl/dev_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改结果如下图所示：</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_009.png" alt=""></p><p>​ 图 6-3: pin 设备图</p><h4 id="_6-1-3-利用-pinctrl-core-的-debug-节点" tabindex="-1"><a class="header-anchor" href="#_6-1-3-利用-pinctrl-core-的-debug-节点" aria-hidden="true">#</a> 6.1.3 利用 pinctrl core 的 debug 节点</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mount -t debugfs none /sys/kernel/debug
cd /sys/kernel/debug/sunxi_pinctrl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>1.查看 pin 的管理设备：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat pinctrl-devices
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果如下图所示:</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/LinuxGPIODevelopmentGuide_0010.png" alt=""></p><p>​ 图 6-4: pin 设备图</p><p>2.查看 pin 的状态和对应的使用设备</p><p>结果如下图 log 所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>console:/sys/kernel/debug/pinctrl # ls
pinctrl-devices pinctrl-handles pinctrl-maps pio r_pio
console:/sys/kernel/debug/pinctrl # cat pinctrl-handles
Requested pin control handlers their pinmux maps:
device: twi3 current state: sleep
	state: default
        type: MUX_GROUP controller pio group: PA10 (10) function: twi3 (15)
        type: CONFIGS_GROUP controller pio group PA10 (10)config 00001409
config 00000005
        type: MUX_GROUP controller pio group: PA11 (11) function: twi3 (15)
        type: CONFIGS_GROUP controller pio group PA11 (11)config 00001409
config 00000005
	state: sleep
        type: MUX_GROUP controller pio group: PA10 (10) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PA10 (10)config 00001409
config 00000001
        type: MUX_GROUP controller pio group: PA11 (11) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PA11 (11)config 00001409
config 00000001
device: twi5 current state: default
    state: default
        type: MUX_GROUP controller r_pio group: PL0 (0) function: s_twi0 (3)
        type: CONFIGS_GROUP controller r_pio group PL0 (0)config 00001409
config 00000005
        type: MUX_GROUP controller r_pio group: PL1 (1) function: s_twi0 (3)
        type: CONFIGS_GROUP controller r_pio group PL1 (1)config 00001409
config 00000005
	state: sleep
        type: MUX_GROUP controller r_pio group: PL0 (0) function: io_disabled (4)
        type: CONFIGS_GROUP controller r_pio group PL0 (0)config 00001409
config 00000001
        type: MUX_GROUP controller r_pio group: PL1 (1) function: io_disabled (4)
        type: CONFIGS_GROUP controller r_pio group PL1 (1)config 00001409
config 00000001
device: soc@03000000:pwm5@0300a000 current state: active
	state: active
        type: MUX_GROUP controller pio group: PA12 (12) function: pwm5 (16)
        type: CONFIGS_GROUP controller pio group PA12 (12)config 00000001
config 00000000
config 00000000
	state: sleep
        type: MUX_GROUP controller pio group: PA12 (12) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PA12 (12)config 00000001
config 00000000
config 00000000
device: uart0 current state: default
	state: default
	state: sleep
device: uart1 current state: default
	state: default
        type: MUX_GROUP controller pio group: PG6 (95) function: uart1 (37)
        type: CONFIGS_GROUP controller pio group PG6 (95)config 00001409
config 00000005
        type: MUX_GROUP controller pio group: PG7 (96) function: uart1 (37)
        type: CONFIGS_GROUP controller pio group PG7 (96)config 00001409
config 00000005
        type: MUX_GROUP controller pio group: PG8 (97) function: uart1 (37)
        type: CONFIGS_GROUP controller pio group PG8 (97)config 00001409
config 00000005
        type: MUX_GROUP controller pio group: PG9 (98) function: uart1 (37)
        type: CONFIGS_GROUP controller pio group PG9 (98)config 00001409
config 00000005
	state: sleep
        type: MUX_GROUP controller pio group: PG6 (95) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PG6 (95)config 00001409
config 00000001
        type: MUX_GROUP controller pio group: PG7 (96) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PG7 (96)config 00001409
config 00000001
        type: MUX_GROUP controller pio group: PG8 (97) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PG8 (97)config 00001409
config 00000001
        type: MUX_GROUP controller pio group: PG9 (98) function: io_disabled (5)
        type: CONFIGS_GROUP controller pio group PG9 (98)config 00001409
....
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的部分 log 可以看到那些设备管理的 pin 以及 pin 当前的状态是否正确。以 twi3 设备为例，twi3 管理的 pin 有 PA10/PA11，分别有两组状态 sleep 和 default，default 状态表示使用状态，sleep 状态表示 pin 处于 io disabled 状态，表示 pin 不可正常使用，twi3 设备使用的 pin 当前状态处于 sleep 状态的。</p><h4 id="_6-1-4-gpio-中断问题排查步骤" tabindex="-1"><a class="header-anchor" href="#_6-1-4-gpio-中断问题排查步骤" aria-hidden="true">#</a> 6.1.4 GPIO 中断问题排查步骤</h4><h5 id="_6-1-4-1-gpio-中断一直响应" tabindex="-1"><a class="header-anchor" href="#_6-1-4-1-gpio-中断一直响应" aria-hidden="true">#</a> 6.1.4.1 GPIO 中断一直响应</h5><ol><li><p>排查中断信号是否一直触发中断</p></li><li><p>利用 sunxi_dump 节点，确认中断 pending 位是否没有清 (参考 6.1.1 小节)</p></li><li><p>是否在 gpio 中断服务程序里对中断检测的 gpio 进行 pin mux 的切换，不允许这样切换，否则会导致中断异常</p></li></ol><h5 id="_6-1-4-2-gpio-检测不到中断" tabindex="-1"><a class="header-anchor" href="#_6-1-4-2-gpio-检测不到中断" aria-hidden="true">#</a> 6.1.4.2 GPIO 检测不到中断</h5><ol><li><p>排查中断信号是否正常，若不正常，则排查硬件，若正常，则跳到步骤 2</p></li><li><p>利用 sunxi_dump 节点，查看 gpio 中断 pending 位是否置起，若已经置起，则跳到步骤5，否则跳到步骤 3</p></li><li><p>利用 sunxi_dump 节点，查看 gpio 的中断触发方式是否配置正确，若正确，则跳到步骤 4，否则跳到步骤 5</p></li><li><p>检查中断的采样时钟，默认应该是 32k，可以通过 sunxi_dump 节点，切换 gpio 中断采样时钟到 24M 进行实验</p></li><li><p>利用 sunxi_dump，确认中断是否使能</p></li></ol>`,46),r=[s];function a(t,c){return i(),n("div",null,r)}const u=e(d,[["render",a],["__file","Linux_GPIO_DevelopmentGuideQuestion.html.vue"]]);export{u as default};
