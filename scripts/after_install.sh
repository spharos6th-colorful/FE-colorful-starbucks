#!/bin/bash
set -e
exec > >(tee /var/log/nextjs-deploy.log) 2>&1

# ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 065676097951.dkr.ecr.ap-northeast-2.amazonaws.com

# 최신 이미지 풀
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:latest"
docker pull $FULL_IMAGE_NAME

# 기존 컨테이너 중지 및 제거
docker stop nextjs || true
docker rm nextjs || true

# 새 컨테이너 실행
docker run -d \
  --name nextjs \
  -p 3000:3000 \
  --restart always \
  -l service=colorful-starbucks-frontend \
  $FULL_IMAGE_NAME

# 컨테이너 상태 확인
docker ps