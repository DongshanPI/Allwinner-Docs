import{_ as p,r as o,o as c,c as i,a as n,b as s,d as e,e as t}from"./app-5cc5893e.js";const l={},u=t('<ul><li>问题反馈交流区 https://github.com/100askTeam/Stage3_D1s-Components/discussions/</li></ul><h1 id="lvgl-开发实战" tabindex="-1"><a class="header-anchor" href="#lvgl-开发实战" aria-hidden="true">#</a> LVGL 开发实战</h1><h2 id="移植基于-lvgl-的-2048-小游戏" tabindex="-1"><a class="header-anchor" href="#移植基于-lvgl-的-2048-小游戏" aria-hidden="true">#</a> 移植基于 LVGL 的 2048 小游戏</h2><p>这一节将以一个已经编写好的 <code>lvgl</code> 小游戏 <code>2048</code> 描述如何将已经编写完成的 <code>lvgl</code> 程序移植到开发板上。</p>',4),r=n("code",null,"2048",-1),d={href:"https://gitee.com/weidongshan/lv_lib_100ask",target:"_blank",rel:"noopener noreferrer"},v=t('<h3 id="准备脚手架" tabindex="-1"><a class="header-anchor" href="#准备脚手架" aria-hidden="true">#</a> 准备脚手架</h3><p>在这之前，我们先准备基础的 LVGL 脚手架。可以直接从 <code>lv_g2d_test</code> 里复制过来进行修改即可。</p><p>首先我们复制源码，在 <code>platform/thirdparty/gui/lvgl-8</code> 源码文件夹里，把 红色箭头 所指的 <code>lv_g2d_test</code> 的源码作为模板复制到 黄色箭头指向的 <code>lv_2048</code> 文件夹里。</p><p>如下图所示，并清理下 <code>res</code> 资源文件夹，</p>',4),k={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-53-08-1658123584(1).png",target:"_blank",rel:"noopener noreferrer"},m=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-53-08-1658123584(1).png",alt:"img"},null,-1),_=n("p",null,[s("同样的，复制一份引索文件，找到 "),n("code",null,"openwrt/package/thirdparty/gui/lvgl-8"),s(" 并把 "),n("code",null,"lv_g2d_test"),s(" 复制一份重命名为 "),n("code",null,"lv_2048"),s(" 作为我们 "),n("code",null,"2048"),s(" 小游戏使用的引索。")],-1),b={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-53-55-1658123630(1).png",target:"_blank",rel:"noopener noreferrer"},h=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-53-55-1658123630(1).png",alt:"img"},null,-1),g=t(`<p>并编辑 <code>Makefile</code>，修改文件名称，把 <code>lv_g2d_test</code> 修改为这里的 <code>lv_2048</code></p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token keyword">include</span> <span class="token variable">$</span><span class="token punctuation">(</span>TOPDIR<span class="token punctuation">)</span>/rules.mk
<span class="token keyword">include</span> <span class="token variable">$</span><span class="token punctuation">(</span>INCLUDE_DIR<span class="token punctuation">)</span>/package.mk
<span class="token keyword">include</span> ../sunxifb.mk

PKG_NAME<span class="token operator">:=</span>lv_2048
PKG_VERSION<span class="token operator">:=</span>8.1.0
PKG_RELEASE<span class="token operator">:=</span>1

PKG_BUILD_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>BUILD_DIR<span class="token punctuation">)</span>/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>
SRC_CODE_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>LICHEE_PLATFORM_DIR<span class="token punctuation">)</span>/thirdparty/gui/lvgl-8/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>
<span class="token keyword">define</span> Package/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>
  SECTION<span class="token operator">:=</span>gui
  SUBMENU<span class="token operator">:=</span>Littlevgl
  CATEGORY<span class="token operator">:=</span>Gui
  DEPENDS<span class="token operator">:=</span>+LVGL8_USE_SUNXIFB_G2D<span class="token punctuation">:</span>libuapi +LVGL8_USE_SUNXIFB_G2D<span class="token punctuation">:</span>kmod-sunxi-g2d \\
<span class="token target symbol">           +LVGL8_USE_FREETYPE</span><span class="token punctuation">:</span>libfreetype
  TITLE<span class="token operator">:=</span>lvgl 2048 
<span class="token keyword">endef</span>

PKG_CONFIG_DEPENDS <span class="token operator">:=</span> \\
    CONFIG_LVGL8_USE_SUNXIFB_DOUBLE_BUFFER \\
    CONFIG_LVGL8_USE_SUNXIFB_CACHE \\
    CONFIG_LVGL8_USE_SUNXIFB_G2D \\
    CONFIG_LVGL8_USE_SUNXIFB_G2D_ROTATE

<span class="token keyword">define</span> Package/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>/config
<span class="token keyword">endef</span>

<span class="token keyword">define</span> Package/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>/Default
<span class="token keyword">endef</span>

<span class="token keyword">define</span> Package/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>/description
  a lvgl 2048 v8.1.0
<span class="token keyword">endef</span>

<span class="token keyword">define</span> Build/Prepare
    <span class="token variable">$</span><span class="token punctuation">(</span>INSTALL_DIR<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/
    <span class="token variable">$</span><span class="token punctuation">(</span>CP<span class="token punctuation">)</span> -r <span class="token variable">$</span><span class="token punctuation">(</span>SRC_CODE_DIR<span class="token punctuation">)</span>/src <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/
    <span class="token variable">$</span><span class="token punctuation">(</span>CP<span class="token punctuation">)</span> -r <span class="token variable">$</span><span class="token punctuation">(</span>SRC_CODE_DIR<span class="token punctuation">)</span>/../lvgl <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/src/
    <span class="token variable">$</span><span class="token punctuation">(</span>CP<span class="token punctuation">)</span> -r <span class="token variable">$</span><span class="token punctuation">(</span>SRC_CODE_DIR<span class="token punctuation">)</span>/../lv_drivers <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/src/
<span class="token keyword">endef</span>

<span class="token keyword">define</span> Build/Configure
<span class="token keyword">endef</span>

TARGET_CFLAGS<span class="token operator">+=</span>-I<span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/src

<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span>CONFIG_LVGL8_USE_SUNXIFB_G2D<span class="token punctuation">)</span>,y<span class="token punctuation">)</span>
TARGET_CFLAGS<span class="token operator">+=</span>-DLV_USE_SUNXIFB_G2D_FILL \\
                -DLV_USE_SUNXIFB_G2D_BLEND \\
                -DLV_USE_SUNXIFB_G2D_BLIT \\
                -DLV_USE_SUNXIFB_G2D_SCALE
<span class="token keyword">endif</span>

<span class="token keyword">define</span> Build/Compile
    <span class="token variable">$</span><span class="token punctuation">(</span>MAKE<span class="token punctuation">)</span> -C <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/src\\
        ARCH<span class="token operator">=</span><span class="token string">&quot;$(TARGET_ARCH)&quot;</span> \\
        AR<span class="token operator">=</span><span class="token string">&quot;$(TARGET_AR)&quot;</span> \\
        CC<span class="token operator">=</span><span class="token string">&quot;$(TARGET_CC)&quot;</span> \\
        CXX<span class="token operator">=</span><span class="token string">&quot;$(TARGET_CXX)&quot;</span> \\
        CFLAGS<span class="token operator">=</span><span class="token string">&quot;$(TARGET_CFLAGS)&quot;</span> \\
        LDFLAGS<span class="token operator">=</span><span class="token string">&quot;$(TARGET_LDFLAGS)&quot;</span> \\
        INSTALL_PREFIX<span class="token operator">=</span><span class="token string">&quot;$(PKG_INSTALL_DIR)&quot;</span> \\
        all
<span class="token keyword">endef</span>

<span class="token keyword">define</span> Package/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span>/install
    <span class="token variable">$</span><span class="token punctuation">(</span>INSTALL_DIR<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span>/usr/bin/
    <span class="token variable">$</span><span class="token punctuation">(</span>INSTALL_DIR<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span>/usr/share/lv_2048
    <span class="token variable">$</span><span class="token punctuation">(</span>INSTALL_BIN<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>PKG_BUILD_DIR<span class="token punctuation">)</span>/src/<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span>/usr/bin/
<span class="token keyword">endef</span>

<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">eval</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> BuildPackage,<span class="token variable">$</span><span class="token punctuation">(</span>PKG_NAME<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成脚手架的搭建后，可以 <code>make menuconfig</code> 里查看是否出现了 <code>lv_2048</code> 这个选项，选中它。</p>`,3),f={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-56-31-image.png",target:"_blank",rel:"noopener noreferrer"},y=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-13-56-31-image.png",alt:"img"},null,-1),w=t(`<h3 id="修改源码" tabindex="-1"><a class="header-anchor" href="#修改源码" aria-hidden="true">#</a> 修改源码</h3><p>第二步是修改源码。编辑之前复制的 <code>main.c</code> 文件，把不需要的 <code>lv_g2d_test</code> 的部分删去。保留最基础的部分。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lvgl/lvgl.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_drivers/display/sunxifb.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_drivers/indev/evdev.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">static</span> <span class="token class-name">lv_style_t</span> rect_style<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">lv_obj_t</span> <span class="token operator">*</span>rect_obj<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">lv_obj_t</span> <span class="token operator">*</span>canvas<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">lv_disp_drv_t</span> disp_drv<span class="token punctuation">;</span>
    <span class="token class-name">lv_disp_draw_buf_t</span> disp_buf<span class="token punctuation">;</span>
    <span class="token class-name">lv_indev_drv_t</span> indev_drv<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> rotated <span class="token operator">=</span> LV_DISP_ROT_NONE<span class="token punctuation">;</span>

    <span class="token function">lv_disp_drv_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*LittlevGL init*/</span>
    <span class="token function">lv_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*Linux frame buffer device init*/</span>
    <span class="token function">sunxifb_init</span><span class="token punctuation">(</span>rotated<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*A buffer for LittlevGL to draw the screen&#39;s content*/</span>
    <span class="token keyword">static</span> <span class="token class-name">uint32_t</span> width<span class="token punctuation">,</span> height<span class="token punctuation">;</span>
    <span class="token function">sunxifb_get_sizes</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>width<span class="token punctuation">,</span> <span class="token operator">&amp;</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token class-name">lv_color_t</span> <span class="token operator">*</span>buf<span class="token punctuation">;</span>
    buf <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">lv_color_t</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">sunxifb_alloc</span><span class="token punctuation">(</span>width <span class="token operator">*</span> height <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">lv_color_t</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;lv_2048&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>buf <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">sunxifb_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;malloc draw buffer fail\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*Initialize a descriptor for the buffer*/</span>
    <span class="token function">lv_disp_draw_buf_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_buf<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> width <span class="token operator">*</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*Initialize and register a display driver*/</span>
    disp_drv<span class="token punctuation">.</span>draw_buf <span class="token operator">=</span> <span class="token operator">&amp;</span>disp_buf<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>flush_cb <span class="token operator">=</span> sunxifb_flush<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>hor_res <span class="token operator">=</span> width<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>ver_res <span class="token operator">=</span> height<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>rotated <span class="token operator">=</span> rotated<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>screen_transp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token function">lv_disp_drv_register</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">evdev_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">lv_indev_drv_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>indev_drv<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*Basic initialization*/</span>
    indev_drv<span class="token punctuation">.</span>type <span class="token operator">=</span> LV_INDEV_TYPE_POINTER<span class="token punctuation">;</span> <span class="token comment">/*See below.*/</span>
    indev_drv<span class="token punctuation">.</span>read_cb <span class="token operator">=</span> evdev_read<span class="token punctuation">;</span> <span class="token comment">/*See below.*/</span>
    <span class="token comment">/*Register the driver in LVGL and save the created input device object*/</span>
    <span class="token class-name">lv_indev_t</span> <span class="token operator">*</span>evdev_indev <span class="token operator">=</span> <span class="token function">lv_indev_drv_register</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>indev_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*Handle LitlevGL tasks (tickless mode)*/</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">lv_task_handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*Set in lv_conf.h as \`LV_TICK_CUSTOM_SYS_TIME_EXPR\`*/</span>
<span class="token class-name">uint32_t</span> <span class="token function">custom_tick_get</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">uint64_t</span> start_ms <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>start_ms <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">timeval</span> tv_start<span class="token punctuation">;</span>
        <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tv_start<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        start_ms <span class="token operator">=</span> <span class="token punctuation">(</span>tv_start<span class="token punctuation">.</span>tv_sec <span class="token operator">*</span> <span class="token number">1000000</span> <span class="token operator">+</span> tv_start<span class="token punctuation">.</span>tv_usec<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> tv_now<span class="token punctuation">;</span>
    <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tv_now<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">uint64_t</span> now_ms<span class="token punctuation">;</span>
    now_ms <span class="token operator">=</span> <span class="token punctuation">(</span>tv_now<span class="token punctuation">.</span>tv_sec <span class="token operator">*</span> <span class="token number">1000000</span> <span class="token operator">+</span> tv_now<span class="token punctuation">.</span>tv_usec<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>

    <span class="token class-name">uint32_t</span> time_ms <span class="token operator">=</span> now_ms <span class="token operator">-</span> start_ms<span class="token punctuation">;</span>
    <span class="token keyword">return</span> time_ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来则是对接 <code>lv_lib_100ask</code> 与 <code>2048</code> 小游戏，我们先下载 <code>lv_lib_100ask</code> 的源码，放置到 <code>platform/thirdparty/gui/lvgl-8/lv_2048</code> 的 <code>src</code> 文件夹里。并按照 <code>lv_lib_100ask</code> 的说明，复制一份 <code>lv_lib_100ask_conf_template.h</code> 到 <code>src</code> 目录，并改名为 <code>lv_lib_100ask_conf.h</code></p>`,4),L={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-14-55-44-image.png",target:"_blank",rel:"noopener noreferrer"},S=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-14-55-44-image.png",alt:"img"},null,-1),I=t(`<p>编辑 <code>lv_lib_100ask_conf.h</code>，开启整个库的引用，并配置启用 <code>LV_USE_100ASK_2048</code> 。为了简洁，这里删除了不需要的配置项。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 * @file lv_lib_100ask_conf.h
 * Configuration file for v8.2.0
 *
 */</span>
<span class="token comment">/*
 * COPY THIS FILE AS lv_lib_100ask_conf.h
 */</span>

<span class="token comment">/* clang-format off */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token number">1</span> </span><span class="token comment">/*Set it to &quot;1&quot; to enable the content*/</span> </span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">LV_LIB_100ASK_CONF_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LV_LIB_100ASK_CONF_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_conf.h&quot;</span></span>

<span class="token comment">/*******************
 * GENERAL SETTING
 *******************/</span>

<span class="token comment">/*********************
 * USAGE
 *********************

/*2048 game*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LV_USE_100ASK_2048</span>                               <span class="token expression"><span class="token number">1</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression">LV_USE_100ASK_2048</span></span>
    <span class="token comment">/* Matrix size*/</span>
    <span class="token comment">/*Do not modify*/</span>
    <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span>  <span class="token macro-name">LV_100ASK_2048_MATRIX_SIZE</span>          <span class="token expression"><span class="token number">4</span></span></span>

    <span class="token comment">/*test*/</span>
    <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span>  <span class="token macro-name">LV_100ASK_2048_SIMPLE_TEST</span>          <span class="token expression"><span class="token number">1</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span>  </span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/*LV_LIB_100ASK_H*/</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/*End of &quot;Content enable&quot;*/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再编辑 <code>platform/thirdparty/gui/lvgl-8/lv_2048/src/lv_lib_100ask/lv_lib_100ask.h</code> 中的版本号，修改为 <code>(8,1,0)</code></p>`,3),E={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-48-46-image.png",target:"_blank",rel:"noopener noreferrer"},C=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-48-46-image.png",alt:"img"},null,-1),G=t(`<p>之后在 <code>main.c</code> 里修改，对接 <code>lv_100ask_2048_simple_test</code>，具体如下。</p><p>（1）头文件加入 <code>lv_lib_100ask/lv_lib_100ask.h</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;lv_lib_100ask/lv_lib_100ask.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（2）在 <code>main</code> 函数里添加接口调用</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">lv_100ask_2048_simple_test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完整的 <code>main.c</code> 如下</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lvgl/lvgl.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_drivers/display/sunxifb.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_drivers/indev/evdev.h&quot;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;lv_lib_100ask/lv_lib_100ask.h&quot;</span>  <span class="token comment">// 引用头文件</span></span>

<span class="token keyword">static</span> <span class="token class-name">lv_style_t</span> rect_style<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">lv_obj_t</span> <span class="token operator">*</span>rect_obj<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">lv_obj_t</span> <span class="token operator">*</span>canvas<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">lv_disp_drv_t</span> disp_drv<span class="token punctuation">;</span>
    <span class="token class-name">lv_disp_draw_buf_t</span> disp_buf<span class="token punctuation">;</span>
    <span class="token class-name">lv_indev_drv_t</span> indev_drv<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> rotated <span class="token operator">=</span> LV_DISP_ROT_NONE<span class="token punctuation">;</span>

    <span class="token function">lv_disp_drv_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*LittlevGL init*/</span>
    <span class="token function">lv_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*Linux frame buffer device init*/</span>
    <span class="token function">sunxifb_init</span><span class="token punctuation">(</span>rotated<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*A buffer for LittlevGL to draw the screen&#39;s content*/</span>
    <span class="token keyword">static</span> <span class="token class-name">uint32_t</span> width<span class="token punctuation">,</span> height<span class="token punctuation">;</span>
    <span class="token function">sunxifb_get_sizes</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>width<span class="token punctuation">,</span> <span class="token operator">&amp;</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token class-name">lv_color_t</span> <span class="token operator">*</span>buf<span class="token punctuation">;</span>
    buf <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">lv_color_t</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">sunxifb_alloc</span><span class="token punctuation">(</span>width <span class="token operator">*</span> height <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">lv_color_t</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;lv_nes&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>buf <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">sunxifb_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;malloc draw buffer fail\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*Initialize a descriptor for the buffer*/</span>
    <span class="token function">lv_disp_draw_buf_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_buf<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> width <span class="token operator">*</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*Initialize and register a display driver*/</span>
    disp_drv<span class="token punctuation">.</span>draw_buf <span class="token operator">=</span> <span class="token operator">&amp;</span>disp_buf<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>flush_cb <span class="token operator">=</span> sunxifb_flush<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>hor_res <span class="token operator">=</span> width<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>ver_res <span class="token operator">=</span> height<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>rotated <span class="token operator">=</span> rotated<span class="token punctuation">;</span>
    disp_drv<span class="token punctuation">.</span>screen_transp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token function">lv_disp_drv_register</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>disp_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">evdev_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">lv_indev_drv_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>indev_drv<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*Basic initialization*/</span>
    indev_drv<span class="token punctuation">.</span>type <span class="token operator">=</span> LV_INDEV_TYPE_POINTER<span class="token punctuation">;</span> <span class="token comment">/*See below.*/</span>
    indev_drv<span class="token punctuation">.</span>read_cb <span class="token operator">=</span> evdev_read<span class="token punctuation">;</span> <span class="token comment">/*See below.*/</span>
    <span class="token comment">/*Register the driver in LVGL and save the created input device object*/</span>
    <span class="token class-name">lv_indev_t</span> <span class="token operator">*</span>evdev_indev <span class="token operator">=</span> <span class="token function">lv_indev_drv_register</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>indev_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">lv_100ask_2048_simple_test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 调用 2048 小游戏</span>

    <span class="token comment">/*Handle LitlevGL tasks (tickless mode)*/</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">lv_task_handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*Set in lv_conf.h as \`LV_TICK_CUSTOM_SYS_TIME_EXPR\`*/</span>
<span class="token class-name">uint32_t</span> <span class="token function">custom_tick_get</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">uint64_t</span> start_ms <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>start_ms <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">timeval</span> tv_start<span class="token punctuation">;</span>
        <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tv_start<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        start_ms <span class="token operator">=</span> <span class="token punctuation">(</span>tv_start<span class="token punctuation">.</span>tv_sec <span class="token operator">*</span> <span class="token number">1000000</span> <span class="token operator">+</span> tv_start<span class="token punctuation">.</span>tv_usec<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> tv_now<span class="token punctuation">;</span>
    <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tv_now<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">uint64_t</span> now_ms<span class="token punctuation">;</span>
    now_ms <span class="token operator">=</span> <span class="token punctuation">(</span>tv_now<span class="token punctuation">.</span>tv_sec <span class="token operator">*</span> <span class="token number">1000000</span> <span class="token operator">+</span> tv_now<span class="token punctuation">.</span>tv_usec<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>

    <span class="token class-name">uint32_t</span> time_ms <span class="token operator">=</span> now_ms <span class="token operator">-</span> start_ms<span class="token punctuation">;</span>
    <span class="token keyword">return</span> time_ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就是 <code>Makefile</code> 修改，增加一个 <code>lv_lib_100ask</code> 的 SRC 引用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>include lv_lib_100ask/lv_lib_100ask.mk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>顺便也把 <code>BIN</code> 改为 <code>lv_2048</code> ，完整的 <code>Makefile</code> 如下</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment">#</span>
<span class="token comment"># Makefile</span>
<span class="token comment">#</span>
CC <span class="token operator">?=</span> gcc
LVGL_DIR_NAME <span class="token operator">?=</span> lvgl
LVGL_DIR <span class="token operator">?=</span> <span class="token variable">$</span><span class="token punctuation">{</span>shell pwd<span class="token punctuation">}</span>
CFLAGS <span class="token operator">?=</span> -O3 -g0 -I<span class="token variable">$</span><span class="token punctuation">(</span>LVGL_DIR<span class="token punctuation">)</span>/ -Wall -Wshadow -Wundef -Wmissing-prototypes -Wno-discarded-qualifiers -Wall -Wextra -Wno-unused-function -Wno-error<span class="token operator">=</span>strict-prototypes -Wpointer-arith -fno-strict-aliasing -Wno-error<span class="token operator">=</span>cpp -Wuninitialized -Wmaybe-uninitialized -Wno-unused-parameter -Wno-missing-field-initializers -Wtype-limits -Wsizeof-pointer-memaccess -Wno-format-nonliteral -Wno-cast-qual -Wunreachable-code -Wno-switch-default -Wreturn-type -Wmultichar -Wformat-security -Wno-ignored-qualifiers -Wno-error<span class="token operator">=</span>pedantic -Wno-sign-compare -Wno-error<span class="token operator">=</span>missing-prototypes -Wdouble-promotion -Wclobbered -Wdeprecated -Wempty-body -Wtype-limits -Wshift-negative-value -Wstack-usage<span class="token operator">=</span>2048 -Wno-unused-value -Wno-unused-parameter -Wno-missing-field-initializers -Wuninitialized -Wmaybe-uninitialized -Wall -Wextra -Wno-unused-parameter -Wno-missing-field-initializers -Wtype-limits -Wsizeof-pointer-memaccess -Wno-format-nonliteral -Wpointer-arith -Wno-cast-qual -Wmissing-prototypes -Wunreachable-code -Wno-switch-default -Wreturn-type -Wmultichar -Wno-discarded-qualifiers -Wformat-security -Wno-ignored-qualifiers -Wno-sign-compare
LDFLAGS <span class="token operator">?=</span> -lm
BIN <span class="token operator">=</span> lv_2048


<span class="token comment">#Collect the files to compile</span>
SRCDIRS   <span class="token operator">=</span>  <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find . -maxdepth 1 -type d<span class="token punctuation">)</span>
MAINSRC <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">foreach</span> dir,<span class="token variable">$</span><span class="token punctuation">(</span>SRCDIRS<span class="token punctuation">)</span>,<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">wildcard</span> <span class="token variable">$</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span>/*.c<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">include</span> <span class="token variable">$</span><span class="token punctuation">(</span>LVGL_DIR<span class="token punctuation">)</span>/lvgl/lvgl.mk
<span class="token keyword">include</span> <span class="token variable">$</span><span class="token punctuation">(</span>LVGL_DIR<span class="token punctuation">)</span>/lv_drivers/lv_drivers.mk
<span class="token keyword">include</span> lv_lib_100ask/lv_lib_100ask.mk

OBJEXT <span class="token operator">?=</span> .o

AOBJS <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>ASRCS<span class="token punctuation">:</span>.S<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>OBJEXT<span class="token punctuation">)</span><span class="token punctuation">)</span>
COBJS <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>CSRCS<span class="token punctuation">:</span>.c<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>OBJEXT<span class="token punctuation">)</span><span class="token punctuation">)</span>

MAINOBJ <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAINSRC<span class="token punctuation">:</span>.c<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>OBJEXT<span class="token punctuation">)</span><span class="token punctuation">)</span>

SRCS <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>ASRCS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CSRCS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAINSRC<span class="token punctuation">)</span>
OBJS <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>AOBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>COBJS<span class="token punctuation">)</span>

<span class="token comment">## MAINOBJ -&gt; OBJFILES</span>

<span class="token target symbol">all</span><span class="token punctuation">:</span> default

<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.c
    <span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span>  <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span> -o <span class="token variable">$@</span>
    <span class="token operator">@</span>echo <span class="token string">&quot;CC $&lt;&quot;</span>

<span class="token target symbol">default</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>AOBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>COBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAINOBJ<span class="token punctuation">)</span>
    <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -o <span class="token variable">$</span><span class="token punctuation">(</span>BIN<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAINOBJ<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>AOBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>COBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>LDFLAGS<span class="token punctuation">)</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span> 
    rm -f <span class="token variable">$</span><span class="token punctuation">(</span>BIN<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>AOBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>COBJS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAINOBJ<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对接触摸" tabindex="-1"><a class="header-anchor" href="#对接触摸" aria-hidden="true">#</a> 对接触摸</h3><p>做了以上操作，可能会发现触摸没有反应，这是因为触摸绑定的 <code>event</code> 事件号不对，默认的绑定是 <code>event3</code> 而查阅启动 <code>log</code> 可知，开发板的触摸屏对接的是 <code>event0</code></p>`,13),N={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-17-48-image.png",target:"_blank",rel:"noopener noreferrer"},$=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-17-48-image.png",alt:"img"},null,-1),A=n("p",null,[s("这时需要修改绑定的 "),n("code",null,"event"),s(" 事件号，其配置文件在 "),n("code",null,"lv_drv_conf.h"),s(" 内：")],-1),D={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-19-12-image.png",target:"_blank",rel:"noopener noreferrer"},R=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-19-12-image.png",alt:"img"},null,-1),B=t(`<p>这里将 <code>event3</code> 改为 <code>event0</code> 即可</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span>  <span class="token directive keyword">define</span> <span class="token macro-name">EVDEV_NAME</span>   <span class="token string">&quot;/dev/input/event0&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然除了这样的方法，另外也可以用命令生成软连接<code>touchscreen</code>，就会直接以 <code>touchscreen</code> 为触摸节点，方便调试:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> /dev/input/eventX /dev/input/touchscreen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试编译" tabindex="-1"><a class="header-anchor" href="#测试编译" aria-hidden="true">#</a> 测试编译</h3><p>修改好了，希望单独编译这个包测试下而不编译完整的 SDK。可以这样做：</p><p>（1）确保已经 <code>source build/envsetup.sh</code> 并已经 <code>lunch</code></p><p>（2）在任意文件夹下执行命令 <code>mmo lv_2048 -B</code></p>`,8),W={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-13-39-image.png",target:"_blank",rel:"noopener noreferrer"},q=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-15-13-39-image.png",alt:"img"},null,-1),x=t('<p>其中 <code>mmo</code> 的意思是 单独编译一个 <code>openWrt</code> 软件包，后面的 <code>lv_2048</code> 是软件包名。<code>-B</code> 参数是先 <code>clean</code> 再编译，不加这个参数就是直接编译了。</p><h3 id="测试运行" tabindex="-1"><a class="header-anchor" href="#测试运行" aria-hidden="true">#</a> 测试运行</h3><p>编译打包后，到开发板上使用 <code>lv_2048</code> 即可运行</p>',3),T={href:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-14-47-19-lQDPJxaBvZoKbvPNC9DND8CwaCpI77wfq4cC1aIjrECqAA_4032_3024.jpg",target:"_blank",rel:"noopener noreferrer"},P=n("img",{src:"https://v853.docs.aw-ol.com/assets/img/lvgl_demo_2048/2022-07-18-14-47-19-lQDPJxaBvZoKbvPNC9DND8CwaCpI77wfq4cC1aIjrECqAA_4032_3024.jpg",alt:"img"},null,-1);function U(O,V){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("这里使用的 "),r,s(" 小游戏由百问网提供，开源地址："),n("a",d,[s("lv_lib_100ask"),e(a)])]),v,n("p",null,[n("a",k,[m,e(a)])]),_,n("p",null,[n("a",b,[h,e(a)])]),g,n("p",null,[n("a",f,[y,e(a)])]),w,n("p",null,[n("a",L,[S,e(a)])]),I,n("p",null,[n("a",E,[C,e(a)])]),G,n("p",null,[n("a",N,[$,e(a)])]),A,n("p",null,[n("a",D,[R,e(a)])]),B,n("p",null,[n("a",W,[q,e(a)])]),x,n("p",null,[n("a",T,[P,e(a)])])])}const K=p(l,[["render",U],["__file","01-Introduction.html.vue"]]);export{K as default};
