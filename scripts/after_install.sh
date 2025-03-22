#!/bin/bash
cd /home/ubuntu/colorful-starbucks-frontend

# 현재 실행 중인 컨테이너 확인
RUNNING_CONTAINER=$(docker ps --filter "name=nextjs-blue" --format "{{.ID}}")
if [ -n "$RUNNING_CONTAINER" ]; then
  # 블루가 실행 중이면 그린으로 배포
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  CURRENT_PORT=3000
else
  # 그린이 실행 중이거나 아무것도 실행중이지 않으면 블루로 배포
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  CURRENT_PORT=3001
fi

# 최신 이미지 가져오기
LATEST_IMAGE=$(aws ecr describe-images --repository-name colorful-stabucks-frontend --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text --region ap-northeast-2)
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:${LATEST_IMAGE}"

# docker-compose.yml 생성
cat > docker-compose.yml <<EOL
version: '3'
services:
  nextjs-${DEPLOY_ENV}:
    image: ${FULL_IMAGE_NAME}
    container_name: nextjs-${DEPLOY_ENV}
    ports:
      - "${TARGET_PORT}:3000"
    restart: always
EOL

# Docker Compose 실행
sudo docker-compose up -d