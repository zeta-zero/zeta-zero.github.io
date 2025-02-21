
#### 损失函数
**tf.keras.losses**
1. 回归问题的损失函数
- MeanSquaredError（均方误差）
- MeanAbsoluteError（均绝对误差）
- MeanAbsolutePercentageError（均绝对百分比误差）
- Huber （胡贝尔损失）  
  结合了均方误差和均绝对误差
- LogCosh（对数余弦误差）  
  它在回归问题中表现良好，尤其是对极端误差不敏感。
2. 分类问题的损失函数
- CategoricalCrossentropy（类别交叉熵）  
  用于多类别分类任务。假设目标是一个独热编码（one-hot encoded）的标签。
- SparseCategoricalCrossentropy（稀疏类别交叉熵）  
  与 CategoricalCrossentropy 类似，但输入标签是整数编码（而不是独热编码）
- BinaryCrossentropy（二元交叉熵）  
  用于二分类任务，计算两个类别之间的交叉熵损失。
- KLDivergence（KL 散度）
  计算预测分布与真实分布之间的 Kullback-Leibler 散度，它量化了两个概率分布之间的差异。
3. 其他损失函数
- CosineSimilarity（余弦相似度损失）  
  用于测量两个向量的相似度，通常在推荐系统、文本嵌入和图像相似度任务中使用。
- Poisson（泊松损失）  
  适用于处理具有 Poisson 分布的计数数据的回归任务。
- CoseLoss（对数损失）  
  适用于离散概率分布之间的损失，特别是在序列预测中。

#### 优化器
**tf.keras.optimizers**
1. SGD (Stochastic Gradient Descent)  
- 标准的随机梯度下降优化器
- 适用于简单任务，容易理解，计算开销较低
- learning_rate：学习率
- momentum：动量，用于加速SGD在相关方向上的收敛
- nesterov：是否使用Nesterov动量加速
2. Adam (Adaptive Moment Estimation)
- 一种广泛使用的优化算法，结合了RMSProp和动量的优点，能够适应学习率的变化
- 非常适用于复杂的神经网络，并且能够自适应调整每个参数的学习率
- learning_rate：学习率
- beta_1：一阶矩估计的衰减率（默认值0.9）
- beta_2：二阶矩估计的衰减率（默认值0.999）
- epsilon：避免除零错误的小常数
3. RMSprop (Root Mean Square Propagation)
- 用于处理非平稳目标的优化器，能够动态调整每个参数的学习率，解决了Adagrad的学习率过快衰减的问题
- 在递归神经网络（RNN）训练中尤其有效
- learning_rate：学习率。
- rho：梯度平方的衰减率（默认值0.9）
- epsilon：防止除零错误的小常数
4. Adagrad (Adaptive Gradient Algorithm)
- 每个参数有不同的学习率，且学习率随着时间逐渐衰减
- 适用于稀疏梯度问题，如自然语言处理和推荐系统
- learning_rate：初始学习率
- epsilon：防止除零错误的小常数
5. Adadelta
- 是Adagrad的改进版，通过限制累计梯度的衰减，使学习率不会单调下降
- 适用于需要较高计算效率的任务
- learning_rate：初始学习率。
- rho：梯度衰减的指数（默认值0.95）
- epsilon：防止除零错误的小常数
6. Ftrl (Follow The Regularized Leader)
- 适用于稀疏数据和在线学习
- learning_rate：学习率
- learning_rate_power：学习率的幂
- initial_accumulator_value：累加器的初始值
- l1_regularization_strength：L1正则化强度
- l2_regularization_strength：L2正则化强度
7. Nadam (Nesterov-accelerated Adaptive Moment Estimation)
- 结合了Adam和Nesterov加速的优点
- 通常比Adam有更好的效果，尤其是在复杂模型训练时
- learning_rate：学习率
- beta_1：一阶矩估计的衰减率（默认值0.9）
- beta_2：二阶矩估计的衰减率（默认值0.999）
- epsilon：防止除零错误的小常数
8. L-BFGS (Limited-memory Broyden–Fletcher–Goldfarb–Shanno)
- 一个二阶优化器，适用于小规模的优化任务，计算开销较大
- 较少使用，但在一些小规模高精度的任务中可能有效
-learning_rate：学习率


#### 机器学习常用编码方式
1. 标签编码（Label Encoding）：标签编码将每个类别映射到整数值，从0开始递增。这种方法对于具有有序关系的类别特征很有用，但它不适用于没有明显顺序的类别。
2. 序号编码（Ordinal Encoding）：在机器学习中，序号编码（Ordinal Encoding）是一种将离散特征的各个类别映射为整数序号的方法。序号编码适用于有序特征，其中类别之间存在一定的顺序关系，但没有明确的意义。
3. 独热编码（One-Hot Encoding）：这是最常用的方法之一，它将每个离散属性的每个类别创建一个新的二进制特征。对于每个样本，只有一个二进制特征为1，表示它属于对应的类别，其他特征为0。这种方法适用于具有有限数量的类别。
4. 频数编码（Count Encoding）：频数编码将每个类别替换为该类别在数据集中的频数或出现次数。这种编码方法可以提供关于类别的频率信息，但可能引入一定的信息泄漏。
5. 目标编码（Target Encoding）：目标编码将离散属性的每个类别编码为其在目标变量上的平均值或其他统计信息。目标编码能够捕获类别与目标变量之间的关联性，但需要注意信息泄漏和过拟合的问题。

### 问题系列

#### 问题1 - RuntimeError: tf.placeholder() is not compatible with eager execution

使用以下函数可避免使用 “tf.placeholder(...)”时，触发错误

```C#
  tf.compat.v1.disable_eager_execution();
```