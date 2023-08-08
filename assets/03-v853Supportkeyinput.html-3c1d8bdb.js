import{_ as n,o as s,c as a,e}from"./app-5cc5893e.js";const i={},t=e(`<h1 id="开发板支持按键输入" tabindex="-1"><a class="header-anchor" href="#开发板支持按键输入" aria-hidden="true">#</a> 开发板支持按键输入</h1><h2 id="_0-前言" tabindex="-1"><a class="header-anchor" href="#_0-前言" aria-hidden="true">#</a> 0.前言</h2><p>​ 100ASK_V853-PRO开发板上共有5个功能按键，本章节跟大家讨论如何使能这五个按键。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417154108195.png" alt="image-20230417154108195"></p><h2 id="_1-v853功能按键原理" tabindex="-1"><a class="header-anchor" href="#_1-v853功能按键原理" aria-hidden="true">#</a> 1.V853功能按键原理</h2><p>​ 100ASK_V853-PRO开发板上提供的5个按键是通过GPADC高精度数模转换模块模拟出5个功能按键。GPADC 是 12bit</p><p>分辨率，8 位采集精度的模数转换模块，具体通道数可以查看对应的 spec 说明⽂档，模拟输⼊范 围 0〜1.8V，最⾼采样率</p><p>1MHz，并且⽀持数据⽐较，⾃校验功能，同时⼯作于可配置⼀下⼯作模式：</p><ol><li>Single mode：在指定的通道完成⼀次转换并将数据放在对应数据寄存器中；</li><li>Single-cycle mode：在指定的通道完成⼀个周期转换并将数据放在响应数据寄存器中;</li><li>Continuous mode：在指定的通道持续转换并将数据放在响应数据寄存器中；</li><li>Burst mode：边采样边转换并将数据放⼊ 32 字节的 FIFO，⽀持中断控制。</li></ol><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417172938775.png" alt="image-20230417172938775"></p><p>​ 部分 GPADC 接⼝也开始慢慢⽤于 KEY 模块按键的读取，⼀般包括 VOL+、VOL-、HOME、MENU、ENTER 等等， GPADC0 ⽤于 KEY 的电路如上图。 AVCC-AP 为 1.8V 的供电，不同的按键按下，GPADC0 ⼝的电压不同，CPU 通过对这个电压的采样来确定具体是那 ⼀个按键按下。如上图，VOL+、VOL-、MENU、ENTER、HOME/UBOOT 对应的电压分别为 0.21V、0.41V、 0.59V、0.75V、0.88V。具体可以查看《100ASK-V853_Pro系统开发手册.pdf》中第五篇驱动开发的第⼗三章 Linux GPADC 开发指南。</p><h2 id="_2-gpadc驱动" tabindex="-1"><a class="header-anchor" href="#_2-gpadc驱动" aria-hidden="true">#</a> 2.GPADC驱动</h2><p>GPADC驱动存放的位置为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina-v853-open/kernel/linux-4.9/drivers/input/sensor/sunxi_gpadc.c
tina-v853-open/kernel/linux-4.9/drivers/input/sensor/sunxi_gpadc.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-gpadc内核配置" tabindex="-1"><a class="header-anchor" href="#_3-gpadc内核配置" aria-hidden="true">#</a> 3.GPADC内核配置</h2><p>在Tina的根目录下输入<code>make kernel_menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入如下目录中，输入Y使能SUNXI GPADC驱动。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Input device support 
		→ Sensors
			 &lt;*&gt;   SUNXI GPADC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后如下图所示。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417174743552.png" alt="image-20230417174743552"></p><p>保存并退出内核配置界面。</p><h2 id="_4-gpadc设备树配置" tabindex="-1"><a class="header-anchor" href="#_4-gpadc设备树配置" aria-hidden="true">#</a> 4.GPADC设备树配置</h2><p>内核设备树存放位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina-v853-open/device/config/chips/v853/configs/100ask/board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入该目录后输入<code>vi board.dts</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ <span class="token builtin class-name">cd</span> device/config/chips/v853/configs/100ask/
book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ <span class="token function">ls</span>
BoardConfig.mk  board.dts  buildroot  env.cfg  linux-4.9  sys_config.fex  uboot-board.dts
book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ <span class="token function">vi</span> board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>找到&amp;gpadc节点，这个节点保存有采样相关的配置，键值，电压数据等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;gpadc {
    channel_num = &lt;1&gt;;                        // 使用1通道
    channel_select = &lt;0x01&gt;;                  // 选择 0x01 通道
    channel_data_select = &lt;0&gt;;                // 启用数据通道
    channel_compare_select = &lt;0x01&gt;;          // 启用通道比较功能
    channel_cld_select = &lt;0x01&gt;;              // 启用数据小于比较功能
    channel_chd_select = &lt;0&gt;;                 // 启用数据大于比较功能
    channel0_compare_lowdata = &lt;1700000&gt;;     // 小于这个值触发中断
    channel0_compare_higdata = &lt;1200000&gt;;     // 大于这个值触发中断
    channel1_compare_lowdata = &lt;460000&gt;;      // 小于这个值触发中断
    channel1_compare_higdata = &lt;1200000&gt;;     // 大于这个值触发中断
    key_cnt = &lt;5&gt;;                            // 按键数量
    key0_vol = &lt;210&gt;;                         // 按键电压，单位mv
    key0_val = &lt;115&gt;;                         // 按下按键的键值
    key1_vol = &lt;410&gt;;                         // 按键电压，单位mv
    key1_val = &lt;114&gt;;                         // 按下按键的键值
    key2_vol = &lt;590&gt;;                         // 按键电压，单位mv
    key2_val = &lt;139&gt;;                         // 按下按键的键值
    key3_vol = &lt;750&gt;;                         // 按键电压，单位mv
    key3_val = &lt;28&gt;;                          // 按下按键的键值
    key4_vol = &lt;880&gt;;                         // 按键电压，单位mv
    key4_val = &lt;102&gt;;                         // 按下按键的键值
    status = &quot;okay&quot;;                          // 启用GPADC
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还能通过board.dts文件中知道还有一部分不经常需要修改的配置保存在sun8iw21p1.dtsi文件中，进入该目录，并打开该文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ cd kernel/linux-4.9/arch/arm/boot/dts/
book@100ask:~/workspaces/tina-v853-open/kernel/linux-4.9/arch/arm/boot/dts$ vi sun8iw21p1.dtsi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看gpadc节点，可以发现这里的配置保存有中断和时钟等信息，但默认不使能。注意：这里可以不修改，因为这里的所设置的status配置会被board.dts中的status覆盖，只要在board.dts设置为使能，最终生成打包进镜像的设备树都为使能状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gpadc:gpadc@2009000 {
    compatible = &quot;allwinner,sunxi-gpadc&quot;;         // 用于驱动和设备的绑定
    reg = &lt;0x0 0x02009000 0x0 0x400&gt;;             // 设备使用的寄存器地址
    interrupts = &lt;GIC_SPI 57 IRQ_TYPE_NONE&gt;;      // 设备使用的中断
    clocks = &lt;&amp;clk_gpadc&gt;;                        // 设备使用的时钟
    status = &quot;disabled&quot;;                          // 配置默认不启用GPADC
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-增加getevent测试包" tabindex="-1"><a class="header-anchor" href="#_5-增加getevent测试包" aria-hidden="true">#</a> 5.增加getevent测试包</h2><p>在Tina根目录下执行<code>make menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入Utilities目录下，输入Y选中getevent</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &gt; Utilities
 	 &lt;*&gt; getevent.................................... getevent for Android Toolbox 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选中完成后如下图所示。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417183138871.png" alt="image-20230417183138871"></p><p>保存并退出Tina配置界面。</p><h2 id="_6-编译、打包和烧写" tabindex="-1"><a class="header-anchor" href="#_6-编译、打包和烧写" aria-hidden="true">#</a> 6.编译、打包和烧写</h2><p>在Tina的根目录下，输入<code>make -j32 </code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make -j32
...
book@100ask:~/workspaces/tina-v853-open$ pack
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 生成镜像后，将tina-v853-open/out/v853/100ask/openwrt/目录下的v853_linux_100ask_uart0.img镜像拷贝到Windows电脑主机中，使用全志PhoenixSuit烧写工具烧写到开发板上。</p><p>​ 插上12V的电源线，和两条Type-C，把开关拨向电源接口方向上电，烧写新镜像后等待启动系统，在命令行中输入<code>getevent</code>可以进入测试程序，通过输出的打印信息我们知道，我们的gpadc驱动上报的信息使用的</p><p>是<code>/dev/input/event1</code>，此时按下按键，会读取按键的键值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# getevent
add device 1: /dev/input/event2
  name:     &quot;ft6336&quot;
add device 2: /dev/input/event1
  name:     &quot;sunxi-gpadc0&quot;
add device 3: /dev/input/event0
  name:     &quot;axp2101-pek&quot;
poll 4, returned 1
/dev/input/event1: 0001 0073 00000001
poll 4, returned 1
/dev/input/event1: 0000 0000 00000000
poll 4, returned 1
/dev/input/event1: 0001 0073 00000000
poll 4, returned 1
/dev/input/event1: 0000 0000 00000000

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下Crtl+C结束测试。</p><h2 id="_7-编写一个测试应用程序" tabindex="-1"><a class="header-anchor" href="#_7-编写一个测试应用程序" aria-hidden="true">#</a> 7.编写一个测试应用程序</h2><p>通过上一章节的测试，我们知道gpadc使用的<code>/dev/input/event1</code>上报按键数据，则我们编写的应用程序中获取数据的节点应该为/dev/input/event1，应用程序如下所示。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/input.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;limits.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">DEV_PATH</span> <span class="token string">&quot;/dev/input/event1&quot;</span> <span class="token comment">//Modified to gpadc drive reporting node</span></span>
<span class="token keyword">static</span> <span class="token keyword">int</span> gpadc_fd <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token function">test_gpadc</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> event_file<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        <span class="token keyword">int</span> code <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">;</span>

        <span class="token keyword">struct</span> <span class="token class-name">input_event</span> data<span class="token punctuation">;</span>

        gpadc_fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span>DEV_PATH<span class="token punctuation">,</span> O_RDONLY<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>gpadc_fd <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
                <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;open %s error!\\n&quot;</span><span class="token punctuation">,</span> DEV_PATH<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token comment">//read 10 times</span>
        <span class="token punctuation">{</span>
                <span class="token function">read</span><span class="token punctuation">(</span>gpadc_fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;key %d pressed\\n&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;key %d releaseed\\n&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">close</span><span class="token punctuation">(</span>gpadc_fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> rang_low <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> rang_high <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">test_gpadc</span><span class="token punctuation">(</span>DEV_PATH<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-编译应用程序并进行测试" tabindex="-1"><a class="header-anchor" href="#_8-编译应用程序并进行测试" aria-hidden="true">#</a> 8.编译应用程序并进行测试</h2><p>新建一个gpadc目录，存放应用程序和可执行程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ mkdir gpadc_test
book@100ask:~/workspaces$ cd gpadc_test/
book@100ask:~/workspaces/gpadc_test$ vi gpadc_test.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上一小节编写的应用程序复制到gpadc_test.c中保存。</p><p>编写完成后，我们需要提供编译环境给gpadc_test应用程序，输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/gpadc_test$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">STAGING_DIR</span><span class="token operator">=~</span>/workspaces/tina-v853-open/prebuilt/rootfsbuilt/arm/toolchainsunxi-musl-gcc-830/toolchain/arm-openwrt-linux-muslgnueabi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用交叉编译工具链编译二进制文件，注意：需要Tina SDK包目录需要更换为自己的目录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/gpadc_test$ ~/workspaces/tina-v853-open/prebuilt/rootfsbuilt/arm/toolchain-sunxi-musl-gcc-830/toolchain/bin/arm-openwrt-linux-gcc -o gpadc_test gpadc_test.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译完成后会再当前目录下生成一个gpadc_test可执行程序，将其拷贝到开发板上运行即可。下面使用TF卡的方式将文件拷贝到开发板上，此时假设你已经将文件拷贝到TF卡中，插入开发板后，在命令行中输入以下命令挂在SD卡到<code>/mnt/</code>目录下，并将gpadc_test应用程序拷贝到、root目录下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# mount /dev/mmcblk1p1 /mnt/
[   26.744697] FAT-fs (mmcblk1p1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
root@TinaLinux:/# cd /mnt/
root@TinaLinux:/mnt# ls
System Volume Information  gpadc_test
root@TinaLinux:/mnt# cp gpadc_test /root/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入/root目录下执行测试程序，该程序读取10次值会自动结束才测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/mnt# cd /root/
root@TinaLinux:~# ./gpadc_test
key 115 pressed
key 0 releaseed
key 115 releaseed
key 0 releaseed
key 114 pressed
key 0 releaseed
key 114 releaseed
key 0 releaseed
key 139 pressed
key 0 releaseed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64),l=[t];function c(d,p){return s(),a("div",null,l)}const r=n(i,[["render",c],["__file","03-v853Supportkeyinput.html.vue"]]);export{r as default};
