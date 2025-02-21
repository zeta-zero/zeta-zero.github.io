
## 交叉链接类型

### crosstool-ng中交叉编译前缀的命名规则
crosstool-ng中，交叉编译器的(前缀)的名字的命名规则是 :  
arch [-vendor] [-os] [-(gnu)eabi]
|规则|描述|
|---|---|
|arch	| 体系架构, 如ARM, MIPS|
|vendor	| 工具链提供商|
|os	| 目标操作系统|
|eabi	| 嵌入式应用二进制接口(Embedded Application Binary Interface)|

根据对操作系统的支持与否, ARM GCC可分为支持和不支持操作系统, 如
- arm-none-eabi : 这个是没有操作系统的
- arm-none-linux-eabi：用于Linux的, 使用Glibc

|工具链|裸机/系统|架构|可编译的程序|
|---|---|---|---|
|arm-none-eabi-|裸机|ARM7、Cortex-M 和 Cortex-R|ARM Linux 的 boot、kernel|
|arm-none-linux-gnueabi-|系统|ARM 架构|ARM Linux 的u-boot、kernel、linux应用等|
|arm-eabi-|Android|ARM 架构||
|armcc|裸机|ARM 架构|u-boot、kernel|
|arm-none-uclinuxeabi-|||uCLinux|
|arm-none-symbianelf-|||uCLinux|

其他的工具链
arm-linux-gnueabihf-：ARM32架构；编译目标运行于Linux上；嵌入式，默认支持armhf，使用glibc。

arm-none-linux-gnueabihf-：ARM架构；没有特定厂商；编译目标运行在Linux操作系统上，linux kernel、linux app、uboot等；基于gcc使用glibc库，嵌入式平台；默认支持armhf。

aarch64-linux-gnu-：ARM64架构；编译目标运行于Linux上；使用glibc。

arm-none-uclinuxeabi-：ARM架构；没有特定厂商；用于UCLinux操作系统；使用glibc。

aarch64-linux-gnu-：ARM64架构；编译目标运行在Linux操作系统上；使用glibc。

aarch64-none-linux-gnu-：ARM64架构；不特定厂商；运行在Linux操作系统上；使用glibc。

aarch64-none-elf-：ARM64架构，不特定厂商；偏向裸驱系统。

#### arch部分

统架构, 表示交叉编译器，是用于哪个目标系统架构中，用于那个平台中的  
arch的值，常见的有很多种，比如arm，x86，mips等等。

#### vendor部分
生成厂家，提供商, 表示谁提供的，即谁制作出来这个交叉编译器的  

#### os部分
内核，用此交叉编译器，编译出来的程序，所运行的目标系统  
主要有两种：Linux 和 bare-metal

#### system部分
主要表示的，交叉编译器所选择的库函数和目标系统  
eabi : 嵌入式二进制文件
abi : 二进制文件

******

### Makefile / GCC的使用方式

#### GCC
##### arm-none-eabi
```bash
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -mfloat-abi=soft -g -Os -std=gnu99 -Wall -fdata-sections -ffunction-sections -specs=nosys.specs -specs=nano.specs -DDXX01 -DDXX02 -Ipath01/path02 -c xxx.c -o xxx.o
```
- -m : 平台架构，
        -mcpu=cortex-m4(cortex-m4架构)
        -mthumb(生成 Thumb 指令集的代码)
        -mfloat-abi=soft(软件浮点计算)
        -m486(486架构)
- -g : 生成调试信息
- -O : 优化等级，-O0(Optimize Free) / -O1 / -O2 / -Os / -O3
- -std= : 编译标准，-std=gun99 / -std=c++11 / -std=c99
- -Wall : 显示所有警告信息
- -c : 只激活预处理，编译和汇编，编译成obj文件
- -S : 只激活预处理和编译，编译成汇编代码
- -o : 指定输出，缺省时，编译成a.out
- -I : 添加头文件搜索目录，如-Ipath01/paht02
- -static : 禁止使用共享链接
- -fdata-sections -ffunction-sections : 将数据和函数分别放置在不同的节中，链接器可以根据需要丢弃未使用的节，进一步减小代码大小。
- -specs=: 指定链接器使用特定文件文件，其中nosys.specs 和 nano.specs这些文件通常包含一些针对嵌入式系统的特殊设置，比如使用新的库或定义一些符号。
- -D : 定义宏定义 -DDXXX01,定义一个DXXX01的宏定义，等效"#define DXXX01"

```bash
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -Txxxlink.ld -Wl,--gc-sections -Wl,-Map=xxxmap.map --specs=nosys.specs --specs=nano.specs xxx1.o xxx2.o xxx3.o -o xxxout.elf
```
- -T : 指定链接脚本，例如-Txxxlink.ld指定xxxlink.ld为链接脚本
- -Wl : -Wl,--gcc-sections:告诉链接器丢弃未使用的节，减小输出文件大小。
        -Wl,-Map=xxxmap.map 生成一个名为 xxxmap.map 的映射文件，用于查看程序的内存布局。
- --fdata-sections --ffunction-sections : 将数据和函数分别放置在不同的节中，链接器可以根据需要丢弃未使用的节，进一步减小代码大小。

```bash
arm-none-eabi-objcopy -O ihex xxxout.elf xxxout.hex
arm-none-eabi-objcopy -O binary xxxout.elf xxxout.bin
```
- 将目标文件（通常是 ELF 格式）转换为其他格式。
- -O ihex: 选项指定了输出文件的格式为 Intel HEX。Intel HEX 是一种文本格式，常用于存储微控制器程序的十六进制代码。
- -O binary: 选项指定了输出文件的格式为原始二进制格式。


#### Makefile 文本
```bash
# Target settings
TARGET = filename   #生成目标文件的名称
BUILD_DIR = build   #目标目录的名称

# Source directories (add paths as needed)
SOURCE_DIRS = 	xxx/xxx/xxx xxx   #编译需要的文件路径
TARGET_STARTUP = xxx.s            #嵌入式编译需要的汇编启动文件

LDSCRIPT = xxx.ld     #指定链接脚本

VPATH = $(SOURCE_DIRS)

# Compiler and tools
CC = arm-none-eabi-gcc
LD = arm-none-eabi-ld
AR = arm-none-eabi-ar
AS = arm-none-eabi-as
OBJCOPY = arm-none-eabi-objcopy
OBJDUMP = arm-none-eabi-objdump
SIZE = arm-none-eabi-size

# Processor specific flags
CPU = -mthumb -mcpu=cortex-m4   #编译的目标平台
FPU = -mfloat-abi=soft          #浮点计算模式: soft / hard
FLOAT = 
TARGET_ARCH = $(CPU) $(FPU) $(FLOAT)

# Compiler flags
CFLAGS = $(TARGET_ARCH) -g -Os -std=gnu99 -Wall -fdata-sections -ffunction-sections
CFLAGS += -specs=nosys.specs -specs=nano.specs
CFLAGS += -Dxxx00                          # 宏定义内容
CFLAGS += $(addprefix -I, $(SOURCE_DIRS))  # Add all source directories as include paths
SFLAGS = $(CPU) -g 

# Linker script
LDFLAGS = $(CPU) -T$(LDSCRIPT) -Wl,--gc-sections -Wl,-Map=$(BUILD_DIR)/$(TARGET).map
LDFLAGS += --specs=nosys.specs --specs=nano.specs

# Source files
SRC_FILES := $(foreach dir,$(SOURCE_DIRS),$(wildcard $(dir)/*.c))     # Gather all .c files from source directories
STARTUP_OBJ := $(BUILD_DIR)/$(notdir $(TARGET_STARTUP:.s=.o))
OBJ_FILES := $(addprefix $(BUILD_DIR)/, $(notdir $(SRC_FILES:.c=.o))) # Convert to object file list in build directory

# Rules
.PHONY: all clean print

all: $(BUILD_DIR) $(BUILD_DIR)/$(TARGET).hex $(BUILD_DIR)/$(TARGET).bin

# Ensure the build directory exists
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Compile source files into object files
$(BUILD_DIR)/%.o: %.s
	$(AS) $(SFLAGS) -c $(TARGET_STARTUP) -o $(STARTUP_OBJ)

$(BUILD_DIR)/%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@


# Link object files into an ELF binary
$(BUILD_DIR)/$(TARGET).elf: $(OBJ_FILES) $(STARTUP_OBJ)
	$(CC) $(LDFLAGS) $(OBJ_FILES) $(STARTUP_OBJ) -o $@
	$(SIZE) $@

# Generate a HEX file from the ELF binary
$(BUILD_DIR)/$(TARGET).hex: $(BUILD_DIR)/$(TARGET).elf
	$(OBJCOPY) -O ihex $< $@

# Generate a BIN file from the ELF binary
$(BUILD_DIR)/$(TARGET).bin: $(BUILD_DIR)/$(TARGET).elf
	$(OBJCOPY) -O binary $< $@

# Clean up build files
clean:
	del /Q $(BUILD_DIR)\*.o $(BUILD_DIR)\*.elf $(BUILD_DIR)\*.map


print:
	@echo "SRC_FILES: $(SRC_FILES)"
	@echo "TARGET_STARTUP : $(TARGET_STARTUP)"
	@echo "OBJ_FILES: $(OBJ_FILES)"
	@echo "STARTUP_OBJ : $(STARTUP_OBJ)"
```



