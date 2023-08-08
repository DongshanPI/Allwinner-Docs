import{_ as a,o as n,c as s,e}from"./app-5cc5893e.js";const i={},l=e(`<h1 id="_4-模式规则与伪目标" tabindex="-1"><a class="header-anchor" href="#_4-模式规则与伪目标" aria-hidden="true">#</a> 4.模式规则与伪目标</h1><h2 id="_4-1模式规则" tabindex="-1"><a class="header-anchor" href="#_4-1模式规则" aria-hidden="true">#</a> 4.1模式规则</h2><p>模式规则实在目标及依赖中使用%来匹配对应的文件，我们依旧使用上面的例子，采用模式规则格式，如下：</p><div class="language-makeflie line-numbers-mode" data-ext="makeflie"><pre class="language-makeflie"><code>CC = gcc
OBJ = main.o add.o sub.o
output: $(OBJ)
	$(CC) -o $@ $^
%.o: %.c
	$(CC) -c $&lt;

clean:
	rm $(OBJ) output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：第五行%.o: %.表示如下。 1.main.o 由 main.c 生成 2.add.o 由 add.c 生成 3.sub.o 由 sub.c 生成</p><h2 id="_4-2伪目标" tabindex="-1"><a class="header-anchor" href="#_4-2伪目标" aria-hidden="true">#</a> 4.2伪目标</h2><p>在前面的例子中，我们直接执行“make”命令，它的目的是去执行第 1 个规则，这跟执行“make output”的效果是一样的。在这里，“output”既是规则的目标，也是一个实际的文件。 而伪目标是什么呢？对于以前的例子，先执行 make 命令，然后再执行“make clean”命令，如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$make</span>
gcc <span class="token parameter variable">-c</span> main.c
gcc <span class="token parameter variable">-c</span> add.c
gcc <span class="token parameter variable">-c</span> sub.c
gcc <span class="token parameter variable">-o</span> output main.o add.o sub.o
<span class="token variable">$make</span> clean
<span class="token function">rm</span> *.o output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一切正常！接着我们做个手脚，在 Makefile 目录下创建一个 clean 的文件，然后依旧执行 make 和 make clean，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$touch</span> clean
<span class="token variable">$make</span>
gcc <span class="token parameter variable">-c</span> main.c
gcc <span class="token parameter variable">-c</span> add.c
gcc <span class="token parameter variable">-c</span> sub.c
gcc <span class="token parameter variable">-o</span> output main.o add.o sub.o
<span class="token variable">$make</span> clean
make: <span class="token string">&#39;clean&#39;</span> is up to date.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么“make clean”时命令没有被执行？因为已经有名为 clean 的文件了，并且它的依赖是空的，执行规则的条件没满足。 伪目标就是为了解决这个问题，我们在 clean 前面增加“.PHONY:clean”，如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>CC <span class="token operator">=</span> gcc
OBJ <span class="token operator">=</span> main.o add.o sub.o
<span class="token target symbol">output</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -o <span class="token variable">$@</span> <span class="token variable">$^</span>
<span class="token target symbol">%.o</span><span class="token punctuation">:</span> %.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -c <span class="token variable">$&lt;</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span>clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm <span class="token variable">$</span><span class="token punctuation">(</span>OBJ<span class="token punctuation">)</span> output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$make</span>
gcc <span class="token parameter variable">-c</span> main.c
gcc <span class="token parameter variable">-c</span> add.c
gcc <span class="token parameter variable">-c</span> sub.c
gcc <span class="token parameter variable">-o</span> output main.o add.o sub.o
<span class="token variable">$make</span> clean
<span class="token function">rm</span> *.o output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个目标被声明为伪目标后，make 在执行规则时就会默认它满足执行条件。 这样就提高了 make 的执行效率，也不用担心由于目标和文件名重名了。 伪目标的两大好处： 1.避免只执行命令的目标和工作目录下的实际文件出现名字冲突。 2.提高执行 Makefile 时的效率</p>`,15),c=[l];function t(d,r){return n(),s("div",null,c)}const o=a(i,[["render",t],["__file","04-Pattern_rules_pseudo-targets.html.vue"]]);export{o as default};
