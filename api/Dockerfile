FROM python:3.11 as builder
WORKDIR /app
RUN apt update && apt install -y --no-install-recommends gcc
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11 as final
RUN adduser --disabled-password worker
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
WORKDIR /app
COPY profiles /profiles
COPY app.py .
COPY gunicorn.conf.py .
RUN chown -R worker .
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:8000/api/status || exit 1
ENV MONGODB_URI db:27017 BUILD_VERSION dev ENVIRONMENT development DEBUG True
USER worker
CMD ["gunicorn", "app:app"]
