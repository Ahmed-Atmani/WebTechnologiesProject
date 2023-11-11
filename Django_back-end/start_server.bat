@echo OFF
echo =====================================
echo Starting server...

.\venv\Scripts\python.exe .\manage.py runserver
"" http://127.0.0.1:8000/

echo Server started!
echo =====================================