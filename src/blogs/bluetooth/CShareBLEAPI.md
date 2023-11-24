---
title: .Net 的蓝牙API使用
series: ble
modtime: 2023/11/24
---

该文是基于WPF的使用参考。框架使用的是.Net Core。

### 1. 使用前准备

#### 1.1 设置框架版本

使用.Net 5.0及更高版本，可以直接使用，不再需要额外引用BLE相关库。
该模式支持的最低版本是**Windwo 10.0.10240.0**，但建议从.Net 6版本开始使用；.Net 5及之前版本，官方已弃用。


双击解决方案资源管理器中的[项目名]，假如[项目名]是[OneApp],则双击那个加粗的[OneApp]。
会出现下面的内容。

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>[版本号]</TargetFramework>
    <TargetPlatformMinVersion>[最低支持版本号]</TargetPlatformMinVersion>
  </PropertyGroup>
</Project>
```

其中，这对标签\<TargetFramework\>[版本号]\</TargetFramework\>中的[版本号]就是设置框架版本的地方。

|SDK 版本号|windows 版本|
|---|---|
|net6.0-windows10.0.17763.0|Windows 10 版本 1809|
|net6.0-windows10.0.18362.0|Windows 10 版本 1903|
|net6.0-windows10.0.19041.0|Windows 10 版本 2004|
|net6.0-windows10.0.22000.0|Windows 11|
| -windows11.0.22621.0|Windows 11|
| -windows11.0.29541.0|Windows 11|
|net7.0|所有受支持的操作系统|
|net8.0|所有受支持的操作系统|

NET 7中特定API:
- net7.0-android
- net7.0-ios
- net7.0-maccatalyst
- net7.0-macos
- net7.0-tvos
- net7.0-windows

例如，以下元素适用于面向 Windows 10 2004 版，且最低支持Windows 10 版本 1809的项目。

```xml
<TargetFramework>net6.0-windows10.0.19041.0</TargetFramework>
<TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
```

### 2. API 使用

#### 2.1 引用

```Cs
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Advertisement;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
```

1.Windows.Devices.Bluetooth中主要的类成员

|名称|描述|
|---|---|
|BluetoothDevice|代表一个蓝牙设备|
|BluetoothLEDevice|代表一个低功耗设备|
|BluetoothLEAdvertisement|BLE的广告|
|BluetoothLEAdvertisementWatcher|用于监听广告|

#### 2.2 初始化及扫描蓝牙广播信号

```cs
private BluetoothLEAdvertisementWatcher ble_watcher;

public void init()
{
#region  这部分为蓝牙广告数据的过滤规则，参数部分没有要求的话，可全部省略
    ble_watcher = new BluetoothLEAdvertisementWatcher{
        AdvertisementFilter = new BluetoothLEAdvertisementFilter{
            Advertisement = new BluetoothLEAdvertisement{
                Flags = BluetoothLEAdvertisementFlags.None,
                LocalName = "Demo",
            }, 
        },
        SignalStrengthFilter = new BluetoothSignalStrengthFilter{
            SamplingInterval = new TimeSpane(0,0,0,0,10),
            OutOfRangeTimeout = new TimeSpane(0,0,10),
            OutOfRangeThresholdInDBm = -127,
            InRangeThresholdInDBm = -127,
        },
        AllowExtendedAdvertisements = true,
        ScanningMode = BluetoothLEScanningMode.Active,
    };

    DataWriter mfdwriter = new DataWriter();
    mfdwriter.WriteBytes(new byte[]{0xEE,0xAA});
    ble_watcher.AdvertisementFilter.Advertisement.ManufacturerData.Add(
        new BluetoothLEManufacturerData{
            CompanyId = 0x1234,
            Data = mfdwriter.DatachBuffer(),
    });

    DataWriter bpdwriter = new DataWriter();
    mfdwriter.WriteByte(0x02);   /* 一般发现模式 */
    ble_watcher.AdvertisementFilter.BytePatterns.Add(
        new BluetoothLEAdvertisementBytePattern{
            DataType = 0x01,  /* 广告类型 */
            Offset = 0x00,
            Data = bpdwriter.DatachBuffer(),
        }
    )
#endregion

#region  接收扫描的广告数据及设备
    ble_watcher.Received += watcherReceivedEvent;
    ble_watcher.Stopped += watcherStoppedEvent;
#endregion

#region  启动BLE广告接收功能
    ble_watcher.Start();
#endregion
}

public void stop()
{
    ble_watcher?.Stop();
}

private List<BluetoothAddress> BLEList = new List<BluetoothAddress>();

private void watcherReceivedEvent(BluetoothLEAdvertisementWatcher sender, 
                                  BluetoothLEAdvertisementReceivedEventArgs args)
{
    /* 查找一个广告数据中包含广告类型为0x01，数据为0x02的设备。*/
    if(args.Advertisement.DataSections.Where(item => 
            item.DataType == 0x01 && 
            DataReader.FromBuffer(item.Data).ReadByte() == 0x02 ).Count() == 0){
        goto end;
    }
    /* 查找一个广告是无向的，且是可连接和可扫描的设备 */
    if(args.AdvertisementType != BluetoothLEAdvertisementType.ConnectableUndirected){
        goto end;
    }
    /* 查找一个常规可发现的设备 */
    if(args.Advertisement.Flags != BluetoothLEAdvertisementFlags.GeneralDiscoverableMode){
        goto end;
    }
    /* 查找一个信号强大大于 -80 DBm 的设备。*/
    if(args.RawSignalStrengthInDBm <= -80){
        goto end;
    }
    /* 查找一个名称是“Demo”的设备 */
    if(args.Advertisement.LocalName.Equals( "Demo") == false){
        goto end;
    }
    /* 查找一个广告数据中包含广告类型为0x01，数据为0x02的设备。*/
    if(args.Advertisement.DataSections.Where(item => 
            item.DataType == 0x01 && 
            DataReader.FromBuffer(item.Data).ReadByte() == 0x02 ).Count() == 0){
        goto end;
    }
    /* 查找一个蓝牙地址为公共的设备。10.0.19041.0及以上版本支持*/
    if(args.BluetoothAddressType != BluetoothAddressType.Public){
        goto end;
    }
    /* 查找一个可扫描且是扫描响应的设备。10.0.19041.0及以上版本支持*/
    if(args.IsScanResponse != true || args.IsScannable != true){
        goto end;
    }

    BLEList.Add(args.BluetoothAddress);
end:
    return;
}

private void watcherStoppedEvent(BluetoothLEAdvertisementWatcher sender, 
                                 BluetoothLEAdvertisementWatcherStoppedEventArgs args)
{
    if(args.Error == BluetoothError.RadioNotAvailable){
        BLEList.Clear();
    }
}
```

##### 2.2.1 BluetoothLEAdvertisementWatcher类功能

2.2.1-1 基本属性

|属性|描述|
|---|---|
|AdvertisementFilter|获取或设置一个 BluetoothLEAdvertisementFilter 对象，该对象用于配置使用基于有效负载部分的筛选的蓝牙 LE 广告筛选|
|AllowExtendedAdvertisements|允许使用扩展广告格式接收广告；默认为 False|
|MaxOutOfRangeTimeout|获取最大范围外超时值|
|MaxSamplingInterval|获取最大采样间隔|
|MinOutOfRangeTimeout|获取最小范围外超时值|
|MinSamplingInterval|获取最小采样间隔|
|ScanningMode|获取或设置蓝牙 LE 扫描模式。|
|SignalStrengthFilter|获取或设置一个 BluetoothSignalStrengthFilter 对象，该对象用于配置使用基于信号强度的筛选的蓝牙 LE 广告筛选|
|Status|获取 BluetoothLEAdvertisementWatcher 的当前状态。|

AdvertisementFilter 参数
  - Advertisement
    - Flags
      - BluetoothLEAdvertisementFlags.None：不指定标志
      - BluetoothLEAdvertisementFlags.LimitedDiscoverableMode：指定蓝牙 LE 受限可发现模式
      - BluetoothLEAdvertisementFlags.GeneralDiscoverableMode：指定蓝牙 LE 常规可发现模式
      - BluetoothLEAdvertisementFlags.ClassicNotSupported：指定不支持蓝牙 BR/EDR
      - BluetoothLEAdvertisementFlags.DualModeControllerCapable：将蓝牙 LE 和 BR/EDR 同时指定到支持 (控制器) 的同一设备
      - BluetoothLEAdvertisementFlags.BluetoothLEAdvertisementFlags：将蓝牙 LE 和 BR/EDR 同时指定到支持同一设备的 (主机)
    - LocalName
      - 字符串，设置想要查找的蓝牙设备名称
    - ManufacturerData (只读)
      - Add() > BluetoothLEManufacturerData > 2.2.1-2
    - BytePatterns (只读)
      - Add() > BluetoothLEAdvertisementBytePattern > 2.2.1-2
    - DataSections (获取原始数据节的列表)
      - [] >  2.2.1-2

SignalStrengthFilter 参数
  - SamplingInterval
    - TimeSpane()。等于或大于 0秒，且小于25.5秒。 任何大于或等于 25.5 秒的采样间隔都将完全禁用采样。
  - OutOfRangeTimeout
    - TimeSpane()。当 NULL 为 60 秒 () 时，默认值等于或大于 1 秒且小于或等于 60 秒。。
  - OutOfRangeThresholdInDBm
    - 大于等于 -127(默认) 且 小于等于 +20。
  - InRangeThresholdInDBm
    - 大于等于 -127(默认) 且 小于等于 +20。

AllowExtendedAdvertisements 参数
  - false: 默认，禁止使用扩展广告格式接收广告
  - true: 允许使用扩展广告格式接收广告

ScanningMode 参数
  - BluetoothLEScanningMode.Active：主动扫描蓝牙设备并接收广告数据
  - BluetoothLEScanningMode.Passive：被动接收蓝牙的广告数据

2.2.1-2 深入使用

BluetoothLEManufacturerData 参数 - (参考链接2 - Page 209 of 397)
  - CompanyID：
    - UInt16： 蓝牙特殊兴趣组定义的蓝牙 LE 公司标识符代码 (SIG) 
  - Data
    - IBuffer：蓝牙 LE 制造商特定的部分数据。

BluetoothLEAdvertisementBytePattern 参数 - (参考链接2 - Page 12 of 397 / 参考链接3)
  - DataType
    - byte：广告数据类型
  - Offset
    - short：广告数据段开始的偏移量
  - Data
    - IBuffer：特定广告数据类型的数据

BluetoothLEAdvertisementDataSection 参数 - (参考链接2 - Page 12 of 397 / 参考链接3)
  - DataType
    - byte：广告数据类型
  - Data
    - IBuffer：特定广告数据类型的数据

2.2.1-3 基本事件

**Received**
  - BluetoothLEAdvertisementWatcher：调用该事件的广告接收器
  - BluetoothLEAdvertisementReceivedEventArgs：接收事件参数

BluetoothLEAdvertisementReceivedEventArg 属性成员

|属性|描述|
|---|---|
|Advertisement|获取收到的蓝牙 LE 广告有效负载数据|
|AdvertisementType|获取收到的蓝牙 LE 广告数据包的类型|
|BluetoothAddress|获取发送蓝牙 LE 广告的设备蓝牙地址|
|BluetoothAddressType|检索收到的广告的蓝牙地址类型|
|IsAnonymous|指示是否从收到的广告中省略了蓝牙地址|
|IsConnectable|指示收到的广告是否可连接|
|IsDirected|指示收到的广告是否定向|
|IsScanResponse|指示收到的广告是否可扫描|
|IsScannable|指示收到的广告是否为扫描响应|
|RawSignalStrengthInDBm|获取接收的信号强度指示器， (RSSI) 值（以 dBm 为单位）表示此接收的蓝牙 LE 广告事件|
|Timestamp|获取 Received 事件发生时的时间戳|
|TransmitPowerLevelInDBm|表示广告的接收传输功率|

AdvertisementType
  - ConnectableUndirected：广告是无向的，指示设备是可连接和可扫描的。 此广告类型可以携带数据
  - ConnectableDirected：广告是定向的，指示设备可连接但不可扫描。 此广告类型不能携带数据
  - ScannableUndirected：广告是无向的，指示设备可扫描但不可连接。 此广告类型可以携带数据
  - NonConnectableUndirected：广告是无向的，指示设备不可连接或不可扫描。 此广告类型可以携带数据
  - ScanResponse：此广告是针对可扫描广告发出的扫描请求的扫描响应。 此广告类型可以携带数据
  - Extended：此广告是 5.0 扩展广告。 此广告类型可能具有不同的属性，不一定是定向的、连接的、可扫描的，也不是扫描响应

BluetoothAddressType
  - Public：公共地址
  - Random：随机地址
  - Unspecified：未指定的地址

**Stopped**
  - BluetoothLEAdvertisementWatcher：调用该事件的广告接收器
  - BluetoothLEAdvertisementWatcherStoppedEventArgs：停止事件参数
    - |类型|描述|
      |---|---|
      |Success|操作已成功完成或已提供服务|
      |RadioNotAvailable|蓝牙无线电不可用。 当蓝牙无线电已关闭时，会发生此错误|
      |ResourceInUse|无法为操作提供服务，因为当前正在使用必要的资源|
      |ResourceInUse|无法完成操作，因为远程设备未连接|
      |OtherError|发生意外错误|
      |DisabledByPolicy|操作被策略禁用|
      |NotSupported|操作被策略禁用|
      |DisabledByUser|操作被用户禁用|
      |ConsentRequired|操作需要同意|
      |TransportNotSupported|操作需要同意|

#### 2.3 连接，发现服务与断开

```cs

private BluetoothLEDevice BLEDevice = null;
private List<GattCharacteristicsResult> CharacList = new List<GattCharacteristicsResult>();

public bool connect(int index)
{
    bool res = false;
    if(index < 0 || index >= BLEList.Count){
        goto end;
    }
    /* 查找设备并连接 */
    BLEDevice = BluetoothLEDevice.FromBluetoothAddressAsync(_addr).AsTask().GetAwaiter().GetResult();
    if(BLEDevice == null){
        goto end;
    }

    BLEDevice.ConnectionStatusChanged += bleStateChangedEvent;

    /* 查找设备中的GATT服务 */
    GattDeviceServices gatt_services = BLEDevice.GetGattServicesAsync(BluetoothCacheMode.Uncached).AsTask().GetAwaiter().GetResult();
    if(gatt_services.Status != GattCommunicationStatus.Success){
        goto end;
    }

    CharacList.Clear();
    /* 查找GATT服务中的特征属性 */
    foreach(GattDeviceService gatt in gatt_services){
        GattCharacteristicsResult charac = gatt.GetCharacteristicsAsync(BluetoothCacheMode.Cached).AsTask().GetAwaiter().GetResult();
        if(charac.Status == GattCommunicationStatus.Success){
            CharacList.Add(charac);
        }

    }

end:
    return res;
}

public async bool connectAsync(int index)
{
    bool res = false;
    if(index < 0 || index >= BLEList.Count){
        goto end;
    }
    /* 查找设备并连接 */
    BLEDevice = await BluetoothLEDevice.FromBluetoothAddressAsync(_addr);
    if(BLEDevice == null){
        goto end;
    }

    BLEDevice.ConnectionStatusChanged += bleStateChangedEvent;

    /* 查找设备中的GATT服务 */
    GattDeviceServices gatt_services = await BLEDevice.GetGattServicesAsync(BluetoothCacheMode.Uncached);
    if(gatt_services.Status != GattCommunicationStatus.Success){
        goto end;
    }

    CharacList.Clear();
    /* 查找GATT服务中的特征属性 */
    foreach(GattDeviceService gatt in gatt_services){
        GattCharacteristicsResult charac = await gatt.GetCharacteristicsAsync(BluetoothCacheMode.Cached);
        if(charac.Status == GattCommunicationStatus.Success){
            CharacList.Add(charac);
        }

    }

end:
    return res;
}

private void bleStateChangedEvent(BluetoothLEDevice sender, object args)
{
    switch (sender.ConnectionStatus) {
        case BluetoothConnectionStatus.Connected: {
            /* 连接成功 todo */
        }
        break;
        case BluetoothConnectionStatus.Disconnected: {
            /* 连接断开 todo */
        }
        break;
        default: break;
    }
}

public void disconnect()
{
    if(BLEDevice == null){
        goto end;
    }
    CharacList.Cleare();
    BLEDevice.ConnectionStatusChanged -= bleStateChangedEvent;
    BLEDevice?.Dispose();
    BLEDevice = null;

end:
    return;
}

```

##### 2.3.1 BluetoothLEDevice类功能

2.3.1-1 基本属性


|属性|描述|
|---|---|
|Appearance|蓝牙 LE 设备的 BluetoothLEAppearance 对象|
|BluetoothAddress|蓝牙地址|
|BluetoothAddressType|蓝牙 LE 设备的地址类型|
|BluetoothDeviceId|蓝牙设备 ID|
|ConnectionStatus|设备的连接状态|
|DeviceAccessInformation|设备接受信息|
|DeviceId|设备 ID|
|DeviceInformation|蓝牙 LE 设备的设备信息|
|~~GattServices~~|~~获取设备支持的 GATT 服务的只读列表~~(API 已弃用)|
|Name|蓝牙 LE 设备的名称|
|WasSecureConnectionUsedForPairing|表示示 BluetoothLEDevice 是否使用安全连接进行配对|

Appearance 参数
  - Category
    - UInt16：设备功能描述 - [BluetoothLEAppearanceCategories](https://learn.microsoft.com/zh-cn/uwp/api/windows.devices.bluetooth.bluetoothleappearancecategories?view=winrt-22621)
  - RawValue
    - UInt16：设备功能秒速原始值
  - SubCategory
    - UInt16：设备子功能描述 - [BluetoothLEAppearanceSubcategories](https://learn.microsoft.com/zh-cn/uwp/api/windows.devices.bluetooth.bluetoothleappearancesubcategories?view=winrt-22621)
  - FromParts(UInt16, UInt16)
    - BluetoothLEAppearance：创建一个对象
  - FromRawValue(UInt16)
    - BluetoothLEAppearance：创建一个对象

BluetoothDeviceId 参数
  - Id
    - string：蓝牙设备ID
  - IsClassicDevice
    - true：表示设备具有经典蓝牙功能
    - false：表示设备没有经典蓝牙功能
  - IsLowEnergyDevice
    - true：表示设备具有低功耗蓝牙的功能
    - false：表示设备没有低功耗蓝牙的功能

ConnectionStatus 参数
  - Disconnected：设备已断开
  - Connected：设备已连接

DeviceAccessInformation 参数
  - CurrentStatus
    - Unspecified：未指定设备访问权限
    - Allowed：允许访问设备
    - DeniedByUser：用户已禁止访问设备
    - DeniedBySystem：系统已禁止访问设备
  - AccessChanged (事件)
    - 当对设备的访问权限发生更改时引发

DeviceId 参数
  - string：设备ID

[DeviceInformation](https://learn.microsoft.com/zh-cn/uwp/api/windows.devices.enumeration.deviceinformation?view=winrt-22621) 参数
  - EnclosureLocation：设备在其机箱中的物理位置
  - Id：表示设备标识的字符串
  - IsDefault：此设备是否为 类的默认设备
  - IsEnabled：此设备是否已启用
  - Kind：由此 对象表示的 DeviceInformation 的类型
  - Name：设备的名称
  - Pairing：有关此设备要配对的功能的信息
  - Properties：包含已知值以及可在设备枚举期间指定的其他属性的属性存储

Name 参数
  - string：设备名称

WasSecureConnectionUsedForPairing 参数
 - true：使用安全连接进行配对
 - false：不使用安全连接进行配对


2.3.1-2 基本方法 

|属性|描述|
|---|---|
|Close()|关闭此蓝牙 LE 设备。C\#无该API|
|Dispose()|执行与释放或重置非托管资源关联的应用程序定义的任务|
|FromBluetoothAddressAsync(...)|返回一个 BluetoothLEDevice 对象，该对象表示具有给定地址的对等蓝牙 LE 设备|
|FromIdAsync(String)|返回给定 ID 的 BluetoothLEDevice 对象|
|GetConnectionParameters()|检索远程设备的连接参数,当设备未连接时，连接参数无效|
|GetConnectionPhy()|检索有关蓝牙 LE 物理层的信息 (PHY),设备未连接时，连接 PHY 无效|
|~~GetDeviceSelectorFromBluetoothAddress(UInt64)~~|~~返回具有给定服务 ID 的 GATT 服务~~(API 已弃用)|
|GetGattServicesAsync(...)|获取此蓝牙 LowEnergy 设备的 GattDeviceServices|
|GetGattServicesForUuidAsync(...)|返回具有指定 UUID 的蓝牙 LowEnergy 设备的 GattDeviceServices|
|RequestAccessAsync()|请求访问蓝牙 LowEnergy 设备|
|RequestPreferredConnectionParameters(...)|检索指定的蓝牙 LE 首选连接参数对象的蓝牙 LE 首选连接参数请求对象。|

2.3.1-3 基本事件

**ConnectionParametersChanged** - 设备当前连接参数更改时引发的事件
  - BluetoothLEDevice：调用该事件的蓝牙设备
  - object：对象

**ConnectionPhyChanged** - 设备当前 PHY 更改时引发的事件
  - BluetoothLEDevice：调用该事件的蓝牙设备
  - object：对象

**ConnectionStatusChanged** - 当设备的连接状态发生更改时发生
  - BluetoothLEDevice：调用该事件的蓝牙设备
  - object：对象

**GattServicesChanged** - 当设备支持的 GATT 服务列表已更改时引发
  - BluetoothLEDevice：调用该事件的蓝牙设备
  - object：对象

**NameChanged** - 在设备名称更改时发生
  - BluetoothLEDevice：调用该事件的蓝牙设备
  - object：对象


#### 2.4 通信相关

```cs
public byte[] readData(gattcharacteristic val)
{
    byte[] res = null;
    if((val.CharacteristicProperties & GattCharacteristicProperties.Read) == 0){
        goto end;
    }

    GattReadResult readdata = val.ReadValueAsync(BluetoothCacheMode.Uncached).AsTask().GetAwaiter().GetResult();

    if(readdata.Status != GattCommunicationStatus.Success){
        goto end;
    }

    DataReader datard = DataReader.FromBuffer(readdata.Value);
    res = new byte[readdata.Value.Length];
    datard.ReadBytes(res); 

end:
    return res;
}

public async Task<byte[]> readDataAsync(gattcharacteristic val)
{
    byte[] res = null;
    if((val.CharacteristicProperties & GattCharacteristicProperties.Read) == 0){
        goto end;
    }

    GattReadResult readdata = await val.ReadValueAsync(BluetoothCacheMode.Uncached);

    if(readdata.Status != GattCommunicationStatus.Success){
        goto end;
    }

    DataReader datard = DataReader.FromBuffer(readdata.Value);
    res = new byte[readdata.Value.Length];
    datard.ReadBytes(res); 

end:
    return res;
}

public bool writeData(gattcharacteristic val,)
{
    bool res = false;
    if((val.CharacteristicProperties & GattCharacteristicProperties.Write) == 0){
        goto end;
    }
    GattCommunicationStatus sta = GattCommunicationStatus.Unreachable;
    sta = val.WriteValueAsync(CryptographicBuffer.CreateFromByteArray(_data), GattWriteOption.WriteWithResponse)

end:
    return res;
}

```







******

### 参考链接

1. [在桌面应用中调用 Windows 运行时 API](https://learn.microsoft.com/zh-cn/windows/apps/desktop/modernize/desktop-to-uwp-enhance)
2. [Assigned Numbers](https://www.bluetooth.com/specifications/an/)
3. [核心规范补充文件11](https://www.bluetooth.com/zh-cn/specifications/specs/core-specification-supplement-11/)