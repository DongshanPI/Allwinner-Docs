import{_ as e,o as a,c as n,e as d}from"./app-5cc5893e.js";const i={},s=d(`<h2 id="_3-编译方法介绍" tabindex="-1"><a class="header-anchor" href="#_3-编译方法介绍" aria-hidden="true">#</a> 3 编译方法介绍</h2><h3 id="_3-1-准备编译工具链" tabindex="-1"><a class="header-anchor" href="#_3-1-准备编译工具链" aria-hidden="true">#</a> 3.1 准备编译工具链</h3><p>准备编译工具链接执行步骤如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1）cd longan/brandy/brandy-2.0/\\
2）./build.sh -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-快速编译-boot0-及-u-boot" tabindex="-1"><a class="header-anchor" href="#_3-2-快速编译-boot0-及-u-boot" aria-hidden="true">#</a> 3.2 快速编译 boot0 及 U-Boot</h3><p>在longan/brandy/brandy-2.0/目录下，执行 ./build.sh -p 平台名称，可以快速完成整个 boot 编译动作。这个平台名称是指，LICHEE_CHIP。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./build.sh -p {LICHEE_CHIP}            //快速编译spl/U-Boot
./build.sh -o spl-pub -p {LICHEE_CHIP} //快速编译spl-pub
./build.sh -o uboot -p {LICHEE_CHIP}   //快速编译U-Boot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-编译-u-boot" tabindex="-1"><a class="header-anchor" href="#_3-3-编译-u-boot" aria-hidden="true">#</a> 3.3 编译 U-Boot</h3><p>cd longan/brandy/brandy-2.0/u-boot-2018/进入 u-boot-2018 目录。以{LICHEE_CHIP}为例，依次执行如下操作即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1）make {LICHEE_CHIP}_defconfig
2）make -j
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-编译-boot0-fes-sboot" tabindex="-1"><a class="header-anchor" href="#_3-4-编译-boot0-fes-sboot" aria-hidden="true">#</a> 3.4 编译 boot0/fes/sboot</h3><p>cd longan/brandy/brandy-2.0/spl-pub进入spl-pub目录，需设置平台和要编译的模块参数。以{LICHEE_CHIP}为例，编译 nand/emmc 的方法如下：</p><ol><li>编译boot0</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make distclean
make p={LICHEE_CHIP} m=nand
make boot0

make distclean
make p={LICHEE_CHIP} m=emmc
make boot0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>编译fes</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make distclean
make p={LICHEE_CHIP} m=fes
make fes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>编译sboot</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make distclean
make p={LICHEE_CHIP} m=sboot
make sboot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),l=[s];function t(o,r){return a(),n("div",null,l)}const u=e(i,[["render",t],["__file","Linux_U-boot_DevelopmentGuide-02.html.vue"]]);export{u as default};
