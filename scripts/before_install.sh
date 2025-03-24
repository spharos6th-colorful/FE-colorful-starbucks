#!/bin/bash
# 로깅 및 오류 처리 설정
set -e
exec > >(tee /var/log/initial-setup.log) 2>&1

# 스크립트 시작 로그
echo "Initial deployment setup started at $(date)"

# 로컬 환경 변수 설정 (필요한 경우 수정)
export AWS_DEFAULT_REGION="ap-northeast-2"
export AWS_ACCOUNT_ID="065676097951"

# 이전 애플리케이션 백업 (완전 삭제 대신)
if [ -d "/home/ubuntu/colorful-starbucks-frontend" ]; then
  echo "Backing up existing application..."
  mv "/home/ubuntu/colorful-starbucks-frontend" "/home/ubuntu/colorful-starbucks-frontend_backup_$(date +%Y%m%d_%H%M%S)"
fi

# 필요한 디렉토리 생성
mkdir -p /home/ubuntu/colorful-starbucks-frontend

# Docker 설치 확인 및 최신 버전으로 업데이트
if [ ! -x "$(command -v docker)" ]; then
  echo "Installing Docker..."
  # Docker 공식 설치 스크립트 사용
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  
  # Docker 서비스 시작 및 부팅 시 자동 시작 설정
  sudo systemctl start docker
  sudo systemctl enable docker
else
  # 이미 설치된 경우 업데이트
  echo "Updating Docker..."
  sudo apt-get update
  sudo apt-get upgrade -y docker-ce docker-ce-cli containerd.io
fi

# Docker Compose 설치 확인 및 업데이트
DOCKER_COMPOSE_VERSION="v2.24.0"  # 최신 버전 확인 필요
if [ ! -x "$(command -v docker-compose)" ]; then
  echo "Installing Docker Compose..."
  sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
else
  echo "Updating Docker Compose..."
  sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# AWS CLI 설치 및 최신 버전으로 업데이트
if [ ! -x "$(command -v aws)" ]; then
  echo "Installing AWS CLI..."
  sudo apt-get update
  sudo apt-get install -y unzip
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  rm -rf aws awscliv2.zip
else
  echo "Updating AWS CLI..."
  sudo ./aws/install --update
fi

# Nginx 설치 (앞선 스크립트에서 사용)
if [ ! -x "$(command -v nginx)" ]; then
  echo "Installing Nginx..."
  sudo apt-get update
  sudo apt-get install -y nginx
  sudo systemctl start nginx
  sudo systemctl enable nginx
fi

# AWS ECR 로그인 (오류 처리 추가)
echo "Logging into AWS ECR..."
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com" || {
  echo "ECR 로그인 실패"
  exit 1
}

# 사용자 및 그룹 권한 설정
sudo usermod -aG docker ubuntu

# Docker 및 관련 도구 버전 확인
echo "Installed versions:"
docker version
docker-compose version
aws --version
nginx -v

# 스크립트 종료 로그
echo "Initial deployment setup completed at $(date)"