import{_ as s,r as l,o as d,c as o,a as e,b as n,d as a,e as c}from"./app-5cc5893e.js";const v={},r=e("h1",{id:"配置opencv和ffmpeg",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#配置opencv和ffmpeg","aria-hidden":"true"},"#"),n(" 配置opencv和ffmpeg")],-1),t=e("h2",{id:"_0-前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_0-前言","aria-hidden":"true"},"#"),n(" 0.前言")],-1),p={href:"https://bbs.aw-ol.com/topic/3427/",target:"_blank",rel:"noopener noreferrer"},m=e("pre",null,[e("code",null,`opencv支持包：[opencv.tar.gz](https://forums.100ask.net/uploads/short-url/5yNatU5BBvsoRGv8EGnIuOMEeaB.gz)
`)],-1),u={href:"https://forums.100ask.net/uploads/short-url/xqyLFwIcZoZwjEvxpORGdL1FHss.gz",target:"_blank",rel:"noopener noreferrer"},b=c(`<h2 id="_1-安装opencv和ffmpeg" tabindex="-1"><a class="header-anchor" href="#_1-安装opencv和ffmpeg" aria-hidden="true">#</a> 1.安装opencv和ffmpeg</h2><p>​ 将下载的两个压缩包<code>opencv.tar.gz</code>和<code>ffmpeg.tar.gz</code>传入Ubuntu中，可以放置在任意目录中，假设我放在<code>/home/book/workspaces</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ ls
tina-v853-open     opencv.tar.gz     ffmpeg.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解压两个压缩包输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -xzvf opencv.tar.gz 
tar -xzvf ffmpeg.tar.gz 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ tar -xzvf opencv.tar.gz 
opencv/
opencv/patches/
opencv/patches/010-uclibc-ng.patch
opencv/patches/020-l_tmpnam.patch
opencv/Makefile
opencv-sample/
opencv-sample/opencv-camera/
opencv-sample/opencv-camera/src/
opencv-sample/opencv-camera/src/main.cpp
opencv-sample/opencv-camera/src/Makefile
opencv-sample/opencv-camera/Makefile
opencv-sample/yolov5-post-opencv/
opencv-sample/yolov5-post-opencv/src/
opencv-sample/yolov5-post-opencv/src/main.cpp
opencv-sample/yolov5-post-opencv/src/Makefile
opencv-sample/yolov5-post-opencv/Makefile
book@100ask:~/workspaces$ tar -xzvf ffmpeg.tar.gz 
ffmpeg/
ffmpeg/patches/
ffmpeg/patches/030-h264-mips.patch
ffmpeg/patches/050-glibc.patch
ffmpeg/patches/010-pkgconfig.patch
ffmpeg/Config.in
ffmpeg/Makefile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将解压出来的文件拷贝到<code>tina-v853-open/openwrt/package/</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ cp -rfd opencv tina-v853-open/openwrt/package/
book@100ask:~/workspaces$ cp -rfd opencv-sample tina-v853-open/openwrt/package/
book@100ask:~/workspaces$ cp -rfd ffmpeg tina-v853-open/openwrt/package/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看该目录可看到复制过来的三个文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ ls tina-v853-open/openwrt/package/
allwinner  feeds  ffmpeg  opencv  opencv-sample  thirdparty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-编译opencv和ffmpeg" tabindex="-1"><a class="header-anchor" href="#_2-编译opencv和ffmpeg" aria-hidden="true">#</a> 2.编译opencv和ffmpeg</h2><p>进入Tina根目录下，配置Tina环境，选择100ASK_V853-PRO开发板。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ cd tina-v853-open/
book@100ask:~/workspaces/tina-v853-open$ source build/envsetup.sh 
NOTE: The SDK(/home/book/workspaces/tina-v853-open) was successfully loaded
load openwrt... ok
Please run lunch next for openwrt.
load buildroot,bsp...ok
Please run ./build.sh config next for buildroot,bsp.
book@100ask:~/workspaces/tina-v853-open$ lunch

You&#39;re building on Linux

Lunch menu... pick a combo:
     1  v853-100ask-tina
     2  v853-vision-tina
Which would you like? [Default v853-100ask]: 1
Jump to longan autoconfig
/home/book/workspaces/tina-v853-open/build.sh autoconfig -o openwrt -i v853 -b 100ask           -n default 
========ACTION List: mk_autoconfig -o openwrt -i v853 -b 100ask -n default;========
options : 
INFO: Prepare toolchain ...
INFO: kernel defconfig: generate /home/book/workspaces/tina-v853-open/kernel/linux-4.9/.config by /home/book/workspaces/tina-v853-open/device/config/chips/v853/configs/100ask/linux-4.9/config-4.9
INFO: Prepare toolchain ...
make: Entering directory &#39;/home/book/workspaces/tina-v853-open/kernel/linux-4.9&#39;
*** Default configuration is based on &#39;../../../../../device/config/chips/v853/configs/100ask/linux-4.9/config-4.9&#39;
#
# configuration written to .config
#
make: Leaving directory &#39;/home/book/workspaces/tina-v853-open/kernel/linux-4.9&#39;
INFO: clean buildserver

Usage:
 kill [options] &lt;pid&gt; [...]

Options:
 &lt;pid&gt; [...]            send signal to every &lt;pid&gt; listed
 -&lt;signal&gt;, -s, --signal &lt;signal&gt;
                        specify the &lt;signal&gt; to be sent
 -l, --list=[&lt;signal&gt;]  list all signal names, or convert one to a name
 -L, --table            list all signal names in a nice table

 -h, --help     display this help and exit
 -V, --version  output version information and exit

For more details see kill(1).
INFO: prepare_buildserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入Tina的配置界面</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入如下目录中，选中<code>opencv-camera</code>和<code>yolov5-post-opencv</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &gt; lizard 
 	&gt; opencv-sample 
 		&lt;*&gt; opencv-camera............ opencv camera, capture video and display to fb0             
		&lt; &gt; yolov5-post-opencv....................... yolov5 post process with opencv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中opencv-camera是使用opencv通过video获取图像并显示在fb0节点上；yolov5-post-opencv为使用opencv编写的yolov5后处理程序。</p><p>​ 这里选中opencv-camera完成后保存并退出Tina配置界面。</p><p>​ 编译opencv和例程，在Tina根目录下输入<code>make</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>等待编译完成。</p><p>编译完成后，将镜像重新烧写到开发板上。</p>`,24);function g(f,k){const i=l("ExternalLinkIcon");return d(),o("div",null,[r,t,e("p",null,[n("​ 感谢Yuzuki大佬提供的两个支持包，原贴链接："),e("a",p,[n("https://bbs.aw-ol.com/topic/3427/"),a(i)])]),m,e("p",null,[n("​ ffmpeg支持包："),e("a",u,[n("ffmpeg.tar.gz"),a(i)])]),b])}const x=s(v,[["render",g],["__file","06-SupportOpencvFFmpeg.html.vue"]]);export{x as default};
