#### 问题1 - RuntimeError: tf.placeholder() is not compatible with eager execution

使用以下函数可避免使用 “tf.placeholder(...)”时，触发错误

```C#
  tf.compat.v1.disable_eager_execution();
```