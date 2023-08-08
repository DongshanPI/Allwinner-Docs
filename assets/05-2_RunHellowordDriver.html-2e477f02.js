import{_ as n,o as s,c as a,e}from"./app-5cc5893e.js";const t={},p=e(`<h1 id="编译运行helloword驱动" tabindex="-1"><a class="header-anchor" href="#编译运行helloword驱动" aria-hidden="true">#</a> 编译运行Helloword驱动</h1><h2 id="配置开发环境" tabindex="-1"><a class="header-anchor" href="#配置开发环境" aria-hidden="true">#</a> 配置开发环境</h2><p>首先我们需要获取 东山哪吒STU 开发板 配套的交叉编译工具链。因为最初的工具链是 阿里平头哥提供，他们的工具链 与 GNU社区标准的工具链存在一定的差异，所以我们暂时不能使用 社区版本。</p><p>由于目前工具链没有提供windows版本，所以只能在 Linux下进行，操作，请先参考上述章节 配置ubuntu 虚拟机章节，进行配置，并配置好。</p><h2 id="获取kernel源码工程" tabindex="-1"><a class="header-anchor" href="#获取kernel源码工程" aria-hidden="true">#</a> 获取kernel源码工程</h2><p>我们的源码都存放在不同的git仓库内，其中以github为主要托管，也是最新的状态，同时也会使用 gitee作为备用站点，根据大家的实际情况，来进行选择。</p><ul><li>对于可以访问github的同学 请使用如下命令获取源码</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/DongshanPI/eLinuxCore_dongshannezhastu
<span class="token builtin class-name">cd</span>  eLinuxCore_dongshannezhastu
<span class="token function">git</span> submodule update  <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对于无法访问GitHub的同学 请使用如下命令获取源码。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://gitee.com/weidongshan/eLinuxCore_dongshannezhastu.git
<span class="token builtin class-name">cd</span>  eLinuxCore_dongshannezhastu
<span class="token function">git</span> submodule update  <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置内核编译环境" tabindex="-1"><a class="header-anchor" href="#配置内核编译环境" aria-hidden="true">#</a> 配置内核编译环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/home/book/eLinuxCore_dongshannezhastu/toolchain/riscv64-glibc-gcc-thead_20200702/bin
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>riscv
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CROSS_COMPILE</span><span class="token operator">=</span>riscv64-unknown-linux-gnu-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~/eLinuxCore_dongshannezhastu/linux$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>riscv
book@100ask:~/eLinuxCore_dongshannezhastu/linux$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">CROSS_COMPILE</span><span class="token operator">=</span>riscv64-unknown-linux-gnu-
book@100ask:~/eLinuxCore_dongshannezhastu/linux$ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/home/book/eLinuxCore_dongshannezhastu/toolchain/riscv64-glibc-gcc-thead_20200702/bin
book@100ask:~/NezhaSTU/eLinuxCore_dongshannezhastu/linux$ <span class="token function">make</span> sun20iw1p1_d1_defconfig
  HOSTCC  scripts/basic/fixdep
  HOSTCC  scripts/kconfig/conf.o
  HOSTCC  scripts/kconfig/confdata.o
  HOSTCC  scripts/kconfig/expr.o
  LEX     scripts/kconfig/lexer.lex.c
  YACC    scripts/kconfig/parser.tab.<span class="token punctuation">[</span>ch<span class="token punctuation">]</span>
  HOSTCC  scripts/kconfig/lexer.lex.o
  HOSTCC  scripts/kconfig/parser.tab.o
  HOSTCC  scripts/kconfig/preprocess.o
  HOSTCC  scripts/kconfig/symbol.o
  HOSTLD  scripts/kconfig/conf
<span class="token comment">#</span>
<span class="token comment"># configuration written to .config</span>
<span class="token comment">#</span>
book@100ask:~/eLinuxCore_dongshannezhastu/linux$ <span class="token function">make</span> Image  <span class="token parameter variable">-j8</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写-helloword驱动" tabindex="-1"><a class="header-anchor" href="#编写-helloword驱动" aria-hidden="true">#</a> 编写 helloword驱动</h2><p>hello_drv.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/module.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/fs.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/errno.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/miscdevice.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/kernel.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/major.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/mutex.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/proc_fs.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/seq_file.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/stat.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/init.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/device.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/tty.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/kmod.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/gfp.h&gt;</span></span>

<span class="token comment">/* 1. 确定主设备号                                                                 */</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> major <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">char</span> kernel_buf<span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">class</span> <span class="token operator">*</span>hello_class<span class="token punctuation">;</span>


<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">MIN</span><span class="token expression"><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">(</span>a <span class="token operator">&lt;</span> b <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">)</span></span></span>

<span class="token comment">/* 3. 实现对应的open/read/write等函数，填入file_operations结构体                   */</span>
<span class="token keyword">static</span> <span class="token class-name">ssize_t</span> <span class="token function">hello_drv_read</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span>file<span class="token punctuation">,</span> <span class="token keyword">char</span> __user <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span>offset<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> err<span class="token punctuation">;</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	err <span class="token operator">=</span> <span class="token function">copy_to_user</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> kernel_buf<span class="token punctuation">,</span> <span class="token function">MIN</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">MIN</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">ssize_t</span> <span class="token function">hello_drv_write</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span>file<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> __user <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span>offset<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> err<span class="token punctuation">;</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	err <span class="token operator">=</span> <span class="token function">copy_from_user</span><span class="token punctuation">(</span>kernel_buf<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token function">MIN</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">MIN</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">hello_drv_open</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span>node<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span>file<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">hello_drv_close</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span>node<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span>file<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 2. 定义自己的file_operations结构体                                              */</span>
<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">file_operations</span> hello_drv <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span>owner	 <span class="token operator">=</span> THIS_MODULE<span class="token punctuation">,</span>
	<span class="token punctuation">.</span>open    <span class="token operator">=</span> hello_drv_open<span class="token punctuation">,</span>
	<span class="token punctuation">.</span>read    <span class="token operator">=</span> hello_drv_read<span class="token punctuation">,</span>
	<span class="token punctuation">.</span>write   <span class="token operator">=</span> hello_drv_write<span class="token punctuation">,</span>
	<span class="token punctuation">.</span>release <span class="token operator">=</span> hello_drv_close<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* 4. 把file_operations结构体告诉内核：注册驱动程序                                */</span>
<span class="token comment">/* 5. 谁来注册驱动程序啊？得有一个入口函数：安装驱动程序时，就会去调用这个入口函数 */</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> __init <span class="token function">hello_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> err<span class="token punctuation">;</span>
	
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	major <span class="token operator">=</span> <span class="token function">register_chrdev</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>hello_drv<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/* /dev/hello */</span>


	hello_class <span class="token operator">=</span> <span class="token function">class_create</span><span class="token punctuation">(</span>THIS_MODULE<span class="token punctuation">,</span> <span class="token string">&quot;hello_class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	err <span class="token operator">=</span> <span class="token function">PTR_ERR</span><span class="token punctuation">(</span>hello_class<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">IS_ERR</span><span class="token punctuation">(</span>hello_class<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">unregister_chrdev</span><span class="token punctuation">(</span>major<span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token function">device_create</span><span class="token punctuation">(</span>hello_class<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token function">MKDEV</span><span class="token punctuation">(</span>major<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* /dev/hello */</span>
	
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 6. 有入口函数就应该有出口函数：卸载驱动程序时，就会去调用这个出口函数           */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> __exit <span class="token function">hello_exit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s line %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token constant">__FILE__</span><span class="token punctuation">,</span> __FUNCTION__<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">device_destroy</span><span class="token punctuation">(</span>hello_class<span class="token punctuation">,</span> <span class="token function">MKDEV</span><span class="token punctuation">(</span>major<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">class_destroy</span><span class="token punctuation">(</span>hello_class<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">unregister_chrdev</span><span class="token punctuation">(</span>major<span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">/* 7. 其他完善：提供设备信息，自动创建设备节点                                     */</span>

<span class="token function">module_init</span><span class="token punctuation">(</span>hello_init<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">module_exit</span><span class="token punctuation">(</span>hello_exit<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">MODULE_LICENSE</span><span class="token punctuation">(</span><span class="token string">&quot;GPL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token comment">/*
 * ./hello_drv_test -w abc
 * ./hello_drv_test -r
 */</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> fd<span class="token punctuation">;</span>
	<span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> len<span class="token punctuation">;</span>
	
	<span class="token comment">/* 1. 判断参数 */</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> 
	<span class="token punctuation">{</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Usage: %s -w &lt;string&gt;\\n&quot;</span><span class="token punctuation">,</span> argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;       %s -r\\n&quot;</span><span class="token punctuation">,</span> argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* 2. 打开文件 */</span>
	fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&quot;/dev/hello&quot;</span><span class="token punctuation">,</span> O_RDWR<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>fd <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;can not open file /dev/hello\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* 3. 写文件或读文件 */</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">==</span> <span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;-w&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		len <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
		len <span class="token operator">=</span> len <span class="token operator">&lt;</span> <span class="token number">1024</span> <span class="token operator">?</span> len <span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">;</span>
		<span class="token function">write</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		len <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		
		buf<span class="token punctuation">[</span><span class="token number">1023</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">;</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;APP read : %s\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Makefile:</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>
<span class="token comment"># 1. 使用不同的开发板内核时, 一定要修改KERN_DIR</span>
<span class="token comment"># 2. KERN_DIR中的内核要事先配置、编译, 为了能编译内核, 要先设置下列环境变量:</span>
<span class="token comment"># 2.1 ARCH,          比如: export ARCH=arm64</span>
<span class="token comment"># 2.2 CROSS_COMPILE, 比如: export CROSS_COMPILE=aarch64-linux-gnu-</span>
<span class="token comment"># 2.3 PATH,          比如: export PATH=$PATH:/home/book/100ask_roc-rk3399-pc/ToolChain-6.3.1/gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu/bin </span>
<span class="token comment"># 注意: 不同的开发板不同的编译器上述3个环境变量不一定相同,</span>
<span class="token comment">#       请参考各开发板的高级用户使用手册</span>

KERN_DIR <span class="token operator">=</span> /home/book/eLinuxCore_dongshannezhastu/linux/

<span class="token target symbol">all</span><span class="token punctuation">:</span>
	make -C <span class="token variable">$</span><span class="token punctuation">(</span>KERN_DIR<span class="token punctuation">)</span> M<span class="token operator">=</span>\`pwd\` modules 
	<span class="token variable">$</span><span class="token punctuation">(</span>CROSS_COMPILE<span class="token punctuation">)</span>gcc -o hello_drv_test hello_drv_test.c 

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	make -C <span class="token variable">$</span><span class="token punctuation">(</span>KERN_DIR<span class="token punctuation">)</span> M<span class="token operator">=</span>\`pwd\` modules clean
	rm -rf modules.order
	rm -f hello_drv_test

obj-m	<span class="token operator">+=</span> hello_drv.o

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~$ <span class="token function">make</span>
<span class="token function">make</span> <span class="token parameter variable">-C</span> /home/book/NezhaSTU/eLinuxCore_dongshannezhastu/linux/ <span class="token assign-left variable">M</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span> modules
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Entering directory <span class="token string">&#39;/home/book/NezhaSTU/eLinuxCore_dongshannezhastu/linux&#39;</span>
  CC <span class="token punctuation">[</span>M<span class="token punctuation">]</span>  /home/book/NezhaSTU/hello_drv.o
  Building modules, stage <span class="token number">2</span>.
  MODPOST <span class="token number">1</span> modules
  CC <span class="token punctuation">[</span>M<span class="token punctuation">]</span>  /home/book/NezhaSTU/hello_drv.mod.o
  LD <span class="token punctuation">[</span>M<span class="token punctuation">]</span>  /home/book/NezhaSTU/hello_drv.ko
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Leaving directory <span class="token string">&#39;/home/book/NezhaSTU/eLinuxCore_dongshannezhastu/linux&#39;</span>
riscv64-unknown-linux-gnu-gcc <span class="token parameter variable">-o</span> hello_drv_test hello_drv_test.c
book@100ask:~$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拷贝到开发板" tabindex="-1"><a class="header-anchor" href="#拷贝到开发板" aria-hidden="true">#</a> 拷贝到开发板</h2><p>怎么拷贝文件到开发板上？ 有U盘 ADB 网络 串口等等。</p><p>那么我们优先推进使用 网络方式，网络也有很多，有TFTP传输，有nfs传输，有SFTP传输，其中nfs传输需要内核支持 nfs文件系统，SFTP需要根文件系统支持 openssh组件服务，那么最终我们还是选用tftp服务。</p><h3 id="使用tftp网络服务" tabindex="-1"><a class="header-anchor" href="#使用tftp网络服务" aria-hidden="true">#</a> 使用tftp网络服务</h3><ol><li>首先，需要你的ubuntu系统支持 tftp服务，已经配置并且安装好，然后讲编译出来的 helloword程序 拷贝到 tftp目录下。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>book@100ask:~$ <span class="token function">cp</span> hello_drv_test hello_drv.ko ~/tftpboot/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>进入到开发板内，首先让开发板可以获取到IP地址，并且可以和 ubuntu系统ping通(这里指的是编译helloword主机)，之后我们在开发板上 获取 helloword 应用程序，并执行。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># udhcpc</span>
udhcpc: started, v1.35.0
<span class="token punctuation">[</span>  <span class="token number">974.154486</span><span class="token punctuation">]</span> libphy: <span class="token number">4500000</span>.eth: probed
<span class="token punctuation">[</span>  <span class="token number">974.159083</span><span class="token punctuation">]</span> sunxi-gmac <span class="token number">4500000</span>.eth eth0: eth0: Type<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> PHY ID 001cc916 at <span class="token number">0</span> IRQ poll <span class="token punctuation">(</span><span class="token number">4500000</span>.eth-0:00<span class="token punctuation">)</span>
udhcpc: broadcasting discover
udhcpc: broadcasting discover
<span class="token punctuation">[</span>  <span class="token number">979.331180</span><span class="token punctuation">]</span> sunxi-gmac <span class="token number">4500000</span>.eth eth0: Link is Up - 1Gbps/Full - flow control off
<span class="token punctuation">[</span>  <span class="token number">979.340154</span><span class="token punctuation">]</span> IPv6: ADDRCONF<span class="token punctuation">(</span>NETDEV_CHANGE<span class="token punctuation">)</span>: eth0: <span class="token function">link</span> becomes ready
udhcpc: broadcasting discover
udhcpc: broadcasting <span class="token keyword">select</span> <span class="token keyword">for</span> <span class="token number">192.168</span>.1.47, server <span class="token number">192.168</span>.1.1
udhcpc: lease of <span class="token number">192.168</span>.1.47 obtained from <span class="token number">192.168</span>.1.1, lease <span class="token function">time</span> <span class="token number">86400</span>
deleting routers
adding dns <span class="token number">192.168</span>.1.1
<span class="token comment"># [  992.315224] random: crng init done</span>
<span class="token punctuation">[</span>  <span class="token number">992.319022</span><span class="token punctuation">]</span> random: <span class="token number">2</span> urandom warning<span class="token punctuation">(</span>s<span class="token punctuation">)</span> missed due to ratelimiting

<span class="token comment"># tftp -g -r hello_drv.ko 192.168.1.133</span>
<span class="token comment"># tftp -g -r hello_drv_test  192.168.1.133</span>
<span class="token comment"># ls</span>
hello_drv.ko    hello_drv_test  helloword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我的ubuntu主机IP地址是 192.168.1.133 ，所以使用tftp 从 ubuntu获取helloword 程序，获取速度根据网速而定。</p><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># insmod hello_drv.ko</span>
<span class="token punctuation">[</span> <span class="token number">1007.072991</span><span class="token punctuation">]</span> hello_drv: loading out-of-tree module taints kernel.
<span class="token punctuation">[</span> <span class="token number">1007.081285</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_init line <span class="token number">70</span>
<span class="token comment"># chmod +x hello_drv_test</span>
<span class="token comment"># ls /dev/h</span>
hdmi   hello
<span class="token comment"># ls /dev/hello</span>
/dev/hello
<span class="token comment"># ./hello_drv</span>
hello_drv.ko    hello_drv_test
<span class="token comment"># ./hello_drv_test  -w abc</span>
<span class="token punctuation">[</span> <span class="token number">1060.000621</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_open line <span class="token number">45</span>
<span class="token punctuation">[</span> <span class="token number">1060.007613</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_write line <span class="token number">38</span>
<span class="token punctuation">[</span> <span class="token number">1060.015194</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_close line <span class="token number">51</span>
<span class="token comment"># ./hello_drv_test  -r</span>
<span class="token punctuation">[</span> <span class="token number">1062.312864</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_open line <span class="token number">45</span>
<span class="token punctuation">[</span> <span class="token number">1062.319853</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_read line <span class="token number">30</span>
APP <span class="token builtin class-name">read</span> <span class="token builtin class-name">:</span> abc<span class="token punctuation">[</span> <span class="token number">1062.327680</span><span class="token punctuation">]</span> /home/book/NezhaSTU/hello_drv.c hello_drv_close line <span class="token number">51</span>

<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","05-2_RunHellowordDriver.html.vue"]]);export{r as default};
