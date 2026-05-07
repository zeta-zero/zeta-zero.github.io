import{z as n,b as s,c as a,i as o}from"./index-dc5fff9e.js";const l={class:"markdown-body"},c=o(`<h2>交叉链接类型</h2><h3>crosstool-ng中交叉编译前缀的命名规则</h3><p>crosstool-ng中，交叉编译器的(前缀)的名字的命名规则是 :<br> arch [-vendor] [-os] [-(gnu)eabi]</p><table><thead><tr><th>规则</th><th>描述</th></tr></thead><tbody><tr><td>arch</td><td>体系架构, 如ARM, MIPS</td></tr><tr><td>vendor</td><td>工具链提供商</td></tr><tr><td>os</td><td>目标操作系统</td></tr><tr><td>eabi</td><td>嵌入式应用二进制接口(Embedded Application Binary Interface)</td></tr></tbody></table><p>根据对操作系统的支持与否, ARM GCC可分为支持和不支持操作系统, 如</p><ul><li>arm-none-eabi : 这个是没有操作系统的</li><li>arm-none-linux-eabi：用于Linux的, 使用Glibc</li></ul><table><thead><tr><th>工具链</th><th>裸机/系统</th><th>架构</th><th>可编译的程序</th></tr></thead><tbody><tr><td>arm-none-eabi-</td><td>裸机</td><td>ARM7、Cortex-M 和 Cortex-R</td><td>ARM Linux 的 boot、kernel</td></tr><tr><td>arm-none-linux-gnueabi-</td><td>系统</td><td>ARM 架构</td><td>ARM Linux 的u-boot、kernel、linux应用等</td></tr><tr><td>arm-eabi-</td><td>Android</td><td>ARM 架构</td><td></td></tr><tr><td>armcc</td><td>裸机</td><td>ARM 架构</td><td>u-boot、kernel</td></tr><tr><td>arm-none-uclinuxeabi-</td><td></td><td></td><td>uCLinux</td></tr><tr><td>arm-none-symbianelf-</td><td></td><td></td><td>uCLinux</td></tr></tbody></table><p>其他的工具链 arm-linux-gnueabihf-：ARM32架构；编译目标运行于Linux上；嵌入式，默认支持armhf，使用glibc。</p><p>arm-none-linux-gnueabihf-：ARM架构；没有特定厂商；编译目标运行在Linux操作系统上，linux kernel、linux app、uboot等；基于gcc使用glibc库，嵌入式平台；默认支持armhf。</p><p>aarch64-linux-gnu-：ARM64架构；编译目标运行于Linux上；使用glibc。</p><p>arm-none-uclinuxeabi-：ARM架构；没有特定厂商；用于UCLinux操作系统；使用glibc。</p><p>aarch64-linux-gnu-：ARM64架构；编译目标运行在Linux操作系统上；使用glibc。</p><p>aarch64-none-linux-gnu-：ARM64架构；不特定厂商；运行在Linux操作系统上；使用glibc。</p><p>aarch64-none-elf-：ARM64架构，不特定厂商；偏向裸驱系统。</p><h4>arch部分</h4><p>统架构, 表示交叉编译器，是用于哪个目标系统架构中，用于那个平台中的<br> arch的值，常见的有很多种，比如arm，x86，mips等等。</p><h4>vendor部分</h4><p>生成厂家，提供商, 表示谁提供的，即谁制作出来这个交叉编译器的</p><h4>os部分</h4><p>内核，用此交叉编译器，编译出来的程序，所运行的目标系统<br> 主要有两种：Linux 和 bare-metal</p><h4>system部分</h4><p>主要表示的，交叉编译器所选择的库函数和目标系统<br> eabi : 嵌入式二进制文件 abi : 二进制文件</p><hr><h3>Makefile / GCC的使用方式</h3><h4>GCC</h4><h5>arm-none-eabi</h5><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">bash</span></div><div class="code-block language-shell-session no-line-numbers" data-lang="bash" data-modifiers=""><pre class="language-shell-session" data-lang="bash"><code class="code-line odd first-row line-1"><span class="token output">arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -mfloat-abi=soft -g -Os -std=gnu99 -Wall -fdata-sections -ffunction-sections -specs=nosys.specs -specs=nano.specs -DDXX01 -DDXX02 -Ipath01/path02 -c xxx.c -o xxx.o</span></code></pre></div></div><ul><li>-m : 平台架构， -mcpu=cortex-m4(cortex-m4架构) -mthumb(生成 Thumb 指令集的代码) -mfloat-abi=soft(软件浮点计算) -m486(486架构)</li><li>-g : 生成调试信息</li><li>-O : 优化等级，-O0(Optimize Free) / -O1 / -O2 / -Os / -O3</li><li>-std= : 编译标准，-std=gun99 / -std=c++11 / -std=c99</li><li>-Wall : 显示所有警告信息</li><li>-c : 只激活预处理，编译和汇编，编译成obj文件</li><li>-S : 只激活预处理和编译，编译成汇编代码</li><li>-o : 指定输出，缺省时，编译成a.out</li><li>-I : 添加头文件搜索目录，如-Ipath01/paht02</li><li>-static : 禁止使用共享链接</li><li>-fdata-sections -ffunction-sections : 将数据和函数分别放置在不同的节中，链接器可以根据需要丢弃未使用的节，进一步减小代码大小。</li><li>-specs=: 指定链接器使用特定文件文件，其中nosys.specs 和 nano.specs这些文件通常包含一些针对嵌入式系统的特殊设置，比如使用新的库或定义一些符号。</li><li>-D : 定义宏定义 -DDXXX01,定义一个DXXX01的宏定义，等效&quot;#define DXXX01&quot;</li></ul><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">bash</span></div><div class="code-block language-shell-session no-line-numbers" data-lang="bash" data-modifiers=""><pre class="language-shell-session" data-lang="bash"><code class="code-line odd first-row line-1"><span class="token output">arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -Txxxlink.ld -Wl,--gc-sections -Wl,-Map=xxxmap.map --specs=nosys.specs --specs=nano.specs xxx1.o xxx2.o xxx3.o -o xxxout.elf</span></code></pre></div></div><ul><li>-T : 指定链接脚本，例如-Txxxlink.ld指定xxxlink.ld为链接脚本</li><li>-Wl : -Wl,–gcc-sections:告诉链接器丢弃未使用的节，减小输出文件大小。 -Wl,-Map=xxxmap.map 生成一个名为 xxxmap.map 的映射文件，用于查看程序的内存布局。</li><li>–fdata-sections --ffunction-sections : 将数据和函数分别放置在不同的节中，链接器可以根据需要丢弃未使用的节，进一步减小代码大小。</li></ul><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">bash</span></div><div class="code-block language-shell-session no-line-numbers" data-lang="bash" data-modifiers=""><pre class="language-shell-session" data-lang="bash"><code class="code-line odd first-row line-1"><span class="token output">arm-none-eabi-objcopy -O ihex xxxout.elf xxxout.hex</span></code>
<code class="code-line even last-row line-2"><span class="token output">arm-none-eabi-objcopy -O binary xxxout.elf xxxout.bin</span></code></pre></div></div><ul><li>将目标文件（通常是 ELF 格式）转换为其他格式。</li><li>-O ihex: 选项指定了输出文件的格式为 Intel HEX。Intel HEX 是一种文本格式，常用于存储微控制器程序的十六进制代码。</li><li>-O binary: 选项指定了输出文件的格式为原始二进制格式。</li></ul><h4>Makefile 文本</h4><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">bash</span></div><div class="code-block language-shell-session no-line-numbers" data-lang="bash" data-modifiers=""><pre class="language-shell-session" data-lang="bash"><code class="code-line odd first-row line-1"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Target settings</span></span></code>
<code class="code-line even line-2"><span class="token output">TARGET = filename   #生成目标文件的名称</span></code>
<code class="code-line odd line-3"><span class="token output">BUILD_DIR = build   #目标目录的名称</span></code>
<code class="code-line even line-4"></code>
<code class="code-line odd line-5"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Source directories <span class="token punctuation">(</span>add paths as needed<span class="token punctuation">)</span></span></span></code>
<code class="code-line even line-6"><span class="token output">SOURCE_DIRS = 	xxx/xxx/xxx xxx   #编译需要的文件路径</span></code>
<code class="code-line odd line-7"><span class="token output">TARGET_STARTUP = xxx.s            #嵌入式编译需要的汇编启动文件</span></code>
<code class="code-line even line-8"></code>
<code class="code-line odd line-9"><span class="token output">LDSCRIPT = xxx.ld     #指定链接脚本</span></code>
<code class="code-line even line-10"></code>
<code class="code-line odd line-11"><span class="token output">VPATH = $(SOURCE_DIRS)</span></code>
<code class="code-line even line-12"></code>
<code class="code-line odd line-13"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Compiler and tools</span></span></code>
<code class="code-line even line-14"><span class="token output">CC = arm-none-eabi-gcc</span></code>
<code class="code-line odd line-15"><span class="token output">LD = arm-none-eabi-ld</span></code>
<code class="code-line even line-16"><span class="token output">AR = arm-none-eabi-ar</span></code>
<code class="code-line odd line-17"><span class="token output">AS = arm-none-eabi-as</span></code>
<code class="code-line even line-18"><span class="token output">OBJCOPY = arm-none-eabi-objcopy</span></code>
<code class="code-line odd line-19"><span class="token output">OBJDUMP = arm-none-eabi-objdump</span></code>
<code class="code-line even line-20"><span class="token output">SIZE = arm-none-eabi-size</span></code>
<code class="code-line odd line-21"></code>
<code class="code-line even line-22"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Processor specific flags</span></span></code>
<code class="code-line odd line-23"><span class="token output">CPU = -mthumb -mcpu=cortex-m4   #编译的目标平台</span></code>
<code class="code-line even line-24"><span class="token output">FPU = -mfloat-abi=soft          #浮点计算模式: soft / hard</span></code>
<code class="code-line odd line-25"><span class="token output">FLOAT = </span></code>
<code class="code-line even line-26"><span class="token output">TARGET_ARCH = $(CPU) $(FPU) $(FLOAT)</span></code>
<code class="code-line odd line-27"></code>
<code class="code-line even line-28"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Compiler flags</span></span></code>
<code class="code-line odd line-29"><span class="token output">CFLAGS = $(TARGET_ARCH) -g -Os -std=gnu99 -Wall -fdata-sections -ffunction-sections</span></code>
<code class="code-line even line-30"><span class="token output">CFLAGS += -specs=nosys.specs -specs=nano.specs</span></code>
<code class="code-line odd line-31"><span class="token output">CFLAGS += -Dxxx00                          # 宏定义内容</span></code>
<code class="code-line even line-32"><span class="token output">CFLAGS += $(addprefix -I, $(SOURCE_DIRS))  # Add all source directories as include paths</span></code>
<code class="code-line odd line-33"><span class="token output">SFLAGS = $(CPU) -g </span></code>
<code class="code-line even line-34"></code>
<code class="code-line odd line-35"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Linker script</span></span></code>
<code class="code-line even line-36"><span class="token output">LDFLAGS = $(CPU) -T$(LDSCRIPT) -Wl,--gc-sections -Wl,-Map=$(BUILD_DIR)/$(TARGET).map</span></code>
<code class="code-line odd line-37"><span class="token output">LDFLAGS += --specs=nosys.specs --specs=nano.specs</span></code>
<code class="code-line even line-38"></code>
<code class="code-line odd line-39"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Source files</span></span></code>
<code class="code-line even line-40"><span class="token output">SRC_FILES := $(foreach dir,$(SOURCE_DIRS),$(wildcard $(dir)/*.c))     # Gather all .c files from source directories</span></code>
<code class="code-line odd line-41"><span class="token output">STARTUP_OBJ := $(BUILD_DIR)/$(notdir $(TARGET_STARTUP:.s=.o))</span></code>
<code class="code-line even line-42"><span class="token output">OBJ_FILES := $(addprefix $(BUILD_DIR)/, $(notdir $(SRC_FILES:.c=.o))) # Convert to object file list in build directory</span></code>
<code class="code-line odd line-43"></code>
<code class="code-line even line-44"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Rules</span></span></code>
<code class="code-line odd line-45"><span class="token output">.PHONY: all clean print</span></code>
<code class="code-line even line-46"></code>
<code class="code-line odd line-47"><span class="token output">all: $(BUILD_DIR) $(BUILD_DIR)/$(TARGET).hex $(BUILD_DIR)/$(TARGET).bin</span></code>
<code class="code-line even line-48"></code>
<code class="code-line odd line-49"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Ensure the build directory exists</span></span></code>
<code class="code-line even line-50"><span class="token output">$(BUILD_DIR):</span></code>
<code class="code-line odd line-51"><span class="token output">	mkdir -p $(BUILD_DIR)</span></code>
<code class="code-line even line-52"></code>
<code class="code-line odd line-53"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Compile <span class="token builtin class-name">source</span> files into object files</span></span></code>
<code class="code-line even line-54"><span class="token output">$(BUILD_DIR)/%.o: %.s</span></code>
<code class="code-line odd line-55"><span class="token output">	$(AS) $(SFLAGS) -c $(TARGET_STARTUP) -o $(STARTUP_OBJ)</span></code>
<code class="code-line even line-56"></code>
<code class="code-line odd line-57"><span class="token output">$(BUILD_DIR)/%.o: %.c</span></code>
<code class="code-line even line-58"><span class="token output">	$(CC) $(CFLAGS) -c $&lt; -o $@</span></code>
<code class="code-line odd line-59"></code>
<code class="code-line even line-60"></code>
<code class="code-line odd line-61"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Link object files into an ELF binary</span></span></code>
<code class="code-line even line-62"><span class="token output">$(BUILD_DIR)/$(TARGET).elf: $(OBJ_FILES) $(STARTUP_OBJ)</span></code>
<code class="code-line odd line-63"><span class="token output">	$(CC) $(LDFLAGS) $(OBJ_FILES) $(STARTUP_OBJ) -o $@</span></code>
<code class="code-line even line-64"><span class="token output">	$(SIZE) $@</span></code>
<code class="code-line odd line-65"></code>
<code class="code-line even line-66"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Generate a HEX <span class="token function">file</span> from the ELF binary</span></span></code>
<code class="code-line odd line-67"><span class="token output">$(BUILD_DIR)/$(TARGET).hex: $(BUILD_DIR)/$(TARGET).elf</span></code>
<code class="code-line even line-68"><span class="token output">	$(OBJCOPY) -O ihex $&lt; $@</span></code>
<code class="code-line odd line-69"></code>
<code class="code-line even line-70"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Generate a BIN <span class="token function">file</span> from the ELF binary</span></span></code>
<code class="code-line odd line-71"><span class="token output">$(BUILD_DIR)/$(TARGET).bin: $(BUILD_DIR)/$(TARGET).elf</span></code>
<code class="code-line even line-72"><span class="token output">	$(OBJCOPY) -O binary $&lt; $@</span></code>
<code class="code-line odd line-73"></code>
<code class="code-line even line-74"><span class="token command"><span class="token shell-symbol important">#</span> <span class="token bash language-bash">Clean up build files</span></span></code>
<code class="code-line odd line-75"><span class="token output">clean:</span></code>
<code class="code-line even line-76"><span class="token output">	del /Q $(BUILD_DIR)\\*.o $(BUILD_DIR)\\*.elf $(BUILD_DIR)\\*.map</span></code>
<code class="code-line odd line-77"></code>
<code class="code-line even line-78"></code>
<code class="code-line odd line-79"><span class="token output">print:</span></code>
<code class="code-line even line-80"><span class="token output">	@echo &quot;SRC_FILES: $(SRC_FILES)&quot;</span></code>
<code class="code-line odd line-81"><span class="token output">	@echo &quot;TARGET_STARTUP : $(TARGET_STARTUP)&quot;</span></code>
<code class="code-line even line-82"><span class="token output">	@echo &quot;OBJ_FILES: $(OBJ_FILES)&quot;</span></code>
<code class="code-line odd last-row line-83"><span class="token output">	@echo &quot;STARTUP_OBJ : $(STARTUP_OBJ)&quot;</span></code></pre></div></div>`,34),d=[c],r={},h="",b=n({__name:"blog",setup(t,{expose:e}){return e({frontmatter:{},excerpt:void 0}),(i,p)=>(s(),a("div",l,d))}});export{b as default,h as excerpt,r as frontmatter};
