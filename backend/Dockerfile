# # === build and install dependencies ===
# FROM python:3.10-slim AS build

# WORKDIR /app
# # install OS deps for mysql client
# RUN apt-get update \
#  && apt-get install -y --no-install-recommends gcc default-libmysqlclient-dev \
#  && rm -rf /var/lib/apt/lists/*

# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # === final image ===
# FROM python:3.10-slim

# WORKDIR /app
# # copy both the installed packages and the console-script entrypoints
# COPY --from=build /usr/local/lib/python3.10/site-packages  /usr/local/lib/python3.10/site-packages
# COPY --from=build /usr/local/bin /usr/local/bin

# # copy app code + .env
# COPY . .

# # expose port from your .env
# ARG BACKEND_PORT
# ENV FLASK_APP=app.py \
#     FLASK_ENV=production \
#     FLASK_RUN_HOST=0.0.0.0 \
#     FLASK_RUN_PORT=${BACKEND_PORT}

# EXPOSE ${BACKEND_PORT}

# CMD ["flask", "run"]

# # Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Run migrations and start the server
CMD flask db upgrade && flask run --host=0.0.0.0 --port=5000