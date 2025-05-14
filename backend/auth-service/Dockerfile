FROM python:3.11-slim

WORKDIR /app

# Install deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy service code
COPY . .

# Tell Flask where the app lives
ENV FLASK_APP=app.py

# Run migrations (migrations/ must exist) then launch on 0.0.0.0:5000
CMD flask db upgrade && flask run --host=0.0.0.0 --port=5000