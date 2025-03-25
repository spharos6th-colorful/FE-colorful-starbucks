#!/bin/bash
cd /home/ubuntu/colorful-starbucks-frontend

# 현재 실행 중인 컨테이너 확인
BLUE_CONTAINER=$(docker ps --filter "name=nextjs-blue" --filter "status=running" --format "{{.ID}}")
GREEN_CONTAINER=$(docker ps --filter "name=nextjs-green" --filter "status=running" --format "{{.ID}}")

# 배포 상태 파일 경로
DEPLOY_STATE_FILE="/home/ubuntu/last_deploy_env.txt"
LAST_DEPLOY_ENV=$(cat "$DEPLOY_STATE_FILE")

# 환경 결정
if [ "$LAST_DEPLOY_ENV" = "blue" ]; then
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  OLD_ENV="blue"
else
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  OLD_ENV="green"
fi

# Nginx 구성 업데이트
sudo tee /etc/nginx/sites-available/nextjs > /dev/null <<EOL
server {
    listen 80;
    server_name colorful-starbucks.store;
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:${TARGET_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        # 추가 로깅 및 보안 헤더
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

# Nginx 설정 테스트
sudo nginx -t || {
  echo "Nginx 구성 테스트 실패"
  exit 1
}

# Nginx 재시작
sudo systemctl restart nginx

# 이전 컨테이너 정리
OLD_CONTAINER=$(docker ps -a --filter "name=nextjs-${OLD_ENV}" --format "{{.ID}}")
if [ -n "$OLD_CONTAINER" ]; then
  docker stop $OLD_CONTAINER
  docker rm $OLD_CONTAINER
fi

# 이미지 정리 (최신 2개만 유지)
docker image prune -a --filter "label=service=colorful-starbucks-frontend" --force