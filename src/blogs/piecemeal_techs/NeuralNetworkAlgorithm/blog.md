## MLP算法

### 1. 正向推理

#### 1.1 公式

假设第i层的第j个数据，输入数据为  $ x_{i,j}$，权重为 $w_{i,j}$，偏置为 $b_{i,j}$，激活函数为act，输出的数据为i+1层的输入数据，即 $x_{i+1,j}$

$ z_{i,j} $ 为第i层，第j个未激活数值，即 $ z_{i,j} = \sum_{j=1}^{n} w_{i,j} x_{i,j} + b_{i,j} $，则公式为 $ x_{i+1,j} = act(z_{i,j}) = act(\sum_{j=1}^{n} w_{i,j} x_{i,j} + b_{i,j}) $

用矩阵表示，输入矩阵为$ X_i = \begin{pmatrix} x_1 & x_2 & x_3 & ... & x_j \end{pmatrix}$，权重矩阵为 $ W_i = \begin{pmatrix} w_{1,1} & w_{1,2} & ... & w_{1,i+1} \\ w_{2,1} & w_{2,2} & ... & w_{2,i+1} \\ ... & ... & ... & ... \\ w_{j,1} & w_{j,2} & ... & w_{j,i+1} \end{pmatrix} $，偏置矩阵为 $  B_i = \begin{pmatrix} b_1 \\ b_2 \\ b_3 \\ ... \\ b_j \end{pmatrix}  $

则公式为$ X_{i+1} = act( X_i W_i + B_i ) $

#### 1.2 C#代码

```csharp
using MathNet.Numerics.LinearAlgebra.Double;
/* 权重矩阵,偏置矩阵  */
List<(DenseMatrix Weight, DenseMatrix Bias> Layers;

DenseMatrix FPMatrix(DenseMatrix input)
{
    DenseMatrix res = _val;
    for (int i = 0; i < Layers.Length; i++) {
        res = res * Layers[i].Weight;
        res.Add(Layers[i].Bias, res);
        ActFn(ref res);
    }
    return res;
}
```

### 2 反向传播

#### 2.1 公式

假设输出值为$o_j$，目标值为$ y_j$，损失函数计算 $ l_{i,j} = loss(o_j,y_j) $

误差计算$ e_{i,j} = \frac{\partial l_{i,j}}{\partial z_{i,j}} $，根据链式法则，可拆解为 $ e_{i,j} = \frac{\partial l_{i,j}}{\partial z_{i,j}} = \frac{\partial l_{i,j}}{\partial x_{i,j}} \cdot \frac{\partial x_{i,j}}{\partial z_{i,j}} $

则输出层误差公式 $ e_{i,j} = \frac{\partial l_{i,j}}{\partial x_{i,j}} \odot act'(z_{i,j}) $

计算上一层的误差

$$
e_{i-1,j} = \frac{\partial l_{i-1,j}}{\partial z_{i-1,j}} =
\frac{\partial l_{i-1,j}}{\partial z_{i,j}} \cdot \frac{\partial z_{i,j}}{\partial z_{i-1,j}} = 
(w_{i,j}^T \cdot e_{i,j}) \odot act'(z_{i-1,j})
$$

根据当前层的误差项$ e_{i,j} $，计算损失值对权重的偏导

$$
\frac{\partial l_{i,j}}{\partial w_{i,j}} = 
\frac{\partial l_{i,j}}{\partial z_{i,j}} \cdot \frac{\partial z_{i,j}}{\partial w_{i,j}} =
e_{i,j} \cdot x_{i-1,j}^T
$$

计算损失值对偏置的偏导

$$
\frac{\partial l_{i,j}}{\partial b_{i,j}} =
\frac{\partial l_{i,j}}{\partial z_{i,j}} \cdot \frac{\partial z_{i,j}}{\partial b_{i,j}} = 
e_{i,j}
$$

参数更新，权重$ w_{i,j} = w_{i,j} - \eta \frac{\partial l_{i,j}}{\partial w_{i,j}} $，偏置$ b_{i,j} = b_{i,j} - \eta \frac{\partial l_{i,j}}{\partial b_{i,j}} $

#### 2.2 C#代码

```csharp
using MathNet.Numerics.LinearAlgebra.Double;
double LR = 0.01;
class layerinfo{
    public DenseMatrix Error;
    public DenseMatrix LayerData_NotAct; /* 未激活的中间计算数据 z = x * w + b */
    public DenseMatrix LayerData;        /* 激活的中间计算数据 z_act = act(x * w + b) */
    public DenseMatrix Weight;
    public DenseMatrix Bias;
};
List<layerinfo> Layers;
void BPMatrix(DenseMatrix input,DenseMatrix output,DenseMatrix predict)
{
    DenseMatrix loss = LossFn(output,value);
    /* 上一层的未激活输出值 对激活函数求导 */
    DenseMatrix na_val =  Deriv_ActFn(Layers[^1].LayerData_NotAct);
    Layers[^1].error = loss.PointwiseMultiply(na_val );
    for(int i = Layers.count - 1;i > 0;i--){
        /* 当前层的权重的转置 */
  	DenseMatrix w_t = Layers[i].Weight.Transpose();
        /* 上一层的未激活输出值 对激活函数求导 */
        na_val =  Deriv_ActFn(Layers[i-1].LayerData_NotAct);
        /* 计算上一层的误差值 */
        Layers[i-1].error = Layers[i].Error.Multiply(w_t).PointwiseMultiply(na_val);
  
        /* 损失对权重的偏导 */
        DenseMatrix x_t = Layers[i-1].LayerData.Transpose();
        DenseMatrix pd_lw = Layers[i].Error.Multiply(x_t);
        Layers[i].Weight = Layers[i].Weight - pd_lw.Multiply(LR);
        Layers[i].Bias = Layers[i].Bias - Layers[i].Error.Multiply(LR);
    }
    /* 损失对权重的偏导 */
    DenseMatrix x_t = input.Transpose();
    DenseMatrix pd_lw = Layers[0].Error.Multiply(x_t);
    Layers[0].Weight = Layers[0].Weight - pd_lw.Multiply(LR);
    Layers[0].Bias = Layers[0].Bias - Layers[i].Error.Multiply(LR);
  
}


```

### 3 激活函数

#### ReLU

$ f(n) = \begin{cases} n & ,n > 0 \\0 & ,n <= 0\end{cases} $，对应的导数 $ f'(n) = \begin{cases} 1 &,n>0 \\ 0 & ,n<=0 \end{cases} $

#### LeakyReLU

$ f(n,b) = \begin{cases} n&,n>0 \\ n*b&,n<=0 \end{cases} $，对应的导数$ f'(n,b)=\begin{cases} 1&,n>0 \\ b&,n<=0 \end{cases} $

### 4 损失函数

输入的值x，为预测值与标准值的差

#### MSE(均方误差)

$ f(x)= \frac{\sum_{i=1}^{n}(x_i)^2}{n} $，对应的导数$ f'(x)= -2 \cdot x $

#### MAE(平均绝对值误差)

$ f(x) = \frac{\sum_{i=1}^{n}{|x_i|}}{n}  $，对应的导数$ f'(x) = \begin{cases} 1 &,x >= 0 \\ 0 &, x < 0\end{cases} $

#### Smooth L1 Loss ，又叫 Huber损失函数

$ f(x,\beta) = \begin{cases} |x| - 0.5\beta &,|x|>=\beta \\ 0.5\frac{x^2}{\beta} &,|x|<\beta \end{cases} $，对应的导数$ f'(x,\beta) = \begin{cases} sign(x) &,|x|>=\beta \\ \frac{x}{\beta} &,|x|<\beta \end{cases} $

默认情况下$ \beta = 1 $

### 5 可变学习率

#### 余弦退火

$\eta = \eta_{min} + 0.5(\eta_{max} - \eta_{min})(1 + cos(\frac{T_{cur}}{T_{max}}\pi))$，其中$T_{cur}$为当前轮次，$T_{max}$为半个周期

改进的话，动态调整$T_{max}$，例如，$T_{max}$初始为10，每100个周期判断，当前周期 $T_{cur}$ 是否超过$T_{max}$?超过，则$T_{cur}$置0，$T_{max}$放大2倍























-----end-----
