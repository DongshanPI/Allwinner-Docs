import{_ as n,o as s,c as a,e as t}from"./app-5cc5893e.js";const o={},e=t(`<h1 id="安装并配置开发环境" tabindex="-1"><a class="header-anchor" href="#安装并配置开发环境" aria-hidden="true">#</a> 安装并配置开发环境</h1><h2 id="获取虚拟机系统" tabindex="-1"><a class="header-anchor" href="#获取虚拟机系统" aria-hidden="true">#</a> 获取虚拟机系统</h2><h3 id="下载vmware虚拟机工具" tabindex="-1"><a class="header-anchor" href="#下载vmware虚拟机工具" aria-hidden="true">#</a> 下载vmware虚拟机工具</h3><p>使用浏览器打开网址 https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html 参考下图箭头所示，点击下载安装 Windows版本的VMware Workstation ，点击 <strong>DOWNLOAD NOW</strong> 即可开始下载。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/vmwareworkstation_download_001.png" alt="vmwareworkstation_download_001"></p><p>下载完成后全部使用默认配置一步步安装即可。</p><h3 id="获取ubuntu系统镜像" tabindex="-1"><a class="header-anchor" href="#获取ubuntu系统镜像" aria-hidden="true">#</a> 获取Ubuntu系统镜像</h3><ul><li>使用浏览器打开 https://www.linuxvmimages.com/images/ubuntu-1804/ 找到如下箭头所示位置，点击 <strong>VMware Image</strong> 下载。</li></ul><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/linuxvmimage_downlaod_001.png" alt="linuxvmimage_downlaod_001"></p><p>下载过程可能会持续 10 到 30 分钟，具体要依据网速而定。</p><h2 id="运行虚拟机系统" tabindex="-1"><a class="header-anchor" href="#运行虚拟机系统" aria-hidden="true">#</a> 运行虚拟机系统</h2><ol><li>解压缩 虚拟机系统镜像压缩包，解压缩完成后，可以看到里面有如下两个文件，接下来，我们会使用 后缀名为 .vmx 这个 配置文件。</li></ol><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_003.png" alt="ConfigHost_003"></p><ol start="2"><li>打开已经安装好的 vmware workstation 软件 点击左上角的 <strong>文件</strong> --&gt; <strong>打开</strong> 找到上面的 Ubuntu_18.04.6_VM_LinuxVMImages.COM.vmx 文件，之后会弹出新的虚拟机对话框页面。</li></ol><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_004.png" alt="ConfigHost_004"></p><ol start="3"><li>如下图所示为 为我们已经虚拟机的配置界面，那面我们可以 点击 红框 2 编辑虚拟机设置 里面 去调正 我们虚拟机的 内存 大小 和处理器个数，建议 最好 内存为 4GB 及以上，处理器至少4 个。 调整好以后，就可以 点击 <strong>开启此虚拟机</strong> 来运行此虚拟机了</li></ol><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_005.png" alt="ConfigHost_005"></p><p>第一次打开会提示 一个 虚拟机已经复制的 对话框，我们这时，只需要 点击 我已复制虚拟机 就可以继续启动虚拟机系统了。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_006.png" alt="ConfigHost_006"></p><p>等待数秒，系统就会自动启动了，启动以后 鼠标点击 <strong>Ubuntu</strong> 字样，就可以进入登录对话框，输入 密码 ubuntu 即可登录进入ubuntu系统内。</p><p>注意：</p><p><strong>Ubuntu默认的用户名密码分别为 ubuntu ubuntu</strong></p><p><strong>Ubuntu默认的用户名密码分别为 ubuntu ubuntu</strong></p><p><strong>Ubuntu默认的用户名密码分别为 ubuntu ubuntu</strong></p><p><strong>ubuntu默认需要联网，如果你的 Windows电脑已经可以访问Internet 互联网，ubuntu系统后就会自动共享 Windows电脑的网络 进行连接internet 网络。</strong></p><h3 id="配置开发环境" tabindex="-1"><a class="header-anchor" href="#配置开发环境" aria-hidden="true">#</a> 配置开发环境</h3><ul><li>安装必要软件包, 鼠标点击进入 ubuntu界面内，键盘同时 按下 <strong>ctrl + alt + t</strong> 三个按键会快速唤起，终端界面，唤起成功后，在终端里面执行如下命令进行安装必要依赖包。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span>  <span class="token function">sed</span> <span class="token function">make</span> binutils build-essential  gcc g++ <span class="token function">bash</span> patch <span class="token function">gzip</span> <span class="token function">bzip2</span> perl  <span class="token function">tar</span> cpio <span class="token function">unzip</span> <span class="token function">rsync</span> <span class="token function">file</span>  <span class="token function">bc</span> <span class="token function">wget</span> python  cvs <span class="token function">git</span> mercurial <span class="token function">rsync</span>  subversion android-tools-mkbootimg <span class="token function">vim</span>  libssl-dev  android-tools-fastboot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你发现你的ubuntu虚拟机 第一次启动 无法 通过 windows下复制 命令 粘贴到 ubuntu内，则需要先手敲 执行如下命令 安装一个 用于 虚拟机和 windows共享剪切板的工具包。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> open-vm-tools-desktop 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_007.png" alt="ConfigHost_007"></p><p>安装完成后，点击右上角的 电源按钮，重启ubuntu系统，或者 直接输入 sudo reboot 命令进行重启。</p><p>这时就可以 通过windows端向ubuntu内粘贴文件，或者拷贝拷出文件了。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/ConfigHost_008.png" alt="ConfigHost_008"></p><p>做完这一步以后，就可以继续往下，获取源码 开始RISC-V 东山哪吒STU开发板的开发之旅了。</p>`,35),i=[e];function c(r,p){return s(),a("div",null,i)}const l=n(o,[["render",c],["__file","06-ConfigHostEnv.html.vue"]]);export{l as default};
