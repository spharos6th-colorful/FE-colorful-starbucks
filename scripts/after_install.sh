#!/bin/bash
# 로깅 및 오류 처리 설정
set -e
exec > >(tee /var/log/nextjs-deploy.log) 2>&1

# 로그 시작 시간 기록
echo "Deployment started at $(date)"

# 임시 디렉토리 사용
WORK_DIR="/tmp/nextjs-deploy"
mkdir -p $WORK_DIR
cd $WORK_DIR || exit 1

# 현재 실행 중인 컨테이너 확인
RUNNING_CONTAINER=$(sudo docker ps --filter "name=nextjs-blue" --format "{{.ID}}")
if [ -n "$RUNNING_CONTAINER" ]; then
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  CURRENT_PORT=3000
else
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  CURRENT_PORT=3001
fi

# ECR 리포지토리 이름과 리전 변수화
ECR_REPO="colorful-stabucks-frontend"
AWS_REGION="ap-northeast-2"
AWS_ACCOUNT_ID="065676097951"

# 최신 이미지 태그 가져오기 (오류 처리 추가)
echo "Fetching latest image tag from ECR..."
LATEST_IMAGE=$(aws ecr describe-images \
  --repository-name $ECR_REPO \
  --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' \
  --output text \
  --region $AWS_REGION) || {
  echo "Failed to fetch image tag from ECR"
  exit 1
}

# 전체 이미지 이름 구성
FULL_IMAGE_NAME="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${LATEST_IMAGE}"

# ECR 로그인 (오류 처리 추가)
echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com" || {
  echo "ECR 로그인 실패"
  exit 1
}

# 이미지 풀 (오류 처리 추가)
echo "Pulling latest image: $FULL_IMAGE_NAME"
sudo docker pull $FULL_IMAGE_NAME || {
  echo "Docker 이미지 풀 실패"
  exit 1
}

# docker-compose.yml 파일 생성 (임시 디렉토리에)
echo "Creating docker-compose.yml..."
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

# Docker Compose 실행 (오류 처리 추가)
echo "Starting Docker Compose..."
cd $WORK_DIR
sudo docker-compose -f $WORK_DIR/docker-compose.yml up -d || {
  echo "Docker Compose 실행 실패"
  exit 1
}

# 실행 상태 확인 및 로깅
echo "Deployment containers:"
sudo docker ps

# 로그 종료 시간 기록
echo "Deployment completed at $(date)"