import{_ as e,o as a,c as i,e as n}from"./app-5cc5893e.js";const d={},t=n(`<h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1 前言</h2><h3 id="_1-1-编写目的" tabindex="-1"><a class="header-anchor" href="#_1-1-编写目的" aria-hidden="true">#</a> 1.1 编写目的</h3><p>介绍 U-Boot 的编译打包、基本配置、常用命令的使用、基本调试方法等, 为 U-BOOT 的移植及应用开发提供了基础。</p><h3 id="_1-2-适用范围" tabindex="-1"><a class="header-anchor" href="#_1-2-适用范围" aria-hidden="true">#</a> 1.2 适用范围</h3><p>本文档适用于 brandy2.0, 即 U-Boot-2018 平台。</p><h3 id="_1-3-相关人员" tabindex="-1"><a class="header-anchor" href="#_1-3-相关人员" aria-hidden="true">#</a> 1.3 相关人员</h3><p>U-Boot 开发/维护人员，内核开发人员。</p><h2 id="_2-lichee-类宏关键字解释" tabindex="-1"><a class="header-anchor" href="#_2-lichee-类宏关键字解释" aria-hidden="true">#</a> 2 LICHEE 类宏关键字解释</h2><p>请到 longan 目录下的.buildconfig 查看目前使用了以下 LICHEE 类宏。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LICHEE_IC    ——&gt; IC名\\
LICHEE_CHIP  ——&gt; 平台名\\
LICHEE_BOARD ——&gt; 板级名\\
LICHEE_ARCH  ——&gt; 所属架构\\
LICHEE_BOARD_CONFIG_DIR ——&gt; 板级目录\\
LICHEE_BRANDY_OUT_DIR   ——&gt; bin文件所在目录\\
LICHEE_PLAT_OUT         ——&gt; 平台临时bin所在目录\\
LICHEE_CHIP_CONFIG_DIR  ——&gt; IC目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),r=[t];function s(_,c){return a(),i("div",null,r)}const h=e(d,[["render",s],["__file","Linux_U-boot_DevelopmentGuide-01.html.vue"]]);export{h as default};
