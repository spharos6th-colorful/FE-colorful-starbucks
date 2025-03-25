sudo rm -rf /home/ubuntu/colorful-starbucks-frontend

# Docker, Docker Compose 설치 로직 유지
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

# ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 065676097951.dkr.ecr.ap-northeast-2.amazonaws.com