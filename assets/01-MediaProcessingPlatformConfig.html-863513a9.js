import{_ as s,r as d,o as l,c as r,a as i,b as e,d as m,e as n}from"./app-5cc5893e.js";const c={},v=n('<h1 id="配置mpp媒体处理平台" tabindex="-1"><a class="header-anchor" href="#配置mpp媒体处理平台" aria-hidden="true">#</a> 配置MPP媒体处理平台</h1><h2 id="_0-前言" tabindex="-1"><a class="header-anchor" href="#_0-前言" aria-hidden="true">#</a> 0.前言</h2><p>​ MPP 系统控制模块，根据芯片特性，完成硬件各个部件的复位、基本初始化工作，同时负责完成 MPP（Media Process Platform 媒体处理平台）系统各个业务模块的初始化、去初始化以及管 理 MPP 系统各个业务模块的工作状态、提供当前 MPP 系统的版本信息等功能。 应用程序启动 MPP 业务前，必须完成 MPP 系统初始化工作。同理，应用程序退出 MPP 业务 后，也要完成 MPP 系统去初始化工作，释放资源。</p><p>​ 本章主要讲述如何在Tina SDK中增加MPP补丁包和如何编译使用，该补丁包含有MPP部分的源码。具体MPP如何开发可以参考位于百度网盘中的100ASK_V853-PRO开发板的资料光盘中01_学习手册/《100ASK-V853_Pro系统开发手册》，该手册中的第四篇 <strong>基础组件开发</strong>中的第七章 <strong>Tina Linux 多媒体MPP 开发指南</strong>，此章节详细说明了100ASK_V853-PRO开发板针对MPP 系统控制模块的开发指导。</p><p>100ASK_V853-PRO开发板的资料光盘：</p><p>链接：https://pan.baidu.com/s/1TX742vfEde9bMLd9IrwwqA?pwd=sp6a 提取码：sp6a</p><p>全志MPP_sample_使用说明：https://tina.100ask.net/SdkModule/Linux_MPP_Sample_Instructions-01/</p><h2 id="_1-增加mpp扩展包" tabindex="-1"><a class="header-anchor" href="#_1-增加mpp扩展包" aria-hidden="true">#</a> 1.增加MPP扩展包</h2><p>MPP扩展包：</p>',9),t={href:"https://pan.baidu.com/s/1TX742vfEde9bMLd9IrwwqA?pwd=sp6a",target:"_blank",rel:"noopener noreferrer"},p=n(`<p>位于08_MPP扩展包目录下。</p><p>下载完成后，将<code>sunxi-mpp.tar.gz</code>压缩包放入虚拟机的任意目录，假设放在<code>/home/book/workspaces</code>目录下，</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ook@100ask:~/workspaces$ ls
100ASK_V853-PRO_TinaSDK  sunxi-mpp.tar.gz  tina-v853-open
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解压<code>sunxi-mpp.tar.gz</code>压缩包，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -xzvf sunxi-mpp.tar.gz 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ tar -xzvf sunxi-mpp.tar.gz 
sunxi-mpp/
sunxi-mpp/CMake/
sunxi-mpp/CMake/sunxi_mpp_lib.cmake
sunxi-mpp/CMake/sunxi_mpp_include.cmake
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待解压完成后进入<code>sunxi-mpp</code>目录下，即可查看当前目录下的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces$ cd sunxi-mpp/
book@100ask:~/workspaces/sunxi-mpp$ ls
CMake  CMakeLists.txt  include  lib  README.md  sample  STAGING_DIR.sh  toolchain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面对各文件夹进行说明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CMake：设置mpp各文件的头文件和依赖目录
CMakeLists.txt：设置编译文件、交叉编译工具链位置、依赖等位置和规则信息
include:包含MPP扩展包所需的头文件
lib:包含MPP扩展包所需的依赖文件
sample:包含MPP个应用示例源码
STAGING_DIR.sh:设置环境变量
toolchain:包含V853交叉编译工具链
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-编译mpp扩展包" tabindex="-1"><a class="header-anchor" href="#_2-编译mpp扩展包" aria-hidden="true">#</a> 2.编译MPP扩展包</h2><p>添加交叉编译环境变量，这里仅需要增加<code>sunxi-mpp</code>的位置的环境变量，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp$ export CMAKE_CURRENT_SOURCE_DIR=~/workspaces/sunxi-mpp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>激活环境变量，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp$ source STAGING_DIR.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建build目录，用于编译和存储编译后的应用程序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp$ mkdir build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入<code>build</code>目录下，执行<code>cmake .. </code>，配置工具链、暂存目录和编译规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp$ cd build/
book@100ask:~/workspaces/sunxi-mpp/build$ cmake ..
-- The C compiler identification is GNU 7.5.0
-- The CXX compiler identification is GNU 7.5.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- STAGING_DIR: build
-- Configuring done
-- Generating done
-- Build files have been written to: /home/book/workspaces/sunxi-mpp/build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完成后会在<code>build</code>目录下生成以下文件，其中<code>bin</code>目录用于存储生成后的二进制应用程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp/build$ ls
bin  CMakeCache.txt  CMakeFiles  cmake_install.cmake  Makefile  sample  STAGING_DIR.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译mpp应用程序，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp/build$ make
Scanning dependencies of target sample_virvi2vo
[  1%] Building C object sample/sample_virvi2vo/CMakeFiles/sample_virvi2vo.dir/sample_virvi2vo.c.o
[  2%] Linking C executable ../../bin/sample_virvi2vo
[  2%] Built target sample_virvi2vo
...
Scanning dependencies of target sample_demux2adec2ao
[ 99%] Building C object sample/sample_demux2adec2ao/CMakeFiles/sample_demux2adec2ao.dir/sample_demux2adec2ao.c.o
[100%] Linking C executable ../../bin/sample_demux2adec2ao
[100%] Built target sample_demux2adec2ao
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译完成后可以进入<code>bin</code>目录下查看编译生成的二进制文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp/build$ cd bin/
book@100ask:~/workspaces/sunxi-mpp/build/bin$ ls
sample_adec               sample_CodecParallel         sample_MotionDetect         sample_uvc2vo        sample_virvi2venc
sample_aec                sample_demux2adec            sample_multi_vi2venc2muxer  sample_uvcout        sample_virvi2venc2muxer
sample_aenc               sample_demux2adec2ao         sample_rtsp                 sample_uvc_vo        sample_virvi2vo
sample_ai                 sample_demux2vdec            sample_smartIPC_demo        sample_venc          sample_virvi2vo_zoom
sample_ai2aenc            sample_demux2vdec2vo         sample_smartPreview_demo    sample_venc2muxer    sample_vo
sample_ai2aenc2muxer      sample_demux2vdec_saveFrame  sample_timelapse            sample_vi_g2d        yuv420pTobmp
sample_ao                 sample_driverVipp            sample_UILayer              sample_vin_isp_test
sample_ao_resample_mixer  sample_g2d                   sample_uvc2vdec_vo          sample_vi_reset
sample_aoSync             sample_glog                  sample_uvc2vdenc2vo         sample_virvi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于如何测试使用MPP应用程序，请一定要参考：</p><p>全志MPP_sample_使用说明：https://tina.100ask.net/SdkModule/Linux_MPP_Sample_Instructions-01/</p><p>如果《全志MPP_sample_使用说明》中没有测试说明，可查看每个示例程序中的<code>Readme.txt</code>。例如，假设我需要<code>sample_driverVipp</code>程序，需要进入该源码目录下，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp$ cd sample/sample_driverVipp/
book@100ask:~/workspaces/sunxi-mpp/sample/sample_driverVipp$ ls
CMakeLists.txt  Readme.txt  sample_driverVipp.c  sample_driverVipp.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到源码目录中有一个Readme.txt文件，该文件详细说明了如何进行测试。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/sunxi-mpp/sample/sample_driverVipp$ cat Readme.txt 
sample_driverVipp：
    该sample演示直接调用linux内核驱动获取frame。按下ctrl+c，终止测试。
    每隔若干帧保存一帧到指定的目录。

读取测试参数的流程：
    sample只支持命令行模式输入参数。如果不输入参数，会提示输入。
    从命令行启动sample_driverVipp的指令：
    ./sample_driverVipp
    或
    ./sample_driverVipp 0 1920 1080 8 60 0 10 60 /mnt/extsd

测试参数的说明：
(1)video device: 0~3 (vipp0~vipp3)
(2)capture_width：指定camera采集的图像宽度
(3)capture_height：指定camera采集的图像高度
(4)pixel_format：指定camera采集的图像格式
(5)fps：指定camera采集的帧率
(6)test frame count：指定测试采集的frame总数，0表示无限。
(7)store count: 指定保存的图像数量。
(8)store interval: 指定保存图像的周期，即每n帧图像保存1帧。
(9)frame saving path: 指定保存图像的目录，该目录要确保存在。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 如果您想使用MPP进行开发，编写自己的应用程序，请阅读位于百度网盘资料中的100ASK_V853-PRO开发板的资料光盘中01_学习手册/《100ASK-V853_Pro系统开发手册》，该手册中的第四篇 <strong>基础组件开发</strong>中的第七章 <strong>Tina Linux 多媒体MPP 开发指南</strong>，此章节详细说明了100ASK_V853-PRO开发板针对MPP 系统控制模块的开发指导。</p><h2 id="_3-测试mpp应用程序" tabindex="-1"><a class="header-anchor" href="#_3-测试mpp应用程序" aria-hidden="true">#</a> 3.测试MPP应用程序</h2><p>测试MPP应用程序需要增加开发板的依赖文件，该依赖文件位于<code>sunxi-mpp/lib</code>目录下，如下图所示</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/MPPApplication/image-20230427155025142.png" alt="image-20230427155025142"></p><p>将该目录下的全部文件拷贝到开发板的<code>lib</code>目录下，假设我使用TF卡将其拷贝到开发板上，将lib文件夹拷贝到TF卡中，在将TF插入100ASK_V853-PRO开发板上，挂载TF卡，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# mount /dev/mmcblk1p1 /mnt/extsd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>挂载完成后进入TF目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# cd /mnt/extsd/
root@TinaLinux:/mnt/extsd# ls
System Volume Information        lib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到<code>lib</code>文件夹，将<code>lib</code>目录下的全部文件拷贝到开发板的<code>lib</code>目录下，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/mnt/extsd# cp lib/* /lib/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待拷贝完成即可。</p><h3 id="_3-1-测试lcd上实时预览摄像头数据应用程序" tabindex="-1"><a class="header-anchor" href="#_3-1-测试lcd上实时预览摄像头数据应用程序" aria-hidden="true">#</a> 3.1 测试LCD上实时预览摄像头数据应用程序</h3><p>​ 硬件要求：100ASK_V853-PRO开发板、4寸MIPI显示屏、MIPI摄像头。</p><p>​ 示例名称为：sample_virvi2vo</p><p>​ 源码路径：sunxi-mpp/sample/sample_virvi2vo/</p><p>​ 该示例演示了通过摄像头获取数据并实时显示在LCD屏幕上，下面演示如何将编译好的应用程序在100ASK_V853-PRO开发板上运行。</p><p>​ 编译mpp扩展包后，会在<code>sunxi-mpp/build/bin</code>目录下生成<code>sample_virvi2vo</code>文件，将生成的文件拷贝到TF卡上备用。</p><p>​ 将<code>sunxi-mpp/sample/sample_virvi2vo</code>目录下的<code>sample_virvi2vo.conf</code>拷贝到TF卡下备用。</p><p>​ 将<code>sunxi-mpp/lib</code>整个目录拷贝到TF卡备用。</p><p>拷贝完成后，将TF卡插入100ASK_V853-PRO开发板后，将TF卡挂载到开发板上，输入<code>mount /dev/mmcblk1p1 /mnt/extsd/</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# mount /dev/mmcblk1p1 /mnt/extsd/
[  168.601231] FAT-fs (mmcblk1p1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进入挂载目录<code>/mnt/extsd/</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# cd /mnt/extsd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看对应文件是否存在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/mnt/extsd# ls
System Volume Information  sample_virvi2vo
sample_virvi2vo.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试程序，输入<code>./sample_virvi2vo -path ./sample_virvi2vo.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> root@TinaLinux:/mnt/extsd# ./sample_virvi2vo -path ./sample_virvi2vo.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完后，会在MIPI屏上实时显示摄像头获取的图像数据。</p><p>应用程序执行设定时间后会自动结束，也可以通过按下Crtl+C提前结束测试。</p><h3 id="_3-2-测试实时预览人脸识别和人形识别应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-测试实时预览人脸识别和人形识别应用程序" aria-hidden="true">#</a> 3.2 测试实时预览人脸识别和人形识别应用程序</h3><p>​ 硬件要求：100ASK_V853-PRO开发板、4寸MIPI显示屏、MIPI摄像头。</p><p>​ 示例名称为：sample_smartPreview_demo</p><p>​ 源码路径：sunxi-mpp/sample/sample_smartPreview_demo</p><p>​ 该示例演示了通过摄像头获取图像数据后使用人脸模型或人形模型进行处理后，将打框后的结果实时显示在LCD屏幕上，下面演示如何将编译好的应用程序在100ASK_V853-PRO开发板上运行。</p><p>​ 编译mpp扩展包后，会在<code>sunxi-mpp/build/bin</code>目录下生成<code>sample_smartPreview_demo</code>文件，将生成的文件拷贝到TF卡上备用。</p><p>​ 将<code>sunxi-mpp/sample/sample_smartPreview_demo/models/fdet</code>目录下的<code>face.nb</code>人脸模型拷贝到TF卡中备用。</p><p>​ 将<code>sunxi-mpp/sample/sample_smartPreview_demo/models/pdet</code>目录下的<code>2.0.0_Gamma.nb</code>人形模型文件拷贝到TF卡中备用。</p><p>​ 将<code>sunxi-mpp/sample/sample_smartPreview_demo</code>目录下的<code>sample_smartPreview_demo.conf</code>参数文件拷贝到TF卡中备用。</p><p>拷贝完成后，将TF卡插入100ASK_V853-PRO开发板后，将TF卡挂载到开发板上，输入<code>mount /dev/mmcblk1p1 /mnt/extsd/</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# mount /dev/mmcblk1p1 /mnt/extsd/
[  168.601231] FAT-fs (mmcblk1p1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进入挂载目录<code>/mnt/extsd/</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# cd /mnt/extsd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看对应文件是否存在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/mnt/extsd# ls
2.0.0_Gamma.nb                   sample_smartPreview_demo
System Volume Information        sample_smartPreview_demo.conf
face.nb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>sample_smartPreview_demo.conf</code>文件，假设我这里使用的是百问网的4寸MIPI屏和2Line MIPI摄像头，需要测试的是人脸识别模型，需要修改该文件为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>########### paramter (ref to tulip_cedarx.conf)############
[parameter]
main_isp_dev = 0
main_vipp_dev = 0
main_capture_width = 360
main_capture_height = 640
main_layer_num = 0
main_display_x = 0
main_display_y = 0
main_display_width = 480
main_display_height = 800
main_nn_nbg_type = 1                    #-1:disable, 0:human, 1:face
main_nn_isp = 0
main_nn_vipp = 8
main_nn_vi_buf_num = 3
main_nn_src_frame_rate = 20             #fps
main_nn_nbg_file_path = &quot;face.nb&quot;
main_nn_draw_orl_enable = 1

sub_isp_dev = 1
sub_vipp_dev = 1
sub_capture_width = 1920
sub_capture_height = 1080
sub_layer_num = 1
sub_display_x = 0
sub_display_y = 00
sub_display_width = 480
sub_display_height = 800
sub_nn_nbg_type = 1                    #-1:disable, 0:human, 1:face
sub_nn_isp = 1
sub_nn_vipp = 9
sub_nn_vi_buf_num = 3
sub_nn_src_frame_rate = 20             #fps
sub_nn_nbg_file_path = &quot;face.nb&quot;
sub_nn_draw_orl_enable = 1

disp_type = &quot;lcd&quot;                      #disp_type is lcd, hdmi, cvbs
pic_format = &quot;nv21&quot;                    #pic_format is yu12, yv12, nv21, nv12
frame_rate = 20                        #fps

orl_thick=200
test_duration = 0                      #unit:s, 0:Infinite duration.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要测试人形检测，也需要修改<code>sample_smartPreview_demo.conf</code>文件中的，将<code>main_nn_nbg_type</code>设置为0、<code>main_nn_nbg_file_path</code>设置为人形模型的路径名称，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main_nn_nbg_type = 1 
main_nn_nbg_file_path = &quot;2.0.0_Gamma.nb&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试程序：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/mnt/extsd# ./sample_smartPreview_demo -path sample_smartPreview_demo.conf 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行后，显示屏端会接收摄像头的数据，但一开始会丢弃部分图像数据，可能会导致一开始的画面卡顿。测试成功后会在显示屏上实时显示摄像头的数据，并可以对摄像头的图像中的人脸进行打框。</p><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结" aria-hidden="true">#</a> 4.总结</h2><p>​ 对于其他应用程序这里就不逐一去演示，大家可以参考每个示例的程序的Readme.txt或《全志MPP_sample_使用说明》进行测试体验，参考《Tina Linux 多媒体MPP 开发指南》进行开发。MPP媒体处理平台的可玩性和公开程度都适合大家去开发自己的应用程序，希望通过这章节可以让大家了解MPP的使用。</p>`,86);function u(o,b){const a=d("ExternalLinkIcon");return l(),r("div",null,[v,i("p",null,[e("链接："),i("a",t,[e("https://pan.baidu.com/s/1TX742vfEde9bMLd9IrwwqA?pwd=sp6a 8"),m(a)]),e(" 提取码：sp6a")]),p])}const x=s(c,[["render",u],["__file","01-MediaProcessingPlatformConfig.html.vue"]]);export{x as default};
