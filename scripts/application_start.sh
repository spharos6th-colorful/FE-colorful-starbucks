#!/bin/bash
# 로깅 및 오류 처리 설정
set -e
exec > >(tee /var/log/nginx-update.log) 2>&1

# 스크립트 시작 로그
echo "Nginx configuration update started at $(date)"

# 현재 작업 디렉토리 이동
cd /home/ubuntu/colorful-starbucks-frontend || exit 1

# 현재 배포 환경 확인
RUNNING_CONTAINER=$(docker ps --filter "name=nextjs-blue" --format "{{.ID}}")
if [ -n "$RUNNING_CONTAINER" ]; then
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
else
  DEPLOY_ENV="green"
  TARGET_PORT=3001
fi

# Nginx 구성 업데이트 (오류 처리 추가)
echo "Updating Nginx configuration to proxy to port ${TARGET_PORT}..."
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
        
        # 추가된 로깅
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # 에러 페이지 설정
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOL

# Nginx 설정 테스트
echo "Testing Nginx configuration..."
sudo nginx -t || {
  echo "Nginx 구성 테스트 실패"
  exit 1
}

# Nginx 재시작 (reload 대신 restart)
echo "Restarting Nginx..."
sudo systemctl restart nginx || {
  echo "Nginx 재시작 실패"
  exit 1
}

# 이전 컨테이너 정리
echo "Cleaning up old containers..."
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

# 이미지 정리 (최신 2개만 유지, 오류 무시)
echo "Pruning old Docker images..."
docker image prune -a --filter "label=service=colorful-starbucks-frontend" --force || true

# 스크립트 종료 로그
echo "Nginx configuration update completed at $(date)"