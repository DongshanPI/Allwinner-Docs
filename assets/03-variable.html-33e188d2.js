import{_ as a,o as n,c as s,e}from"./app-5cc5893e.js";const i={},l=e(`<h1 id="_3-变量" tabindex="-1"><a class="header-anchor" href="#_3-变量" aria-hidden="true">#</a> 3.变量</h1><h2 id="_3-1-变量的定义及取值" tabindex="-1"><a class="header-anchor" href="#_3-1-变量的定义及取值" aria-hidden="true">#</a> 3.1 变量的定义及取值</h2><p>Makefile 也支持变量定义，变量的定义也让的我们的 Makefile 更加简化，可复用。 变量的定义：一般采用大写字母，赋值方式像 C 语言的赋值方式一样，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DIR <span class="token operator">=</span> ./100ask/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量取值：使用括号将变量括起来再加美元符，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>FOO <span class="token operator">=</span> <span class="token variable"><span class="token variable">$(</span>DIR<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量可让 Makefile 简化可复用，上面个的 Makefile 文件，内容如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">output</span><span class="token punctuation">:</span> main.o add.o sub.o
	gcc -o output main.o add.o sub.o
<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main.c
	gcc -c main.c
<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.c
	gcc -c add.c
<span class="token target symbol">sub.o</span><span class="token punctuation">:</span> sub.c
	gcc -c sub.c
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm *.o output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以将其优化，如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment">#Makefile 变量定义</span>
OBJ <span class="token operator">=</span> main.o add.o sub.o
<span class="token target symbol">output</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span>
	gcc -o output <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span>
<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main.c
	gcc -c main.c
<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.c
	gcc -c add.c
<span class="token target symbol">sub.o</span><span class="token punctuation">:</span> sub.c
	gcc -c sub.c
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span> output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们分析一下上面简化过的 Makefile，第一行是注释，Makefile 的注释采用‘#’，而且不支持像 C 语言中的多行注释。第二行我们定义了变量 OBJ，并赋值字符串”main.o，add.o，sub.o“。其中第三，四，十三行，使用这个变量。这样用到用一个字符串的地方直接调用这个变量，无需重复写一大段字符串。 Makefile 除了使用‘=’进行赋值，还有其他赋值方式，比如‘:=’和‘?=’，接下来我们来对比一下这几种的区别：</p><p>赋值符‘=’ 我们使用一个例子来说明赋值符‘=’的用法。Makefile 内容如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>PARA <span class="token operator">=</span> 100
CURPARA <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>PARA<span class="token punctuation">)</span>
PARA <span class="token operator">=</span> ask

<span class="token target symbol">print</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>CURPARA<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析代码：第一行定义变量 PARA，并赋值为“100”，第二行定义变量 CURPARA，并赋值引用变量 PARA，此时 CURPARA 的值和 PARA 的值是一样的，第三行，将变量 PARA 的变量修改为“ask”。第六行输出 CURPARA 的值，echo 前面增加@符号，代表只显示命令的结果，不显示命令本身。 通过命令“make print”执行 Makefile，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> print
ask
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果上看，变量 CURPARA 的值并不是“100”，而是 PARA 的最后一次赋值。使用赋值符“=”设置的变量，它的值在运行时才能确定，这称为“延时变量”。 其实可以理解为在 C 语言中，定义一个指针变量指向一个变量的地址。如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token number">01</span> <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token number">02</span> <span class="token keyword">int</span> <span class="token operator">*</span>b <span class="token operator">=</span> <span class="token operator">&amp;</span>a<span class="token punctuation">;</span>
<span class="token number">03</span> a<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码分析：我们见上面的 Makefile 的第二行的“=”替换成“:=”，重新编译，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> print
<span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果上看，变量 CURPARA 的值为“100”。使用“:=”设置的变量被称为“即时变量”，在赋值时就确定了它的值。</p><p>赋值符‘?=’</p><p>我们用两个 Makefile 来说明赋值符“?=”的用法。如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>第一个 Makefile：
PARA <span class="token operator">=</span> 100
PARA <span class="token operator">?=</span> ask
<span class="token target symbol">print</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>PARA<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> print
<span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">第二个 Makefile</span><span class="token punctuation">:</span>
PARA <span class="token operator">?=</span> ask
<span class="token target symbol">print</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>PARA<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> print
ask
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子说明，使用“?=”给变量设置值时，如果这个变量之前没有被设置过，那么“?=”才会起效果；如果曾经设置过这个变量，那么“?=”不会起效果。赋值符‘+=’ Makefile 中的变量是字符串，有时候我们需要给前面已经定义好的变量添加一些字符串进去,此时就要使用到符号“+=”，比如如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>OBJ <span class="token operator">=</span> main.o add.o
OBJ <span class="token operator">+=</span> sub.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的结果是 OBJ 的值为：”main.o，add.o，sub.o“。说明“+=”用作与变量的追加。</p><h2 id="_3-2-系统自带变量" tabindex="-1"><a class="header-anchor" href="#_3-2-系统自带变量" aria-hidden="true">#</a> 3.2 系统自带变量</h2><p>系统自定义了一些变量，通常都是大写，比如 CC，PWD，CLFAG 等等，有些有默认值，有些没有，比如以下几种，如下：</p><ul><li>CPPFLAGS：预处理器需要的选项，如：-l</li><li>CFLAGS：编译的时候使用的参数，-Wall -g -c</li><li>LDFLAGS：链接库使用的选项，-L -l 其中：默认值可以被修改，比如 CC 默认值是 cc，但可以修改为 gcc：CC=gcc使用的例子，如下：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OBJ = main.o add.o sub.o
output: $(OBJ)
	gcc -o output $(OBJ)
main.o: main.c
	gcc -c main.c
add.o: add.c
	gcc -c add.c
sub.o: sub.c
	gcc -c sub.c

clean:
	rm $(OBJ) output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用系统自带变量，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CC = gcc
OBJ = main.o add.o sub.o
output: $(OBJ)
	$(CC) -o output $(OBJ)
main.o: main.c
	$(CC) -c main.c
add.o: add.c
	$(CC) -c add.c
sub.o: sub.c
	$(CC) -c sub.c

clean:
	rm $(OBJ) output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面例子中，系统变量 CC 不改变默认值，也同样可以编译，修改的目的是为了明确使用 gcc 编译。</p><h2 id="_3-3-自动变量" tabindex="-1"><a class="header-anchor" href="#_3-3-自动变量" aria-hidden="true">#</a> 3.3 自动变量</h2><p>Makefile 的语法提供一些自动变量，这些变量可以让我们更加快速地完成Makefile 的编写，其中自动变量只能在规则中的命令使用，常用的自动变量如 下：</p><ul><li>$@：规则中的目标</li><li>$&lt;：规则中的第一个依赖文件</li><li>$^：规则中的所有依赖文件 我们上面的例子继续完善，修改为采用自动变量的格式，如下:</li></ul><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>CC <span class="token operator">=</span> gcc
OBJ <span class="token operator">=</span> main.o add.o sub.o
<span class="token target symbol">output</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -o <span class="token variable">$@</span> <span class="token variable">$^</span>
<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span>
<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span>
<span class="token target symbol">sub.o</span><span class="token punctuation">:</span> sub.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span> output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：第 4 行$^表示变量 OBJ 的值，即 main.o add.o sub.o，第四，第六，第八行的$&lt;分别表示 main.c add.c sub.c。$@表示 output。</p>`,43),c=[l];function t(d,p){return n(),s("div",null,c)}const u=a(i,[["render",t],["__file","03-variable.html.vue"]]);export{u as default};
