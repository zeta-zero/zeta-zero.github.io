---
title: 加密解密的相关资料
series: techs
modtime: 2023/11/28
---

## ECDH - 匿名密匙互换协议

ECDH全称是椭圆曲线迪菲-赫尔曼秘钥交换（Elliptic Curve Diffie–Hellman key Exchange），主要是用来在一个不安全的通道中建立起安全的共有加密资料，一般来说交换的都是私钥，这个密钥一般作为“对称加密”的密钥而被双方在后续数据传输中使用。

### 曲线类型

#### &nbsp;  NIST P-256 / prime256v1(ANSIX9.62) / secp256r1(SEGC)

### BLE MESH

在BLE MESH中，使用的是P-256椭圆曲线。

### 在编程语言中使用方式

#### &nbsp;  C\# - ECDiffieHellman

在C\#中，ECDiffieHellman类实现了匿名密匙互换协议的功能，可以很方便的利用该类实现密匙互换。

<details class="md-blog-details">
<summary class="md-blog-summary">more...</summary>

##### 1. 创建一个 NIST P-256 的加解密方式，并获得X和Y值

```cs
using System.Security.Cryptography;

public void demo1(){
    using(ECDiffieHellman ecdh = ECDiffieHellman.Create(ECCurve.NamedCurves.nistP256)){
        ECParameters param = content.ExportParameters(false);
        Console.WriteLine(BitConverter.ToString(parameters.Q.X),BitConverter.ToString(parameters.Q.Y));
    }
}
    
```

1.1 ECDiffieHellman 类

1.1.1 基本属性

|属性|描述|
|---|---|
|KeyExchangeAlgorithm|密钥交换算法的名称|
|KeySize|密钥交换算法的名称|
|LegalKeySizes|非对称算法支持的密钥大小|
|PublicKey|当前椭圆曲线 Diffie-Hellman (ECDH) 实例正在使用的公钥|
|SignatureAlgorithm|签名算法的名称|

KeyExchangeAlgorithm
  - string：密钥交换算法的名称

KeySize 
  - Int32：非对称算法所用密钥模块的大小

LegalKeySizes
  - KeySizes[]：非对称算法支持的密钥大小

PublicKey
  - ExportExplicitParameters()：导出 ECCurve 对象的显式 ECParameters
  - ExportParameters()：导出 ECCurve 对象的已命名或显式 ECParameters
  - ExportSubjectPublicKeyInfo()：导出 X.509 SubjectPublicKeyInfo 格式的当前密钥

SignatureAlgorithm
  - String：签名算法，总是为 null。

1.1.2 基本方法

|属性|描述|
|---|---|
|Clear()|释放 AsymmetricAlgorithm 类使用的所有资源|
|Create(...)|创建椭圆曲线 Diffie-Hellman (ECDH) 算法的默认实现的一个新实例|
|DeriveKeyFromHash(...)|使用指定的哈希算法执行密钥派生|
|DeriveKeyFromHmac(...)|使用指定的 HMAC（基于哈希的消息验证代码）算法执行密钥派生|
|DeriveKeyMaterial(ECDiffieHellmanPublicKey)|对共享机密执行密钥派生|
|DeriveKeyTls<br>(ECDiffieHellmanPublicKey, Byte[], Byte[])|使用 TLS（传输层安全性）1.1 PRF（伪随机函数）执行密钥派生|
|Dispose(...)|释放 AsymmetricAlgorithm 类的当前实例所使用的所有资源|
|Equals(Object)|确定指定对象是否等于当前对象|
|ExportECPrivateKey()|以 ECPrivateKey 格式导出当前密钥|
|ExportECPrivateKeyPem()|以 ECPrivateKey 格式导出当前密钥（PEM 编码）|
|ExportEncryptedPkcs8PrivateKey(...)|使用基于字节的密码以 PKCS#8 EncryptedPrivateKeyInfo 格式导出当前密钥|
|ExportEncryptedPkcs8PrivateKeyPem(...)|使用基于字节的密码（PEM 编码）导出 PKCS#8 EncryptedPrivateKeyInfo 格式的当前密钥|
|ExportExplicitParameters(...)|导出 ECCurve 的显式 ECParameters|
|ExportParameters(...)|导出 ECCurve 的命名或显式 ECParameters 。 如果曲线具有名称，则 Curve 属性将包含命名曲线参数，否则将包含显式参数|
|ExportPkcs8PrivateKey()|以 PKCS#8 PrivateKeyInfo 格式导出当前密钥|
|ExportPkcs8PrivateKeyPem()|导出 PKCS#8 PrivateKeyInfo 格式（PEM 编码）的当前密钥|
|ExportSubjectPublicKeyInfo()|以 X.509 SubjectPublicKeyInfo 格式导出当前密钥的公钥部分|
|ExportSubjectPublicKeyInfoPem()|以 X.509 SubjectPublicKeyInfo 格式（PEM 编码）导出当前密钥的公钥部分|
|FromXmlString(String)|用于重新构造 AsymmetricAlgorithm 对象|
|GenerateKey(ECCurve)|指定的曲线生成新的公钥/私钥对|
|GetHashCode()|作为默认哈希函数|
|ImportECPrivateKey(ReadOnlySpan\<Byte\>, Int32)|从 ECPrivateKey 结构中导入公共/私有密钥对，替换此对象的密钥|
|ImportEncryptedPkcs8PrivateKey(...)|使用基于字节的密码解密之后，从 PKCS#8 EncryptedPrivateKeyInfo 结构中导入公/私钥对，以替换此对象的密钥|
|ImportFromEncryptedPem(...)|导入已加密的 RFC 7468 PEM 编码的私钥，替换此对象的密钥|
|ImportFromPem(ReadOnlySpan\<Char\>)|导入 RFC 7468 PEM 编码的密钥，替换此对象的密钥|
|ImportParameters(ECParameters)|导入 RFC 7468 PEM 编码的密钥，替换此对象的密钥|
|ImportPkcs8PrivateKey<br>(ReadOnlySpan\<Byte\>, Int32)|解密后，从 PKCS#8 PrivateKeyInfo 结构中导入公/私钥对，以替换此对象的密钥|
|ImportSubjectPublicKeyInfo<br>(ReadOnlySpan\<Byte\>, Int32)|解密后从 X.509 SubjectPublicKeyInfo 结构导入公钥，替换此对象的密钥|
|ToXmlString(Boolean)|转化为xml字符串|
|TryExportECPrivateKey(Span\<Byte\>, Int32)|尝试以 ECPrivateKey 格式将当前密钥导入所提供的缓冲区|
|TryExportECPrivateKeyPem(Span\<Char\>, Int32)|尝试将 PEM 编码的 ECPrivateKey 格式的当前密钥导出到提供的缓冲区中|
|TryExportEncryptedPkcs8PrivateKey(...)|尝试将 PEM 编码的 ECPrivateKey 格式的当前密钥导出到提供的缓冲区中|
|TryExportEncryptedPkcs8PrivateKeyPem(...)|尝试使用基于字节的密码（PEM 编码）导出 PKCS#8 EncryptedPrivateKeyInfo 格式的当前密钥|
|TryExportPkcs8PrivateKey(Span\<Byte\>, Int32)|尝试以 PKCS#8 PrivateKeyInfo 格式将当前密钥导出到所提供的缓冲区|
|TryExportPkcs8PrivateKeyPem(Span\<Char\>, Int32)|尝试将 PEM 编码 PKCS#8 PrivateKeyInfo 格式的当前密钥导出到提供的缓冲区中|
|TryExportSubjectPublicKeyInfo(Span\<Byte\>, Int32)|尝试以 X.509 SubjectPublicKeyInfo 格式将当前密钥导出到所提供的缓冲区|
|TryExportSubjectPublicKeyInfoPem(Span\<Char\>, Int32)|尝试以 X.509 SubjectPublicKeyInfo 格式将当前密钥导出到所提供的缓冲区|

1.2 ECCurve 结构体

1.2.1 结构体字段

|属性|描述|
|---|---|
|A|显式曲线的第 1 个系数。 Weierstrass、Montgomery 和 Twisted Edwards 短曲线的|
|B|显式曲线的第 2 个系数。 对于 short Weierstrass 曲线，为 B；对于 Twisted Edwards 曲线，为 d|
|Cofactor|曲线的余因子|
|CurveType|确定 ECCurve 对象的组成|
|G|确定 ECCurve 对象的组成|
|Hash|哈希算法的名称，此算法用于根据 ANSI X9.62 生成算法从 Seed 生成曲线系数（A 和 B）。 仅适用于显式曲线|
|Order|曲线的顺序。 仅适用于显式曲线|
|Polynomial|多项式曲线。 仅适用于特征 2 曲线|
|Prime|指定基本字段的素数。 仅适用于素数曲线|
|Seed|ANSI X9.62 生成算法下系数生成的种子值。 仅适用于显式曲线|

A 参数
  - byte[]：显式曲线的第 1 个系数

B 参数
  - byte[]：显式曲线的第 2 个系数

Cofactor 参数
  - byte[]：曲线的余因子

CurveType 参数
  - Implicit：没有解释曲线数据。 假定调用方了解曲线
  - PrimeShortWeierstrass：曲线参数表示素数曲线，素数字段 P 中的公式为 y^2 = x^3 + A*x + B
  - PrimeTwistedEdwards：曲线参数表示素数曲线，素数字段 P 中的公式为 A*x^2 + y^2 = 1 + B*x^2*y^2
  - PrimeMontgomery：曲线参数表示素数曲线，素数字段 P 中的公式为 A*x^2 + y^2 = 1 + B*x^2*y^2
  - Characteristic2：曲线参数表示特征 2 曲线
  - Named：曲线参数表示已命名曲线

G 参数
  - ECPoint
    - X： X 坐标
    - Y： Y 坐标

Hash 参数
  - [HashAlgorithmName](https://learn.microsoft.com/zh-cn/dotnet/api/system.security.cryptography.hashalgorithmname?view=net-7.0)：哈希算法的名称

Order 参数
  - byte[]：曲线的顺序

Polynomial 参数
  - byte[]：多项式曲线。 仅适用于特征 2 曲线

Prime 参数
  - byte[]：指定基本字段的素数。 仅适用于素数曲线

Seed 参数
  - byte[]：ANSI X9.62 生成算法下系数生成的种子值。 仅适用于显式曲线


1.2.2 属性

|属性|描述|
|---|---|
|IsCharacteristic2|指示曲线类型是否指示显式特征 2 曲线|
|IsExplicit|指示曲线类型是否指示显式曲线（素数曲线或特征 2 曲线）|
|IsNamed|指示曲线类型是否指示已命名曲线|
|IsPrime|指示曲线类型是否指示显式素数曲线|
|Oid|获取已命名曲线的标识符|
|NamedCurves|曲线名字的集合|

IsCharacteristic2 参数
  - true：该曲线是显式特征 2 曲线
  - false：该曲线是已命名特征 2、素数或隐式曲线

IsExplicit 参数
  - true：显式曲线（素数曲线或特征 2 曲线）
  - false：已命名或隐式曲线

IsNamed 参数
  - true：命名曲线
  - false：是隐式或显式曲线

IsPrime 参数
  - true：显式素数曲线
  - false：已命名素数、特征 2 或隐式曲线

Oid 参数
  - [Oid](https://learn.microsoft.com/zh-cn/dotnet/api/system.security.cryptography.oid?view=net-7.0)：加密对象标识符

NamedCurves 参数 静态
  - brainpoolP160r1
  - brainpoolP160t1
  - brainpoolP192r1
  - brainpoolP192t1
  - brainpoolP224r1
  - brainpoolP224t1
  - brainpoolP256r1
  - brainpoolP256t1
  - brainpoolP320r1
  - brainpoolP320t1
  - brainpoolP384r1
  - brainpoolP384t1
  - brainpoolP512r1
  - brainpoolP512t1
  - nistP256
  - nistP384
  - nistP521

1.2.3 方法

|属性|描述|
|---|---|
|CreateFromFriendlyName(String)|使用标识符的指定友好名称创建命名的曲线|
|CreateFromOid(Oid)|使用指定的 Oid 对象创建已命名曲线|
|CreateFromValue(String)|使用指定的标识符点分十进制表示形式创建已命名曲线|
|Validate()|验证当前曲线的完整性。 如果结构无效，将引发 CryptographicException 异常|

1.3 ECParameters 结构体

1.3.1 字段

|属性|描述|
|---|---|
|Curve|表示与公钥 (Q) 和可选私钥 (D) 相关联的曲线|
|D|表示椭圆曲线加密 (ECC) 算法的私钥 D（保存为大端格式）|
|Q|表示椭圆曲线加密 (ECC) 算法的公钥 Q|

Curve 参数
  - ECCurve：表示与公钥 (Q) 和可选私钥 (D) 相关联的曲线 > 参考 1.2

D 参数
  - byte[]：椭圆曲线加密 (ECC) 算法的私钥 D（保存为大端格式）

Q 参数
  - ECPoint：
    - X： X 坐标
    - Y： Y 坐标

1.3.2 方法

|属性|描述|
|---|---|
|Validate()|验证当前对象|



</details>


Chilkat for .Net - AES-CMAC


## AES-CMAC 消息认证算法

AES-CMAC可以用于验证消息的完整性和身份验证。它使用一个密钥来生成一个固定长度的标记，该标记可以用于验证消息的完整性。与其他消息认证码算法相比，CMAC更加安全，因为它可以抵御各种攻击，包括长度扩展攻击和碰撞攻击。但是，它的计算速度较慢。

该算法在[RFC4493](https://www.rfc-editor.org/rfc/rfc4493)中有很好的描述。

### 在编程语言中实现

#### &nbsp;使用C#实现相关功能

```cs
using System.Security.Cryptography;

byte[] encryptAES(byte[] key, byte[] iv, byte[] data)
{
    byte[] res = null;
    using (MemoryStream ms = new MemoryStream()) {
        Aes aesvalue = Aes.Create();

        aesvalue.Mode = CipherMode.CBC;
        aesvalue.Padding = PaddingMode.None;

        using (CryptoStream cs = new CryptoStream(ms, aesvalue.CreateEncryptor(key, iv), CryptoStreamMode.Write)) {
            cs.Write(data, 0, data.Length);
            cs.FlushFinalBlock();

            res = ms.ToArray();
        }
    }
    return res;
}

byte[] moveRol(byte[] b)
{
    byte[] r = new byte[b.Length];
    byte carry = 0;
    for (int i = b.Length - 1; i >= 0; i--) {
        ushort u = (ushort)(b[i] << 1);
        r[i] = (byte)((u & 0xff) + carry);
        carry = (byte)((u & 0xff00) >> 8);
    }
    return r;
}

byte[] calAESCMAC(byte[] key, byte[] data)
{
    // SubKey generation
    // step 1, AES-128 with key K is applied to an all-zero input block.
    byte[] L = encryptAES(key, new byte[16], new byte[16]);

    // step 2, K1 is derived through the following operation:
    byte[] FirstSubkey = moveRol(L); //If the most significant bit of L is equal to 0, K1 is the left-shift of L by 1 bit.
    if ((L[0] & 0x80) == 0x80)
        FirstSubkey[15] ^= 0x87; // Otherwise, K1 is the exclusive-OR of const_Rb and the left-shift of L by 1 bit.

    // step 3, K2 is derived through the following operation:
    byte[] SecondSubkey = moveRol(FirstSubkey); // If the most significant bit of K1 is equal to 0, K2 is the left-shift of K1 by 1 bit.
    if ((FirstSubkey[0] & 0x80) == 0x80)
        SecondSubkey[15] ^= 0x87; // Otherwise, K2 is the exclusive-OR of const_Rb and the left-shift of K1 by 1 bit.

    // MAC computing
    if (((data.Length != 0) && (data.Length % 16 == 0)) == true) {
        // If the size of the input message block is equal to a positive multiple of the block size (namely, 128 bits),
        // the last block shall be exclusive-OR'ed with K1 before processing
        for (int j = 0; j < FirstSubkey.Length; j++)
            data[data.Length - 16 + j] ^= FirstSubkey[j];
    }
    else {
        // Otherwise, the last block shall be padded with 10^i
        byte[] padding = new byte[16 - data.Length % 16];
        padding[0] = 0x80;

        data = data.Concat<byte>(padding.AsEnumerable()).ToArray();

        // and exclusive-OR'ed with K2
        for (int j = 0; j < SecondSubkey.Length; j++)
            data[data.Length - 16 + j] ^= SecondSubkey[j];
    }

    // The result of the previous process will be the input of the last encryption.
    byte[] encResult = encryptAES(key, new byte[16], data);

    byte[] HashValue = new byte[16];
    Array.Copy(encResult, encResult.Length - HashValue.Length, HashValue, 0, HashValue.Length);

    return HashValue;
}

```

以上代码来源于[stackoverflow](https://stackoverflow.com/questions/29163493/aes-cmac-calculation-c-sharp)。
