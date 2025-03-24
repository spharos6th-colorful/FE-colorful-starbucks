#!/bin/bash
# 로깅 및 오류 처리 설정
set -e
exec > >(tee /var/log/nextjs-deploy.log) 2>&1

# AWS 관련 환경 변수 명시적 설정
export AWS_DEFAULT_REGION="ap-northeast-2"
export AWS_REGION="ap-northeast-2"

# ECR 로그인 (상세 로깅 추가)
echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin "065676097951.dkr.ecr.${AWS_REGION}.amazonaws.com" || {
  echo "ECR 로그인 실패"
  exit 1
}

# 임시 디렉토리 사용
WORK_DIR="/tmp/nextjs-deploy"
mkdir -p $WORK_DIR
cd $WORK_DIR || exit 1

# 현재 실행 중인 컨테이너 확인
BLUE_CONTAINER=$(sudo docker ps --filter "name=nextjs-blue" --filter "status=running" --format "{{.ID}}")
GREEN_CONTAINER=$(sudo docker ps --filter "name=nextjs-green" --filter "status=running" --format "{{.ID}}")

# 환경 결정
if [ -n "$BLUE_CONTAINER" ]; then
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  CURRENT_PORT=3000
elif [ -n "$GREEN_CONTAINER" ]; then
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  CURRENT_PORT=3001
else
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  CURRENT_PORT=3001
fi

# 최신 이미지 풀 (상세 로깅 추가)
echo "Pulling latest image..."
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:latest"
sudo docker pull $FULL_IMAGE_NAME || {
  echo "Docker 이미지 풀 실패"
  exit 1
}

# docker-compose.yml 파일 생성
cat > $WORK_DIR/docker-compose.yml << EOF
version: '3'
services:
  nextjs-${DEPLOY_ENV}:
    image: ${FULL_IMAGE_NAME}
    container_name: nextjs-${DEPLOY_ENV}
    ports:
      - "${TARGET_PORT}:3000"
    restart: always
    labels:
      - "service=colorful-starbucks-frontend"
EOF

# Docker Compose 실행
echo "Starting Docker Compose..."
cd $WORK_DIR
sudo docker-compose -f $WORK_DIR/docker-compose.yml up -d || {
  echo "Docker Compose 실행 실패"
  exit 1
}

# 실행 상태 확인
echo "Deployment containers:"
sudo docker ps

# 로그 종료
echo "Deployment completed at $(date)"