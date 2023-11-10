@echo OFF

@REM Start back-end
cd Django_back-end
start start_server.bat

@REM Start front-end
cd ../Angular_front-end
start start_front-end.bat
