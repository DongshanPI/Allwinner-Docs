import{_ as s,r as a,o as d,c as l,a as n,b as e,d as v,e as r}from"./app-5cc5893e.js";const t={},c=n("h1",{id:"开发板适配mipi摄像头",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#开发板适配mipi摄像头","aria-hidden":"true"},"#"),e(" 开发板适配MIPI摄像头")],-1),o=n("h2",{id:"_0-前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_0-前言","aria-hidden":"true"},"#"),e(" 0.前言")],-1),u={href:"https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-18944745104.11.51891f84ejLLVX&id=706864521673",target:"_blank",rel:"noopener noreferrer"},m=r(`<p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419155206765.png" alt="image-20230419155206765"></p><p>全志Linux Tina-SDK开发完全手册：https://tina.100ask.net/</p><p>如果您想适配自己的摄像头，强烈建议您参照以下开发指南进行操作：</p><p>Camera_开发指南：https://tina.100ask.net/SdkModule/Linux_Camera_DevelopmentGuide-01/</p><h2 id="_1-vin框架介绍" tabindex="-1"><a class="header-anchor" href="#_1-vin框架介绍" aria-hidden="true">#</a> 1.VIN框架介绍</h2><p>V853支持并口CSI、MIPI，使用VIN camera驱动框架。</p><p><strong>Camera 通路框架</strong></p><p>• VIN 支持灵活配置单/双路输入双ISP 多通路输出的规格</p><p>• 引入media 框架实现pipeline 管理</p><p>• 将libisp 移植到用户空间解决GPL 问题</p><p>• 将统计buffer 独立为v4l2 subdev</p><p>• 将的scaler（vipp）模块独立为v4l2 subdev</p><p>• 将video buffer 修改为mplane 方式，使用户层取图更方便</p><p>• 采用v4l2-event 实现事件管理</p><p>• 采用v4l2-controls 新特性</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419160150480.png" alt="image-20230419160150480"></p><p><strong>VIN 框架</strong></p><p>• 使用过程中可简单的看成是vin 模块+ device 模块+af driver + flash 控制模块的方式；</p><p>• vin.c 是驱动的主要功能实现，包括注册/注销、参数读取、与v4l2 上层接口、与各device 的下层接口、中断处理、buffer 申请切换等；</p><p>• modules/sensor 文件夹里面是各个sensor 的器件层实现，一般包括上下电、初始化，各分辨率切换，yuv sensor 包括绝大部分的v4l2 定义的ioctrl 命令的实</p><p>现；而raw sensor 的话大部分ioctrl 命令在vin 层调用isp 库实现，少数如曝光/增益调节会透过vin 层到实际器件层；</p><p>• modules/actuator 文件夹内是各种vcm 的驱动；</p><p>• modules/flash 文件夹内是闪光灯控制接口实现；</p><p>• vin-csi 和vin-mipi 为对csi 接口和mipi 接口的控制文件；</p><p>• vin-isp 文件夹为isp 的库操作文件；</p><p>• vin-video 文件夹内主要是video 设备操作文件；</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/Tina-Sdk/Linux_Camera_DevGuide_image-20221122113602939.png" alt="image-20221122113602939"></p><p>驱动路径位于linux-4.9/drivers/media/platform/sunxi-vin 下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sunxi-vin:
│ vin.c ;v4l2驱动实现主体（包含视频接口和ISP部分）
│ vin.h ;v4l2驱动头文件
│ top_reg.c ;vin对各v4l2 subdev管理接口实现主体
│ top_reg.h ;管理接口头文件
│ top_reg_i.h ;vin模块接口层部分结构体
├── modules
│ ├── actuator ;vcm driver
│ │ ├── actuator.c
│ │ ├── actuator.h
│ │ ├── dw9714_act.c
│ │ ├── Makefile
│ ├── flash ;闪光灯driver
│ │ ├── flash.c
│ │ └── flash.h
│ └── sensor ;sensor driver
│ ├── ar0144_mipi.c
│ ├── camera_cfg.h ;camera ioctl扩展命令头文件
│ ├── camera.h ;camera公用结构体头文件
│ ├── Makefile
│ ├── ov2775_mipi.c
│ ├── ov5640.c
│ ├── sensor-compat-ioctl32.c
│ ├── sensor_helper.c ;sensor公用操作接口函数文件
│ ├── sensor_helper.h
├── platform ;平台相关的配置接口
├── utility
│ ├── bsp_common.c
│ ├── bsp_common.h
│ ├── cfg_op.c
│ ├── cfg_op.h
│ ├── config.c
│ ├── config.h
│ ├── sensor_info.c
│ ├── sensor_info.h
│ ├── vin_io.h
│ ├── vin_os.c
│ ├── vin_os.h
│ ├── vin_supply.c
│ └── vin_supply.h
├── vin-cci
│ ├── sunxi_cci.c
│ └── sunxi_cci.h
├── vin-csi
│ ├── parser_reg.c
│ ├── parser_reg.h
│ ├── parser_reg_i.h
│ ├── sunxi_csi.c
│ └── sunxi_csi.h
├── vin-isp
│ ├── sunxi_isp.c
│ └── sunxi_isp.h
├── vin-mipi
│ ├── sunxi_mipi.c
│ └── sunxi_mipi.h
├── vin-stat
│ ├── vin_h3a.c
│ ├── vin_h3a.h
│ ├── vin_ispstat.c
│ └── vin_ispstat.h
├── vin_test
├── vin-video
│ ├── vin_core.c
│ ├── vin_core.h
│ ├── vin_video.c
│ └── vin_video.h
└── vin-vipp
├── sunxi_scaler.c
├── sunxi_scaler.h
├── vipp_reg.c
├── vipp_reg.h
└── vipp_reg_i.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-驱动配置" tabindex="-1"><a class="header-anchor" href="#_2-驱动配置" aria-hidden="true">#</a> 2.驱动配置</h2><p>​ 100ASK_V853-PRO开发板支持4LINE双摄镜头模组和2LINE单摄镜头模组，下面我仅演示2LINE的MIPI摄像头如何进行配置。我们使用的是GC2053摄像头，使用的是全志已经内置的驱动程序，路径为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kernel/linux-4.9/drivers/media/platform/sunxi-vin/modules/sensor/gc2053_mipi.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-设备树配置" tabindex="-1"><a class="header-anchor" href="#_3-设备树配置" aria-hidden="true">#</a> 3.设备树配置</h2><p>设备树配置路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>device/config/chips/v853/configs/100ask/board.dts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>camera相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>                vind0:vind@0 {
                        vind0_clk = &lt;300000000&gt;;
                        status = &quot;okay&quot;;

                        csi2:csi@2 {
                                pinctrl-names = &quot;default&quot;,&quot;sleep&quot;;
                                pinctrl-0 = &lt;&amp;ncsi_pins_a&gt;;
                                pinctrl-1 = &lt;&amp;ncsi_pins_b&gt;;
                                status = &quot;okay&quot;;
                        };
                        /*Online mode tp9953 uses online mode*/
                        tdm0:tdm@0 {
                                work_mode = &lt;0&gt;;
                        };

                        isp00:isp@0 {
                                work_mode = &lt;0&gt;;
                        };

                        scaler00:scaler@0 {
                                work_mode = &lt;0&gt;;
                        };

                        scaler10:scaler@4 {
                                work_mode = &lt;0&gt;;
                        };

                        scaler20:scaler@8 {
                                work_mode = &lt;0&gt;;
                        };

                        scaler30:scaler@12 {
                                work_mode = &lt;0&gt;;
                        };

                        actuator0:actuator@0 {
                                device_type = &quot;actuator0&quot;;
                                actuator0_name = &quot;ad5820_act&quot;;
                                actuator0_slave = &lt;0x18&gt;;
                                actuator0_af_pwdn = &lt;&gt;;
                                actuator0_afvdd = &quot;afvcc-csi&quot;;
                                actuator0_afvdd_vol = &lt;2800000&gt;;
                                status = &quot;disabled&quot;;
                        };
                        flash0:flash@0 {
                                device_type = &quot;flash0&quot;;
                                flash0_type = &lt;2&gt;;
                                flash0_en = &lt;&gt;;
                                flash0_mode = &lt;&gt;;
                                flash0_flvdd = &quot;&quot;;
                                flash0_flvdd_vol = &lt;&gt;;
                                status = &quot;disabled&quot;;
                        };

                        sensor0:sensor@0 {
                                device_type = &quot;sensor0&quot;;
                                sensor0_mname = &quot;gc2053_mipi&quot;;
                                sensor0_twi_cci_id = &lt;1&gt;;
                                sensor0_twi_addr = &lt;0x6e&gt;;
                                sensor0_mclk_id = &lt;0&gt;;
                                sensor0_pos = &quot;rear&quot;;
                                sensor0_isp_used = &lt;1&gt;;
                                sensor0_fmt = &lt;1&gt;;
                                sensor0_stby_mode = &lt;0&gt;;
                                sensor0_vflip = &lt;0&gt;;
                                sensor0_hflip = &lt;0&gt;;
                                sensor0_iovdd-supply = &lt;&amp;reg_aldo2&gt;;
                                sensor0_iovdd_vol = &lt;1800000&gt;;
                                sensor0_avdd-supply = &lt;&amp;reg_bldo2&gt;;
                                sensor0_avdd_vol = &lt;2800000&gt;;
                                sensor0_dvdd-supply = &lt;&amp;reg_dldo2&gt;;
                                sensor0_dvdd_vol = &lt;1200000&gt;;
                                sensor0_power_en = &lt;&gt;;
                                sensor0_reset = &lt;&amp;pio PA 18 1 0 1 0&gt;;
                                sensor0_pwdn = &lt;&amp;pio PA 19 1 0 1 0&gt;;
                                sensor0_sm_hs = &lt;&gt;;
                                sensor0_sm_vs = &lt;&gt;;
                                flash_handle = &lt;&amp;flash0&gt;;
                                act_handle = &lt;&amp;actuator0&gt;;
                                status  = &quot;okay&quot;;
                        };
                        sensor1:sensor@1 {
                                device_type = &quot;sensor1&quot;;
                                sensor1_mname = &quot;tp9953&quot;;
                                sensor1_twi_cci_id = &lt;0&gt;;
                                sensor1_twi_addr = &lt;0x88&gt;;
                                sensor1_mclk_id = &lt;2&gt;;
                                sensor1_pos = &quot;front&quot;;
                                sensor1_isp_used = &lt;0&gt;;
                                sensor1_fmt = &lt;0&gt;;
                                sensor1_stby_mode = &lt;0&gt;;
                                sensor1_vflip = &lt;0&gt;;
                                sensor1_hflip = &lt;0&gt;;
                                sensor1_iovdd-supply = &lt;&amp;reg_aldo2&gt;;
                                sensor1_iovdd_vol = &lt;1800000&gt;;
                                sensor1_avdd-supply = &lt;&gt;; /*&lt;&amp;reg_dcdc1&gt;;*/
                                sensor1_avdd_vol = &lt;3300000&gt;;
                                sensor1_dvdd-supply = &lt;&gt;;//&lt;&amp;reg_dldo2&gt;;
                                sensor1_dvdd_vol = &lt;1200000&gt;;
                                sensor1_power_en = &lt;&amp;pio PI 0 1 0 1 0&gt;;
                                sensor1_reset = &lt;&amp;pio PH 13 1 0 1 0&gt;;
                                sensor1_pwdn  = &lt;&gt;;
                                /*sensor1_pwdn = &lt;&amp;pio PE 13 1 0 1 0&gt;;*/
                                sensor1_sm_hs = &lt;&gt;;
                                sensor1_sm_vs = &lt;&gt;;
                                flash_handle = &lt;&gt;;
                                act_handle = &lt;&gt;;
                                status  = &quot;okay&quot;;
                        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-内核配置" tabindex="-1"><a class="header-anchor" href="#_4-内核配置" aria-hidden="true">#</a> 4.内核配置</h2><p>在Tina根目录下执行<code>make kernel_menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make kernel_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意:在进行内核配置前需要配置环境变量才可以进入内核调试，即在配置前输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ source build/envsetup.sh
...
book@100ask:~/workspaces/tina-v853-open$ lunch
... 输入1，选择方案1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在内核配置界面中，进入如下目录，输入M选中下面两项。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Multimedia support 
		→ V4L platform devices
			&lt;M&gt;   sunxi video input (camera csi/mipi isp vipp)driver
			&lt;M&gt;     v4l2 new driver for SUNXI
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419174735087.png" alt="image-20230419174735087"></p><p>可以看到全志已经支持了很多摄像头，找到我们需要适配的摄像头，输入M将gc2053驱动编为模块。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>→ Device Drivers 
	→ Multimedia support 
		→ V4L platform devices 
			→ sensor driver select
				&lt;M&gt; use gc2053_mipi driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：如果出现没有的路径，需要选择上一级目录才会打开。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419170040385.png" alt="image-20230419170040385"></p><h2 id="_5-tina配置" tabindex="-1"><a class="header-anchor" href="#_5-tina配置" aria-hidden="true">#</a> 5.Tina配置</h2><p>在Tina根目录下输入<code>make menuconfig</code>，进入如下目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &gt; Kernel modules 
 	&gt; Video Support
 		&lt;*&gt; kmod-vin-v4l2.............................. Video input support (staging)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419170855104.png" alt="image-20230419170855104"></p><h2 id="_6-modules-mk配置" tabindex="-1"><a class="header-anchor" href="#_6-modules-mk配置" aria-hidden="true">#</a> 6.modules.mk配置</h2><p>modules.mk主要完成两个方面：</p><ol><li>拷贝相关的ko模块到小机rootfs中</li><li>rootfs启动时，按顺序自动加载相关的ko模块。</li></ol><p>modules.mk文件路径：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>tina-v853-open/openwrt/target/v853/v853-100ask/modules.mk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>驱动加载顺序配置</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code> <span class="token keyword">define</span> KernelPackage/vin-v4l2
   SUBMENU<span class="token operator">:=</span><span class="token variable">$</span><span class="token punctuation">(</span>VIDEO_MENU<span class="token punctuation">)</span>
   TITLE<span class="token operator">:=</span>Video input support <span class="token punctuation">(</span>staging<span class="token punctuation">)</span>
   DEPENDS<span class="token operator">:=</span>
   FILES<span class="token operator">:=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/v4l2-core/videobuf2-core.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/v4l2-core/videobuf2-dma-contig.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/v4l2-core/videobuf2-memops.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/v4l2-core/videobuf2-v4l2.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/platform/sunxi-vin/vin_io.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/platform/sunxi-vin/modules/sensor/gc2053_mipi.ko
 <span class="token comment">#  FILES+=$(LINUX_DIR)/drivers/media/platform/sunxi-vin/modules/sensor_power/sensor_power.ko</span>
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/media/platform/sunxi-vin/vin_v4l2.ko
   FILES<span class="token operator">+=</span><span class="token variable">$</span><span class="token punctuation">(</span>LINUX_DIR<span class="token punctuation">)</span>/drivers/input/sensor/da380/da380.ko
   AUTOLOAD<span class="token operator">:=</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> AutoProbe,videobuf2-core videobuf2-dma-contig videobuf2-memops videobuf2-v4l2 vin_io gc2053_mipi vin_v4l2 da380.ko<span class="token punctuation">)</span>
 <span class="token keyword">endef</span>

 <span class="token keyword">define</span> KernelPackage/vin-v4l2/description
  Kernel modules for video input support
 <span class="token keyword">endef</span>

 <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">eval</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> KernelPackage,vin-v4l2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-s00mpp配置" tabindex="-1"><a class="header-anchor" href="#_7-s00mpp配置" aria-hidden="true">#</a> 7.S00mpp配置</h2><p>V853平台在完成modules.mk配置后，还需要完成.ko挂载脚本S00mpp的配置，以便开机快速启动摄像头模块。</p><p>S00mpp配置路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tina-v853-open/openwrt/target/v853/v853-100ask/busybox-init-base-files/etc/init.d/S00mpp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>脚本对摄像头驱动进行了提前加载，应用需要使用的时候即可快速配置并启动。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh
#
# Load mpp modules....
#

MODULES_DIR=&quot;/lib/modules/\`uname -r\`&quot;

start() {
    printf &quot;Load mpp modules\\n&quot;
    insmod $MODULES_DIR/videobuf2-core.ko
    insmod $MODULES_DIR/videobuf2-memops.ko
    insmod $MODULES_DIR/videobuf2-dma-contig.ko
    insmod $MODULES_DIR/videobuf2-v4l2.ko
    insmod $MODULES_DIR/vin_io.ko
#   insmod $MODULES_DIR/sensor_power.ko
    insmod $MODULES_DIR/gc4663_mipi.ko
    insmod $MODULES_DIR/vin_v4l2.ko
    insmod $MODULES_DIR/sunxi_aio.ko
    insmod $MODULES_DIR/sunxi_eise.ko
#   insmod $MODULES_DIR/vipcore.ko
}

stop() {
    printf &quot;Unload mpp modules\\n&quot;
#   rmmod $MODULES_DIR/vipcore.ko
    rmmod $MODULES_DIR/sunxi_eise.ko
    rmmod $MODULES_DIR/sunxi_aio.ko
    rmmod $MODULES_DIR/vin_v4l2.ko
    rmmod $MODULES_DIR/gc4663_mipi.ko
#   rmmod $MODULES_DIR/sensor_power.ko
    rmmod $MODULES_DIR/vin_io.ko
    rmmod $MODULES_DIR/videobuf2-v4l2.ko
    rmmod $MODULES_DIR/videobuf2-dma-contig.ko
    rmmod $MODULES_DIR/videobuf2-memops.ko
    rmmod $MODULES_DIR/videobuf2-core.ko
}

case &quot;$1&quot; in
    start)
    start
    ;;
    stop)
    stop
    ;;
    restart|reload)
    stop
    start
    ;;
  *)
    echo &quot;Usage: $0 {start|stop|restart}&quot;
    exit 1
esac

exit $?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-增加摄像头测试程序" tabindex="-1"><a class="header-anchor" href="#_8-增加摄像头测试程序" aria-hidden="true">#</a> 8.增加摄像头测试程序</h2><p>在Tina根目录下执行<code>make menuconfig</code>，进入Tina配置界面后，进入如下目录，输入Y选中camerademo测试程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; Allwinner 
	&gt; Vision
		&lt;*&gt; camerademo........................................ camerademo test sensor  ---&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230419174305027.png" alt="image-20230419174305027"></p><h2 id="_8-编译烧写镜像" tabindex="-1"><a class="header-anchor" href="#_8-编译烧写镜像" aria-hidden="true">#</a> 8.编译烧写镜像</h2><p>在Tina的根目录下，输入<code>make -j32 </code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make -j32
...
book@100ask:~/workspaces/tina-v853-open$ pack
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 生成镜像后，将tina-v853-open/out/v853/100ask/openwrt/目录下的v853_linux_100ask_uart0.img镜像拷贝到Windows电脑主机中，使用全志PhoenixSuit烧写工具烧写到开发板上。</p><p>​ 上电前需要连接插上12V的电源线，和两条Type-C，把开关拨向电源接口方向上电，烧写新镜像后等待启动系统，在命令行中输入<code>lsmod</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# lsmod 
Module                  Size  Used by
vin_v4l2              181099  0 
gc2053_mipi             8567  0 
vin_io                 21106  3 vin_v4l2,gc2053_mipi
videobuf2_v4l2          9304  1 vin_v4l2
videobuf2_dma_contig     8632  1 vin_v4l2
videobuf2_memops         948  1 videobuf2_dma_contig
videobuf2_core         22168  2 vin_v4l2,videobuf2_v4l2
xradio_wlan              598  0 
xradio_core           431911  1 xradio_wlan
xradio_mac            222724  1 xradio_core
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到我们之前选中的VIN驱动和GC2053驱动已经装载进去了</p><h2 id="_9-运行camera测试程序" tabindex="-1"><a class="header-anchor" href="#_9-运行camera测试程序" aria-hidden="true">#</a> 9.运行camera测试程序</h2><p>在开发板的串口终端界面输入<code>camedemo -h</code>可以输出camera测试程序的使用教程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# camerademo -h
[CAMERA]**********************************************************
[CAMERA]*                                                        *
[CAMERA]*              this is camera test.                      *
[CAMERA]*                                                        *
[CAMERA]**********************************************************
[CAMERA]******************** camerademo help *********************
[CAMERA] This program is a test camera.
[CAMERA] It will query the sensor to support the resolution, output format and test frame rate.
[CAMERA] At the same time you can modify the data to save the path and get the number of photos.
[CAMERA] When the last parameter is debug, the output will be more detailed information
[CAMERA] There are eight ways to run:
[CAMERA]    1.camerademo --- use the default parameters.
[CAMERA]    2.camerademo debug --- use the default parameters and output debug information.
[CAMERA]    3.camerademo setting --- can choose the resolution and data format.
[CAMERA]    4.camerademo setting debug --- setting and output debug information.
[CAMERA]    5.camerademo NV21 640 480 30 bmp /tmp 5 --- param input mode,can save bmp or yuv.
[CAMERA]    6.camerademo NV21 640 480 30 bmp /tmp 5 debug --- output debug information.
[CAMERA]    7.camerademo NV21 640 480 30 bmp /tmp 5 Num --- /dev/videoNum param input mode,can save bmp or yuv.
[CAMERA]    8.camerademo NV21 640 480 30 bmp /tmp 5 Num debug --- /dev/videoNum output debug information.
[CAMERA]    8.camerademo NV21 640 480 30 bmp /tmp 5 Num 1 --- 1/2: chose memory: V4L2_MEMORY_MMAP/USERPTR
[CAMERA]**********************************************************
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在开发板的串口终端界面输入<code>camerademo NV21 640 480 30 bmp /tmp 5</code>，将会拍摄5张照片放在/tmp目录下，将/tmp目录下的文件拷贝到电脑端即可查看相应的图片。</p><p>具体教程可以参考：https://tina.100ask.net/SdkModule/Linux_Camera_DevelopmentGuide-06/</p>`,83);function p(b,_){const i=a("ExternalLinkIcon");return d(),l("div",null,[c,o,n("p",null,[e("​ 100ASK_V853-PRO开发板支持4LINE的MIPI摄像头和2LINE的MIPI摄像头，使用百问网提供的Tina SDK包生成的镜像，系统已经配置好了，可以直接使用。本章介绍如何去适配一个MIPI摄像头，本文所用的2LINE的MIPI摄像头，大家可以在百问网官方淘宝店铺上购买。"),n("a",u,[e("100ASK_V853-PRO开发板"),v(i)])]),m])}const h=s(t,[["render",p],["__file","06-V853SuportCamera.html.vue"]]);export{h as default};
