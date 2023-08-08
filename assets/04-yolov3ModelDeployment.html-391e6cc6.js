import{_ as d,r as t,o as l,c as o,a as e,b as n,d as a,e as s}from"./app-5cc5893e.js";const r={},c=e("h1",{id:"开发板端侧部署yolov3模型",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开发板端侧部署yolov3模型","aria-hidden":"true"},"#"),n(" 开发板端侧部署YOLOV3模型")],-1),v=e("h2",{id:"_0-前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_0-前言","aria-hidden":"true"},"#"),n(" 0.前言")],-1),u=e("p",null,[n("​ 前面我们已经学习了如何配置NPU模型转换工具，这一章节演示增加NPU拓展包，该拓展包包含"),e("code",null,"Lenet、YOLOV3"),n("测试用例，并实现yolov3模型转换部署。")],-1),p={href:"https://www.aw-ol.com/downloads?cat=18",target:"_blank",rel:"noopener noreferrer"},m={href:"https://v853.docs.aw-ol.com/npu/dev_npu/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[n("资源包：（包含模型结构描述文件"),e("code",null,"cfg"),n("、权重文件"),e("code",null,"weights"),n("和测试图像）")],-1),g=e("h2",{id:"_1-安装npu拓展包",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-安装npu拓展包","aria-hidden":"true"},"#"),n(" 1.安装NPU拓展包")],-1),_={href:"https://www.aw-ol.com/downloads?cat=18",target:"_blank",rel:"noopener noreferrer"},h=s(`<p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511155647021.png" alt="image-20230511155647021"></p><p>将下载<code>V853 NPU扩展软件包.gz</code>重命名为<code>npu_package.tar.gz</code>，并将该拓展包放在Tina根目录下。如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ ls
brandy  build  buildroot  build.sh  device  kernel  npu_package.tar.gz  openwrt  out  platform  prebuilt  tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511160039793.png" alt="image-20230511160039793"></p><p>在终端中解压npu拓展压缩包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ tar xvf npu_package.tar.gz openwrt/package/npu/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511160340555.png" alt="image-20230511160340555"></p><p>解压完成后，拓展包就自动安装到Tina的配置中。</p><h2 id="_2-配置yolov3" tabindex="-1"><a class="header-anchor" href="#_2-配置yolov3" aria-hidden="true">#</a> 2.配置yolov3</h2><p>​ 重新使能Tina环境配置，并加载选中100ASK_V853-PRO开发板方案。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ source build/envsetup.sh 
...
book@100ask:~/workspaces/tina-v853-open$ lunch

You&#39;re building on Linux

Lunch menu... pick a combo:
     1  v853-100ask-tina
     2  v853-vision-tina
Which would you like? [Default v853-100ask]: 1 
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入Tina配置界面，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入如下目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; Allwinner 
	&gt; NPU
		&lt; &gt; lenet......................................................... lenet demo (NEW)
		&lt;*&gt; viplite-driver................................... viplite driver for NPU  (NEW)
		&lt; &gt; vpm_run................................................ vpm model runner  (NEW)
		&lt;*&gt; yolov3....................................................... yolov3 demo (NEW)
		&lt;*&gt;   yolov3-model.............................. yolov3 test demo model (37 MB) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选中<code>viplite-driver</code>和<code>yolov3</code>，如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511162515584.png" alt="image-20230511162515584"></p><p>选中完成后，保存并退出Tina配置界面。</p><p>​ yolov3 Demo示例的源码位于：tina-v853-open/openwrt/package/npu/yolov3</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open/openwrt/package/npu/yolov3$ ls
Makefile  src
book@100ask:~/workspaces/tina-v853-open/openwrt/package/npu/yolov3$ tree
.
├── Makefile
└── src
    ├── bmp.h
    ├── box.c
    ├── box.h
    ├── image_utils.c
    ├── image_utils.h
    ├── main.c
    ├── Makefile
    ├── vnn_global.h
    ├── vnn_post_process.c
    ├── vnn_post_process.h
    ├── vnn_pre_process.c
    ├── vnn_pre_process.h
    ├── yolo_layer.c
    ├── yolo_layer.h
    ├── yolov3_model.nb
    └── yolo_v3_post_process.c

1 directory, 17 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-测试yolov3-demo" tabindex="-1"><a class="header-anchor" href="#_3-测试yolov3-demo" aria-hidden="true">#</a> 3.测试yolov3 Demo</h2><p>测试前需要准备一张<code>416*416</code>格式的图像</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511165625823.png" alt="image-20230511165625823"></p><p>将图像使用ADB传入开发板中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/testImg$ adb push test01.jpg /tmp/
test01.jpg: 1 file pushed. 0.5 MB/s (22616 bytes in 0.048s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进入串口终端后，进入<code>tmp</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cd /tmp/
root@TinaLinux:/tmp# ls
UNIX_WIFI.domain  lock              test01.jpg        wpa_ctrl_1067-2
lib               run               wpa_ctrl_1067-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用yolov3 Demo测试图像，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/tmp# yolov3 /etc/models/yolov3_model.nb test01.jpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入完成后，测试程序会将test01.jpg图像作为输入，输出test01.jpg图像的打框图像。将文件使用TF卡等方式传入Windows中查看，如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511175402808.png" alt="image-20230511175402808"></p><h2 id="_4-转换yolov3模型" tabindex="-1"><a class="header-anchor" href="#_4-转换yolov3模型" aria-hidden="true">#</a> 4.转换yolov3模型</h2><h3 id="_4-1-模型准备" tabindex="-1"><a class="header-anchor" href="#_4-1-模型准备" aria-hidden="true">#</a> 4.1 模型准备</h3>`,33),x=e("code",null,"YOLOv3-608",-1),y=e("code",null,"COCO trainval",-1),w={href:"https://pjreddie.com/darknet/yolo/",target:"_blank",rel:"noopener noreferrer"},k=s(`<p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230511181922536.png" alt="image-20230511181922536"></p><p>分别下载模型结构描述文件<code>cfg</code>和权重文件<code>weights</code>。如果下载不了，可以在source压缩包中的yolov3目录下找到对应文件。</p><p>​ 将下载的两个文件传入配置好模型转换工具的Ubuntu20.04中，假设传入<code>/home/ubuntu/workspaces</code>目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ ls
yolov3.cfg  yolov3.weights
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512112654652.png" alt="image-20230512112654652"></p><p>​ 修改<code>yolov3.cfg</code>文件，将 <code>width</code> 与 <code>height</code> 改为 <code>416</code> 以获得更好的性能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ vi yolov3.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将原本的模型宽度和高度608修改为416。</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512113414290.png" alt="image-20230512113414290"></p><p>新建<code>data</code>文件夹，用于存放量化所需的图片。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ mkdir data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>新建<code>dataset.txt</code>文件，写入图片的路径和 id。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ touch dataset.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设我将两张量化图片放在<code>/home/ubuntu/workspaces/data</code>目录下，如下所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512113853903.png" alt="image-20230512113853903"></p><p>那么此时需要修改<code>/home/ubuntu/workspaces</code>目录下的<code>dataset.txt</code>文件,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ vi dataset.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改该文件的内容为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./data/test01.jpg
./data/test02.jpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面为所有文件目录结构，可自行对比是否缺少对应文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ tree
.
├── data
│   ├── test01.jpg
│   └── test02.jpg
├── dataset.txt
├── yolov3.cfg
└── yolov3.weights

1 directory, 5 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2导入模型" tabindex="-1"><a class="header-anchor" href="#_4-2导入模型" aria-hidden="true">#</a> 4.2导入模型</h3><p>​ 在终端输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>buntu@ubuntu2004:~/workspaces$ pegasus import darknet --model yolov3.cfg --weights yolov3.weights --output-model yolov3.json --output-data yolov3.data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>导入生成两个文件，分别是是 <code>yolov3.data</code> 和 <code>yolov3.json</code> 文件，他们是 YOLO V3 网络对应的芯原内部格式表示文件，分别对应原始模型文件的 <code>yolov3.weights</code> 和 <code>yolov3.cfg</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ ls
data  dataset.txt  yolov3.cfg  yolov3.data  yolov3.json  yolov3.weights
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-创建-yml-文件" tabindex="-1"><a class="header-anchor" href="#_4-3-创建-yml-文件" aria-hidden="true">#</a> 4.3 创建 YML 文件</h3><p>YML 文件对网络的输入和输出的超参数进行描述以及配置，这些参数包括，输入输出 tensor 的形状，归一化系数 (均值，零点)，图像格式，tensor 的输出格式，后处理方式等等</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pegasus generate inputmeta --model yolov3.json --input-meta-output yolov3_inputmeta.yml

pegasus generate postprocess-file --model yolov3.json --postprocess-file-output yolov3_postprocessmeta.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后生成<code>yolov3_inputmeta.yml</code>和<code>yolov3_inputmeta.yml</code>，修改<code>yolov3_inputmeta.yml</code> 文件中的的 <code>scale</code> 参数为 <code>0.0039(1/255)</code>，目的是对输入 <code>tensor</code> 进行归一化，和网络进行训练的时候是对应的。</p><p>在终端输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ vi yolov3_inputmeta.yml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将scale的参数从原来的1.0修改为0.0039，如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512143218882.png" alt="image-20230512143218882"></p><h3 id="_4-4量化" tabindex="-1"><a class="header-anchor" href="#_4-4量化" aria-hidden="true">#</a> 4.4量化</h3><p>生成下量化表文件，使用非对称量化，uint8，修改 <code>--batch-size</code> 参数为你的 <code>dataset.txt</code> 里提供的图片数量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pegasus quantize --model yolov3.json --model-data yolov3.data --batch-size 1 --device CPU --with-input-meta yolov3_inputmeta.yml --rebuild --model-quantize yolov3.quantize --quantizer asymmetric_affine --qtype uint8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-5-预推理" tabindex="-1"><a class="header-anchor" href="#_4-5-预推理" aria-hidden="true">#</a> 4.5 预推理</h3><p>利用前文的量化表执行预推理，得到推理 <code>tensor</code>，yolov3 是 1 输入 3 输出网络，所以一共产生了 4 个 <code>tensor</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pegasus inference --model yolov3.json --model-data yolov3.data --batch-size 1 --dtype quantized --model-quantize yolov3.quantize --device CPU --with-input-meta yolov3_inputmeta.yml --postprocess-file yolov3_postprocessmeta.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-6-导出模板代码与模型" tabindex="-1"><a class="header-anchor" href="#_4-6-导出模板代码与模型" aria-hidden="true">#</a> 4.6 导出模板代码与模型</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pegasus export ovxlib --model yolov3.json --model-data yolov3.data --dtype quantized --model-quantize yolov3.quantize --batch-size 1 --save-fused-graph --target-ide-project &#39;linux64&#39; --with-input-meta yolov3_inputmeta.yml --output-path ovxilb/yolov3/yolov3prj --pack-nbg-unify --postprocess-file yolov3_postprocessmeta.yml --optimize &quot;VIP9000PICO_PID0XEE&quot; --viv-sdk \${VIV_SDK}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至此，模型转换完成，生成的模型存放在 <code>ovxilb/yolov3_nbg_unify</code> 文件夹内。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces$ ls ovxilb/yolov3_nbg_unify/
BUILD   makefile.linux  network_binary.nb  vnn_post_process.c  vnn_pre_process.c  vnn_yolov3prj.c  yolov3prj.2012.vcxproj
main.c  nbg_meta.json   vnn_global.h       vnn_post_process.h  vnn_pre_process.h  vnn_yolov3prj.h  yolov3prj.vcxproj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512144213994.png" alt="image-20230512144213994"></p><h2 id="_5-使用转换后的模型测试" tabindex="-1"><a class="header-anchor" href="#_5-使用转换后的模型测试" aria-hidden="true">#</a> 5.使用转换后的模型测试</h2><p>​ 将模型通过adb或者TF卡的方式传入开发板中，例如通过ADB的方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ubuntu@ubuntu2004:~/workspaces/ovxilb/yolov3_nbg_unify$ adb push network_binary.nb /tmp/
network_binary.nb: 1 file pushed. 0.8 MB/s (39056704 bytes in 43.893s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 传入测试图片，可使用adb或者TF卡的方式传入开发板中，例如通过ADB的方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>buntu@ubuntu2004:~/workspaces/data$ adb push test01.jpg /tmp/
test01.jpg: 1 file pushed. 0.6 MB/s (27095 bytes in 0.041s)
ubuntu@ubuntu2004:~/workspaces/data$ adb push test02.jpg 
adb: usage: push requires an argument
ubuntu@ubuntu2004:~/workspaces/data$ adb push test02.jpg /tmp/
test02.jpg: 1 file pushed. 0.7 MB/s (30697 bytes in 0.041s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入完成后，进入开发板的串口终端，进入<code>/tmp/</code>目录下，即可看到传入的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:~# cd /tmp/
root@TinaLinux:/tmp# ls
lock                test01.jpg          wpa_ctrl_1067-2
UNIX_WIFI.domain    network_binary.nb   test02.jpg          
lib                 run                 wpa_ctrl_1067-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试<code>test01.jpg</code>，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/tmp# yolov3 ./network_binary.nb test01.jpg 
[0xb6f0c560]vip_init[104], [ 1374.785733] npu[4ca][4ca] vipcore, device init..

The version of Viplite is: 1.8[ 1374.793243] set_vip_power_clk ON
.0-0-AW-2022-04-21
[ 1374.801777] enter aw vip mem alloc size 83886080
[ 1374.811007] aw_vip_mem_alloc vir 0xe2c00000, phy 0x48800000
[ 1374.817350] npu[4ca][4ca] gckvip_drv_init  kernel logical phy address=0x48800000  virtual =0xe2c00000
Create Neural Network: 73.30ms or 73297.75us
Start run graph [1] times...
Run the 1 time: 201.00ms or 200999.30us
vip run network execution time:
Total   201.15ms or 201152.98us
Average 201.15ms or 201152.98us
data_format=2 buff_size=43095
data_format=2 buff_size=172380
data_format=2 buff_size=689520
dog  97% 168 394 27 396
cat  95% 8 209 153 408
[ 1375.455490] npu[4ca][4ca] gckvip_drv_exit, aw_vip_mem_free
[ 1375.461792] aw_vip_mem_free vir 0xe2c00000, phy 0x48800000
[ 1375.467981] aw_vip_mem_free dma_unmap_sg_atrs
[ 1375.473057] aw_vip_mem_free ion_unmap_kernel
[ 1375.479885] aw_vip_mem_free ion_free
[ 1375.484023] aw_vip_mem_free ion_client_destroy
[ 1375.494199] npu[4ca][4ca] vipcore, device un-init..
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试完将输出的打框图像传入TF卡中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/tmp# mount /dev/mmcblk1p1 /mnt/extsd/
root@TinaLinux:/tmp# cp yolo_v3_output.bmp /mnt/extsd/yolo_v3_output-test01.bmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试<code>test02.jpg</code>，输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/tmp# yolov3 ./network_binary.nb test02.jpg 
[0xb6f9d560]vip_init[104], [ 1541.123871] npu[4d3][4d3] vipcore, device init..

The version of Viplite is: 1.8[ 1541.131453] set_vip_power_clk ON
.0-0-AW-2022-04-21
[ 1541.139871] enter aw vip mem alloc size 83886080
[ 1541.148078] aw_vip_mem_alloc vir 0xe2c00000, phy 0x48800000
[ 1541.154367] npu[4d3][4d3] gckvip_drv_init  kernel logical phy address=0x48800000  virtual =0xe2c00000
Create Neural Network: 73.51ms or 73514.38us
Start run graph [1] times...
Run the 1 time: 201.01ms or 201008.95us
vip run network execution time:
Total   201.16ms or 201164.50us
Average 201.16ms or 201164.50us
data_format=2 buff_size=43095
data_format=2 buff_size=172380
data_format=2 buff_size=689520
motorbike  99% 86 313 150 405
person  100% 117 294 0 366
[ 1541.793857] npu[4d3][4d3] gckvip_drv_exit, aw_vip_mem_free
[ 1541.800091] aw_vip_mem_free vir 0xe2c00000, phy 0x48800000
[ 1541.806330] aw_vip_mem_free dma_unmap_sg_atrs
[ 1541.811397] aw_vip_mem_free ion_unmap_kernel
[ 1541.818379] aw_vip_mem_free ion_free
[ 1541.822433] aw_vip_mem_free ion_client_destroy
[ 1541.836550] npu[4d3][4d3] vipcore, device un-init..
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试完将输出的打框图像传入TF卡中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/tmp# cp yolo_v3_output.bmp /mnt/extsd/yolo_v3_output-test02.bmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用电脑端查看TF中的两张输出图像如下所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/AIApplication/image-20230512151101531.png" alt="image-20230512151101531"></p>`,62);function f(j,A){const i=t("ExternalLinkIcon");return l(),o("div",null,[c,v,u,e("p",null,[n("NPU拓展包下载地址："),e("a",p,[n("https://www.aw-ol.com/downloads?cat=18"),a(i)])]),e("p",null,[n("全志官方NPU介绍："),e("a",m,[n("https://v853.docs.aw-ol.com/npu/dev_npu/"),a(i)])]),b,g,e("p",null,[n("​ 进入"),e("a",_,[n("https://www.aw-ol.com/downloads?cat=18"),a(i)]),n("后，下载V853的NPU拓展包")]),h,e("p",null,[n("​ 本次使用的网上下载的模型，后续将会使用字自训练生成的模型。我们使用的框架是 darknet，模型为 "),x,n("。 其训练的数据集是 "),y,n(" 数据集，模型可以在这里下载到："),e("a",w,[n("https://pjreddie.com/darknet/yolo/"),a(i)])]),k])}const I=d(r,[["render",f],["__file","04-yolov3ModelDeployment.html.vue"]]);export{I as default};
