import{_ as s,o as n,c as t,e as a}from"./app-5cc5893e.js";const o={},e=a(`<h1 id="烧写固件至spi-nand" tabindex="-1"><a class="header-anchor" href="#烧写固件至spi-nand" aria-hidden="true">#</a> 烧写固件至SPI NAND</h1><p><strong>注意此方式烧录进的文件系统是ubifs文件系统，如果操作 需要网络文件系统挂载或者使用TF卡，不推荐使用。</strong></p><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><ol><li>东山哪吒STU开发板主板 x1</li><li>下载全志线刷工具AllwinnertechPhoeniSuit： https://gitlab.com/dongshanpi/tools/-/raw/main/AllwinnertechPhoeniSuit.zip</li><li>TypeC线 X2</li><li>下载SPI NAND最小系统镜像：https://gitlab.com/dongshanpi/tools/-/raw/main/buildroot_linux_nand_uart3.zip</li><li>下载全志USB烧录驱动：https://gitlab.com/dongshanpi/tools/-/raw/main/AllwinnerUSBFlashDeviceDriver.zip</li></ol><h2 id="连接开发板" tabindex="-1"><a class="header-anchor" href="#连接开发板" aria-hidden="true">#</a> 连接开发板</h2><ul><li>参考下图所示，将两个TypeC线分别连至 开发板 串口接口 与 OTG烧写接口，另一端 连接至 电脑USB接口，连接成功后，可以将下载好的 烧写工具和 SPI NAND最小系统镜像解压缩 使用。</li></ul><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/100ask_t113_pro/T113-Pro_FlashSystem.png" alt="T113-Pro_FlashSystem"></p><ul><li>使用镊子或者杜邦线短接 核心板 SPI NAND FLASH 5-6脚，也就是 MOSI 与SCLK，短接的同时，可以按下 底板上的 RESET 按键，这个时候开发板会进入到FEL烧写模式，进入烧写模式后，我们就可以继续往下安装 专门的烧录驱动。</li></ul><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/100ask_t113_pro/T113-Pro_FlashSystem_002.png" alt="T113-Pro_FlashSystem_002"></p><h2 id="安装usb驱动" tabindex="-1"><a class="header-anchor" href="#安装usb驱动" aria-hidden="true">#</a> 安装usb驱动</h2><p>在我们连接好开发板以后，先按住 <strong>FEL</strong> 烧写模式按键，之后按一下 <strong>RESET</strong> 系统复位键，就可以自动进入烧写模式。</p><p>这时我们可以看到设备管理器 <strong>通用串行总线控制器</strong> 弹出一个 未知设备 ，这个时候我们就需要把我们提前下载好的 <strong>全志USB烧录驱动</strong> 进行修改，然后将解压缩过的 <strong>全志USB烧录驱动</strong> 压缩包，解压缩，可以看到里面有这么几个文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>InstallUSBDrv.exe
drvinstaller_IA64.exe
drvinstaller_X86.exe
UsbDriver/          
drvinstaller_X64.exe   
install.bat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于wind7系统的同学，只需要以管理员 打开 <code>install.bat</code> 脚本，等待安装，在弹出的 是否安装驱动的对话框里面，点击安装即可。</p><p>对于wind10/wind11系统的同学，需要在设备管理器里面进行手动安装驱动。</p><p>如下图所示，在第一次插入OTG设备，进入烧写模式设备管理器会弹出一个未知设备。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_001.png" alt="Windows_FlashDevice_001"></p><p>接下来鼠标右键点击这个未知设备，在弹出的对话框里， 点击浏览我计算机以查找驱动程序软件。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_002.png" alt="Windows_FlashDevice_001"></p><p>之后在弹出新的对话框里，点击浏览找到我们之前下载好的 usb烧录驱动文件夹内，找到 <code>UsbDriver/</code> 这个目录，并进入，之后点击确定即可。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_007.png" alt="Windows_FlashDevice_001"></p><p>注意进入到 <code>UsbDriver/</code> 文件夹，然后点击确定，如下图所示。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_003.png" alt="Windows_FlashDevice_001"></p><p>此时，我们继续点击 <strong>下一页</strong> 按钮，这时系统就会提示安装一个驱动程序。 在弹出的对话框里，我们点击 始终安装此驱动程序软件 等待安装完成。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_004.png" alt="Windows_FlashDevice_001"></p><p>安装完成后，会提示，Windows已成功更新你的驱动程序。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_005.png" alt="Windows_FlashDevice_001"></p><p>最后我们可以看到，设备管理器 里面的未知设备 变成了一个 <code>USB Device(VID_1f3a_efe8)</code>的设备，这时就表明设备驱动已经安装成功。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/Windows_FlashDevice_006.png" alt="Windows_FlashDevice_001"></p><h2 id="运行软件烧写" tabindex="-1"><a class="header-anchor" href="#运行软件烧写" aria-hidden="true">#</a> 运行软件烧写</h2><p>将下载下来的全志线刷工具 <strong>AllwinnertechPhoeniSuit</strong> 解压缩，同时将<strong>SPI NAND最小系统镜像</strong>下载下来也进行解压缩。</p><p>解压后，得到一个 <strong>buildroot_linux_nand_uart3.img</strong> 镜像，是用于烧录到SPI NAND镜像得。另一个是<strong>AllwinnertechPhoeniSuit</strong>文件夹。</p><p>首先我们进入到 <strong>AllwinnertechPhoeniSuit\\AllwinnertechPhoeniSuitRelease20201225</strong> 目录下 找到 <strong>PhoenixSuit.exe</strong> 双击运行。</p><p>打开软件后 软件主界面如下图所示</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_001.png" alt="PhoenixSuit_001"></p><p>​ 接下来 我们需要切换到 <strong>一键刷机</strong>窗口，如下图所示，点击红框标号1，在弹出的新窗口内，我们点击 红框2 <strong>浏览</strong> 找到我们刚才解压过的 SPI NAND 最小系统镜像 <strong>buildroot_linux_nand_uart3.img</strong>，选中镜像后，点击红框3 <strong>全盘擦除升级</strong> ，最后点击红框4 <strong>立即升级</strong>。</p><p>​ 点击完成后，不需要理会 弹出的信息，这时 我们拿起已经连接好的开发板，先按住 <strong>FEL</strong> 烧写模式按键，之后按一下 <strong>RESET</strong> 系统复位键，就可以自动进入烧写模式并开始烧写。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_002.png" alt="PhoenixSuit_002"></p><p>​ 烧写时会提示烧写进度条，烧写完成后 开发板会自己重启。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/PhoenixSuit_003.png" alt="PhoenixSuit_003"></p><h2 id="启动系统" tabindex="-1"><a class="header-anchor" href="#启动系统" aria-hidden="true">#</a> 启动系统</h2><p>一般情况下，烧写成功后 都会自动重启 启动系统，此时我们进入到 串口终端，可以看到它的启动信息，等所有启动信息加载完成，输入 root 用户名即可登录烧写好的系统内。</p><p><img src="https://cdn.staticaly.com/gh/DongshanPI/Docs-Photos@master/DongshanNezhaSTU/spinand-flashsystem_001.png" alt="spinand-flashsystem_001"></p><p><strong>系统的登录用户名 root 密码为空</strong></p><p><strong>系统的登录用户名 root 密码为空</strong></p><p><strong>系统的登录用户名 root 密码为空</strong></p>`,46),i=[e];function h(r,l){return n(),t("div",null,i)}const p=s(o,[["render",h],["__file","03-1_FlashSystemSpiFlash.html.vue"]]);export{p as default};
