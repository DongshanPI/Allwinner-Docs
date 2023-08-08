import{_ as n,o as i,c as e,e as s}from"./app-5cc5893e.js";const d={},l=s(`<h2 id="_5-使用示例" tabindex="-1"><a class="header-anchor" href="#_5-使用示例" aria-hidden="true">#</a> 5 使用示例</h2><h3 id="_5-1-使用-pin-的驱动-dts-配置示例" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-pin-的驱动-dts-配置示例" aria-hidden="true">#</a> 5.1 使用 pin 的驱动 dts 配置示例</h3><p>对于使用 pin 的驱动来说，驱动主要设置 pin 的常用的几种功能，列举如下：</p><p><em>•</em> 驱动使用者只配置通用 GPIO, 即用来做输入、输出和中断的</p><p><em>•</em> 驱动使用者设置 pin 的 pin mux，如 uart 设备的 pin,lcd 设备的 pin 等，用于特殊功能</p><p><em>•</em> 驱动使用者既要配置 pin 的通用功能，也要配置 pin 的特性</p><p>下面对常见使用场景进行分别介绍。</p><h4 id="_5-1-1-配置通用-gpio-功能-中断功能" tabindex="-1"><a class="header-anchor" href="#_5-1-1-配置通用-gpio-功能-中断功能" aria-hidden="true">#</a> 5.1.1 配置通用 GPIO 功能/中断功能</h4><p>用法一：配置 GPIO，中断，device tree 配置 demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>soc{
    ...
    gpiokey {
        device_type = &quot;gpiokey&quot;; 
        compatible = &quot;gpio-keys&quot;;
        
        ok_key {
            device_type = &quot;ok_key&quot;;
            label = &quot;ok_key&quot;;
            gpios = &lt;&amp;r_pio PL 0x4 0x0 0x1 0x0 0x1&gt;; //如果是linux-5.4，则应该为gpios = &lt;&amp;r_pio 0 4 GPIO_ACTIVE_HIGH&gt;;
            linux,input-type = &quot;1&gt;&quot;;
            linux,code = &lt;0x1c&gt;;
            wakeup-source = &lt;0x1&gt;;
            };
        };
    ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>说明：gpio in/gpio out/ interrupt采用dts的配置方法，配置参数解释如下：
对于linux-4.9:
gpios = &lt;&amp;r_pio PL 0x4 0x0 0x1 0x0 0x1&gt;;
            |    |  |   |   |   |   \`---输出电平，只有output才有效
            |    |  |   |   |   \`-------驱动能力，值为0x0时采用默认值
            |    |  |   |   \`-----------上下拉，值为0x1时采用默认值
            |    |  |   \`---------------复用类型
            |    |  \`-------------------当前bank中哪个引脚
            |    \`-----------------------哪个bank
            \`---------------------------指向哪个pio，属于cpus要用&amp;r_pio
使用上述方式配置gpio时，需要驱动调用以下接口解析dts的配置参数：
int of_get_named_gpio_flags(struct device_node *np, const char *list_name, int index,
enum of_gpio_flags *flags)
拿到gpio的配置信息后(保存在flags参数中，见4.2.8.小节)，在根据需要调用相应的标准接口实现自己的功能
对于linux-5.4:
gpios = &lt;&amp;r_pio 0 4 GPIO_ACTIVE_HIGH&gt;;
            |   |      |
            |   |      \`-------------------gpio active时状态，如果需要上下拉，还可以或上
            GPIO_PULL_UP、GPIO_PULL_DOWN标志
            |   \`-----------------------哪个bank
            \`---------------------------指向哪个pio，属于cpus要用&amp;r_pio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-2-用法二" tabindex="-1"><a class="header-anchor" href="#_5-1-2-用法二" aria-hidden="true">#</a> 5.1.2 用法二</h4><p>用法二：配置设备引脚，device tree 配置 demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>device tree对应配置
soc{
    pio: pinctrl@0300b000 {
        ...
        uart0_ph_pins_a: uart0-ph-pins-a {
            allwinner,pins = &quot;PH7&quot;, &quot;PH8&quot;; 
            allwinner,function = &quot;uart0&quot;; 
            allwinner,muxsel = &lt;3&gt;;
            allwinner,drive = &lt;0x1&gt;;
            allwinner,pull = &lt;0x1&gt;;
        };
        /* 对于linux-5.4 请使用下面这种方式配置 */
        mmc2_ds_pin: mmc2-ds-pin {
            pins = &quot;PC1&quot;;
            function = &quot;mmc2&quot;;
            drive-strength = &lt;30&gt;;
            bias-pull-up;
        };
        ...
    }；
    ...
    uart0: uart@05000000 {
        compatible = &quot;allwinner,sun8i-uart&quot;;
        device_type = &quot;uart0&quot;;
        reg = &lt;0x0 0x05000000 0x0 0x400&gt;;
        interrupts = &lt;GIC_SPI 49 IRQ_TYPE_LEVEL_HIGH&gt;;
        clocks = &lt;&amp;clk_uart0&gt;;
        pinctrl-names = &quot;default&quot;, &quot;sleep&quot;;
        pinctrl-0 = &lt;&amp;uart0_pins_a&gt;;
        pinctrl-1 = &lt;&amp;uart0_pins_b&gt;;
        uart0_regulator = &quot;vcc-io&quot;;
        uart0_port = &lt;0&gt;;
        uart0_type = &lt;2&gt;;
    };
    ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><p><em>•</em> pinctrl-0 对应 pinctrl-names 中的 default，即模块正常工作模式下对应的 pin 配置</p><p><em>•</em> pinctrl-1 对应 pinctrl-names 中的 sleep，即模块休眠模式下对应的 pin 配置</p><h3 id="_5-2-接口使用示例" tabindex="-1"><a class="header-anchor" href="#_5-2-接口使用示例" aria-hidden="true">#</a> 5.2 接口使用示例</h3><h4 id="_5-2-1-配置设备引脚" tabindex="-1"><a class="header-anchor" href="#_5-2-1-配置设备引脚" aria-hidden="true">#</a> 5.2.1 配置设备引脚</h4><p>一般设备驱动只需要使用一个接口 devm_pinctrl_get_select_default 就可以申请到设备所有pin 资源。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">sunxi_pin_req_demo</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">platform_device</span> <span class="token operator">*</span>pdev<span class="token punctuation">)</span>
<span class="token punctuation">{</span> 
	<span class="token keyword">struct</span> <span class="token class-name">pinctrl</span> <span class="token operator">*</span>pinctrl<span class="token punctuation">;</span>
	<span class="token comment">/* request device pinctrl, set as default state */</span>
	pinctrl <span class="token operator">=</span> <span class="token function">devm_pinctrl_get_select_default</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pdev<span class="token operator">-&gt;</span>dev<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">IS_ERR_OR_NULL</span><span class="token punctuation">(</span>pinctrl<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token operator">-</span>EINVAL<span class="token punctuation">;</span>

	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-2-获取-gpio-号" tabindex="-1"><a class="header-anchor" href="#_5-2-2-获取-gpio-号" aria-hidden="true">#</a> 5.2.2 获取 GPIO 号</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_pin_req_demo(struct platform_device *pdev)
{
    struct device *dev = &amp;pdev-&gt;dev;
    struct device_node *np = dev-&gt;of_node;
    unsigned int gpio;
    
    #get gpio config in device node.
    gpio = of_get_named_gpio(np, &quot;vdevice_3&quot;, 0);
    if (!gpio_is_valid(gpio)) {
    	if (gpio != -EPROBE_DEFER)
    		dev_err(dev, &quot;Error getting vdevice_3\\n&quot;);
		return gpio;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-3-gpio-属性配置" tabindex="-1"><a class="header-anchor" href="#_5-2-3-gpio-属性配置" aria-hidden="true">#</a> 5.2.3 GPIO 属性配置</h4><p>通过 pin_config_set/pin_config_get/pin_config_group_set/pin_config_group_get 接口单独控制指定 pin 或 group 的相关属性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int pctrltest_request_all_resource(void)
{
    struct device *dev;
    struct device_node *node;
    struct pinctrl *pinctrl;
    struct sunxi_gpio_config *gpio_list = NULL;
    struct sunxi_gpio_config *gpio_cfg;
    unsigned gpio_count = 0;
    unsigned gpio_index;
    unsigned long config;
    int ret;

    dev = bus_find_device_by_name(&amp;platform_bus_type, NULL, sunxi_ptest_data-&gt;dev_name);
    if (!dev) {
        pr_warn(&quot;find device [%s] failed...\\n&quot;, sunxi_ptest_data-&gt;dev_name);
        return -EINVAL;
    }

    node = of_find_node_by_type(NULL, dev_name(dev));
    if (!node) {
        pr_warn(&quot;find node for device [%s] failed...\\n&quot;, dev_name(dev));
        return -EINVAL;
    }
    dev-&gt;of_node = node;

    pr_warn(&quot;++++++++++++++++++++++++++++%s++++++++++++++++++++++++++++\\n&quot;, __func__);
    pr_warn(&quot;device[%s] all pin resource we want to request\\n&quot;, dev_name(dev));
    pr_warn(&quot;-----------------------------------------------\\n&quot;);

    pr_warn(&quot;step1: request pin all resource.\\n&quot;);
    pinctrl = devm_pinctrl_get_select_default(dev);
    if (IS_ERR_OR_NULL(pinctrl)) {
        pr_warn(&quot;request pinctrl handle for device [%s] failed...\\n&quot;, dev_name(dev));
        return -EINVAL;
    }

    pr_warn(&quot;step2: get device[%s] pin count.\\n&quot;, dev_name(dev));
    ret = dt_get_gpio_list(node, &amp;gpio_list, &amp;gpio_count);
    if (ret &lt; 0 || gpio_count == 0) {
        pr_warn(&quot; devices own 0 pin resource or look for main key failed!\\n&quot;);
        return -EINVAL;
    }

    pr_warn(&quot;step3: get device[%s] pin configure and check.\\n&quot;, dev_name(dev));
    for (gpio_index = 0; gpio_index &lt; gpio_count; gpio_index++) {
        gpio_cfg = &amp;gpio_list[gpio_index];

        /*check function config */
        config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_FUNC, 0xFFFF);
        pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
        if (gpio_cfg-&gt;mulsel != SUNXI_PINCFG_UNPACK_VALUE(config)) {
            pr_warn(&quot;failed! mul value isn&#39;t equal as dt.\\n&quot;);
            return -EINVAL;
        }

        /*check pull config */
        if (gpio_cfg-&gt;pull != GPIO_PULL_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_PUD, 0xFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;pull != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! pull value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }

        /*check dlevel config */
        if (gpio_cfg-&gt;drive != GPIO_DRVLVL_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_DRV, 0XFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;drive != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! dlevel value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }

        /*check data config */
        if (gpio_cfg-&gt;data != GPIO_DATA_DEFAULT) {
            config = SUNXI_PINCFG_PACK(SUNXI_PINCFG_TYPE_DAT, 0XFFFF);
            pin_config_get(SUNXI_PINCTRL, gpio_cfg-&gt;name, &amp;config);
            if (gpio_cfg-&gt;data != SUNXI_PINCFG_UNPACK_VALUE(config)) {
                pr_warn(&quot;failed! pin data value isn&#39;t equal as dt.\\n&quot;);
                return -EINVAL;
            }
        }
    }

    pr_warn(&quot;-----------------------------------------------\\n&quot;);
    pr_warn(&quot;test pinctrl request all resource success!\\n&quot;);
    pr_warn(&quot;++++++++++++++++++++++++++++end++++++++++++++++++++++++++++\\n\\n&quot;);
    return 0;
}
注：需要注意，存在SUNXI_PINCTRL和SUNXI_R_PINCTRL两个pinctrl设备，cpus域的pin需要使用
SUNXI_R_PINCTRL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>!</strong> 警告</p><p><strong>linux5.4</strong> 中 使 用 <strong>pinctrl_gpio_set_config</strong> 配 置 <strong>gpio</strong> 属 性， 对 应 使 用<strong>pinconf_to_config_pack</strong> 生成 <strong>config</strong> 参数：</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_FUNC</strong> 已不再生效，暂未支持 <strong>FUNC</strong> 配置（建议使用 <strong>pinctrl_select_state</strong>接口代替）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_PUD</strong> 更新为内核标准定义（<strong>PIN_CONFIG_BIAS_PULL_UP/PIN_CONFIG_BIAS_PULL_DOWN</strong>）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_DRV</strong> 更新为内核标准定义（<strong>PIN_CONFIG_DRIVE_STRENGTH</strong>），相应的 <strong>val</strong> 对应关系为（<strong>4.9-&gt;5.4: 0-&gt;10, 1-&gt;20…</strong>）</p><p><em>•</em> <strong>SUNXI_PINCFG_TYPE_DAT</strong> 已不再生效，暂未支持 <strong>DAT</strong> 配置（建议使用 <strong>gpio_direction_output</strong>或者 <strong>__gpio_set_value</strong> 设置电平值）</p><h3 id="_5-3-设备驱动使用-gpio-中断功能" tabindex="-1"><a class="header-anchor" href="#_5-3-设备驱动使用-gpio-中断功能" aria-hidden="true">#</a> 5.3 设备驱动使用 GPIO 中断功能</h3><p>方式一：通过 gpio_to_irq 获取虚拟中断号，然后调用申请中断函数即可目前 sunxi-pinctrl 使用 irq-domain 为 gpio 中断实现虚拟 irq 的功能，使用 gpio 中断功能时，设备驱动只需要通过 gpio_to_irq 获取虚拟中断号后，其他均可以按标准 irq 接口操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_gpio_eint_demo(struct platform_device *pdev)
{ 
    struct device *dev = &amp;pdev-&gt;dev;
    int virq;
    int ret;
    /* map the virq of gpio */
    virq = gpio_to_irq(GPIOA(0));
    if (IS_ERR_VALUE(virq)) {
	    pr_warn(&quot;map gpio [%d] to virq failed, errno = %d\\n&quot;,
    											GPIOA(0), virq);
        return -EINVAL;
    }
    pr_debug(&quot;gpio [%d] map to virq [%d] ok\\n&quot;, GPIOA(0), virq);
    /* request virq, set virq type to high level trigger */
    ret = devm_request_irq(dev, virq, sunxi_gpio_irq_test_handler,
                                IRQF_TRIGGER_HIGH, &quot;PA0_EINT&quot;, NULL);
    if (IS_ERR_VALUE(ret)) {
        pr_warn(&quot;request virq %d failed, errno = %d\\n&quot;, virq, ret);
        return -EINVAL;
    }
    
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：通过 dts 配置 gpio 中断，通过 dts 解析函数获取虚拟中断号，最后调用申请中断函数即可，demo 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dts配置如下：
soc{
	...
    Vdevice: vdevice@0 {
        compatible = &quot;allwinner,sun8i-vdevice&quot;;
        device_type = &quot;Vdevice&quot;;
        interrupt-parent = &lt;&amp;pio&gt;; /*依赖的中断控制器(带interrupt-controller属性的结 点)*/
        interrupts = &lt; PD 3 IRQ_TYPE_LEVEL_HIGH&gt;;
                        | |   \`------------------中断触发条件、类型
                        | \`-------------------------pin bank内偏移
                        \`---------------------------哪个bank
        pinctrl-names = &quot;default&quot;;
        pinctrl-0 = &lt;&amp;vdevice_pins_a&gt;;
        test-gpios = &lt;&amp;pio PC 3 1 2 2 1&gt;;
        status = &quot;okay&quot;;
	};
	...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在驱动中，通过 platform_get_irq() 标准接口获取虚拟中断号，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static int sunxi_pctrltest_probe(struct platform_device *pdev)
{ 
    struct device_node *np = pdev-&gt;dev.of_node;
    struct gpio_config config;
    int gpio, irq;
    int ret;

    if (np == NULL) {
        pr_err(&quot;Vdevice failed to get of_node\\n&quot;);
        return -ENODEV;
    }
    ....
    irq = platform_get_irq(pdev, 0);
    if (irq &lt; 0) {
        printk(&quot;Get irq error!\\n&quot;);
        return -EBUSY;
    }
	.....
	sunxi_ptest_data-&gt;irq = irq;
	......
	return ret;
}

//申请中断：
static int pctrltest_request_irq(void)
{
    int ret;
    int virq = sunxi_ptest_data-&gt;irq;
    int trigger = IRQF_TRIGGER_HIGH;

    reinit_completion(&amp;sunxi_ptest_data-&gt;done);

    pr_warn(&quot;step1: request irq(%s level) for irq:%d.\\n&quot;,
	    trigger == IRQF_TRIGGER_HIGH ? &quot;high&quot; : &quot;low&quot;, virq);
	ret = request_irq(virq, sunxi_pinctrl_irq_handler_demo1,
			trigger, &quot;PIN_EINT&quot;, NULL);
    if (IS_ERR_VALUE(ret)) {
        pr_warn(&quot;request irq failed !\\n&quot;);
        return -EINVAL;
    }

    pr_warn(&quot;step2: wait for irq.\\n&quot;);
    ret = wait_for_completion_timeout(&amp;sunxi_ptest_data-&gt;done, HZ);
    
    if (ret == 0) {
        pr_warn(&quot;wait for irq timeout!\\n&quot;);
        free_irq(virq, NULL);
        return -EINVAL;
    }

    free_irq(virq, NULL);

    pr_warn(&quot;-----------------------------------------------\\n&quot;);
    pr_warn(&quot;test pin eint success !\\n&quot;);
    pr_warn(&quot;+++++++++++++++++++++++++++end++++++++++++++++++++++++++++\\n\\n\\n&quot;);

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-设备驱动设置中断-debounce-功能" tabindex="-1"><a class="header-anchor" href="#_5-4-设备驱动设置中断-debounce-功能" aria-hidden="true">#</a> 5.4 设备驱动设置中断 debounce 功能</h3><p>方式一：通过 dts 配置每个中断 bank 的 debounce，以 pio 设备为例，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;pio {
    /* takes the debounce time in usec as argument */
    input-debounce = &lt;0 0 0 0 0 0 0&gt;;
                      | | | | | | \`----------PA bank
                      | | | | | \`------------PC bank
                      | | | | \`--------------PD bank
                      | | | \`----------------PF bank
                      | | \`------------------PG bank
                      | \`--------------------PH bank
                      \`----------------------PI bank
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：input-debounce 的属性值中需把 pio 设备支持中断的 bank 都配上，如果缺少，会以bank 的顺序设置相应的属性值到 debounce 寄存器，缺少的 bank 对应的 debounce 应该是默认值（启动时没修改的情况）。sunxi linux-4.9 平台，中断采样频率最大是 24M, 最小 32k，debounce 的属性值只能为 0 或 1。对于 linux-5.4，debounce 取值范围是 0~1000000（单位 usec）。</p><p>方式二：驱动模块调用 gpio 相关接口设置中断 debounce</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static inline int gpio_set_debounce(unsigned gpio, unsigned debounce);
int gpiod_set_debounce(struct gpio_desc *desc, unsigned debounce);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在驱动中，调用上面两个接口即可设置 gpio 对应的中断 debounce 寄存器，注意，debounce 是以 ms 为单位的 (linux-5.4 已经移除这个接口)。</p>`,47),a=[l];function t(r,v){return i(),e("div",null,a)}const c=n(d,[["render",t],["__file","Linux_GPIO_DevelopmentGuide-05.html.vue"]]);export{c as default};
