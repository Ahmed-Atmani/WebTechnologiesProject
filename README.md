Project Web Technologies
========================

Logo
----

![image](./Angular_front-end/src/assets/images/Logo.png)


Required software
-----------------
These have to be installed in order to run the web application:
- Node.js
- Python


Setting up the back-end
-----------------------
Execute the following commands in the root folder:
1. Create a Python virtual environment:
   ```
   python -m venv Django_back-end\venv
   ```
2. Activate the virtual environment:
   ```
   .\Django_back-end\venv\Scripts\activate
   ```
3. Install required packages:
   ```
   pip install -r .\requirements.txt
   ```


Setting up the front-end
------------------------
1. (Windows only) Enable script execution on Powershell run this command in PowerShell:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
1. Install angular cli by running the following commands in PowerShell:
    ```bash
    npm install -g @angular/cli
    ```
1. Go to the front-end folder and run the following command: 
    ```bash
    cd Angular_front-end
    npm install
    ```


Starting the server and front-end
---------------------------------
1. Go to the root folder of the project
1. Start the back-end and front-end:
    - On Windows: execute the ```start.bat``` file by double-clicking it, or by directly executing it on the PowerShell terminal:

    ```powershell
    ./start.bat
    ```

    - On Linux or MacOS: execute the ```start.sh``` shell script by executing the following command:

    ```bash
    sh start.sh
    ```
