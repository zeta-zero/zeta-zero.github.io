
### 一 整体结构

#### 1 信息处理流程
******

##### 1.1 Accesss Message / 访问信息

- 原始数据
  - <font color="#666" style="background:#d9ed92">&ensp;SrcData&ensp;</font>
- 添加 Access Message 头
  - <font color="#666" style="background:#b5e48c">&ensp;Access Message Head&ensp;</font> | <font color="#666" style="background:#d9ed92">&ensp;SrcData&ensp;</font>
- 加密 Access Message 信息，成为 UpperTransportPDU
  - <font color="#FFF" style="background:#76c893">&ensp;EncAccessMessage&ensp;</font> | <font color="#666" style="background:#99d98c">&ensp;TransMIC&ensp;</font> =  
    Encrypt(<font color="#FFF" style="background:#666">&ensp;Device Key&ensp;</font> ,
            <font color="#FFF" style="background:#666">&ensp;Device Nonce&ensp;</font> ,
            <font color="#666" style="background:#b5e48c">&ensp;Access Message Head&ensp;</font> | <font color="#'666'" style="background:#d9ed92">&ensp;SrcData&ensp;</font>)  
- 添加 Segmented 信息，成为 LowerTransportPDU
  - <font color="#FFF" style="background:#52b69a">&ensp;Segmented Head&ensp;</font> |
    <font color="#FFF" style="background:#76c893">&ensp;EncAccessMessage&ensp;</font> |
    <font color="#666" style="background:#99d98c">&ensp;TransMIC&ensp;</font>
- 加密 Segmented 信息，成为 NetworkPDU 内容
  - <font color="#FFF" style="background:#168aad">&ensp;EcnDST || EncTransportPDU&ensp;</font> | <font color="#FFF" style="background:#34a0a4">&ensp;NetMIC&ensp;</font> =   
    Encrypt(<font color="#FFF" style="background:#666">&ensp;DST&ensp;</font> ,
            <font color="#FFF" style="background:#666">&ensp;EncryptionKey&ensp;</font> ,
            <font color="#FFF" style="background:#666">&ensp;Network Nonce&ensp;</font> ,
            <font color="#FFF" style="background:#52b69a">&ensp;Segmented Head&ensp;</font> |
            <font color="#FFF" style="background:#76c893">&ensp;EncAccessMessage&ensp;</font> |
            <font color="#666" style="background:#99d98c">&ensp;TransMIC&ensp;</font>)
- 添加 Obfuscation 信息，成为 NetworkPDU
  - <font color="#FFF" style="background:#1a759f">&ensp;Obfuscation Head&ensp;</font> |
    <font color="#FFF" style="background:#168aad">&ensp;EcnDST || EncTransportPDU&ensp;</font> | 
    <font color="#FFF" style="background:#34a0a4">&ensp;NetMIC&ensp;</font>