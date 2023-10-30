@echo OFF
echo =====================================
echo Starting server...

start .\venv\Scripts\python.exe .\manage.py runserver
start "" http://127.0.0.1:8000/

echo Server started!
echo =====================================