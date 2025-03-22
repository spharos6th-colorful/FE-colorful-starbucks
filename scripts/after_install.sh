mkdir -p /home/ubuntu/colorful-starbucks-frontend
cd /home/ubuntu/colorful-starbucks-frontend || exit 1

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

LATEST_IMAGE=$(aws ecr describe-images --repository-name colorful-stabucks-frontend --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text --region ap-northeast-2)
FULL_IMAGE_NAME="065676097951.dkr.ecr.ap-northeast-2.amazonaws.com/colorful-stabucks-frontend:${LATEST_IMAGE}"

echo "version: '3'" > /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "services:" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "  nextjs-${DEPLOY_ENV}:" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "    image: ${FULL_IMAGE_NAME}" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "    container_name: nextjs-${DEPLOY_ENV}" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "    ports:" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "      - \"${TARGET_PORT}:3000\"" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml
echo "    restart: always" >> /home/ubuntu/colorful-starbucks-frontend/docker-compose.yml

cd /home/ubuntu/colorful-starbucks-frontend
sudo docker-compose up -d