#!/bin/bash
cd /home/ubuntu/colorful-starbucks-frontend

# 현재 배포 환경 확인
RUNNING_CONTAINER=$(docker ps --filter "name=nextjs-blue" --format "{{.ID}}")
if [ -n "$RUNNING_CONTAINER" ]; then
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
else
  DEPLOY_ENV="green"
  TARGET_PORT=3001
fi

# Nginx 구성 업데이트
sudo tee /etc/nginx/sites-available/nextjs > /dev/null <<EOL
server {
    listen 80;
    server_name colorful-starbucks.store;

    location / {
        proxy_pass http://localhost:${TARGET_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Nginx 재시작
sudo systemctl reload nginx

# 이전 컨테이너 정리
if [ "$DEPLOY_ENV" = "blue" ]; then
  OLD_CONTAINER=$(docker ps -a --filter "name=nextjs-green" --format "{{.ID}}")
  if [ -n "$OLD_CONTAINER" ]; then
    docker stop $OLD_CONTAINER
    docker rm $OLD_CONTAINER
  fi
else
  OLD_CONTAINER=$(docker ps -a --filter "name=nextjs-blue" --format "{{.ID}}")
  if [ -n "$OLD_CONTAINER" ]; then
    docker stop $OLD_CONTAINER
    docker rm $OLD_CONTAINER
  fi
fi

# 이미지 정리 (최신 2개만 유지)
docker image prune -a --filter "label=service=colorful-starbucks-frontend" --force