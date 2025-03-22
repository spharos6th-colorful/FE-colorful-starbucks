mkdir -p /home/ubuntu/colorful-starbucks-frontend
cd /home/ubuntu/colorful-starbucks-frontend || exit 1

RUNNING_CONTAINER=$(docker ps --filter "name=nextjs-blue" --format "{{.ID}}")
if [ -n "$RUNNING_CONTAINER" ]; then
  DEPLOY_ENV="green"
  TARGET_PORT=3001
  CURRENT_PORT=3000
else
  DEPLOY_ENV="blue"
  TARGET_PORT=3000
  CURRENT_PORT=3001
fi

LATEST_IMAGE=$(aws ecr describe-images --repository-name colorful-stabucks-frontend --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text --region ap-northeast-2)
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:${LATEST_IMAGE}"

touch docker-compose.yml
chmod 644 docker-compose.yml

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

sudo docker-compose -f /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml up -d