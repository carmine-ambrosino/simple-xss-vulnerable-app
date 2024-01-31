# -------------------------------------------------------
# Backend Docker File
# -------------------------------------------------------

# Use an official Python runtime as a parent image
FROM python:3.12.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /backend
COPY . /app

# Install system dependencies for psycopg2 and requirements
RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    apk --purge del .build-deps

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py
# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
