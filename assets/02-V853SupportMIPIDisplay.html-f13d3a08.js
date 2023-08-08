import{_ as t,r as l,o as d,c,a as n,b as e,d as a,e as i}from"./app-5cc5893e.js";const o={},r=n("h1",{id:"开发板适配4寸mipi屏",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#开发板适配4寸mipi屏","aria-hidden":"true"},"#"),e(" 开发板适配4寸MIPI屏")],-1),p=n("h2",{id:"_0-前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_0-前言","aria-hidden":"true"},"#"),e(" 0.前言")],-1),u=n("p",null,"​ 由于之前我们已经适配过RGB屏，如果我们去适配了4寸MIPI屏，那么RGB屏就不能使用了。对于4寸屏购买链接为：",-1),v={href:"https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-18944745104.11.268678a0HuK0No&id=706091265930",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,[n("img",{src:"http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230413093019260.png",alt:"image-20230413093019260"})],-1),b={href:"https://tina.100ask.net/SdkModule/Linux_LCD_DevelopmentGuide-01/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://tina.100ask.net/SdkModule/Linux_Display_DevelopmentGuide-01/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://forums.100ask.net/uploads/short-url/g7BQ0FPSSnKHSptR2QMjIPwnwno.zip",target:"_blank",rel:"noopener noreferrer"},g=i(`<h2 id="_1-添加新驱动" tabindex="-1"><a class="header-anchor" href="#_1-添加新驱动" aria-hidden="true">#</a> 1.添加新驱动</h2><p>将驱动程序添加到</p><p>内核的lcd驱动目录下：</p><p><code>tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd</code></p><p>uboot的lcd驱动目录下：</p><p><code> tina-v853-open/brandy/brandy-2.0/u-boot-2018/drivers/video/sunxi/disp2/disp/lcd/</code></p><p>由于uboot和内核中的屏驱动会存在一些差别，下面分别展示出uboot和内核中不同的屏驱动。具体源文件可以在4寸屏适配资源包中查看。</p><h3 id="_1-1-uboot驱动程序" tabindex="-1"><a class="header-anchor" href="#_1-1-uboot驱动程序" aria-hidden="true">#</a> 1.1 uboot驱动程序</h3><p>驱动程序头文件tft08006.h</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_TFT08006_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_TFT08006_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;panels.h&quot;</span></span>

<span class="token keyword">extern</span> __lcd_panel_t tft08006_panel<span class="token punctuation">;</span>

<span class="token keyword">extern</span> s32 <span class="token function">bsp_disp_get_panel_info</span><span class="token punctuation">(</span>u32 screen_id<span class="token punctuation">,</span> disp_panel_para <span class="token operator">*</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/*End of file*/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>驱动程序的C文件tft08006.c</p><p>这里只展示与内核不同的部分</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>__lcd_panel_t tft08006_panel <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">/* panel driver name, must mach the name of
         * lcd_drv_name in sys_config.fex
         */</span>
        <span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;tft08006&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span>func <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token punctuation">.</span>cfg_panel_info <span class="token operator">=</span> lcd_cfg_panel_info<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>cfg_open_flow <span class="token operator">=</span> lcd_open_flow<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>cfg_close_flow <span class="token operator">=</span> lcd_close_flow<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>lcd_user_defined_func <span class="token operator">=</span> lcd_user_defined_func<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-内核驱动程序" tabindex="-1"><a class="header-anchor" href="#_1-2-内核驱动程序" aria-hidden="true">#</a> 1.2 内核驱动程序</h3><p>驱动程序头文件tft08006.h</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_TFT08006_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_TFT08006_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;panels.h&quot;</span></span>

<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">__lcd_panel</span> tft08006_panel<span class="token punctuation">;</span>

<span class="token keyword">extern</span> s32 <span class="token function">bsp_disp_get_panel_info</span><span class="token punctuation">(</span>u32 screen_id<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">disp_panel_para</span> <span class="token operator">*</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/*End of file*/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>驱动程序的C文件&quot;tft08006.c，这里只展示与uboot不同的部分。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">__lcd_panel</span> tft08006_panel <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">/* panel driver name, must mach the name of
         * lcd_drv_name in sys_config.fex
         */</span>
        <span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;tft08006&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span>func <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token punctuation">.</span>cfg_panel_info <span class="token operator">=</span> lcd_cfg_panel_info<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>cfg_open_flow <span class="token operator">=</span> lcd_open_flow<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>cfg_close_flow <span class="token operator">=</span> lcd_close_flow<span class="token punctuation">,</span>
                        <span class="token punctuation">.</span>lcd_user_defined_func <span class="token operator">=</span> lcd_user_defined_func<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-修改内核中panels-h和panels-c" tabindex="-1"><a class="header-anchor" href="#_2-修改内核中panels-h和panels-c" aria-hidden="true">#</a> 2.修改内核中panels.h和panels.c</h2><p>由于内核中没有对tft08006屏驱动有相关的配置，所以我们还需要在panels全志显示驱动中增加定义。</p><h3 id="_2-1-修改内核中panels-h" tabindex="-1"><a class="header-anchor" href="#_2-1-修改内核中panels-h" aria-hidden="true">#</a> 2.1 修改内核中panels.h</h3><p>在屏驱动目录下修改panels.h</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd$ vi panels.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在icn6202屏驱动定义的后面增加tft08006屏驱动定义</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_ICN6202</span></span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">__lcd_panel</span> icn6202_panel<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_ICN6202</span></span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">__lcd_panel</span> icn6202_panel<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_NT35510_MIPI</span></span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">__lcd_panel</span> nt35510_panel<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下ESC，输入<code>:wq</code>，保存刚才的修改并退出</p><h3 id="_2-2-修改内核中panels-c" tabindex="-1"><a class="header-anchor" href="#_2-2-修改内核中panels-c" aria-hidden="true">#</a> 2.2 修改内核中panels.c</h3><p>在屏驱动目录下修改panels.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd$ vi panels.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在icn6202屏驱动定义的后面增加tft08006屏驱动定义</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_ICN6202</span></span>
       <span class="token operator">&amp;</span>icn6202_panel<span class="token punctuation">,</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_TFT08006</span></span>
        <span class="token operator">&amp;</span>tft08006_panel<span class="token punctuation">,</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_LCD_SUPPORT_NT35510_MIPI</span></span>
        <span class="token operator">&amp;</span>nt35510_panel<span class="token punctuation">,</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下ESC，输入<code>:wq</code>，保存刚才的修改并退出</p><h2 id="_3-修改内核中kconfig和makefile" tabindex="-1"><a class="header-anchor" href="#_3-修改内核中kconfig和makefile" aria-hidden="true">#</a> 3.修改内核中Kconfig和Makefile</h2><h3 id="_3-1-修改内核中的kconfig" tabindex="-1"><a class="header-anchor" href="#_3-1-修改内核中的kconfig" aria-hidden="true">#</a> 3.1 修改内核中的Kconfig</h3><p>修改屏驱动目录下的Kconfig，使内核配置中增加tft08006屏驱动的，以便后续选择编译该屏驱动</p><p>在屏驱动目录下输入<code>vi Kconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd$ vi Kconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在icn6202屏驱动配置的后面增加tft08006屏驱动配置</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>config LCD_SUPPORT_ICN6202
       bool <span class="token string">&quot;LCD support icn6202 panel&quot;</span>
       <span class="token keyword">default</span> n
       <span class="token operator">--</span><span class="token operator">-</span>help<span class="token operator">--</span><span class="token operator">-</span>
               If you want to support icn6202 panel <span class="token keyword">for</span> display driver<span class="token punctuation">,</span> select it<span class="token punctuation">.</span>

config LCD_SUPPORT_TFT08006
       bool <span class="token string">&quot;LCD support tft08006 panel&quot;</span>
       <span class="token keyword">default</span> n
       <span class="token operator">--</span><span class="token operator">-</span>help<span class="token operator">--</span><span class="token operator">-</span>
               If you want to support tft08006 panel <span class="token keyword">for</span> display driver<span class="token punctuation">,</span> select it<span class="token punctuation">.</span>

config LCD_SUPPORT_NT35510_MIPI
        bool <span class="token string">&quot;LCD support nt35510_mipi panel&quot;</span>
        <span class="token keyword">default</span> n
        help
                If you want to support nt35510_mipi panel <span class="token keyword">for</span> display driver<span class="token punctuation">,</span> select it<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下ESC，输入<code>:wq</code>，保存刚才的修改并退出</p><h3 id="_3-2-修改内核中的makefile" tabindex="-1"><a class="header-anchor" href="#_3-2-修改内核中的makefile" aria-hidden="true">#</a> 3.2 修改内核中的Makefile</h3><p>返回屏驱动的上一级目录，修改Makefile文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp$ vi Makefile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在icn6202屏驱动编译规则的后面增加tft08006屏驱动编译规则</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>disp<span class="token operator">-</span>$<span class="token punctuation">(</span>CONFIG_LCD_SUPPORT_ICN6202<span class="token punctuation">)</span> <span class="token operator">+=</span> lcd<span class="token operator">/</span>icn6202<span class="token punctuation">.</span>o
disp<span class="token operator">-</span>$<span class="token punctuation">(</span>CONFIG_LCD_SUPPORT_TFT08006<span class="token punctuation">)</span> <span class="token operator">+=</span> lcd<span class="token operator">/</span>tft08006<span class="token punctuation">.</span>o
disp<span class="token operator">-</span>$<span class="token punctuation">(</span>CONFIG_LCD_SUPPORT_NT35510_MIPI<span class="token punctuation">)</span> <span class="token operator">+=</span> lcd<span class="token operator">/</span>nt35510<span class="token punctuation">.</span>o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按下ESC，输入<code>:wq</code>，保存刚才的修改并退出</p><h2 id="_4-修改内核配置" tabindex="-1"><a class="header-anchor" href="#_4-修改内核配置" aria-hidden="true">#</a> 4.修改内核配置</h2><p>在Tina的根目录下输入<code>make kernel_menuconfig</code>,进入内核配置界面。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在选中屏驱动前，要确保<code>DISP Driver Support(sunxi-disp2) </code>，我们的提供的SDK默认已经打开了，如果您之前关闭了，需要在内核配置界面中，进入<code>Video support for sunxi</code>目录下输入Y选中<code>sunxi-disp2</code>打开lcd节点配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Graphics support 
		→ Frame buffer Devices 
			→ Video support for sunxi
				&lt;*&gt; DISP Driver Support(sunxi-disp2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入屏驱动目录，输入Y选中tft08006</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Graphics support 
		→ Frame buffer Devices 
			→ Video support for sunxi 
				→ LCD panels select 
					[*] LCD support tft08006 panel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示，选中tft08006屏驱动，编译到内核中。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230412141639648.png" alt="image-20230412141639648"></p><p>保存并推车内核配置界面。</p><h2 id="_5-修改uboot配置" tabindex="-1"><a class="header-anchor" href="#_5-修改uboot配置" aria-hidden="true">#</a> 5.修改uboot配置</h2><p>进入uboot的根目录下，执行<code>make menuconfig</code>，打开uboot配置界面。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/brandy/brandy-2.0/u-boot-2018$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在选中屏驱动前，要确保<code>DISP Driver Support(sunxi-disp2) </code>，我们的提供的SDK默认已经打开了，如果您之前关闭了，需要在内核配置界面中，进入<code>Graphics support</code>目录下输入Y选中<code>sunxi-disp2</code>打开lcd节点配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Graphics support 
		[*] DISP Driver Support(sunxi-disp2)  ---&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入屏驱动目录下，输入Y选中TFT08006屏驱动。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Graphics support 
		→ LCD panels select 
			 [*] LCD support TFT08006 panel 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示，选中tft08006屏驱动。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230412143445778.png" alt="image-20230412143445778"></p><p>保存并退出uboot配置界面</p><h2 id="_6-修改设备树" tabindex="-1"><a class="header-anchor" href="#_6-修改设备树" aria-hidden="true">#</a> 6.修改设备树</h2><p>设备树位置：tina-v853-open/device/config/chips/v853/configs/100ask/</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ ls
BoardConfig.mk  board.dts  buildroot  env.cfg  linux-4.9  sys_config.fex  uboot-board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中board.dts为内核设备树，uboot-board.dts为uboot设备树。</p><h3 id="_6-1-修改uboot设备树" tabindex="-1"><a class="header-anchor" href="#_6-1-修改uboot设备树" aria-hidden="true">#</a> 6.1 修改uboot设备树</h3><p>在设备树的目录下输入<code>vi uboot-board.dts</code>，编译uboot设备树。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ vi uboot-board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注释掉原来的lcd0节点，修改tft08006屏lcd0节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lcd0 {
        base_config_start   = &lt;1&gt;;
        lcd_used            = &lt;1&gt;;

        lcd_driver_name     = &quot;tft08006&quot;;

        lcd_backlight       = &lt;500&gt;;
        lcd_if              = &lt;4&gt;;

        lcd_x               = &lt;480&gt;;
        lcd_y               = &lt;800&gt;;
        lcd_width           = &lt;52&gt;;
        lcd_height          = &lt;52&gt;;
        lcd_dclk_freq       = &lt;25&gt;;

        lcd_pwm_used        = &lt;1&gt;;
        lcd_pwm_ch          = &lt;9&gt;;
        lcd_pwm_freq        = &lt;50000&gt;;
        lcd_pwm_pol         = &lt;1&gt;;
        lcd_pwm_max_limit   = &lt;255&gt;;

        lcd_hbp             = &lt;10&gt;;
        lcd_ht              = &lt;515&gt;;
        lcd_hspw            = &lt;5&gt;;

        lcd_vbp             = &lt;20&gt;;
        lcd_vt              = &lt;830&gt;;
        lcd_vspw            = &lt;5&gt;;

        lcd_dsi_if          = &lt;0&gt;;
        lcd_dsi_lane        = &lt;2&gt;;
        lcd_dsi_format      = &lt;0&gt;;
        lcd_dsi_te          = &lt;0&gt;;
        lcd_dsi_eotp        = &lt;0&gt;;
        lcd_frm             = &lt;0&gt;;
        lcd_io_phase        = &lt;0x0000&gt;;
        lcd_hv_clk_phase    = &lt;0&gt;;
        lcd_hv_sync_polarity= &lt;0&gt;;
        lcd_gamma_en        = &lt;0&gt;;
        lcd_bright_curve_en = &lt;0&gt;;
        lcd_cmap_en         = &lt;0&gt;;
        lcdgamma4iep        = &lt;22&gt;;

        lcd_gpio_0          = &lt;&amp;pio PH 0 1 0 3 1&gt;;
        pinctrl-0           = &lt;&amp;dsi4lane_pins_a&gt;;
        pinctrl-1           = &lt;&amp;dsi4lane_pins_b&gt;;
        base_config_end     = &lt;1&gt;;

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在&amp;pio节点后增加复用引脚</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>         dsi4lane_pins_a: dsi4lane@0 {
                allwinner,pins = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,pname = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,function = &quot;dsi&quot;;
                allwinner,muxsel = &lt;5&gt;;
                allwinner,drive = &lt;3&gt;;
                allwinner,pull = &lt;0&gt;;
        };

        dsi4lane_pins_b: dsi4lane@1 {
                allwinner,pins = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,pname = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;DP11&quot;;
                allwinner,function = &quot;io_disabled&quot;;
                allwinner,muxsel = &lt;0xf&gt;;
                allwinner,drive = &lt;1&gt;;
                allwinner,pull = &lt;0&gt;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-修改内核设备树" tabindex="-1"><a class="header-anchor" href="#_6-2-修改内核设备树" aria-hidden="true">#</a> 6.2 修改内核设备树</h3><p>在设备树的目录下输入<code>vi board.dts</code>，编译内核设备树。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ vi board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注释掉原来的lcd0节点，修改tft08006屏lcd0节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lcd0 {
        base_config_start   = &lt;1&gt;;
        lcd_used            = &lt;1&gt;;

        lcd_driver_name     = &quot;tft08006&quot;;

        lcd_backlight       = &lt;500&gt;;
        lcd_if              = &lt;4&gt;;

        lcd_x               = &lt;480&gt;;
        lcd_y               = &lt;800&gt;;
        lcd_width           = &lt;52&gt;;
        lcd_height          = &lt;52&gt;;
        lcd_dclk_freq       = &lt;25&gt;;

        lcd_pwm_used        = &lt;1&gt;;
        lcd_pwm_ch          = &lt;9&gt;;
        lcd_pwm_freq        = &lt;50000&gt;;
        lcd_pwm_pol         = &lt;1&gt;;
        lcd_pwm_max_limit   = &lt;255&gt;;

        lcd_hbp             = &lt;10&gt;;
        lcd_ht              = &lt;515&gt;;
        lcd_hspw            = &lt;5&gt;;

        lcd_vbp             = &lt;20&gt;;
        lcd_vt              = &lt;830&gt;;
        lcd_vspw            = &lt;5&gt;;

        lcd_dsi_if          = &lt;0&gt;;
        lcd_dsi_lane        = &lt;2&gt;;
        lcd_dsi_format      = &lt;0&gt;;
        lcd_dsi_te          = &lt;0&gt;;
        lcd_dsi_eotp        = &lt;0&gt;;
        lcd_frm             = &lt;0&gt;;
        lcd_io_phase        = &lt;0x0000&gt;;
        lcd_hv_clk_phase    = &lt;0&gt;;
        lcd_hv_sync_polarity= &lt;0&gt;;
        lcd_gamma_en        = &lt;0&gt;;
        lcd_bright_curve_en = &lt;0&gt;;
        lcd_cmap_en         = &lt;0&gt;;
        lcdgamma4iep        = &lt;22&gt;;

        lcd_gpio_0          = &lt;&amp;pio PH 0 1 0 3 1&gt;;
        pinctrl-0           = &lt;&amp;dsi4lane_pins_a&gt;;
        pinctrl-1           = &lt;&amp;dsi4lane_pins_b&gt;;
        base_config_end     = &lt;1&gt;;

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在&amp;pio节点后增加复用引脚</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>         dsi4lane_pins_a: dsi4lane@0 {
                allwinner,pins = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,pname = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,function = &quot;dsi&quot;;
                allwinner,muxsel = &lt;5&gt;;
                allwinner,drive = &lt;3&gt;;
                allwinner,pull = &lt;0&gt;;
        };

        dsi4lane_pins_b: dsi4lane@1 {
                allwinner,pins = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;;
                allwinner,pname = &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;DP11&quot;;
                allwinner,function = &quot;io_disabled&quot;;
                allwinner,muxsel = &lt;0xf&gt;;
                allwinner,drive = &lt;1&gt;;
                allwinner,pull = &lt;0&gt;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-增加i2c触摸" tabindex="-1"><a class="header-anchor" href="#_7-增加i2c触摸" aria-hidden="true">#</a> 7.增加I2C触摸</h2><p>通过拿到的屏幕资料包，我们可以知道该MIPI屏的触摸芯片为FT5336，下面我们使用全志已经内置好的FT6336触摸驱动。</p><h3 id="_7-1-修改设备树" tabindex="-1"><a class="header-anchor" href="#_7-1-修改设备树" aria-hidden="true">#</a> 7.1 修改设备树</h3><p>修改twi2节点，使用ft6336驱动，修改触摸的范围。宽X为480，高y为800。其中初始化引脚需要查看V853底板原理图，其中初始化引脚为PH7，唤醒引脚为PH8。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230414193438036.png" alt="image-20230414193438036"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;twi2 {
        ctp@38 {
                status = &quot;okay&quot;;
                ctp_used = &lt;1&gt;;
                ctp_name = &quot;ft6336&quot;;
                ctp_twi_id = &lt;0x2&gt;;
                ctp_twi_addr = &lt;0x38&gt;;
                ctp_screen_max_x = &lt;0x480&gt;;
                ctp_screen_max_y = &lt;0x800&gt;;
                ctp_revert_x_flag = &lt;0x0&gt;;
                ctp_revert_y_flag = &lt;0x1&gt;;
                ctp_exchange_x_y_flag = &lt;0x0&gt;;
                ctp_int_port = &lt;&amp;pio PH 7 6 1 3 0xffffffff&gt;;
                ctp_wakeup   = &lt;&amp;pio PH 8 1 1 3 0xffffffff&gt;;
        };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,90),h={href:"https://tina.100ask.net/SdkModule/Linux_Deploy_DevelopmentGuide-02/#39",target:"_blank",rel:"noopener noreferrer"},f=i(`<h3 id="_7-2-修改内核配置" tabindex="-1"><a class="header-anchor" href="#_7-2-修改内核配置" aria-hidden="true">#</a> 7.2 修改内核配置</h3><p>​ 由于我们之前适配过了RGB屏触摸驱动，所以需要进入内核中修改为我们使用的新驱动，进入如下目录中，按下空格键取消勾选之前的触摸驱动gt9xxnew touchscreen driver，输入Y选中我们使用的ft6336 touchscreen driver新驱动，并保存退出。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Input device support 
		→ Touchscreens
			&lt;*&gt;   ft6336 touchscreen driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230414193735639.png" alt="image-20230414193735639"></p><h3 id="_7-3-修改驱动程序" tabindex="-1"><a class="header-anchor" href="#_7-3-修改驱动程序" aria-hidden="true">#</a> 7.3 修改驱动程序</h3><p>修改ft6336.c触摸驱动程序，这里只展示修改的部分，源文件可见4寸屏适配资源包中查看。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>                        input_report_abs(ts-&gt;input_dev,
                                        ABS_MT_POSITION_X, -(event-&gt;au16_x[i]-480));
                        input_report_abs(ts-&gt;input_dev,
                                        ABS_MT_POSITION_Y, -(event-&gt;au16_y[i]-800));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-lvgl绑定新触摸节点" tabindex="-1"><a class="header-anchor" href="#_7-4-lvgl绑定新触摸节点" aria-hidden="true">#</a> 7.4 LVGL绑定新触摸节点</h3><p>由于Tina使用的默认绑定的触摸节点为/dev/input/event0，我们需要修改lvgl驱动头文件中绑定的节点为我们触摸驱动上报数据的节点，我们触摸驱动上报的节点为event2，所以需要进入</p><p><code>tina-v853-open/platform/thirdparty/gui/lvgl-8/lv_examples/src</code>目录下修改lv_drv_conf.h头文件，如下所示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ <span class="token builtin class-name">cd</span> platform/thirdparty/gui/lvgl-8/lv_examples/src/
book@100ask:~/workspaces/tina-v853-open/platform/thirdparty/gui/lvgl-8/lv_examples/src$ <span class="token function">vi</span> lv_drv_conf.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>找到触摸节点中的<code>LIBINPUT_NAME</code>，将原来的<code>/dev/input/event0</code>修改<code>/dev/input/event2</code>,如下图红框内所示。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417101852786.png" alt="image-20230417101852786"></p>`,13),x=n("code",null,"lv_examples",-1),q={href:"https://www.100ask.net/p/t_pc/goods_pc_detail/goods_detail/p_5f857338e4b0e95a89c3cdb0",target:"_blank",rel:"noopener noreferrer"},D=i(`<h2 id="_8-编译系统并打包生成镜像" tabindex="-1"><a class="header-anchor" href="#_8-编译系统并打包生成镜像" aria-hidden="true">#</a> 8.编译系统并打包生成镜像</h2><p>返回Tina根目录下，输入<code>make</code>,编译系统</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ <span class="token function">make</span> <span class="token parameter variable">-j4</span>
<span class="token punctuation">..</span>.
sun8iw21p1 compile Kernel successful
INFO: ----------------------------------------
INFO: build Tina OK.
INFO: ----------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包生成镜像，输入<code>pack</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ pack
<span class="token punctuation">..</span>.
Dragon execute image.cfg SUCCESS <span class="token operator">!</span>
----------image is at----------

33M     /home/book/workspaces/tina-v853-open/out/v853/100ask/openwrt/v853_linux_100ask_uart0.img

pack finish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-烧录并测试" tabindex="-1"><a class="header-anchor" href="#_9-烧录并测试" aria-hidden="true">#</a> 9.烧录并测试</h2>`,6),w={href:"https://forums.100ask.net/t/topic/2882",target:"_blank",rel:"noopener noreferrer"},P=n("strong",null,"断电",-1),y=i(`<p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230417120449282.png" alt="image-20230417120449282"></p><p>​ 接完排线后，重新接入电源，和2条Type-C数据线，再将开关拨向电源接口处上电启动，启动时会出现Tina Linux小企鹅logo，进入系统后，可以查看触摸节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# ls /dev/input/
event0  event1  event2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 我们使用的event2，如果你不确定您的触摸驱动程序使用的是哪个，可以通过<code>cat /dev/input/event*</code>，其中<code>*</code>表示要查看的是哪一个触摸节点，例如我使用的是event2，则需要输入<code>cat /dev/input/event2</code>，此时触摸屏幕会有上报信息。</p><p>​ 使用LVGL DEMO示例，输入<code>lv_examples 0</code>启动lvgl示例，可以通过点击屏幕上的UI交互按钮测试触摸是否生效。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@TinaLinux:/<span class="token comment"># lv_examples 0</span>
<span class="token assign-left variable">wh</span><span class="token operator">=</span>480x800, <span class="token assign-left variable">vwh</span><span class="token operator">=</span>480x1600, <span class="token assign-left variable">bpp</span><span class="token operator">=</span><span class="token number">32</span>, <span class="token assign-left variable">rotated</span><span class="token operator">=</span><span class="token number">0</span>
Turn on double buffering.
Turn on 2d hardware acceleration.
Turn on 2d hardware acceleration rotate.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function I(T,S){const s=l("ExternalLinkIcon");return d(),c("div",null,[r,p,u,n("p",null,[n("a",v,[e("百问网4寸MIPI屏"),a(s)])]),m,n("p",null,[e("LCD_调试指南:"),n("a",b,[e("https://tina.100ask.net/SdkModule/Linux_LCD_DevelopmentGuide-01/"),a(s)])]),n("p",null,[e("Display_开发指南:"),n("a",_,[e("https://tina.100ask.net/SdkModule/Linux_Display_DevelopmentGuide-01/"),a(s)])]),n("p",null,[e("4寸屏适配资源包："),n("a",k,[e("https://forums.100ask.net/uploads/short-url/g7BQ0FPSSnKHSptR2QMjIPwnwno.zip"),a(s)]),e("。该资源包里面包含了适配修改后的所有文件（包括驱动程序、设备树和配置文件等）")]),g,n("p",null,[e("对于设备树的参数意义，可以访问百问网的Tina站点:"),n("a",h,[e("https://tina.100ask.net/SdkModule/Linux_Deploy_DevelopmentGuide-02/#39"),a(s)])]),f,n("p",null,[e("注意：我们这里修改的是头文件，可能之前编译生成过了之后再重新编译时可能不会再编译头文件，导致修改的节点不会生效，可以手动删除out目录中的"),x,e("示例程序或者直接删除out目录重新编译即可。具体原因可以观看韦东山老师的《ARM架构与编程》课程中的gcc编译过程详解。访问链接为："),n("a",q,[e("ARM架构与编程"),a(s)])]),D,n("p",null,[e("​ 打包完成后，将新生成的镜像拷贝到Windows主机电脑上，使用全志PhoenixSuit烧写工具，烧写到开发板上。具体可以参考："),n("a",w,[e("https://forums.100ask.net/t/topic/2882"),a(s)]),e("。烧写完成后需要"),P,e("，才能连接MIPI屏的排线到MIPI屏接口，注意排线的线序是否一致。")]),y])}const L=t(o,[["render",I],["__file","02-V853SupportMIPIDisplay.html.vue"]]);export{L as default};
