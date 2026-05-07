## 卡尔曼滤波 / Kalman Filter
### 公式
-预测状态：
### 代码
使用位置和速度举例
```C
typedef struct{
    float X_State[2];         // 线性状态空间 0-位置 1-速度
    float F_Model[2][2];      // 运动模型 [[1,beta time],[0,1]]
    float P_Covariance[2][2]; // 预测协方差
    float H_Obser[2];         // 观测矩阵
    float Q_Nosiy[2][2];      // 过程噪声
    float R_Obser;          // 观测噪声协方差
}kalmanparam_t;

// _sigma_a : 加速度，过程噪声标准差
// _sigma_v ：速度，测量噪声标准差
void KalmanFilter_Init(kalmanparam_t *_obj,double _dt,double _sigma_a,double _sigma_v)
{
    _obj->X_State[0] = 0.0f;
    _obj->X_State[1] = 0.0f;

    _obj->F_Model[0][0] = 1.0f;
    _obj->F_Model[0][1] = _dt;
    _obj->F_Model[1][0] = 0.0f;
    _obj->F_Model[1][1] = 1.0f;

    _obj->H_Obser[0] = 0.0f;
    _obj->H_Obser[1] = 1.0f;

    // 过程噪声协方差 Q
    float dt2 = dt * dt;
    float dt3 = dt2 * dt;
    float dt4 = dt2 * dt2;
    float sigam_a_d = _sigma_a * _sigma_a;
    _obj->Q_Nosiy[0][0] = (dt4 / 4.0) * sigam_a_d;
    _obj->Q_Nosiy[0][1] = (dt3 / 2.0) * sigam_a_d;
    _obj->Q_Nosiy[1][0] = (dt3 / 2.0) * sigam_a_d;
    _obj->Q_Nosiy[1][1] = dt2 * sigam_a_d;

    _obj->R_Obser = _sigma_v * _sigma_v;

    // 估计协方差矩阵 P（初始化为较大值）
    _onj->P_Covariance[0][0] = 1.0f
    _onj->P_Covariance[0][1] = 0.0f
    _onj->P_Covariance[1][0] = 0.0f
    _onj->P_Covariance[1][1] = 1.0f
}

// _dt : 单位，秒
float KalmanFilter(kalmanparam_t *_obj,float _val，float _dt)
{
    // 状态转移 / 预测阶段 x = F * x
    _obj->F_Model[0][1] = _dt;
    _obj->X_State = MatrixMul(_obj->X_State,_obj->F_Model);
    float accbuf[1] = {_acc}; 
    float otherbuf = MatrixMul(obj->G_Other,accbuf);
    _obj->X_State = MatrixAdd(_obj->X_State,otherbuf);

    // 预测协方差  P = F * P * F^T + Q
    _obj->P_Covariance = MatrixMul(_obj->F_Model,_obj->P_Covariance);
    float fmodel_T[1][2] = MatrixTran(_obj->F_Model);
    _obj->P_Covariance = MatrixMul(_obj->P_Covariance,fmodel_T);
    _obj->P_Covariance = MatrixAdd(_obj->P_Covariance,_obj->Q_Nosiy);

    // 计算卡尔曼增益 K = P * H^T / (H * P * H^T + R)
    float s = 1 / (_obj->P_Covariance[1][1] + _obj->R_Obser);
    float kalman_k[2] = {_obj->P_Covariance[0][0] * s,_obj->P_Covariance[1][0] * s};

    // 更新协方差 P = (I - K * H) * P
    _obj->P_Covariance[0][0] -= kalman_k[0] * _obj->P_Covariance[0][1];
    _obj->P_Covariance[0][1] -= kalman_k[0] * _obj->P_Covariance[1][1];
    _obj->P_Covariance[1][0] -= kalman_k[1] * _obj->P_Covariance[0][1];
    _obj->P_Covariance[1][1] -= kalman_k[1] * _obj->P_Covariance[1][1];

    // 更新状态估计 x = x + K * (z - H * x)
    float y = _val - (_obj->X_State[0] * _obj->H_Obser[0] + _obj->X_State[1] * _obj->H_Obser[1]);
    _obj->X_State[0] += kalman_k[0] * y;
    _obj->X_State[1] += kalman_k[1] * y;
}
```

## 无迹卡尔曼滤波 / Unscented Kalman Filter
### 代码
使用位置和速度举例
```C
typedef struct{
    float X_State[2];         // 线性状态空间 0-位置 1-速度
    float H_Obser[2];         // 观测矩阵
    float F_Model[2][2];      // 运动模型 [[1,beta time],[0,1]]
    float P_Covariance[2][2]; // 预测协方差
    float Q_Nosiy[2][2];      // 过程噪声
    float R_Obser;          // 观测噪声协方差
}kalmanparam_t;

// _dt : 单位，秒
float ExtendKalmanFilter(kalmanparam_t *_obj,float _val,float _dt)
{
    // 预测状态
    _obj->F_Model[0][1] = _dt;
    _obj->X_State = MatrixMul(_obj->X_State,_obj->F_Model);

    // 预测协方差  P = F * P * F^T + Q
    _obj->P_Covariance = MatrixMul(_obj->F_Model,_obj->P_Covariance);
    float fmodel_T[1][2] = MatrixTran(_obj->F_Model);
    _obj->P_Covariance = MatrixMul(_obj->P_Covariance,fmodel_T);
    _obj->P_Covariance = MatrixAdd(_obj->P_Covariance,_obj->Q_Nosiy);

    // 计算卡尔曼增益 K = P * H^T / (H * P * H^T + R)
    float s = 1 / (_obj->P_Covariance[1][1] + _obj->R_Obser);
    float kalman_k[2] = {_obj->P_Covariance[0][0] * s,_obj->P_Covariance[1][0] * s};
}
```