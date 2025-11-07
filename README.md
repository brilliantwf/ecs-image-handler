# ECS Image Handler

A serverless image processing solution built with AWS ECS Fargate, providing high-performance image transformations and video screenshot capabilities.

## Features

- **Image Processing**: Resize, format conversion, quality adjustment, cropping, rotation, blur, and grayscale
- **Video Processing**: Screenshot extraction with configurable time points
- **Multi-Region Support**: Tested and validated in multiple AWS regions
- **Serverless Architecture**: Built on ECS Fargate for automatic scaling
- **Security First**: Comprehensive security practices and data protection
- **Easy Deployment**: Automated scripts for quick setup

## Quick Start

### Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18+ and npm
- Docker (for local development)
- CDK CLI installed globally

### Deployment

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd ecs-image-handler
   chmod +x *.sh
   ```

2. **Quick Deploy**
   ```bash
   ./quick-deploy.sh
   ```

3. **Manual Setup** (if needed)
   ```bash
   ./setup.sh
   ./init.sh
   ```

### Configuration

The deployment automatically creates SSM parameters for configuration:
- `/ecs-image-handler/source-bucket`: Source S3 bucket name
- `/ecs-image-handler/result-bucket`: Result S3 bucket name
- `/ecs-image-handler/alb-dns`: Application Load Balancer DNS name

## API Usage

### Image Processing

```bash
# Basic resize
curl "https://<alb-dns>/resize?url=<image-url>&width=800&height=600"

# Format conversion with quality
curl "https://<alb-dns>/format?url=<image-url>&format=webp&quality=80"

# Crop and rotate
curl "https://<alb-dns>/crop?url=<image-url>&x=100&y=100&width=400&height=300"
curl "https://<alb-dns>/rotate?url=<image-url>&angle=90"

# Effects
curl "https://<alb-dns>/blur?url=<image-url>&sigma=2"
curl "https://<alb-dns>/grey?url=<image-url>"
```

### Video Screenshots

```bash
# Extract screenshot at specific time
curl "https://<alb-dns>/video?url=<video-url>&time=30&format=jpg"

# Multiple time points
curl "https://<alb-dns>/video?url=<video-url>&time=10,30,60&format=png"
```

## Architecture

- **ECS Fargate**: Serverless container execution
- **Application Load Balancer**: Traffic distribution and SSL termination
- **S3**: Source and result storage
- **CloudWatch**: Logging and monitoring
- **Systems Manager**: Configuration management

## Performance

- **Image Processing**: 90%+ compression rates for common operations
- **Video Screenshots**: Sub-2-second response times
- **Auto Scaling**: Handles traffic spikes automatically
- **Multi-Region**: Consistent performance across regions

## Security

- IAM roles with least privilege access
- VPC with private subnets
- Security groups with minimal required ports
- No sensitive data in code or logs
- Comprehensive security guidelines in SECURITY.md

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [API Guide](API_GUIDE.md) - Complete API reference
- [Security Guide](SECURITY.md) - Security best practices
- [Scripts Guide](SCRIPTS.md) - Available automation scripts
- [Test Results](TEST_RESULTS.md) - Validation and testing results

## Multi-Region Deployment

Tested and validated in:
- ap-southeast-1 (Singapore)
- ap-northeast-1 (Japan)

Use the region-specific deployment script:
```bash
./deploy-region.sh <region-name>
```

## Cleanup

```bash
./cleanup.sh
```

**Note**: This preserves CDK bootstrap infrastructure which is shared across projects.

## Contributing

See [SECURITY.md](SECURITY.md) for guidelines on handling sensitive information in contributions.

## License

MIT License - see LICENSE file for details.