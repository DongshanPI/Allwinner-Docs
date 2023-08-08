import{_ as t,r as o,o as d,c as r,a as n,b as a,d as s,e as i}from"./app-5cc5893e.js";const l={},u=i(`<h1 id="使用buildroot-sdk编译构建系统" tabindex="-1"><a class="header-anchor" href="#使用buildroot-sdk编译构建系统" aria-hidden="true">#</a> 使用buildroot-SDK编译构建系统</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><ul><li>此套构建系统基于全志RISCV-64 Linux D1-H 芯片，适配了buildroot 2022lts主线版本，兼容了百问网的项目课程以及相关组件，真正做到了低耦合，高可用，使用不同的buildroot external tree规格，讲不同的项目 不同的组件分别管理，来实现更容易上手 也更容易学习理解。</li></ul><h2 id="获取sdk源码" tabindex="-1"><a class="header-anchor" href="#获取sdk源码" aria-hidden="true">#</a> 获取sdk源码</h2><ul><li>默认源码都存放在github仓库内，请使用如下命令获取</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@virtual-machine:~$ <span class="token function">git</span> clone  https://github.com/DongshanPI/buildroot_dongshannezhastu
book@virtual-machine:~$ <span class="token builtin class-name">cd</span> buildroot_dshannezhastu
book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token function">git</span> submodule update <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token function">git</span> submodule update <span class="token parameter variable">--recursive</span> <span class="token parameter variable">--remote</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对于国内无法访问github的同学，可以使用国内备用gitee站点， 如下命令。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@virtual-machine:~$ <span class="token function">git</span> clone  https://gitee.com/weidognshan/buildroot_dongshannezhastu
book@virtual-machine:~$ <span class="token builtin class-name">cd</span> buildroot_dshannezhastu
book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token function">git</span> submodule update <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token function">git</span> submodule update <span class="token parameter variable">--recursive</span> <span class="token parameter variable">--remote</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装必要依赖包" tabindex="-1"><a class="header-anchor" href="#安装必要依赖包" aria-hidden="true">#</a> 安装必要依赖包</h2><h3 id="ubuntu-18-04" tabindex="-1"><a class="header-anchor" href="#ubuntu-18-04" aria-hidden="true">#</a> ubuntu-18.04</h3><p>运行环境配置： 此系统基于ubuntu18.04进行验证，在之前的基础之上还需要安装以下必要依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span>  libncurses5-dev   u-boot-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，执行如下命令进行开始编译操作。</p><h2 id="最小系统编译烧写" tabindex="-1"><a class="header-anchor" href="#最小系统编译烧写" aria-hidden="true">#</a> 最小系统编译烧写</h2><h3 id="编译sdcard-最小系统镜像" tabindex="-1"><a class="header-anchor" href="#编译sdcard-最小系统镜像" aria-hidden="true">#</a> 编译sdcard 最小系统镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token builtin class-name">cd</span> buildroot-awol/
book@virtual-machine:~/buildroot_dongshannezhastu/buildroot-awol$ <span class="token function">make</span>  <span class="token assign-left variable">BR2_EXTERNAL</span><span class="token operator">=</span><span class="token string">&quot;../br2lvgl  ../br2qt5 ../br2nezhastu&quot;</span>  dongshannezhastu_sdcard_core_defconfig

book@virtual-machine:~/buildroot_dongshannezhastu/buildroot-awol$ <span class="token function">make</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="烧写sdcard-最小系统镜像" tabindex="-1"><a class="header-anchor" href="#烧写sdcard-最小系统镜像" aria-hidden="true">#</a> 烧写sdcard 最小系统镜像</h3>`,17),c={href:"https://dongshanpi.com/DongshanNezhaSTU/03-QuickStart/#tf",target:"_blank",rel:"noopener noreferrer"},h=i(`<h3 id="编译spi-nand最小系统镜像" tabindex="-1"><a class="header-anchor" href="#编译spi-nand最小系统镜像" aria-hidden="true">#</a> 编译spi nand最小系统镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@virtual-machine:~/buildroot_dongshannezhastu$ <span class="token builtin class-name">cd</span> buildroot-awol/
book@virtual-machine:~/buildroot_dongshannezhastu/buildroot-awol$ <span class="token function">make</span>  <span class="token assign-left variable">BR2_EXTERNAL</span><span class="token operator">=</span><span class="token string">&quot;../br2lvgl  ../br2qt5 ../br2nezhastu&quot;</span>  dongshannezhastu_spinand_core_defconfig

book@virtual-machine:~/buildroot_dongshannezhastu/buildroot-awol$ <span class="token function">make</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="烧写spi-nand最小系统镜像" tabindex="-1"><a class="header-anchor" href="#烧写spi-nand最小系统镜像" aria-hidden="true">#</a> 烧写spi nand最小系统镜像</h3>`,3),b={href:"https://dongshanpi.com/DongshanNezhaSTU/03-QuickStart/#spi-nand",target:"_blank",rel:"noopener noreferrer"};function p(v,m){const e=o("ExternalLinkIcon");return d(),r("div",null,[u,n("p",null,[a("编译完成后会在 output/images目录下输出 dongshannezhastu-sdcard.img 文件，将文件拷贝到Windows系统下使用 wind32diskimage烧写，或者使用dd if 烧录到tf卡内， 之后插到开发板上，即可启动。 请参考左侧 "),n("a",c,[a("快速启动"),s(e)]),a(" 页面")]),h,n("p",null,[a("编译完成后会在 output/images目录下输出 d1-h-nezhastu_uart0.img 文件，将文件拷贝到Windows系统下使用 使用 全志官方的 AllwinnertechPhoeniSuit 进行烧写。 详细烧写步骤请，请参考左侧 "),n("a",b,[a("快速启动"),s(e)]),a(" 页面。")])])}const k=t(l,[["render",p],["__file","07-Buildroot-SDK_DevelopmentGuide.html.vue"]]);export{k as default};