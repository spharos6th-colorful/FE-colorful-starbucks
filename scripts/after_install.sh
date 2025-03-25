#!/bin/bash
# 로깅 및 오류 처리 설정
set -e
exec > >(tee /var/log/nextjs-deploy.log) 2>&1

# 배포 상태 파일 경로
DEPLOY_STATE_FILE="/home/ubuntu/last_deploy_env.txt"

# 배포 상태 파일이 없으면 초기화
if [ ! -f "$DEPLOY_STATE_FILE" ]; then
  echo "blue" > "$DEPLOY_STATE_FILE"
fi

# 마지막 배포 환경 읽기
LAST_DEPLOY_ENV=$(cat "$DEPLOY_STATE_FILE")

# AWS 관련 환경 변수 명시적 설정
export AWS_DEFAULT_REGION="ap-northeast-2"
export AWS_REGION="ap-northeast-2"

# ECR 로그인
aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin "065676097951.dkr.ecr.${AWS_REGION}.amazonaws.com" || {
  echo "ECR 로그인 실패"
  exit 1
}

# 최신 이미지 풀
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:latest"
sudo docker pull $FULL_IMAGE_NAME || {
  echo "Docker 이미지 풀 실패"
  exit 1
}

# 배포 환경 및 포트 결정
if [ "$LAST_DEPLOY_ENV" = "blue" ]; then
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  echo "green" > "$DEPLOY_STATE_FILE"
else
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  echo "blue" > "$DEPLOY_STATE_FILE"
fi

# 새 컨테이너 실행
sudo docker run -d \
  --name nextjs-${DEPLOY_ENV} \
  -p ${TARGET_PORT}:3000 \
  --restart always \
  -l service=colorful-starbucks-frontend \
  $FULL_IMAGE_NAME || {
  echo "Docker 컨테이너 실행 실패"
  exit 1
}

# 실행 상태 확인
echo "Deployment containers:"
sudo docker ps

echo "Deployment completed at $(date)"