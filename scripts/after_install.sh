#!/bin/bash

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

# 최신 이미지 가져오기
LATEST_IMAGE=$(aws ecr describe-images --repository-name colorful-stabucks-frontend --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text --region ap-northeast-2)
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:${LATEST_IMAGE}"

# docker-compose.yml 파일 생성 (임시 디렉토리에)
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
cd $WORK_DIR
sudo docker-compose -f $WORK_DIR/docker-compose.yml up -d

# 실행 상태 확인
sudo docker ps