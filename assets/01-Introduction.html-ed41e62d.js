import{_ as n,o as s,c as a,e}from"./app-5cc5893e.js";const i={},c=e(`<ul><li>问题反馈交流区 https://github.com/100askTeam/Stage1_D1s-Applications/discussions/</li></ul><h1 id="_1-makefile简述" tabindex="-1"><a class="header-anchor" href="#_1-makefile简述" aria-hidden="true">#</a> 1.Makefile简述</h1><h2 id="_1-1-为什么需要makefile" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么需要makefile" aria-hidden="true">#</a> 1.1 为什么需要Makefile</h2><p>现在一些项目工程中的源文件不计其数，其按类型、功能、模块分别放在若干个目录中，如果仍然在终端输入这些命令来编译，那显然不切实际，开发效率极低。 我们需要一个工具来管理这些编译过程，这就是“make”。make 是一个应用程序，它根据 Makefile 来做事。Makefile 负责管理整个编译流程：要编译哪些文件？怎么编译这些文件？怎么把它们链接成一个可执行程序。Makefile 定义了一系列的规则来实现这些管理。</p><h2 id="_1-2-makefie的引入" tabindex="-1"><a class="header-anchor" href="#_1-2-makefie的引入" aria-hidden="true">#</a> 1.2 makefie的引入</h2><p>Makefile 的引入是为了简化我们编译流程，提高我们的开发进度。下面我们用一个例子来说明 Makefile 如何简化我们的编译流程。我们创建一个工程内容分别 main.c，sub.c，sub.h，add.c，add.h 五个文件。sub.c 负责计算两个数减法运算，add.c 负责计算两个数加法运算，然后编译出可执行文件。其源文件内容如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>main<span class="token punctuation">.</span>c：

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;sub.h&quot;</span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;100 ask, add:%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;100 ask, sub:%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>add<span class="token punctuation">.</span>c：
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>
<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>add<span class="token punctuation">.</span>h：
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">__ADD_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">__ADD_H</span></span>
<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>sub<span class="token punctuation">.</span>c：
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;sub.h&quot;</span></span>
<span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>sub<span class="token punctuation">.</span>h：
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">__SUB_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">__SUB_H</span></span>
<span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 gcc 对上面工程进行编译及生成可执行程序，在终端输入如下命令，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc main.c sub.c add.c <span class="token parameter variable">-o</span> ouput
$ <span class="token function">ls</span>
add.c add.h main.c output sub.c sub.h
$ ./output
<span class="token number">100</span> ask, add:20
<span class="token number">100</span> ask, sub:10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的命令是通过 gcc 编译器对 main.c sub.c add.c 这三个文件进行编译，及生成可执行程序 output，并执行可执行文件产生结果。 从上面的例子看起来比较简单，一条命令完成三个源程序的编译并产生结果，这是因为目前只有三个源文件。</p><p>如果有上千个源文件，即使你只修改了其中一个文件，你执行这样的命令时，它会把所有的源文件都编译一次。这样消耗的时间是非常恐怖的。 我们想实现：哪个文件被修改了，只编译这个被修改的文件即可，其它没有修改的文件就不需要再次重新编译了。可以使用下列命令，先单独编译文件，再最后链接，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-c</span> main.c
$ gcc <span class="token parameter variable">-c</span> sub.c
$ gcc <span class="token parameter variable">-c</span> add.c
$ gcc main.o sub.o add.o <span class="token parameter variable">-o</span> output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将上面一条命令变成了四条，分别编译出源文件的目标文件，最后再将所有的目标文件链接成可执行文件。 当其中一个源文件的内容发生了变化，我们只需要单独编译它，然后跟其他文件重新链接成可知执行文件，不再需要重新编译其他文件。 假如我们修改了 add.c 文件，只需要重新编译生成 add.c 的目标文件，然后再将所有的.o 文件链接成可执行文件，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-c</span> add.c
$ gcc main.o sub.o add.o <span class="token parameter variable">-o</span> output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的方式虽然可以节省时间，但是仍然存在几个问题，如下：</p><ul><li><ol><li>如果源文件的数目很多，那么我们需要花费大量的时间，敲命令执行。</li></ol></li><li><ol start="2"><li>如果源文件的数目很多，然后修改了很多文件，后面发现忘记修改了什么。</li></ol></li><li><ol start="3"><li>如果头文件的内容修改，替换，更换目录，所有依赖于这个头文件的源文件全部需要重新编译。 这些问题我们不可能一个一个去找和排查，引入 Makefile 可以解决上述问题。我们先扔出一个 Makefile，如下：</li></ol></li></ul><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>Makefile：
<span class="token target symbol">output</span><span class="token punctuation">:</span> main.o add.o sub.o
	gcc -o output main.o add.o sub.o
<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main.c
	gcc -c main.c
<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.c
	gcc -c add.c
<span class="token target symbol">sub.o</span><span class="token punctuation">:</span> sub.c
	gcc -c sub.c
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm *.o output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Makefile 编写好后只需要执行 make 命令，就可以自动帮助我们编译工程。注意，make 命令必须要在 Makefile 的当前目录执行，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
add.c add.h main.c Makefile sub.c sub.h
$ <span class="token function">make</span>
gcc <span class="token parameter variable">-c</span> main.c
gcc <span class="token parameter variable">-c</span> add.c
gcc <span class="token parameter variable">-c</span> sub.c
gcc <span class="token parameter variable">-o</span> output main.o add.o sub.o
$ <span class="token function">ls</span>
add.c add.h add.o main.c main.o Makefile output sub.c sub.h sub.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 make 命令就可以生成相对应的目标文件.o 和可执行文件。 如果我们再次使用 make 命令编译，如下，它说你的程序已经是最新的了，不需要再做什么事情：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span>
make: <span class="token string">&#39;output&#39;</span> is up to date.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以修改一下 add.c，然后再执行 make，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span>
gcc <span class="token parameter variable">-c</span> add.c
gcc <span class="token parameter variable">-o</span> output main.o add.o sub.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会发现，它重新编译了 add.c，并且重新生成了可执行程序。 通过上述例子，Makefile 将我们上面的三个问题都解决了，无需手工输入复杂的命令，只编译修改过的文件。在一个很庞大的工程中，只有第一次编译时间比较长，第二次编译时会大大缩短时间，节省了我们的开发周期。 下面我们来学习 Makefile 的知识。</p>`,28),t=[c];function l(p,d){return s(),a("div",null,t)}const u=n(i,[["render",l],["__file","01-Introduction.html.vue"]]);export{u as default};
