echo "====================================="
echo "Starting server..."

# Run the Django server
./venv/bin/python manage.py runserver

# Open the default web browser
xdg-open http://127.0.0.1:8000/

# Keep the terminal open until the user presses enter
read -p "Press enter to close the server terminal"

echo "Server started!"
echo "====================================="

