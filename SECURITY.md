# 安全指南

## 🔒 项目安全实践

本项目已经过全面的安全清理，移除了所有敏感信息。以下是我们采用的安全最佳实践。

## 🚫 已移除的敏感信息

### AWS 账户信息
- ✅ AWS 账户 ID
- ✅ 资源 ARN
- ✅ 具体的资源名称
- ✅ 区域特定的配置

### 基础设施标识符
- ✅ S3 桶名
- ✅ CloudFront 分发 ID
- ✅ ALB DNS 名称
- ✅ ECS 集群和服务名

### 网络配置
- ✅ VPC ID
- ✅ 子网 ID
- ✅ 安全组 ID
- ✅ 具体的 IP 地址

## 🛡️ 安全占位符

代码中使用了通用占位符替代实际值：

```typescript
// 示例：使用占位符
const bucketName = '<bucket-name>';
const accountId = '<account-id>';
const region = '<region>';
```

## 📋 .gitignore 保护

项目包含全面的 `.gitignore` 文件，防止意外提交敏感信息：

```gitignore
# AWS 和敏感数据
*.pem
*.key
aws-exports.js
.aws/
credentials

# 安全 - 永不提交这些模式
*secret*
*password*
*credential*
*token*
*key*
*.pem
*.p12
*.pfx

# AWS 特定
aws-config.json
.aws-sam/
samconfig.toml
```

## 🔐 部署安全

### IAM 最小权限原则

```typescript
// ECS 任务角色只包含必要权限
const taskRole = new iam.Role(this, 'TaskRole', {
  assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
  managedPolicies: [
    // 仅必要的 S3 访问权限
    iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess')
  ]
});
```

### 网络安全

- **私有子网**: ECS 任务运行在私有子网中
- **安全组**: 最小化端口开放
- **HTTPS 强制**: CloudFront 强制 HTTPS 访问

### 数据保护

- **S3 桶策略**: 通过 CloudFront OAC 限制访问
- **传输加密**: 所有数据传输使用 HTTPS
- **访问日志**: 启用 CloudFront 和 ALB 访问日志

## 🔍 代码审查检查清单

在提交代码前，请检查：

- [ ] 没有硬编码的 AWS 账户 ID
- [ ] 没有具体的资源名称或 ARN
- [ ] 没有 API 密钥或访问令牌
- [ ] 没有具体的 IP 地址或域名
- [ ] 使用了环境变量或参数存储
- [ ] 更新了 `.gitignore` 文件

## 📝 贡献指南

### 提交前检查

```bash
# 检查是否有敏感信息
grep -r "arn:aws" .
grep -r "amazonaws.com" .
grep -r "[0-9]\{12\}" .  # AWS 账户 ID 模式
```

### 使用占位符

```typescript
// ✅ 正确：使用占位符
const bucketName = process.env.BUCKET_NAME || '<bucket-name>';

// ❌ 错误：硬编码实际值
const bucketName = 'my-actual-bucket-name-12345';
```

### 配置管理

```typescript
// ✅ 正确：从 SSM 参数获取配置
const config = ssm.StringParameter.valueFromLookup(
  this, 
  '/ecs-image-handler/config'
);

// ❌ 错误：硬编码配置
const config = {
  buckets: ['actual-bucket-name'],
  region: 'us-east-1'
};
```

## 🚨 事件响应

如果意外提交了敏感信息：

1. **立即撤销**: 撤销任何暴露的凭证
2. **清理历史**: 使用 `git filter-branch` 清理 Git 历史
3. **更新凭证**: 生成新的访问密钥
4. **通知团队**: 告知相关人员安全事件

## 🔧 安全工具

### 推荐的安全扫描工具

```bash
# 安装 git-secrets
git secrets --install
git secrets --register-aws

# 扫描现有仓库
git secrets --scan
```

### 自动化检查

```yaml
# GitHub Actions 示例
name: Security Scan
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run git-secrets
        run: |
          git secrets --scan
```

## 📞 报告安全问题

如果发现安全问题，请：

1. **不要**在公开的 Issue 中报告
2. 发送邮件到项目维护者
3. 提供详细的问题描述
4. 等待确认后再公开讨论

## 🔗 相关资源

- [AWS 安全最佳实践](https://aws.amazon.com/security/security-learning/)
- [Git Secrets 工具](https://github.com/awslabs/git-secrets)
- [OWASP 安全指南](https://owasp.org/www-project-top-ten/)

---

**记住**: 安全是一个持续的过程，不是一次性的任务。定期审查和更新安全实践。