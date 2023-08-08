import{_ as n,o as a,c as s,e}from"./app-5cc5893e.js";const t={},o=e(`<h1 id="文档编辑类命令" tabindex="-1"><a class="header-anchor" href="#文档编辑类命令" aria-hidden="true">#</a> 文档编辑类命令</h1><h2 id="cat-命令" tabindex="-1"><a class="header-anchor" href="#cat-命令" aria-hidden="true">#</a> cat 命令</h2><blockquote><p>在终端上显示文件内容</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> <span class="token function">file</span>	//查看file文档内容
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> <span class="token number">11111</span> <span class="token operator">&gt;</span> <span class="token function">file</span>  //重定向11111 到file文档内，也可以理解将 <span class="token number">1111</span> <span class="token operator">&gt;</span> 写入到 file里面。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> /proc/cpuinfo <span class="token operator">&gt;</span> cpuinfo.txt //将cpuinfo信息写入到 cpuinfo.txt文档内。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> <span class="token parameter variable">-n</span>  <span class="token function">file</span>	//显示file文本里面的行号。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> <span class="token operator">&gt;</span> helloword.txt <span class="token operator">&lt;&lt;</span>EOF
<span class="token operator">&gt;</span>Hello
<span class="token operator">&gt;</span>word
<span class="token operator">&gt;</span><span class="token number">1111</span>
<span class="token operator">&gt;</span>EOF
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">cat</span> helloword.txt  //常用于脚本处理等。
Hello
word
<span class="token number">1111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="echo命令" tabindex="-1"><a class="header-anchor" href="#echo命令" aria-hidden="true">#</a> echo命令</h2><blockquote><p>在终端上输出字符串，或者提示shell的值</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;hello word!&quot;</span> //在终端上输出 helloword 字符串
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span><span class="token variable">\`</span></span> //执行date命令，进行输出显示。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;Hello<span class="token entity" title="\\n">\\n</span> Word!&quot;</span> //输出的字符串 Hell换行。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31m Hello word <span class="token entity" title="\\033">\\033</span>[0m&quot;</span> //输出红色字体的Hello word.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gedit-命令" tabindex="-1"><a class="header-anchor" href="#gedit-命令" aria-hidden="true">#</a> gedit 命令</h2><blockquote><p>一个文本编辑器，类似于VIM</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$  gedit file1  //gedit命令后面加 文件名，新文件或者已经存在的都可以。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="rm命令" tabindex="-1"><a class="header-anchor" href="#rm命令" aria-hidden="true">#</a> rm命令</h2><blockquote><p>rm --help查看详细官方说明，主要用途是删除指定的文件或者目录。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token function">file</span>    //删除一个已经存在的文件。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token function">dir</span>  //删除一个目录。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token parameter variable">-v</span> <span class="token function">file</span>  //显示删除文件国产的详细信息。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token parameter variable">-rv</span> <span class="token function">dir</span>  //显示删除文件夹的详细输出信息。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token parameter variable">-d</span> <span class="token function">dir</span>	  //删除空目录。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">rm</span> <span class="token parameter variable">-i</span> <span class="token function">file</span>  //删除前确认，默认 y 表示确认，其它字符表示不确认。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="grep-命令" tabindex="-1"><a class="header-anchor" href="#grep-命令" aria-hidden="true">#</a> grep 命令</h2><blockquote><p>grep --help可以查看官方详细说明。主要用途是文本字符串搜索。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token string">&quot;fpu&quot;</span> cpuinfo.txt //在cpuinfo文件内搜索 fpu关键字。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token string">&quot;fpu*&quot;</span> cpuinfo.txt //在cpuinfo文件内搜索 fpu*通配符关键字。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;fpu&quot;</span> cpuinfo.txt //在cpuinfo搜索fpu关键字并显示关键所在行。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token parameter variable">-nr</span> <span class="token string">&quot;fpu&quot;</span> DIR //在dir搜索所有文件包含fpu 关键字并显示关键并所在行以及文件名称。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token parameter variable">-nwr</span> <span class="token string">&quot;fpu&quot;</span> DIR //在dir搜索所有文件包含fpu关键字以整词匹配方式，并显示并显示所在行以及文件名称。
<span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">grep</span> <span class="token parameter variable">-wrh</span> <span class="token string">&quot;fpu&quot;</span> DIR //在dir搜索所有文件包含fpu关键字以整词匹配方式，并显示并显示所在行不显示文件名称。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>扩展：也可以使用egrep 命令进行搜索。</li></ul><h2 id="more命令" tabindex="-1"><a class="header-anchor" href="#more命令" aria-hidden="true">#</a> more命令</h2><blockquote><p>以一页一页的形式在终端内显示文档内容。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ubuntu@book:~<span class="token punctuation">]</span>$ <span class="token function">more</span> file.txt   //查看file.txt内容，以页的方式查看。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>ctrl + F ：向下滚动一屏。</p></li><li><p>空格键 ：向下滚动一屏。</p></li><li><p>ctrl + B : 向上滚动一屏。</p></li><li><p>q : 退出。</p></li></ul>`,21),p=[o];function i(c,u){return a(),s("div",null,p)}const r=n(t,[["render",i],["__file","DocumentEditing.html.vue"]]);export{r as default};
