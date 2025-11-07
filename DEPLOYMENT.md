# ECS Image Handler 部署指南

## 📋 前置要求

### 系统要求
- **Node.js**: 18.x 或更高版本
- **AWS CLI**: 2.x 版本，已配置凭证
- **CDK CLI**: 2.1031.2 或更高版本
- **Docker**: 用于容器构建（可选）

### AWS 权限要求
确保 AWS 凭证具有以下权限：
- CloudFormation 完整权限
- ECS 完整权限
- S3 完整权限
- IAM 角色创建权限
- CloudFront 分发权限
- SSM Parameter Store 权限

## 🚀 快速部署

### 1. 克隆项目

```bash
git clone <repository-url>
cd ecs-image-handler
```

### 2. 快速部署（推荐）

```bash
./quick-deploy.sh
```

脚本会提示输入：
- **部署区域**: 如 `ap-southeast-1`
- **S3 桶名**: 如 `my-image-bucket`

### 3. 验证部署

部署完成后，脚本会输出：
- ALB URL
- CloudFront URL
- S3 桶名

## 🔧 详细部署步骤

### 方法一：交互式部署

```bash
# 1. 初始化配置
./init.sh

# 2. 部署应用
cd infrastructure
cdk deploy --region <your-region>
```

### 方法二：区域特定部署

```bash
./deploy-region.sh
```

### 方法三：手动部署

```bash
# 1. 安装依赖
cd infrastructure
npm install

# 2. CDK Bootstrap（首次部署）
cdk bootstrap aws://<account-id>/<region>

# 3. 创建 SSM 参数
aws ssm put-parameter \
  --name "/ecs-image-handler/config" \
  --type "String" \
  --value '{"buckets": ["your-bucket"], "max_gif_size_mb": 10, "max_gif_pages": 200}' \
  --region <your-region>

# 4. 创建 S3 桶
aws s3 mb s3://your-bucket --region <your-region>

# 5. 部署应用
cdk deploy --region <your-region>
```

## 🌍 多区域部署

### 支持的区域
项目已在以下区域测试：
- `ap-southeast-1` (新加坡)
- `ap-northeast-1` (日本)
- 理论上支持所有 AWS 区域

### 多区域部署步骤

```bash
# 区域 1
./quick-deploy.sh
# 输入: ap-southeast-1, bucket-ase1

# 区域 2  
./quick-deploy.sh
# 输入: ap-northeast-1, bucket-ane1
```

## ⚙️ 配置说明

### SSM 参数配置

```json
{
  "buckets": ["bucket-name"],
  "max_gif_size_mb": 10,
  "max_gif_pages": 200
}
```

### CDK 上下文配置

```json
{
  "buckets": ["bucket-name"],
  "config_json_parameter_name": "/ecs-image-handler/config",
  "ecs_desired_count": 2,
  "enable_waf": false,
  "enable_cloudfront": true,
  "enable_public_alb": true,
  "use_default_vpc": "0"
}
```

### 环境变量

```bash
export CDK_DEFAULT_REGION=ap-southeast-1
export AWS_REGION=ap-southeast-1
```

## 🧪 部署验证

### 1. 健康检查

```bash
# ALB 健康检查（应返回 403）
curl http://<alb-url>/health

# 根路径检查（应返回 "ok"）
curl http://<alb-url>/
```

### 2. 功能测试

```bash
# 上传测试图片
aws s3 cp test-assets/test-image.jpg s3://your-bucket/ --region <region>

# 测试图片处理
curl -I "https://<cloudfront-url>/test-image.jpg?x-oss-process=image/resize,w_200,h_200"
```

### 3. 服务状态检查

```bash
# 检查 ECS 服务
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --region <region>

# 检查 CloudFormation 堆栈
aws cloudformation describe-stacks \
  --stack-name ecs-image-handler-stack \
  --region <region>
```

## 🔄 更新部署

### 代码更新

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重新部署
cd infrastructure
cdk deploy --region <your-region>
```

### 配置更新

```bash
# 更新 SSM 参数
aws ssm put-parameter \
  --name "/ecs-image-handler/config" \
  --type "String" \
  --value '{"buckets": ["new-bucket"], "max_gif_size_mb": 20}' \
  --overwrite \
  --region <your-region>

# 重启 ECS 服务
aws ecs update-service \
  --cluster <cluster-name> \
  --service <service-name> \
  --force-new-deployment \
  --region <your-region>
```

## 🧹 清理资源

### 清理应用资源

```bash
# 使用清理脚本（推荐）
./cleanup.sh

# 或手动清理
cd infrastructure
cdk destroy --region <your-region>
```

### 清理 S3 桶

```bash
# 清空桶内容
aws s3 rm s3://your-bucket --recursive --region <your-region>

# 删除桶
aws s3 rb s3://your-bucket --region <your-region>
```

### 保留 CDK Bootstrap

⚠️ **注意**: 不要删除 CDKToolkit 堆栈，它是 CDK 的基础设施，可以被多个项目共享。

## 🐛 故障排除

### 常见问题

#### 1. CDK Bootstrap 失败

```bash
# 错误: S3 桶已存在
# 解决: 删除冲突的桶
aws s3 rb s3://cdk-hnb659fds-assets-<account>-<region> --force --region <region>

# 重新 bootstrap
cdk bootstrap aws://<account>/<region>
```

#### 2. TypeScript 编译错误

```bash
# 清理缓存
rm -rf node_modules/.cache
rm -rf cdk.out

# 重新安装依赖
npm install
```

#### 3. ECS 服务启动失败

```bash
# 检查日志
aws logs describe-log-groups --region <region>
aws logs get-log-events \
  --log-group-name <log-group> \
  --log-stream-name <log-stream> \
  --region <region>
```

#### 4. CloudFront 403 错误

```bash
# 检查 Origin Access Control 配置
# 确保 S3 桶策略正确配置
```

### 调试技巧

```bash
# 启用 CDK 详细日志
export CDK_DEBUG=true

# 检查 CDK 差异
cdk diff --region <region>

# 验证 CDK 合成
cdk synth --region <region>
```

## 📊 监控和日志

### CloudWatch 日志

- ECS 任务日志: `/ecs/ecs-image-handler-stack-*`
- ALB 访问日志: 自动配置
- CloudFront 访问日志: 可选配置

### 监控指标

- ECS 服务 CPU/内存使用率
- ALB 请求数和响应时间
- CloudFront 缓存命中率
- S3 请求数和错误率

## 🔐 安全最佳实践

1. **最小权限原则**: ECS 任务角色只包含必要权限
2. **私有 S3 桶**: 通过 CloudFront OAC 访问
3. **HTTPS 强制**: CloudFront 强制 HTTPS
4. **访问日志**: 启用所有服务的访问日志

## 📞 支持

如遇到部署问题：
1. 检查 [故障排除](#-故障排除) 部分
2. 查看 [测试结果](./TEST_RESULTS.md) 对比
3. 创建 GitHub Issue 并提供详细日志