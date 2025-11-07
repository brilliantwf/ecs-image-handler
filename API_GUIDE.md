# ECS Image Handler API 使用指南

## 📖 概述

ECS Image Handler 提供基于 URL 参数的图片和视频处理 API，支持实时处理和 CDN 缓存。

## 🖼️ 图片处理 API

### 基础 URL 格式

```
https://[cloudfront-domain]/[图片文件名]?x-oss-process=image/[操作],[参数]
```

### 支持的图片格式

- **输入**: JPEG, PNG, GIF, WebP
- **输出**: JPEG, PNG

## 🔧 图片处理操作

### 1. 缩放 (resize)

```bash
# 指定宽高
?x-oss-process=image/resize,w_200,h_200

# 只指定宽度，高度自适应
?x-oss-process=image/resize,w_300

# 只指定高度，宽度自适应
?x-oss-process=image/resize,h_200
```

**参数说明**:
- `w_数字`: 目标宽度（像素）
- `h_数字`: 目标高度（像素）
- 自动保持宽高比

### 2. 格式转换 (format)

```bash
# 转换为 PNG
?x-oss-process=image/format,png

# 转换为 JPEG
?x-oss-process=image/format,jpg
```

### 3. 质量调整 (quality)

```bash
# 设置质量为 50%
?x-oss-process=image/quality,q_50

# 高质量 (90%)
?x-oss-process=image/quality,q_90

# 低质量 (30%)
?x-oss-process=image/quality,q_30
```

**参数说明**:
- `q_数字`: 质量值 (1-100)
- 数字越大质量越高，文件越大

### 4. 裁剪 (crop)

```bash
# 从 (100,100) 位置裁剪 200x200 区域
?x-oss-process=image/crop,w_200,h_200,x_100,y_100
```

**参数说明**:
- `w_数字`: 裁剪宽度
- `h_数字`: 裁剪高度
- `x_数字`: 起始 X 坐标
- `y_数字`: 起始 Y 坐标

### 5. 旋转 (rotate)

```bash
# 顺时针旋转 90 度
?x-oss-process=image/rotate,90

# 旋转 180 度
?x-oss-process=image/rotate,180

# 旋转 270 度
?x-oss-process=image/rotate,270
```

### 6. 模糊效果 (blur)

```bash
# 模糊效果
?x-oss-process=image/blur,r_5,s_3
```

**参数说明**:
- `r_数字`: 模糊半径
- `s_数字`: 模糊强度

### 7. 灰度转换 (grey)

```bash
# 转换为灰度图
?x-oss-process=image/grey,1
```

### 8. 组合处理

使用 `/` 分隔多个操作：

```bash
# 缩放 + 质量调整
?x-oss-process=image/resize,w_300,h_300/quality,q_80

# 缩放 + 格式转换 + 质量调整
?x-oss-process=image/resize,w_200,h_200/format,png/quality,q_90

# 裁剪 + 旋转 + 模糊
?x-oss-process=image/crop,w_200,h_200,x_50,y_50/rotate,90/blur,r_3,s_2
```

## 🎬 视频处理 API

### 基础 URL 格式

```
https://[cloudfront-domain]/[视频文件名]?x-oss-process=video/snapshot,t_时间,f_格式,m_模式
```

### 视频截图 (snapshot)

```bash
# 基本截图（1秒处，JPEG格式）
?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast

# 5秒处截图
?x-oss-process=video/snapshot,t_5000,f_jpg,m_fast

# PNG 格式截图
?x-oss-process=video/snapshot,t_3000,f_png,m_fast
```

**参数说明**:
- `t_数字`: 截图时间点（毫秒）
- `f_格式`: 输出格式 (`jpg` 或 `png`)
- `m_模式`: 截图模式 (目前只支持 `fast`)

### 支持的视频格式

- **输入**: MP4, AVI, MOV, MKV 等常见格式
- **输出**: JPEG, PNG 图片

## 📊 性能参考

### 图片处理性能

| 操作 | 原图大小 | 处理后大小 | 压缩率 |
|------|----------|------------|--------|
| 缩放 200x200 | 65KB | 6KB | 90% |
| 缩放 300x300 | 65KB | 13KB | 80% |
| 质量 50% | 65KB | 37KB | 43% |
| 格式转 PNG | 65KB | 224KB | -244% |
| 裁剪 200x200 | 65KB | 741B | 99% |

### 视频处理性能

| 操作 | 输出格式 | 文件大小 | 分辨率 |
|------|----------|----------|--------|
| 视频截图 | JPEG | ~6-7KB | 320x240 |
| 视频截图 | PNG | ~11-13KB | 320x240 |

## 🚀 最佳实践

### 1. 缓存优化

- 相同参数的请求会被 CloudFront 缓存
- 建议使用标准化的尺寸参数
- 避免频繁变更参数

### 2. 性能优化

```bash
# 推荐：先缩放再调质量
?x-oss-process=image/resize,w_300,h_300/quality,q_80

# 不推荐：先调质量再缩放
?x-oss-process=image/quality,q_80/resize,w_300,h_300
```

### 3. 文件大小控制

```bash
# 小文件：缩放 + 低质量
?x-oss-process=image/resize,w_200,h_200/quality,q_60

# 高质量：适中尺寸 + 高质量
?x-oss-process=image/resize,w_800,h_600/quality,q_90
```

## ❌ 错误处理

### 常见错误码

- **400**: 参数错误
- **403**: 访问被拒绝
- **404**: 文件不存在
- **500**: 服务器内部错误

### 错误示例

```json
{
  "status": 400,
  "name": "BadRequestError", 
  "message": "Invalid parameter"
}
```

## 🔍 调试技巧

### 1. 使用 curl 测试

```bash
# 检查响应头
curl -I "https://domain/image.jpg?x-oss-process=image/resize,w_200,h_200"

# 下载处理后的文件
curl -o output.jpg "https://domain/image.jpg?x-oss-process=image/resize,w_200,h_200"
```

### 2. 验证文件信息

```bash
# 查看文件信息
file output.jpg

# 查看图片尺寸（需要 ImageMagick）
identify output.jpg
```

## 📝 注意事项

1. **文件大小限制**: 建议单个文件不超过 100MB
2. **处理时间**: 复杂操作可能需要几秒钟
3. **格式支持**: 不是所有操作都支持所有格式
4. **缓存时间**: CloudFront 默认缓存 24 小时

## 🔗 相关链接

- [项目 README](./README.md)
- [部署指南](./DEPLOYMENT.md)
- [测试结果](./TEST_RESULTS.md)