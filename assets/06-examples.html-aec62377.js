import{_ as n,o as s,c as a,e}from"./app-5cc5893e.js";const i={},l=e(`<h1 id="_6-makefile实例" tabindex="-1"><a class="header-anchor" href="#_6-makefile实例" aria-hidden="true">#</a> 6.Makefile实例</h1><p>在上面的例子中，我们都是把头文件，源文件放在同一个文件里面，这样不好用于维护，所以我们将其分类，把它变得更加规范一下，把所有的头文件放在文件夹：inc，把所有的源文件放在文件夹：src。 代码目录如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tree
<span class="token builtin class-name">.</span>
├── inc
│ ├── add.h
│ └── sub.h
├── Makefile
└── src
	├── add.c
	├── main.c
	└── sub.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 Makefile 的内容如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>SOURCE <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">wildcard</span> ./src/*.c<span class="token punctuation">)</span>
OBJECT <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">patsubst</span> %.c, %.o, <span class="token variable">$</span><span class="token punctuation">(</span>SOURCE<span class="token punctuation">)</span><span class="token punctuation">)</span>
INCLUEDS <span class="token operator">=</span> -I ./inc

TARGET <span class="token operator">=</span> 100ask
CC <span class="token operator">=</span> gcc
CFLAGS <span class="token operator">=</span> -Wall -g
<span class="token target symbol"><span class="token variable">$</span>(TARGET)</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJECT<span class="token punctuation">)</span>
	<span class="token operator">@</span>mkdir -p output/
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGES<span class="token punctuation">)</span> -o output/<span class="token variable">$</span><span class="token punctuation">(</span>TARGET<span class="token punctuation">)</span>

<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>INCLUEDS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGES<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span> -o <span class="token variable">$@</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span>clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>rm -rf <span class="token variable">$</span><span class="token punctuation">(</span>OBJECT<span class="token punctuation">)</span> output/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：</p><ul><li>行 1：获取当前目录下 src 所有.c 文件，并赋值给变量 SOURCE。</li><li>行 2：将./src 目录下的.c 结尾的文件，替换成.o 文件，并赋值给变量OBJECT。</li><li>行 4：通过-I 选项指明头文件的目录，并赋值给变量 INCLUDES。</li><li>行 6：最终目标文件的名字 100ask，赋值给 TARGET。</li><li>行 7：替换 CC 的默认之 cc，改为 gcc。</li><li>行 8：将显示所有的警告信息选项和 gdb 调试选项赋值给变量 CFLAGS。</li><li>行 11：创建目录 output，并且不再终端现实该条命令。</li><li>行 12：编译生成可执行程序 100ask，并将可执行程序生成到 output 目录</li><li>行 15：将源文件生成对应的目标文件。</li><li>行 17：伪目标，避免当前目录有同名的 clean 文件。</li><li>行 19：用与执行命令 make clean 时执行的命令，删除编译过程生成的文件。 最后编译的结果，如下:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span>
gcc <span class="token parameter variable">-I</span> ./inc <span class="token parameter variable">-c</span> src/main.c <span class="token parameter variable">-o</span> src/main.o
gcc <span class="token parameter variable">-I</span> ./inc <span class="token parameter variable">-c</span> src/add.c <span class="token parameter variable">-o</span> src/add.o
gcc <span class="token parameter variable">-I</span> ./inc <span class="token parameter variable">-c</span> src/sub.c <span class="token parameter variable">-o</span> src/sub.o
gcc src/main.o src/add.o src/sub.o <span class="token parameter variable">-o</span> output/100ask
<span class="token variable">$tree</span>
<span class="token builtin class-name">.</span>
├── inc
│ ├── add.h
│ └── sub.h
├── Makefile
├── output
│ └── 100ask
└── src
	├── add.c
	├── add.o
	├── main.c
	├── main.o
	├── sub.c
	└── sub.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 Makefile 文件算是比较完善了，不过项目开发中，代码需要不断的迭代，那么必须要有东西来记录它的变化，所以还需要对最终的可执行文件添加版本号，如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>VERSION <span class="token operator">=</span> 1.0.0
SOURCE <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">wildcard</span> ./src/*.c<span class="token punctuation">)</span>
OBJECT <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">patsubst</span> %.c, %.o, <span class="token variable">$</span><span class="token punctuation">(</span>SOURCE<span class="token punctuation">)</span><span class="token punctuation">)</span>

INCLUEDS <span class="token operator">=</span> -I ./inc

TARGET <span class="token operator">=</span> 100ask
CC <span class="token operator">=</span> gcc
CFLAGS <span class="token operator">=</span> -Wall -g

<span class="token target symbol"><span class="token variable">$</span>(TARGET)</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJECT<span class="token punctuation">)</span>
	<span class="token operator">@</span>mkdir -p output/
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGES<span class="token punctuation">)</span> -o output/<span class="token variable">$</span><span class="token punctuation">(</span>TARGET<span class="token punctuation">)</span>_<span class="token variable">$</span><span class="token punctuation">(</span>VERSION<span class="token punctuation">)</span>

<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>INCLUEDS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGES<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span> -o <span class="token variable">$@</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span>clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>rm -rf <span class="token variable">$</span><span class="token punctuation">(</span>OBJECT<span class="token punctuation">)</span> output/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>行 1：将版本号赋值给变量 VERSION。</li><li>行 13：生成可执行文件的后缀添加版本号。</li></ul><p>编译结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ tree
.
├── inc
│ 	├── add.h
│ 	└── sub.h
├── Makefile
├── output
│ 	└── 100ask_1.0.0
└── src
	├── add.c
		├── add.o
	├── main.c
	├── main.o
	├── sub.c
	└── sub.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),t=[l];function c(p,o){return s(),a("div",null,t)}const r=n(i,[["render",c],["__file","06-examples.html.vue"]]);export{r as default};
