@echo OFF
echo =====================================
echo Starting server...

call .\venv\Scripts\Activate

python .\manage.py runserver
"" http://127.0.0.1:8000/

echo Server started!
echo =====================================