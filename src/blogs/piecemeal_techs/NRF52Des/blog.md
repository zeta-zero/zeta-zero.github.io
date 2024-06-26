---
layout: post
title: NRF52 资料
series: techs
modtime: 2023/07/18
---

记录了与NRF52相关的资料

## 存储空间布局

|组件|存储空间范围 S132|存储空间范围 S140|存储空间范围 S112|
|---|---|---|---|
|Bootloader settings|0x0007 F000~0x0008 0000(4KiB)|0x000F F000~0x0010 0000(4KiB)|0x0002 F000~0x0003 0000(4KiB)|
|MBR parameter storage|0x0007 E000~0x0007 F000(4Kib)|0x000F E000~0x000F F000(4Kib)|0x0002 E000~0x0002 F000(4KiB)|
|Bootloader|0x0007 8000~0x0007 E000(24KiB)|0x000F 8000~0x000F E000(24KiB)|0x0002 8000~0x0002 E000 (24KiB)|
|Application area|0x0002 6000~0x0007 8000(328KiB)|0x0002 6000~0x000F 8000(840KiB)|0x0001 9000~0x0002 8000(60KiB)|
|SoftDevice|0x0000 1000~0x0002 6000(148KiB)|0x0000 1000 - 0x0002 6000(148KiB)|0x0000 1000 - 0x0001 9000(96KiB)|
|Master Boot Record(MBR)|0x0000 0000~0x0000 1000(4KiB)|0x0000 0000~0x0000 1000(4KiB)|0x0000 0000~0x0000 1000(4KiB)|

<br/>

******

## Bootloader 

### 参数

bootloader 开始地址存放到 UICR.BOOTLOADERADDR 中，UICR.BOOTLOADERADDR 被映射在 0x10001014 (NRF_UICR_BOOTLOADER_START_ADDRESS)

### 跳转

bootloader 跳转到 APP 前的处理：  
在含有协议库的情况下
```c
sd_mbr_command_t command =
{
    .command = SD_MBR_COMMAND_IRQ_FORWARD_ADDRESS_SET,
    .params.irq_forward_address_set.address = 0x1000,
};
ret_val = sd_mbr_command(&command);
if(NRF_ERROR_INVALID_PARAM == ret_val){
    *(uint32_t *)(0x20000000) = 0x1000;
}
......
const uint32_t jmp_addr = *((uint32_t *)(_addr + sizeof(uint32_t)));  //_addr 为APP所在地址
__disable_irq();
for(uint8_t i=0;i<8;i++)
{
    NVIC->ICER[i]=0xFFFFFFFF;
    NVIC->ICPR[i]=0xFFFFFFFF;
}
__set_CONTROL(0);   // Set CONTROL to its reset value 0.
__set_PRIMASK(0);   // Set PRIMASK to its reset value 0.
__set_BASEPRI(0);   // Set BASEPRI to its reset value 0.
__set_FAULTMASK(0); // Set FAULTMASK to its reset value 0.
__enable_irq();
((void (*)(void))jmp_addr)();
```
需要注意的是：  
1.中断向表是在0x00000000的位置，并不是在APP所在地址的位置。  
2.使用__set_MSP，会使程序跑飞。  
3.当 SD_EVT_IRQHandler 无响应时，需要包含头文件“nrf_soc.h”，或使用 SWI2_EGU2_IRQHandler。

<br/>

******

## DFU 参数

关于结构体nrf_dfu_settings_t的内部成员描述。

|类型|说明|
|---|---|
|crc|存储的DFU设置的CRC，不包括CRC本身。如果0xFFFFFFF，表示CRC从未计算过。|
|boot_validation_app.bytes|存储新固件的CRC32数据|
|progress.update_start_address|bank1在flash的起始地址|
|bank1.image_size|新固件大小|
|bank1.image_crc|新固件的CRC校验值，可以用crc32_compute()计算|
|bank1.bank_code|设置为NRF_DFU_BANK_VALID_APP，使其为有效固件|

<br/>

******

## 协议栈版本

- 名称格式：S[xyz]
  - [ x ] 协议栈的类型，1为BLE协议栈，2为ANT协议栈，3为同时支持两者
  - [ y ] BLE角色，1为从设备，2为主设备，3为同时支持两者
  - [ z ] 芯片类型，0 为nRF51系列，2 为nRF52系列

<br/>

******

## BLE 提速

- 增大ATT_MTU为247
- 启动CLE功能，配置在协议栈初始化后
```c
ret_code_t ret = NRF_SUCCESS;
ble_opt_t opt = {
    .common_opt.conn_evt_ext.enable = 1,
};
ret_code = sd_ble_opt_set(BLE_COMMON_OPT_CONN_EVT_EXT,&opt);
```
- 增加连接事件长度：BLE_CONN_CFG_GAP 
```c
ble_cfg_t cfg = {
    .conn_cfg.params.gap_conn_cfg.event_length = 400, /* 400*1.25ms */
};
```
- 使用BLE_GAP_PHY_2MBPS
```c
ble_gap_phys_t phy = {
    .tx_phys = BLE_GAP_PHY_2MBPS,
    .rx_phys = BLE_GAP_PHY_2MBPS,
};
void ble_evt_handler(ble_evt const* _event,void *_context)
{
    switch(_event->header.evt_id){
        case BLE_GAP_EVT_CONNECTED:{
            sd_ble_gap_phy_update(_event->evt.gap_evt.conn_handle,&phy);
        }break;
        default :break;
    }
}
```
- 调整连接间隔，其中BLE_CONN_CFG_GAP大于等于maxval。
  - 50ms  - 1328kbps
  - 400ms - 1376kbps
```c
ble_gap_conn_params_t params = {
    .min_conn_interval = minval,  /*最小连接间隔 单位：1.25ms*/
    .max_conn_interval = maxval,  /*最大连接间隔 单位：1.25ms*/
};
```
- 增大协议栈发送Buff
```c
ret_code_t ret = NRF_SUCCESS;
ble_cfg_t cfg = {
    .conn_cfg.conn_cfg_tag = CFG_Tag,
    .conn_cfg.params.gattc_conn_cfg.write_cmd_tx_queue_size = 10,
    .conn_cfg.params.gatts_conn_cfg.hvn_tx_queue_size = 10
};
ret = sd_ble_cfg_set(BLE_CONN_CFG_GATTC,&cfg,rm_start);
```

## API接口

中断：SD_EVT_IQHandler -> SWI2_EGU2_IRQHandler

sd_ble_evt_get(uint8_t *p_dest, uint16_t *p_len)
该函数用于获取蓝牙事件。一共分为五类
 - L2CAP
 - GATTS
 - GATTC
 - GAP
 - BASE

其中，GATTS分为
 - WRITE,调用 TEX_BLE_Event_GATTS_OPS 处理
   - BLE_GATTS_OP_INVALID
   - BLE_GATTS_OP_WRITE_REQ
   - BLE_GATTS_OP_WRITE_CMD
     - 0x2902,则为Notify开启或关闭
   - BLE_GATTS_OP_SIGN_WRITE_CMD
   - BLE_GATTS_OP_PREP_WRITE_REQ
   - BLE_GATTS_OP_EXEC_WRITE_REQ_CANCEL
   - BLE_GATTS_OP_EXEC_WRITE_REQ_NOW
 - RW_AUTHORIZE_REQUEST，调用 Tex_BLE_Event_GATTS_RAROPS 处理，处理数据状态，大小等。
 - SYS_ATTR_MISSING 
 - HVC
 - SC_CONFIRM
 - EXCHAGE_MTU_REQUEST，调用 sd_ble_gatts_exchange_mtu_reply 处理。
 - TIMEOUT
 - HVN_TX_COMPLETE

GATTC分为
 - BLE_GATTC_EVT_PRIM_SRVC_DISC_RSP
 - BLE_GATTC_EVT_REL_DISC_RSP
 - BLE_GATTC_EVT_CHAR_DISC_RSP
 - BLE_GATTC_EVT_DESC_DISC_RSP
 - BLE_GATTC_EVT_ATTR_INFO_DISC_RSP
 - BLE_GATTC_EVT_CHAR_VAL_BY_UUID_READ_RSP
 - BLE_GATTC_EVT_READ_RSP
 - BLE_GATTC_EVT_CHAR_VALS_READ_RSP
 - BLE_GATTC_EVT_WRITE_RSP
 - BLE_GATTC_EVT_HVX
 - BLE_GATTC_EVT_EXCHANGE_MTU_RSP
 - BLE_GATTC_EVT_TIMEOUT
 - BLE_GATTC_EVT_WRITE_CMD_TX_COMPLETE

其中GAP分为
 - BLE_GAP_EVT_CONNECTED          获得设备的MAC和连接参数
 - BLE_GAP_EVT_DISCONNECTED       获得断开连接的原因
 - BLE_GAP_EVT_CONN_PARAM_UPDATE
 - BLE_GAP_EVT_SEC_PARAMS_REQUEST
 - BLE_GAP_EVT_SEC_INFO_REQUEST
 - BLE_GAP_EVT_PASSKEY_DISPLAY
 - BLE_GAP_EVT_KEY_PRESSED
 - BLE_GAP_EVT_AUTH_KEY_REQUEST
 - BLE_GAP_EVT_LESC_DHKEY_REQUEST
 - BLE_GAP_EVT_AUTH_STATUS
 - BLE_GAP_EVT_CONN_SEC_UPDATE
 - BLE_GAP_EVT_TIMEOUT
 - BLE_GAP_EVT_RSSI_CHANGED
 - BLE_GAP_EVT_ADV_REPORT
 - BLE_GAP_EVT_SEC_REQUEST
 - BLE_GAP_EVT_CONN_PARAM_UPDATE_REQUEST
 - BLE_GAP_EVT_SCAN_REQ_REPORT
 - BLE_GAP_EVT_PHY_UPDATE_REQUEST
 - BLE_GAP_EVT_PHY_UPDATE
 - BLE_GAP_EVT_DATA_LENGTH_UPDATE_REQUEST
 - BLE_GAP_EVT_DATA_LENGTH_UPDATE
 - BLE_GAP_EVT_QOS_CHANNEL_SURVEY_REPORT
 - BLE_GAP_EVT_ADV_SET_TERMINATED


## 流程

Softdevice启动
 - sd_softdevice_enable
 - sd_nvic_EnableIRQ

Stack Init
 - 配置连接参数，如连接数量，MTU大小
 - GATTS attribute表格
 - sd_ble_enable

GAP参数配置
 - sd_ble_gap_device_name_set 配置设备名字
 - sd_ble_gap_ppcp_set 配置连接间隔

初始化广播数据
 - 主动广播
 - 被动广播

添加BLE服务和特征值
 - 配置UUiD
 - 配置Characteristic属性：Notify,Read,Write,Indicate
