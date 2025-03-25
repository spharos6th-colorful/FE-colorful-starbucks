#!/bin/bash

# Nginx 구성 업데이트
sudo tee /etc/nginx/sites-available/nextjs > /dev/null <<EOL
server {
    listen 80;
    server_name colorful-starbucks.store;
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
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

# 이미지 정리 (최신 2개만 유지)
docker image prune -a --filter "label=service=colorful-starbucks-frontend" --force