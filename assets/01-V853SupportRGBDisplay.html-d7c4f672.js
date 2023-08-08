import{_ as d,r as s,o as t,c as a,a as e,b as i,d as l,e as u}from"./app-5cc5893e.js";const c={},v=e("h1",{id:"开发板适配七寸rgb屏",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开发板适配七寸rgb屏","aria-hidden":"true"},"#"),i(" 开发板适配七寸RGB屏")],-1),r=e("h2",{id:"_0-前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_0-前言","aria-hidden":"true"},"#"),i(" 0.前言")],-1),o={href:"https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-18944745104.11.669f1b7fE1ptyQ&id=611156659477",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[e("img",{src:"http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411160118610.png",alt:"image-20230411160118610"})],-1),b={href:"https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-18944745109.10.4ea53031qOBnND&id=706864521673",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[e("img",{src:"http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230418094041344.png",alt:"image-20230418094041344"})],-1),_={href:"https://tina.100ask.net/SdkModule/Linux_LCD_DevelopmentGuide-01/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://tina.100ask.net/SdkModule/Linux_Display_DevelopmentGuide-01/",target:"_blank",rel:"noopener noreferrer"},g=u(`<p>​ 如果已经使用我们的增加的补丁文件，默认启动有Tina Linux的logo，同时还支持了lvgl示例和触摸。可在开发板的串口终端上输入<code>lv_examples</code>，可以发现我们提供有5个lvgl示例。输入<code>lv_examples 0</code>，可运行第一个lvgl示例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# lv_examples
lv_examples 0, is lv_demo_widgets
lv_examples 1, is lv_demo_music
lv_examples 2, is lv_demo_benchmark
lv_examples 3, is lv_demo_keypad_encoder
lv_examples 4, is lv_demo_stress
root@TinaLinux:/# lv_examples 0
wh=1024x600, vwh=1024x1200, bpp=32, rotated=0
Turn on double buffering.
Turn on 2d hardware acceleration.
Turn on 2d hardware acceleration rotate.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行完成后可在七寸RGB屏上显示LVGL V8的示例界面，同时支持触摸控制示例。</p><h2 id="_1-适配七寸rgb屏的流程" tabindex="-1"><a class="header-anchor" href="#_1-适配七寸rgb屏的流程" aria-hidden="true">#</a> 1.适配七寸RGB屏的流程</h2><p>​ 由于Tina SDK中默认已经支持RGB屏驱动，所以适配七寸RGB屏只注意以下几个点：</p><p>​ 1.修改设备树</p><p>​ 2.配置内核</p><p>​ 3.修改Uboot配置</p><p>内核设备树的位置：tina-v853-open/device/config/chips/v853/configs/100ask/board.dts</p><p>uboot设备树的位置：tina-v853-open/device/config/chips/v853/configs/100ask/board.dts</p><p>修改内核配置：在tina的根目录下执行<code>make kernel_menuconfig</code></p><p>修改uboot配置：进入uboot的根目录tina-v853-open/brandy/brandy-2.0/u-boot-2018下执行<code>make menuconfig</code></p><p>内核驱动位置：tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd/default_panel.c</p><p>uboot驱动位置：</p><p>tina-v853-open/brandy/brandy-2.0/u-boot-2018/drivers/video/sunxi/disp2/disp/lcd/default_panel.c</p><h2 id="_2-检查修改设备树" tabindex="-1"><a class="header-anchor" href="#_2-检查修改设备树" aria-hidden="true">#</a> 2.检查修改设备树</h2><p>在Tina根目录下，输入<code>cd device/config/chips/v853/configs/100ask/</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ <span class="token builtin class-name">cd</span> device/config/chips/v853/configs/100ask/
book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ <span class="token function">vi</span> board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-修改内核设备树" tabindex="-1"><a class="header-anchor" href="#_2-1-修改内核设备树" aria-hidden="true">#</a> 2.1 修改内核设备树</h3><p>修改 board.dts中的lcd0为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lcd0 {
        /* part 1 */
        lcd_used            = &lt;1&gt;;
        lcd_driver_name     = &quot;default_lcd&quot;;
        lcd_backlight       = &lt;100&gt;;

        /* part 2 */
        lcd_if = &lt;0&gt;;
        lcd_hv_if = &lt;0&gt;;

        /* part 3 */
        lcd_x               = &lt;1024&gt;;
        lcd_y               = &lt;600&gt;;
        lcd_width           = &lt;154&gt;;
        lcd_height          = &lt;85&gt;;
        lcd_dclk_freq       = &lt;51&gt;;
        lcd_hbp             = &lt;140&gt;;
        lcd_ht              = &lt;1344&gt;;
        lcd_hspw            = &lt;20&gt;;
        lcd_vbp             = &lt;20&gt;;
        lcd_vt              = &lt;635&gt;;
        lcd_vspw            = &lt;3&gt;;

        lcd_pwm_used        = &lt;1&gt;;
        lcd_pwm_ch          = &lt;9&gt;;
        lcd_pwm_freq        = &lt;500&gt;;
        lcd_pwm_pol         = &lt;1&gt;;

        /* part 5 */
        lcd_frm = &lt;1&gt;;
        lcd_io_phase = &lt;0x0000&gt;;
        lcd_gamma_en = &lt;0&gt;;
        lcd_cmap_en = &lt;0&gt;;
        lcd_hv_clk_phase = &lt;0&gt;;
        lcd_hv_sync_polarity= &lt;0&gt;;

        /* part 6 */
        lcd_power = &quot;vcc-lcd&quot;;
        lcd_pin_power = &quot;vcc-pd&quot;;
        pinctrl-0 = &lt;&amp;rgb18_pins_a&gt;;
        pinctrl-1 = &lt;&amp;rgb18_pins_b&gt;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在&amp;pio节点下增加rgb18_pins_a和rgb18_pins_b子节点，增加引脚复用功能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> rgb18_pins_a: rgb18@0 {
                allwinner,pins = &quot;PD0&quot;, &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, \\
                        &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD8&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;, \\
                        &quot;PD12&quot;, &quot;PD13&quot;, &quot;PD14&quot;, &quot;PD15&quot;, &quot;PD16&quot;, &quot;PD17&quot;, \\
                        &quot;PD18&quot;, &quot;PD19&quot;, &quot;PD20&quot;, &quot;PD21&quot;;
                allwinner,pname = &quot;lcdd2&quot;, &quot;lcdd3&quot;, &quot;lcdd4&quot;, &quot;lcdd5&quot;, &quot;lcdd6&quot;, &quot;lcdd7&quot;, \\
                        &quot;lcdd10&quot;, &quot;lcdd11&quot;, &quot;lcdd12&quot;, &quot;lcdd13&quot;, &quot;lcdd14&quot;, &quot;lcdd15&quot;, \\
                        &quot;lcdd18&quot;, &quot;lcdd19&quot;, &quot;lcdd20&quot;, &quot;lcdd21&quot;, &quot;lcdd22&quot;, &quot;lcdd23&quot;, \\
                        &quot;lcdpclk&quot;, &quot;lcdde&quot;, &quot;lcdhsync&quot;, &quot;lcdvsync&quot;;
                allwinner,function = &quot;lcd&quot;;
                allwinner,muxsel = &lt;2&gt;;
                allwinner,drive = &lt;3&gt;;
                allwinner,pull = &lt;0&gt;;
        };

        rgb18_pins_b: rgb18@1 {
                        allwinner,pins = &quot;PD0&quot;, &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, \\
                                        &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD8&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;, \\
                                        &quot;PD12&quot;, &quot;PD13&quot;, &quot;PD14&quot;, &quot;PD15&quot;, &quot;PD16&quot;, &quot;PD17&quot;, \\
                                        &quot;PD18&quot;, &quot;PD19&quot;, &quot;PD20&quot;, &quot;PD21&quot;;
                        allwinner,pname = &quot;lcdd2&quot;, &quot;lcdd3&quot;, &quot;lcdd4&quot;, &quot;lcdd5&quot;, &quot;lcdd6&quot;, &quot;lcdd7&quot;, \\
                                        &quot;lcdd10&quot;, &quot;lcdd11&quot;, &quot;lcdd12&quot;, &quot;lcdd13&quot;, &quot;lcdd14&quot;, &quot;lcdd15&quot;, \\
                                        &quot;lcdd18&quot;, &quot;lcdd19&quot;, &quot;lcdd20&quot;, &quot;lcdd21&quot;, &quot;lcdd22&quot;, &quot;lcdd23&quot;, \\
                                        &quot;lcdpclk&quot;, &quot;lcdde&quot;, &quot;lcdhsync&quot;, &quot;lcdvsync&quot;;
                        allwinner,function = &quot;io_disabled&quot;;
                        allwinner,muxsel = &lt;0xf&gt;;
                        allwinner,drive = &lt;3&gt;;
                        allwinner,pull = &lt;0&gt;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-修改uboot设备树" tabindex="-1"><a class="header-anchor" href="#_2-2-修改uboot设备树" aria-hidden="true">#</a> 2.2 修改uboot设备树</h3><p>在同一目录下修改uboot设备树</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask$ <span class="token function">vi</span> uboot-board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lcd0 {
        lcd_used            = &lt;1&gt;;
        lcd_driver_name     = &quot;default_lcd&quot;;
        lcd_backlight       = &lt;100&gt;;

        lcd_if = &lt;0&gt;;
        lcd_hv_if = &lt;0&gt;;

        lcd_x               = &lt;1024&gt;;
        lcd_y               = &lt;600&gt;;
        lcd_width           = &lt;154&gt;;
        lcd_height          = &lt;85&gt;;
        lcd_dclk_freq       = &lt;51&gt;;
        lcd_hbp             = &lt;140&gt;;
        lcd_ht              = &lt;1344&gt;;
        lcd_hspw            = &lt;20&gt;;
        lcd_vbp             = &lt;20&gt;;
        lcd_vt              = &lt;635&gt;;
        lcd_vspw            = &lt;3&gt;;

        lcd_pwm_used        = &lt;1&gt;;
        lcd_pwm_ch          = &lt;9&gt;;
        lcd_pwm_freq        = &lt;500&gt;;
        lcd_pwm_pol         = &lt;1&gt;;

        lcd_frm = &lt;1&gt;;
        lcd_io_phase = &lt;0x0000&gt;;
        lcd_gamma_en = &lt;0&gt;;
        lcd_cmap_en = &lt;0&gt;;
        lcd_hv_clk_phase = &lt;0&gt;;
        lcd_hv_sync_polarity= &lt;0&gt;;

        lcd_power = &quot;vcc-lcd&quot;;
        lcd_pin_power = &quot;vcc-pd&quot;;
        pinctrl-0 = &lt;&amp;rgb18_pins_a&gt;;
        pinctrl-1 = &lt;&amp;rgb18_pins_b&gt;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在&amp;pio节点下增加rgb18_pins_a和rgb18_pins_b子节点，增加引脚复用功能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rgb18_pins_a: rgb18@0 {
                allwinner,pins = &quot;PD0&quot;, &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, \\
                        &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD8&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;, \\
                        &quot;PD12&quot;, &quot;PD13&quot;, &quot;PD14&quot;, &quot;PD15&quot;, &quot;PD16&quot;, &quot;PD17&quot;, \\
                        &quot;PD18&quot;, &quot;PD19&quot;, &quot;PD20&quot;, &quot;PD21&quot;;
                allwinner,pname = &quot;lcdd2&quot;, &quot;lcdd3&quot;, &quot;lcdd4&quot;, &quot;lcdd5&quot;, &quot;lcdd6&quot;, &quot;lcdd7&quot;, \\
                        &quot;lcdd10&quot;, &quot;lcdd11&quot;, &quot;lcdd12&quot;, &quot;lcdd13&quot;, &quot;lcdd14&quot;, &quot;lcdd15&quot;, \\
                        &quot;lcdd18&quot;, &quot;lcdd19&quot;, &quot;lcdd20&quot;, &quot;lcdd21&quot;, &quot;lcdd22&quot;, &quot;lcdd23&quot;, \\
                        &quot;lcdpclk&quot;, &quot;lcdde&quot;, &quot;lcdhsync&quot;, &quot;lcdvsync&quot;;
                allwinner,function = &quot;lcd&quot;;
                allwinner,muxsel = &lt;2&gt;;
                allwinner,drive = &lt;3&gt;;
                allwinner,pull = &lt;0&gt;;
        };
        rgb18_pins_b: rgb18@1 {
                        allwinner,pins = &quot;PD0&quot;, &quot;PD1&quot;, &quot;PD2&quot;, &quot;PD3&quot;, &quot;PD4&quot;, &quot;PD5&quot;, \\
                                        &quot;PD6&quot;, &quot;PD7&quot;, &quot;PD8&quot;, &quot;PD9&quot;, &quot;PD10&quot;, &quot;PD11&quot;, \\
                                        &quot;PD12&quot;, &quot;PD13&quot;, &quot;PD14&quot;, &quot;PD15&quot;, &quot;PD16&quot;, &quot;PD17&quot;, \\
                                        &quot;PD18&quot;, &quot;PD19&quot;, &quot;PD20&quot;, &quot;PD21&quot;;
                        allwinner,pname = &quot;lcdd2&quot;, &quot;lcdd3&quot;, &quot;lcdd4&quot;, &quot;lcdd5&quot;, &quot;lcdd6&quot;, &quot;lcdd7&quot;, \\
                                        &quot;lcdd10&quot;, &quot;lcdd11&quot;, &quot;lcdd12&quot;, &quot;lcdd13&quot;, &quot;lcdd14&quot;, &quot;lcdd15&quot;, \\
                                        &quot;lcdd18&quot;, &quot;lcdd19&quot;, &quot;lcdd20&quot;, &quot;lcdd21&quot;, &quot;lcdd22&quot;, &quot;lcdd23&quot;, \\
                                        &quot;lcdpclk&quot;, &quot;lcdde&quot;, &quot;lcdhsync&quot;, &quot;lcdvsync&quot;;
                        allwinner,function = &quot;io_disabled&quot;;
                        allwinner,muxsel = &lt;0xf&gt;;
                        allwinner,drive = &lt;3&gt;;
                        allwinner,pull = &lt;0&gt;;
        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-检查修改内核配置和uboot配置" tabindex="-1"><a class="header-anchor" href="#_3-检查修改内核配置和uboot配置" aria-hidden="true">#</a> 3.检查修改内核配置和uboot配置</h2><h3 id="_3-1-修改内核配置" tabindex="-1"><a class="header-anchor" href="#_3-1-修改内核配置" aria-hidden="true">#</a> 3.1 修改内核配置</h3><p>在Tina的根目录下输入<code>make kernel_menuconfig</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/workspaces/tina-v853-open$ <span class="token function">make</span> kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过方向键，选择并进入如下目录，输入Y开启DISP Driver Support</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> → Device Drivers 
 	→ Graphics support 
 		→ Frame buffer Devices 
 			→ Video support for sunxi
 				&lt;*&gt; DISP Driver Support(sunxi-disp2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411185022055.png" alt="image-20230411185022055"></p><p>选中后，通过方向键选择Save，按下回车。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411185717558.png" alt="image-20230411185717558"></p><p>按下后会提示您是否确认保存备份，选择OK</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190013770.png" alt="image-20230411190013770"></p><p>此时我们所修改的配置将保存在tina-v853-open/kernel/linux-4.9/.config文件中，继续按下回车退出。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190051184.png" alt="image-20230411190051184"></p><p>保存完成后，通过方向键选择Exit，一直选择Exit，直到退出内核配置界面</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190138923.png" alt="image-20230411190138923"></p><h3 id="_3-2-修改uboot配置" tabindex="-1"><a class="header-anchor" href="#_3-2-修改uboot配置" aria-hidden="true">#</a> 3.2 修改uboot配置</h3><p>想要修改uboot，需要进入tina-v853-open/brandy/brandy-2.0/u-boot-2018目录下，执行<code>make menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ cd brandy/brandy-2.0/u-boot-2018/
book@100ask:~/workspaces/tina-v853-open/brandy/brandy-2.0/u-boot-2018$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过方向键进入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Graphics support 
		 [*] DISP Driver Support(sunxi-disp2)  ---&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411192759836.png" alt="image-20230411192759836"></p><p>选中后，通过方向键选择Save，按下回车。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411185717558.png" alt="image-20230411185717558"></p><p>按下后会提示您是否确认保存备份，选择OK</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190013770.png" alt="image-20230411190013770"></p><p>此时我们所修改的配置将保存在<code>tina-v853-open/brandy/brandy-2.0/u-boot-2018/.config</code>文件中，继续按下回车退出。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190051184.png" alt="image-20230411190051184"></p><p>保存完成后，通过方向键选择Exit，一直选择Exit，直到退出uboot配置界面</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230411190138923.png" alt="image-20230411190138923"></p><h2 id="_4-七寸rgb屏驱动程序" tabindex="-1"><a class="header-anchor" href="#_4-七寸rgb屏驱动程序" aria-hidden="true">#</a> 4.七寸RGB屏驱动程序</h2><p>内核和uboot中的驱动程序都是同一套，可以复用的。由于我们选中了sunxi-disp2，都会默认去编译default_panel.c驱动程序。</p><p>内核驱动位置：tina-v853-open/kernel/linux-4.9/drivers/video/fbdev/sunxi/disp2/disp/lcd/default_panel.c</p><p>uboot驱动位置：</p><p>tina-v853-open/brandy/brandy-2.0/u-boot-2018/drivers/video/sunxi/disp2/disp/lcd/default_panel.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/*
 * drivers/video/sunxi/disp2/disp/lcd/default_panel.c
 *
 * Copyright (c) 2007-2019 Allwinnertech Co., Ltd.
 * Author: zhengxiaobin &lt;zhengxiaobin@allwinnertech.com&gt;
 *
 * This software is licensed under the terms of the GNU General Public
 * License version 2, as published by the Free Software Foundation, and
 * may be copied, distributed, and modified under those terms.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */
#include &quot;default_panel.h&quot;

static void LCD_power_on(u32 sel);
static void LCD_power_off(u32 sel);
static void LCD_bl_open(u32 sel);
static void LCD_bl_close(u32 sel);

static void LCD_panel_init(u32 sel);
static void LCD_panel_exit(u32 sel);

static void LCD_cfg_panel_info(panel_extend_para * info)
{
        u32 i = 0, j=0;
        u32 items;
        u8 lcd_gamma_tbl[][2] =
        {
                //{input value, corrected value}
                {0, 0},
                {15, 15},
                {30, 30},
                {45, 45},
                {60, 60},
                {75, 75},
                {90, 90},
                {105, 105},
                {120, 120},
                {135, 135},
                {150, 150},
                {165, 165},
                {180, 180},
                {195, 195},
                {210, 210},
                {225, 225},
                {240, 240},
                {255, 255},
        };

        u32 lcd_cmap_tbl[2][3][4] = {
        {
                {LCD_CMAP_G0,LCD_CMAP_B1,LCD_CMAP_G2,LCD_CMAP_B3},
                {LCD_CMAP_B0,LCD_CMAP_R1,LCD_CMAP_B2,LCD_CMAP_R3},
                {LCD_CMAP_R0,LCD_CMAP_G1,LCD_CMAP_R2,LCD_CMAP_G3},
                },
                {
                {LCD_CMAP_B3,LCD_CMAP_G2,LCD_CMAP_B1,LCD_CMAP_G0},
                {LCD_CMAP_R3,LCD_CMAP_B2,LCD_CMAP_R1,LCD_CMAP_B0},
                {LCD_CMAP_G3,LCD_CMAP_R2,LCD_CMAP_G1,LCD_CMAP_R0},
                },
        };

        items = sizeof(lcd_gamma_tbl)/2;
        for (i=0; i&lt;items-1; i++) {
                u32 num = lcd_gamma_tbl[i+1][0] - lcd_gamma_tbl[i][0];

                for (j=0; j&lt;num; j++) {
                        u32 value = 0;

                        value = lcd_gamma_tbl[i][1] + ((lcd_gamma_tbl[i+1][1] - lcd_gamma_tbl[i][1]) * j)/num;
                        info-&gt;lcd_gamma_tbl[lcd_gamma_tbl[i][0] + j] = (value&lt;&lt;16) + (value&lt;&lt;8) + value;
                }
        }
        info-&gt;lcd_gamma_tbl[255] = (lcd_gamma_tbl[items-1][1]&lt;&lt;16) + (lcd_gamma_tbl[items-1][1]&lt;&lt;8) + lcd_gamma_tbl[items-1][1];

        memcpy(info-&gt;lcd_cmap_tbl, lcd_cmap_tbl, sizeof(lcd_cmap_tbl));

}

static s32 LCD_open_flow(u32 sel)
{
        LCD_OPEN_FUNC(sel, LCD_power_on, 30);   //open lcd power, and delay 50ms
        LCD_OPEN_FUNC(sel, LCD_panel_init, 50);   //open lcd power, than delay 200ms
        LCD_OPEN_FUNC(sel, sunxi_lcd_tcon_enable, 100);     //open lcd controller, and delay 100ms
        LCD_OPEN_FUNC(sel, LCD_bl_open, 0);     //open lcd backlight, and delay 0ms

        return 0;
}

static s32 LCD_close_flow(u32 sel)
{
        LCD_CLOSE_FUNC(sel, LCD_bl_close, 0);       //close lcd backlight, and delay 0ms
        LCD_CLOSE_FUNC(sel, sunxi_lcd_tcon_disable, 0);         //close lcd controller, and delay 0ms
        LCD_CLOSE_FUNC(sel, LCD_panel_exit,     200);   //open lcd power, than delay 200ms
        LCD_CLOSE_FUNC(sel, LCD_power_off, 500);   //close lcd power, and delay 500ms

        return 0;
}

static void LCD_power_on(u32 sel)
{
        sunxi_lcd_power_enable(sel, 0);//config lcd_power pin to open lcd power0
        sunxi_lcd_pin_cfg(sel, 1);
}

static void LCD_power_off(u32 sel)
{
        sunxi_lcd_pin_cfg(sel, 0);
        sunxi_lcd_power_disable(sel, 0);//config lcd_power pin to close lcd power0
}

static void LCD_bl_open(u32 sel)
{
        sunxi_lcd_pwm_enable(sel);
        sunxi_lcd_backlight_enable(sel);//config lcd_bl_en pin to open lcd backlight
}

static void LCD_bl_close(u32 sel)
{
        sunxi_lcd_backlight_disable(sel);//config lcd_bl_en pin to close lcd backlight
        sunxi_lcd_pwm_disable(sel);
}

static void LCD_panel_init(u32 sel)
{
        return;
}

static void LCD_panel_exit(u32 sel)
{
        return ;
}

//sel: 0:lcd0; 1:lcd1
static s32 LCD_user_defined_func(u32 sel, u32 para1, u32 para2, u32 para3)
{
        return 0;
}

__lcd_panel_t default_panel = {
        /* panel driver name, must mach the name of lcd_drv_name in sys_config.fex */
        .name = &quot;default_lcd&quot;,
        .func = {
                .cfg_panel_info = LCD_cfg_panel_info,
                .cfg_open_flow = LCD_open_flow,
                .cfg_close_flow = LCD_close_flow,
                .lcd_user_defined_func = LCD_user_defined_func,
        },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-开启触摸功能" tabindex="-1"><a class="header-anchor" href="#_5-开启触摸功能" aria-hidden="true">#</a> 5.开启触摸功能</h2><h3 id="_5-1修改设备树" tabindex="-1"><a class="header-anchor" href="#_5-1修改设备树" aria-hidden="true">#</a> 5.1修改设备树</h3><p>修改设备树中的twi2节点下增加ctp触摸子节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;twi2 {
        ctp@14 {
                compatible = &quot;allwinner,gsl3680&quot;;
                device_type = &quot;ctp&quot;;
                reg = &lt;0x14&gt;;
                status = &quot;okay&quot;;
                ctp_name = &quot;gt9xxnew_ts&quot;;
                ctp_twi_id = &lt;0x2&gt;;
                ctp_twi_addr = &lt;0x14&gt;;
                ctp_screen_max_x = &lt;0x400&gt;;
                ctp_screen_max_y = &lt;0x258&gt;;
                ctp_revert_x_flag = &lt;0x0&gt;;
                ctp_revert_y_flag = &lt;0x0&gt;;
                ctp_exchange_x_y_flag = &lt;0x0&gt;;
                ctp_int_port = &lt;&amp;pio PH 7 6 1 3 0xffffffff&gt;;
                ctp_wakeup   = &lt;&amp;pio PH 8 1 1 3 0xffffffff&gt;;
                //ctp-supply = &lt;&amp;reg_aldo2&gt;;
                //ctp_power_ldo = &lt;&amp;reg_dldo1&gt;;
                //ctp_power_ldo_vol = &lt;3300&gt;;
        };

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并在lcd0节点后面使能twi2节点和引脚复用功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;twi2 {
        clock-frequency = &lt;400000&gt;;
        pinctrl-0 = &lt;&amp;twi2_pins_a&gt;;
        pinctrl-1 = &lt;&amp;twi2_pins_b&gt;;
        pinctrl-names = &quot;default&quot;, &quot;sleep&quot;;
        /* For stability and backwards compatibility, we recommend setting ‘twi_drv_used’ to 0  */
        twi_drv_used = &lt;0&gt;;
        twi-supply = &lt;&amp;reg_dcdc1&gt;;
        twi_pkt_interval = &lt;0&gt;;
        //status = &quot;disabled&quot;;
        status = &quot;okay&quot;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-修改内核配置" tabindex="-1"><a class="header-anchor" href="#_5-2-修改内核配置" aria-hidden="true">#</a> 5.2 修改内核配置</h3><p>​ 在Tina的根目录下执行make kernel_menuconfig</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入下面的目录输入Y选中gt9xxnew touchscreen driver触摸驱动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Input device support 
		→ Touchscreens 
			&lt;*&gt;   gt9xxnew touchscreen driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230412150545791.png" alt="image-20230412150545791"></p><p>保存并退出内核配置界面</p><h2 id="_6-打开lvgl示例程序" tabindex="-1"><a class="header-anchor" href="#_6-打开lvgl示例程序" aria-hidden="true">#</a> 6.打开lvgl示例程序</h2><p>在Tina的根目录下，输入<code>make menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入如下目录，并输入Y选中lv_examples</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &gt; Gui 
 	&gt; Littlevgl
 		 &lt;*&gt; lv_examples................................. lvgl examples use lvgl-8.1.0 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选中后保存并退出配置界面。</p><h2 id="_7-编译并打包生成镜像" tabindex="-1"><a class="header-anchor" href="#_7-编译并打包生成镜像" aria-hidden="true">#</a> 7.编译并打包生成镜像</h2><p>由于我们第一次已经完整编译了系统，现在修改后编译系统的时间就不会特别长，具体时间取决于CPU的性能，在Tina的根目录下执行<code>make -jN </code>，其中N为线程数，增加线程数提高编译速度。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make -j4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待编译完成后，输入pack，打包生成镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ pack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打包生成镜像后可以在tina-v853-open/out/v853/100ask/openwrt/目录下找到新的镜像文件</p><p>v853_linux_100ask_uart0.img，将该文件拷贝到windows电脑下备用。</p><h2 id="_8-烧录新镜像启动开发板" tabindex="-1"><a class="header-anchor" href="#_8-烧录新镜像启动开发板" aria-hidden="true">#</a> 8.烧录新镜像启动开发板</h2><p>使用全志PhoenixSuit烧写工具进行新镜像的烧写，具体方法可以参见《100ASK_V853-PRO 环境配置及编译烧写》。</p><p>注意：需要在上电前连接七寸RGB屏，同时连接排线时需要注意排线的线序是否正确。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230412101223261.png" alt="image-20230412101223261"></p><p>连接好七寸屏，再连接电源线和两条Type-C数据线，将开关拨向电源接口的方向即可上电启动开发板，在烧写新镜像完成后通过串口工具打开开发板的串口终端，进入Tina Linux的控制台界面，输入<code>lv_examples 0</code>，即可在七寸RGB屏上显示出LVGL的DEMO程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# lv_examples 0
wh=1024x600, vwh=1024x1200, bpp=32, rotated=0
Turn on double buffering.
Turn on 2d hardware acceleration.
Turn on 2d hardware acceleration rotate.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,99);function h(D,x){const n=s("ExternalLinkIcon");return t(),a("div",null,[v,r,e("p",null,[i("​ 在前面我们已经学习了关于100ASK_V853-PRO编译和烧写,接下来就是在Tina SDK下去适配七寸RGB屏，购买链接为："),e("a",o,[i("https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-18944745104.11.669f1b7fE1ptyQ&id=611156659477"),l(n)])]),m,e("p",null,[i("100ASK_V853-PRO开发板购买链接："),e("a",b,[i("100ASK_V853-PRO开发板"),l(n)])]),p,e("p",null,[i("LCD_调试指南:"),e("a",_,[i("https://tina.100ask.net/SdkModule/Linux_LCD_DevelopmentGuide-01/"),l(n)])]),e("p",null,[i("Display_开发指南:"),e("a",q,[i("https://tina.100ask.net/SdkModule/Linux_Display_DevelopmentGuide-01/"),l(n)])]),g])}const w=d(c,[["render",h],["__file","01-V853SupportRGBDisplay.html.vue"]]);export{w as default};
