#!/bin/bash  
  
###############################################################################  
# Script Name: start_rabbitmq.sh  
# Description: Starts a RabbitMQ Docker container with the management UI  
#              and creates a predefined queue named 'ai_chat'.  
#              Compatible with M1 Mac and Windows (using Git Bash or WSL).  
# Usage:        ./start_rabbit.sh  
# Requirements: Docker must be installed and running on the host machine.  
###############################################################################  
  
# ----------------------------- Configuration ------------------------------- #  
  
# Container configuration  
CONTAINER_NAME="rabbitmq"  
RABBITMQ_PORT=5672               # AMQP protocol port  
RABBITMQ_MANAGEMENT_PORT=15672   # Management UI port  
  
# RabbitMQ credentials  
RABBITMQ_USER="digital_brain_developer"  
RABBITMQ_PASSWORD="digital_brain_developer"  
  
# RabbitMQ Docker image  
RABBITMQ_IMAGE="rabbitmq:3-management"  
  
# Queue configuration  
QUEUE_NAME="digital_brain_queue"  
  
# ----------------------------- Functions ----------------------------------- #  
  
# Function to display usage information  
usage() {  
    echo "Usage: $0"  
    echo "Starts a RabbitMQ Docker container with the management UI and creates a queue named 'digital_brain_queue'."  
    echo  
    echo "Options:"  
    echo "  -h, --help    Display this help message and exit."  
}  
  
# Function to check if Docker is installed  
check_docker() {  
    if ! command -v docker &> /dev/null; then  
        echo "Error: Docker is not installed or not in PATH."  
        echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"  
        exit 1  
    fi  
}  
  
# Function to check if the RabbitMQ container is already running  
check_container_running() {  
    if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then  
        echo "RabbitMQ container '${CONTAINER_NAME}' is already running."  
        exit 0  
    fi  
}  
  
# Function to check if the RabbitMQ container exists but is stopped  
check_container_exists() {  
    if [ "$(docker ps -aq -f status=exited -f name=^/${CONTAINER_NAME}$)" ]; then  
        echo "Removing existing stopped RabbitMQ container '${CONTAINER_NAME}'."  
        docker rm "${CONTAINER_NAME}"  
    fi  
}  
  
# Function to start the RabbitMQ Docker container  
start_rabbitmq_container() {  
    echo "Starting RabbitMQ container '${CONTAINER_NAME}'..."  
    docker run -d \  
        --name "${CONTAINER_NAME}" \  
        -p "${RABBITMQ_PORT}:5672" \  
        -p "${RABBITMQ_MANAGEMENT_PORT}:15672" \  
        -e RABBITMQ_DEFAULT_USER="${RABBITMQ_USER}" \  
        -e RABBITMQ_DEFAULT_PASS="${RABBITMQ_PASSWORD}" \  
        "${RABBITMQ_IMAGE}"  
  
    if [ $? -eq 0 ]; then  
        echo "RabbitMQ container '${CONTAINER_NAME}' started successfully."  
        echo "Access the Management UI at http://localhost:${RABBITMQ_MANAGEMENT_PORT}/"  
        echo "Login with Username: '${RABBITMQ_USER}' and Password: '${RABBITMQ_PASSWORD}'."  
    else  
        echo "Error: Failed to start RabbitMQ container."  
        exit 1  
    fi  
}  
  
# Function to wait until RabbitMQ is ready to accept connections  
wait_for_rabbitmq() {  
    echo "Waiting for RabbitMQ to be ready..."  
    until curl -s -u "${RABBITMQ_USER}:${RABBITMQ_PASSWORD}" http://localhost:${RABBITMQ_MANAGEMENT_PORT}/api/overview > /dev/null; do  
        printf '.'  
        sleep 2  
    done  
    echo -e "\nRabbitMQ is ready."  
}  
  
# Function to declare the 'ai_chat' queue using the Management API  
declare_queue() {  
    echo "Declaring queue '${QUEUE_NAME}'..."  
  
    # JSON payload to create the queue  
    QUEUE_PAYLOAD=$(cat <<EOF  
{  
  "durable": true,  
  "auto_delete": false,  
  "arguments": {}  
}  
EOF  
)  
  
    # API endpoint for creating the queue in the default vhost '/'  
    API_URL="http://localhost:${RABBITMQ_MANAGEMENT_PORT}/api/queues/%2F/${QUEUE_NAME}"  
  
    # Send PUT request to create the queue  
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -u "${RABBITMQ_USER}:${RABBITMQ_PASSWORD}" \  
        -X PUT \  
        -H "Content-Type: application/json" \  
        -d "${QUEUE_PAYLOAD}" \  
        "${API_URL}")  
  
    if [ "${RESPONSE}" -eq 201 ] || [ "${RESPONSE}" -eq 204 ]; then  
        echo "Queue '${QUEUE_NAME}' declared successfully."  
    elif [ "${RESPONSE}" -eq 200 ]; then  
        echo "Queue '${QUEUE_NAME}' already exists."  
    else  
        echo "Error: Failed to declare queue '${QUEUE_NAME}'. HTTP Status Code: ${RESPONSE}"  
        exit 1  
    fi  
}  
  
# ----------------------------- Main Script --------------------------------- #  
  
# Parse command-line arguments  
if [[ "$1" == "-h" || "$1" == "--help" ]]; then  
    usage  
    exit 0  
fi  
  
# Execute functions in order  
check_docker  
check_container_running  
check_container_exists  
start_rabbitmq_container  
wait_for_rabbitmq  
declare_queue  
  
echo "RabbitMQ setup complete. You can now use the '${QUEUE_NAME}' queue."