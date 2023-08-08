import{_ as i,r as d,o as t,c as l,a as e,d as n,e as s}from"./app-5cc5893e.js";const c={},r=s(`<h1 id="开发板支持录音和播放音频" tabindex="-1"><a class="header-anchor" href="#开发板支持录音和播放音频" aria-hidden="true">#</a> 开发板支持录音和播放音频</h1><h2 id="_0-前言" tabindex="-1"><a class="header-anchor" href="#_0-前言" aria-hidden="true">#</a> 0.前言</h2><p>​ 本章主要讲述如何使用板载的MIC拾音咪头录音并使用喇叭播放音频。</p><p>​ 音频_开发指南：https://tina.100ask.net/SdkModule/Linux_AudioFrequency_DevelopmentGuide-02/#220-v853</p><p>​ 全志官方音频介绍：https://v853.docs.aw-ol.com/soft/tina_audio/#audio_1</p><h2 id="_1-硬件介绍" tabindex="-1"><a class="header-anchor" href="#_1-硬件介绍" aria-hidden="true">#</a> 1.硬件介绍</h2><p>​ V853 芯片提供了 AudioCodec（芯片内置音频接口） x1、I2S/PCM（数字音频接口） x2、DMIC（外置数字 MIC 接口） x1，可以满足各类音频需求。100ASK_V853-PRO开发板板载两个MIC拾音咪头和喇叭接口。如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230505163212847.png" alt="image-20230505163212847"></p><p>如果您想要使用喇叭接口播放声音，需要外接一个喇叭</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230506110123930.png" alt="image-20230506110123930"></p><h2 id="_2-音频驱动框架使用" tabindex="-1"><a class="header-anchor" href="#_2-音频驱动框架使用" aria-hidden="true">#</a> 2.音频驱动框架使用</h2><p>在 Tina Linux 中使用的是标准的 ALSA API，所以使用音频的功能可以使用标准的 <code>alsa-utils</code>。它提供了 <code>amixer</code>、<code>aplay</code>、<code>arecord</code> 等工具。在Tina根目录下输入<code>make menuconfig</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>book@100ask:~/workspaces/tina-v853-open$ make menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入Tina配置界面后，进入如下目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &gt; Sound
 	&lt;*&gt; alsa-utils............ ALSA (Advanced Linux Sound Architecture) utilities
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示：</p><p><img src="http://photos.100ask.net/allwinner-docs/v853/DeviceDriver/image-20230506100011757.png" alt="image-20230506100011757"></p><p>选中完成后会启用<code>amixer</code>、<code>aplay</code>、<code>arecord</code>功能，重新编译打包更新系统即可体验。</p><h3 id="_2-1-驱动调控-amixer" tabindex="-1"><a class="header-anchor" href="#_2-1-驱动调控-amixer" aria-hidden="true">#</a> 2.1 驱动调控：amixer</h3><p>amixer是命令行的 ALSA 声卡驱动调节工具，用于启用、关闭各声卡，设置各声卡的音量。使用 <code>amixer</code> 命令列出当前注册的音频设备。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>amixer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,21),o={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-29-52-image.png",target:"_blank",rel:"noopener noreferrer"},m=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-29-52-image.png",alt:"img"},null,-1),p=s(`<ul><li>常用选项</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>选项             功能
-D,--device    指定声卡设备,默认使用default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>常用命令</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>命令            功能
controls       列出指定声卡的所有控件
contents       列出指定声卡的所有控件的具体信息
cget           获取指定控件的信息
cset           设定指定控件的值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选择 MIC1 输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 Input Select&#39;</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,6),u={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-37-11-image.png",target:"_blank",rel:"noopener noreferrer"},v=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-37-11-image.png",alt:"img"},null,-1),b=s(`<p>选择 MIC2 输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 Input Select&#39;</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),g={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-37-40-image.png",target:"_blank",rel:"noopener noreferrer"},h=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-37-40-image.png",alt:"img"},null,-1),x=s(`<p>开启 MIC1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 Switch&#39;</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),_={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-38-18-image.png",target:"_blank",rel:"noopener noreferrer"},w=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-38-18-image.png",alt:"img"},null,-1),k=s(`<p>开启 MIC2</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 Switch&#39;</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),I={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-38-45-image.png",target:"_blank",rel:"noopener noreferrer"},f=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-38-45-image.png",alt:"img"},null,-1),S=s(`<p>设置 MIC1 音量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 gain volume&#39;</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),E={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-39-04-image.png",target:"_blank",rel:"noopener noreferrer"},D=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-39-04-image.png",alt:"img"},null,-1),L=s(`<p>设置 MIC2 音量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 gain volume&#39;</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),M={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-39-28-image.png",target:"_blank",rel:"noopener noreferrer"},T=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-39-28-image.png",alt:"img"},null,-1),C=s(`<p>开启 LINEOUT 输出功能</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;LINEOUT Output Select&#39;</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),N={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-30-36-image.png",target:"_blank",rel:"noopener noreferrer"},O=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-30-36-image.png",alt:"img"},null,-1),y=e("p",null,"开启 LINEOUT 通路",-1),U=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`amixer -D hw:audiocodec cset name='LINEOUT Switch' 1
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),A={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-31-00-image.png",target:"_blank",rel:"noopener noreferrer"},B=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-31-00-image.png",alt:"img"},null,-1),R=e("p",null,"设置输出音量",-1),X=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`amixer -D hw:audiocodec cset name='LINEOUT volume' 25
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),z={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-31-36-image.png",target:"_blank",rel:"noopener noreferrer"},V=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-31-36-image.png",alt:"img"},null,-1),F=s(`<h3 id="_2-2-录音工具-arecord" tabindex="-1"><a class="header-anchor" href="#_2-2-录音工具-arecord" aria-hidden="true">#</a> 2.2 录音工具：arecord</h3><p>arecord 是命令行的 ALSA 声卡驱动的录音工具，用于录音功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>选项                功能
-D,--device       指定声卡设备,默认使用default
-l,--list-device\` 列出当前所有声卡
-t,--file-type    指定播放文件的格式,如voc,wav,raw,不指定的情况下会去读取文件头部作识别
-c,--channels     指定通道数
-f,--format       指定采样格式
-r,--rate         采样率
-d,--duration     指定播放的时间
--period-size     指定period size
--buffer-siz\`     指定buffer size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看录音设备</strong></p><p>可以使用 <code>arecord -l</code> 命令查看开发板提供的录音设备。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>arecord <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,6),P={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-36-45-image.png",target:"_blank",rel:"noopener noreferrer"},G=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-11-36-45-image.png",alt:"img"},null,-1),q=s(`<p><strong>麦克风录音</strong></p><p>在录音之前，首先需要使用 amixer 打开音频通路，配置内部 MIC1，MIC2 录制双通道音频。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 Input Select&#39;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 Input Select&#39;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 Switch&#39;</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 Switch&#39;</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC1 gain volume&#39;</span> <span class="token number">30</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;MIC2 gain volume&#39;</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>arecord</code> 命令，使用板载的两个麦克风进行录音。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>arecord <span class="token parameter variable">-D</span> hw:audiocodec <span class="token parameter variable">-f</span> S16_LE <span class="token parameter variable">-t</span> wav <span class="token parameter variable">-c2</span> <span class="token parameter variable">-r</span> <span class="token number">16000</span> <span class="token parameter variable">-d</span> <span class="token number">3</span> t.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),H={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-33-24-image.png",target:"_blank",rel:"noopener noreferrer"},K=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-33-24-image.png",alt:"img"},null,-1),W=s(`<h3 id="_2-3-播放工具-aplay" tabindex="-1"><a class="header-anchor" href="#_2-3-播放工具-aplay" aria-hidden="true">#</a> 2.3 播放工具：aplay</h3><p>aplay 是命令行的 ALSA 声卡驱动的播放工具，用于播放功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>选项                功能
-D,--device       指定声卡设备,默认使用default
-l,--list-devices 列出当前所有声卡
-t,--file-type    指定播放文件的格式,如voc,wav,raw,不指定的情况下会去读取文件头部作识别
-c,--channels     指定通道数
-f,--format       指定采样格式
-r,--rate         采样率
-d,--duration     指定播放的时间
--period-size     指定period size
--buffer-size     指定buffer size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看播放设备</strong></p><p>使用 <code>aplay -l</code> 查看播放设备</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>aplay <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,6),$={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-33-48-image.png",target:"_blank",rel:"noopener noreferrer"},j=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-33-48-image.png",alt:"img"},null,-1),J=s(`<p><strong>扬声器播放音频</strong></p><p>在播放之前，首先需要打开音频通路，配置扬声器播放音频，具体可以参照 amixer 配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;LINEOUT Switch&#39;</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;LINEOUT Switch&#39;</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    amixer <span class="token parameter variable">-D</span> hw:audiocodec cset <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&#39;LINEOUT volume&#39;</span> <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>aplay</code> 通过外接扬声器播放刚才录制的音频。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>aplay <span class="token parameter variable">-D</span> hw:audiocodec t.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),Q={href:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-34-30-image.png",target:"_blank",rel:"noopener noreferrer"},Y=e("img",{src:"https://v853.docs.aw-ol.com/assets/img/tina_audio/2022-07-26-13-34-30-image.png",alt:"img"},null,-1),Z=s(`<h2 id="_3-测试录音功能" tabindex="-1"><a class="header-anchor" href="#_3-测试录音功能" aria-hidden="true">#</a> 3.测试录音功能</h2><p>​ 启动开发板后，在串口终端输入如下命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>amixer -D hw:audiocodec cset name=&#39;MIC1 Input Select&#39; 0 &amp;&amp; \\
   	amixer -D hw:audiocodec cset name=&#39;MIC2 Input Select&#39; 0 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;MIC1 Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;MIC2 Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;MIC1 gain volume&#39; 30 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;MIC2 gain volume&#39; 30 &amp;&amp; \\
    arecord -D hw:audiocodec -f S16_LE -t wav -c2 -r 16000 -d 3 test.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# [   67.295067] random: crng init done
[   67.298885] random: 4 urandom warning(s) missed due to ratelimiting

root@TinaLinux:/# 
root@TinaLinux:/# 
root@TinaLinux:/# amixer -D hw:audiocodec cset name=&#39;MIC1 Input Select&#39; 0 &amp;&amp; \\
&gt;    amixer -D hw:audiocodec cset name=&#39;MIC2 Input Select&#39; 0 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;MIC1 Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;MIC2 Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;MIC1 gain volume&#39; 30 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;MIC2 gain volume&#39; 30 &amp;&amp; \\
&gt;     arecord -D hw:audiocodec -f S16_LE -t wav -c2 -r 16000 -d 3 test.wav
numid=23,iface=MIXER,name=&#39;MIC1 Input Select&#39;
  ; type=ENUMERATED,access=rw------,values=1,items=2
  ; Item #0 &#39;differ&#39;
  ; Item #1 &#39;single&#39;
  : values=0
numid=24,iface=MIXER,name=&#39;MIC2 Input Select&#39;
  ; type=ENUMERATED,access=rw------,values=1,items=2
  ; Item #0 &#39;differ&#39;
  ; Item #1 &#39;single&#39;
  : values=0
numid=17,iface=MIXER,name=&#39;MIC1 Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=18,iface=MIXER,name=&#39;MIC2 Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=12,iface=MIXER,name=&#39;MIC1 gain volume&#39;
  ; type=INTEGER,access=rw---R--,values=1,min=0,max=31,step=0
  : values=30
  | dBscale-min=0.00dB,step=1.00dB,mute=0
numid=13,iface=MIXER,name=&#39;MIC2 gain volume&#39;
  ; type=INTEGER,access=rw---R--,values=1,min=0,max=31,step=0
  : values=30
  | dBscale-min=0.00dB,step=1.00dB,mute=0
Recording WAVE &#39;test.wav&#39; : Signed 16 bit Little Endian, Rate 16000 Hz, Stereo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序会自动录音并保存文件到当前目录下，查看当前目录可以看到保存的文件<code>test.wav</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# ls
bin       etc       lib       rdinit    run       sys       usr
data      home      mnt       rom       sbin      test.wav  var
dev       init      proc      root      squashfs  tmp       www
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-播放音频" tabindex="-1"><a class="header-anchor" href="#_4-播放音频" aria-hidden="true">#</a> 4.播放音频</h2><p>在串口终端下，输入以下命令，可以播放刚刚我们录制的音频</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT volume&#39; 31 &amp;&amp; \\
    aplay -D hw:audiocodec test.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;LINEOUT volume&#39; 31 &amp;&amp; \\
&gt;     aplay -D hw:audiocodec test.wav
numid=20,iface=MIXER,name=&#39;LINEOUT Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=20,iface=MIXER,name=&#39;LINEOUT Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=16,iface=MIXER,name=&#39;LINEOUT volume&#39;
  ; type=INTEGER,access=rw---R--,values=1,min=0,max=31,step=0
  : values=31
  | dBrange-
    rangemin=0,,rangemax=1
      | dBscale-min=0.00dB,step=0.00dB,mute=1
    rangemin=2,,rangemax=31
      | dBscale-min=-43.50dB,step=1.50dB,mute=1

Playing WAVE &#39;test.wav&#39; : Signed 16 bit Little Endian, Rate 16000 Hz, Stereo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 此时如果我们接上了喇叭，喇叭就会播放刚刚录制的音频。</p><p>​ 同样我们也可以将音频文件拷贝到开发板中，使用以下命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT volume&#39; 31 &amp;&amp; \\
    aplay -D hw:audiocodec test.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>test.wav</code>更换为您想要播放的音频文件的路径名称。</p><p>​</p><p>假设提前要播放的音频文件拷贝到TF卡中，插入TF卡后，挂载TF卡</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# mount /dev/mmcblk1p1 /mnt/extsd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看TF卡中<code>testSound</code>文件夹下的测试音频文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# ls /mnt/extsd/testSound/
test100.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用如下命令播放测试音频</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
    amixer -D hw:audiocodec cset name=&#39;LINEOUT volume&#39; 31 &amp;&amp; \\
    aplay -D hw:audiocodec /mnt/extsd/testSound/test100.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;LINEOUT Switch&#39; 1 &amp;&amp; \\
&gt;     amixer -D hw:audiocodec cset name=&#39;LINEOUT volume&#39; 31 &amp;&amp; \\
&gt;     aplay -D hw:audiocodec /mnt/extsd/testSound/test100.wav
numid=20,iface=MIXER,name=&#39;LINEOUT Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=20,iface=MIXER,name=&#39;LINEOUT Switch&#39;
  ; type=BOOLEAN,access=rw------,values=1
  : values=on
numid=16,iface=MIXER,name=&#39;LINEOUT volume&#39;
  ; type=INTEGER,access=rw---R--,values=1,min=0,max=31,step=0
  : values=31
  | dBrange-
    rangemin=0,,rangemax=1
      | dBscale-min=0.00dB,step=0.00dB,mute=1
    rangemin=2,,rangemax=31
      | dBscale-min=-43.50dB,step=1.50dB,mute=1

Playing WAVE &#39;/mnt/extsd/testSound/test100.wav&#39; : Signed 16 bit Little Endian, Rate 22050 Hz, Stereo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时喇叭就会播放测试音频。</p><h2 id="_5-更换开机音乐" tabindex="-1"><a class="header-anchor" href="#_5-更换开机音乐" aria-hidden="true">#</a> 5.更换开机音乐</h2><p>由于100ASK_V853-PRO开发板已经默认启用了开机音乐，自启脚本位于：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>openwrt/target/v853/v853-vision/busybox-init-base-files/etc/init.d/S03audio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以在开发板的串口终端的<code>/etc/init.d/</code>目录下找到<code>S03audio</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/# cd /etc/init.d/
root@TinaLinux:/etc/init.d# ls
S00mpp               S50telnet            rc.final
S01logging           S50usb               rc.modules
S03audio             S50wifidaemon        rc.preboot
S10udev              S99swupdate_autorun  rcK
S11dev               adbd                 rcS
S20urandom           cron                 sysntpd
S40network           dbus                 wpa_supplicant
S41netparam          dnsmasq
S50dbus              network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以查看相关的脚本源码。</p><p>进入<code>/home/res/audio/</code>目录下，可以查看两个文件，分别为开机音乐<code>startup.wav</code>和关机音乐<code>shutdown.wav</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/etc/init.d# cd /home/res/audio/
root@TinaLinux:/home/res/audio# ls
shutdown.wav  startup.wav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过更换<code>startup.wav</code>文件，来达到更换开机音乐的效果。假设我将TF卡中的<code>test100.wav</code>拷贝到<code>/home/res/audio/</code>目录下，并更换名称为<code>startup.wav</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@TinaLinux:/home/res/audio# cp /mnt/extsd/testSound/test100.wav /home/res/au
dio/startup.wav
root@TinaLinux:/home/res/audio# sync
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入<code>reboot</code>，重启后即可通过喇叭听到更换后的开机音乐。</p>`,37);function ee(ae,ne){const a=d("ExternalLinkIcon");return t(),l("div",null,[r,e("p",null,[e("a",o,[m,n(a)])]),p,e("p",null,[e("a",u,[v,n(a)])]),b,e("p",null,[e("a",g,[h,n(a)])]),x,e("p",null,[e("a",_,[w,n(a)])]),k,e("p",null,[e("a",I,[f,n(a)])]),S,e("p",null,[e("a",E,[D,n(a)])]),L,e("p",null,[e("a",M,[T,n(a)])]),C,e("p",null,[e("a",N,[O,n(a)])]),y,U,e("p",null,[e("a",A,[B,n(a)])]),R,X,e("p",null,[e("a",z,[V,n(a)])]),F,e("p",null,[e("a",P,[G,n(a)])]),q,e("p",null,[e("a",H,[K,n(a)])]),W,e("p",null,[e("a",$,[j,n(a)])]),J,e("p",null,[e("a",Q,[Y,n(a)])]),Z])}const ie=i(c,[["render",ee],["__file","04-V853SupportMicAudio..html.vue"]]);export{ie as default};
