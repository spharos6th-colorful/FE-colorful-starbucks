#!/bin/bash

# 기존 프론트엔드 디렉토리 제거
sudo rm -rf /home/ubuntu/colorful-starbucks-frontend

# Docker 설치 확인 및 설치
if [ ! -x "$(command -v docker)" ]; then
  sudo apt-get update
  sudo apt-get install -y docker.io
  sudo systemctl start docker
  sudo systemctl enable docker
fi

if [ ! -x "$(command -v docker-compose)" ]; then
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# ECR 로그인 (계정 ID는 환경 변수로 전달)
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# 최신 이미지 가져오기
docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${FRONTEND_ECR_REPOSITORY}:latest

# 기존 컨테이너 중지 및 제거
CONTAINER_ID=$(docker ps -q --filter "name=${FRONTEND_ECR_REPOSITORY}")
if [ ! -z "$CONTAINER_ID" ]; then
  docker stop $CONTAINER_ID
  docker rm $CONTAINER_ID
fi

# 새 컨테이너 실행
docker run --name ${FRONTEND_ECR_REPOSITORY} -d -p 3000:3000 \
  -e TZ=Asia/Seoul \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${FRONTEND_ECR_REPOSITORY}:latest

# 이미지 정리 (미사용 이미지 제거)
docker image prune -a --filter "until=24h" --force