FROM python:3.13-alpine
RUN addgroup -g 10001 growth && adduser -D -u 10001 -G growth growth && mkdir /data && chown growth:growth /data
WORKDIR /app
COPY --chown=growth:growth receiver.py admin.py /app/
USER growth
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/health',timeout=2)"
CMD ["python", "/app/receiver.py"]
