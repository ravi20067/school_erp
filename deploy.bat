@echo off
setlocal EnableDelayedExpansion
title School ERP Deployment Utility
color 0A

:: =====================================================
::                PROJECT PATHS
:: =====================================================

set "BACKEND=C:\Users\maste\OneDrive\Desktop\school_erp\backend\School-Management"
set "FRONTEND=C:\Users\maste\OneDrive\Desktop\school_erp\frontend\academy-frontend-hub-303"
set "NGINX=C:\Users\maste\OneDrive\Desktop\school_erp\deployement\nginx"
set "DEPLOY=C:\Users\maste\OneDrive\Desktop\school_erp\deployement"

:: =====================================================
::                STATUS VARIABLES
:: =====================================================

set LASTTASK=None
set LASTRESULT=Ready

goto MAINMENU

:: =====================================================
:: HEADER
:: =====================================================

:HEADER
cls
echo ============================================================
echo                SCHOOL ERP DEPLOYMENT UTILITY
echo ============================================================
echo.
echo Current Status :
echo.
echo    Last Task   : %LASTTASK%
echo    Last Result : %LASTRESULT%
echo.
echo ============================================================
echo.
exit /b

:: =====================================================
:: MAIN MENU
:: =====================================================

:MAINMENU

call :HEADER

echo A. Build
echo B. Run
echo C. Stop
echo D. Tools
echo E. Exit


set /p CHOICE=Select Option :

if "%CHOICE%"=="A" goto BUILDMENU
if "%CHOICE%"=="B" goto RUNMENU
if "%CHOICE%"=="C" goto STOPMENU
if "%CHOICE%"=="D" goto TOOLMENU
if "%CHOICE%"=="E" exit

echo.
echo Invalid Choice...
timeout /t 2 >nul
goto MAINMENU

:: =====================================================
:: BUILD MENU
:: =====================================================

:BUILDMENU

call :HEADER

echo BUILD MENU
echo.
echo A. Build Frontend
echo B. Build Backend
echo C. Build Nginx
echo D. Build Frontend + Backend
echo E. Build All
echo F. Back
echo G. Exit
echo.

set /p BUILDCHOICE=Select Option :

if "%BUILDCHOICE%"=="A" goto BUILD_FRONTEND
if "%BUILDCHOICE%"=="B" goto BUILD_BACKEND
if "%BUILDCHOICE%"=="C" goto BUILD_NGINX
if "%BUILDCHOICE%"=="D" goto BUILD_FB
if "%BUILDCHOICE%"=="E" goto BUILD_ALL
if "%BUILDCHOICE%"=="F" goto MAINMENU
if "%BUILDCHOICE%"=="G" exit

echo.
echo Invalid Choice...
timeout /t 2 >nul
goto BUILDMENU


:: =====================================================
:: BUILD FRONTEND
:: =====================================================

:BUILD_FRONTEND

call :HEADER

echo Building Frontend...
echo.

cd /d "%FRONTEND%"

docker build -t school-frontend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Frontend Build
    set LASTRESULT=FAILED
    echo.
    echo ======================================
    echo Frontend Build Failed
    echo ======================================
    pause
    color 0A
    goto BUILDMENU
)

set LASTTASK=Frontend Build
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Frontend Build Successful
echo ======================================
pause

goto BUILDMENU


:: =====================================================
:: BUILD BACKEND
:: =====================================================

:BUILD_BACKEND

call :HEADER

echo Building Backend...
echo.

cd /d "%BACKEND%"

docker build -t school-backend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Backend Build
    set LASTRESULT=FAILED
    echo.
    echo ======================================
    echo Backend Build Failed
    echo ======================================
    pause
    color 0A
    goto BUILDMENU
)

set LASTTASK=Backend Build
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Backend Build Successful
echo ======================================
pause

goto BUILDMENU


:: =====================================================
:: BUILD NGINX
:: =====================================================

:BUILD_NGINX

call :HEADER

echo Building Nginx...
echo.

cd /d "%NGINX%"

docker build -t school-nginx .

if errorlevel 1 (
    color 0C
    set LASTTASK=Nginx Build
    set LASTRESULT=FAILED
    echo.
    echo ======================================
    echo Nginx Build Failed
    echo ======================================
    pause
    color 0A
    goto BUILDMENU
)

set LASTTASK=Nginx Build
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Nginx Build Successful
echo ======================================
pause

goto BUILDMENU


:: =====================================================
:: BUILD FRONTEND + BACKEND
:: =====================================================

:BUILD_FB

call :HEADER

echo Building Backend...
cd /d "%BACKEND%"
docker build -t school-backend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Backend Build
    set LASTRESULT=FAILED
    pause
    color 0A
    goto BUILDMENU
)

echo.
echo Building Frontend...
cd /d "%FRONTEND%"
docker build -t school-frontend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Frontend Build
    set LASTRESULT=FAILED
    pause
    color 0A
    goto BUILDMENU
)

set LASTTASK=Frontend + Backend Build
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Frontend + Backend Build Successful
echo ======================================
pause

goto BUILDMENU


:: =====================================================
:: BUILD ALL
:: =====================================================

:BUILD_ALL

call :HEADER

echo Building Backend...
cd /d "%BACKEND%"
docker build -t school-backend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Backend Build
    set LASTRESULT=FAILED
    pause
    color 0A
    goto BUILDMENU
)

echo.
echo Building Frontend...
cd /d "%FRONTEND%"
docker build -t school-frontend .

if errorlevel 1 (
    color 0C
    set LASTTASK=Frontend Build
    set LASTRESULT=FAILED
    pause
    color 0A
    goto BUILDMENU
)

echo.
echo Building Nginx...
cd /d "%NGINX%"
docker build -t school-nginx .

if errorlevel 1 (
    color 0C
    set LASTTASK=Nginx Build
    set LASTRESULT=FAILED
    pause
    color 0A
    goto BUILDMENU
)

set LASTTASK=Build All
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo All Images Built Successfully
echo ======================================
pause

goto BUILDMENU



:: =====================================================
:: RUN MENU
:: =====================================================

:RUNMENU

call :HEADER

echo RUN MENU
echo.
echo A. Run With Local MySQL
echo B. Run With Docker MySQL
echo C. Start ngrok
echo D. Back
echo E. Exit
echo.

set /p RUNCHOICE=Select Option :

if "%RUNCHOICE%"=="A" goto RUN_LOCAL
if "%RUNCHOICE%"=="B" goto RUN_DOCKER
if "%RUNCHOICE%"=="C" goto RUN_NGROK
if "%RUNCHOICE%"=="D" goto MAINMENU
if "%RUNCHOICE%"=="E" exit

echo.
echo Invalid Choice...
timeout /t 2 >nul
goto RUNMENU


:: =====================================================
:: CHECK DOCKER
:: =====================================================

:CHECK_DOCKER

docker info >nul 2>&1

if errorlevel 1 (

    color 0C

    echo.
    echo ===========================================
    echo Docker Desktop is NOT Running
    echo ===========================================
    echo.
    echo Please Start Docker Desktop First.
    echo.

    pause

    color 0A

    goto MAINMENU
)

exit /b


:: =====================================================
:: RUN ngrok
:: =====================================================


:RUN_NGROK
cls
echo.
echo ==========================================
echo           STARTING NGROK...
echo ==========================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Ngrok is not installed or not added to PATH.
    echo.
    pause
    goto :EOF
)

echo [INFO] Launching Ngrok in a new PowerShell window...

start "Ngrok Tunnel" powershell -NoExit -Command "ngrok start --all"

echo [INFO] Waiting for tunnel to initialize...
timeout /t 5 /nobreak >nul

echo [INFO] Opening application in your default browser...
start "" "https://shortcut-sled-multiply.ngrok-free.dev"

if errorlevel 1 (
    echo [ERROR] Failed to open browser.
    pause
    goto :EOF
)

echo.
echo ==========================================
echo   Ngrok tunnel started successfully!
echo ==========================================
echo.
echo URL:
echo https://shortcut-sled-multiply.ngrok-free.dev
echo.
echo Keep the Ngrok PowerShell window open.
echo.

goto RUNMENU



:: =====================================================
:: RUN LOCAL MYSQL
:: =====================================================

:RUN_LOCAL

call :CHECK_DOCKER

call :HEADER

echo Starting Containers using LOCAL MySQL...
echo.

cd /d "%DEPLOY%"

docker compose --env-file .env.local up -d

start "" "https://172.16.139.45/"

if errorlevel 1 (

    color 0C

    set LASTTASK=Run Local
    set LASTRESULT=FAILED

    echo.
    echo ======================================
    echo Deployment Failed
    echo ======================================

    pause

    color 0A

    goto RUNMENU
)

set LASTTASK=Run Local
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Deployment Successful
echo ======================================

echo.
docker ps

pause

goto RUNMENU


:: =====================================================
:: RUN DOCKER MYSQL
:: =====================================================

:RUN_DOCKER

call :CHECK_DOCKER

call :HEADER

echo Starting Containers using Docker MySQL...
echo.

cd /d "%DEPLOY%"

docker compose --env-file .env.docker --profile docker-db up -d

start "" "https://172.16.139.45/"

if errorlevel 1 (

    color 0C

    set LASTTASK=Run Docker
    set LASTRESULT=FAILED

    echo.
    echo ======================================
    echo Deployment Failed
    echo ======================================

    pause

    color 0A

    goto RUNMENU
)

set LASTTASK=Run Docker
set LASTRESULT=SUCCESS

echo.
echo ======================================
echo Deployment Successful
echo ======================================

echo.
docker ps

pause

goto RUNMENU


:: =====================================================
:: STOP MENU
:: =====================================================

:STOPMENU

call :HEADER

echo STOP MENU
echo.
echo A. Stop Containers
echo B. Stop And Remove Containers
echo C. Restart Containers
echo D. Back
echo E. Exit
echo.

set /p STOPCHOICE=Select Option :

if "%STOPCHOICE%"=="A" goto STOP_ONLY
if "%STOPCHOICE%"=="B" goto STOP_REMOVE
if "%STOPCHOICE%"=="C" goto RESTART_ALL
if "%STOPCHOICE%"=="D" goto MAINMENU
if "%STOPCHOICE%"=="E" exit

echo.
echo Invalid Choice...
timeout /t 2 >nul
goto STOPMENU


:: =====================================================
:: STOP CONTAINERS
:: =====================================================

:STOP_ONLY

call :CHECK_DOCKER

call :HEADER

echo.
echo Stopping Containers...
echo.

cd /d "%DEPLOY%"

docker compose --env-file .env.docker stop

if errorlevel 1 (

    color 0C

    set LASTTASK=Stop Containers
    set LASTRESULT=FAILED

    echo.
    echo Failed To Stop Containers.

    pause

    color 0A

    goto STOPMENU
)

set LASTTASK=Stop Containers
set LASTRESULT=SUCCESS

echo.
echo =====================================
echo Containers Stopped Successfully
echo =====================================

docker ps -a

pause

goto STOPMENU


:: =====================================================
:: STOP & REMOVE
:: =====================================================

:STOP_REMOVE

call :CHECK_DOCKER

call :HEADER

echo.
echo Removing Containers...
echo.

cd /d "%DEPLOY%"

docker compose --env-file .env.docker down

if errorlevel 1 (

    color 0C

    set LASTTASK=Remove Containers
    set LASTRESULT=FAILED

    echo.
    echo Failed To Remove Containers.

    pause

    color 0A

    goto STOPMENU
)

set LASTTASK=Remove Containers
set LASTRESULT=SUCCESS

echo.
echo =====================================
echo Containers Removed Successfully
echo =====================================

docker ps -a

pause

goto STOPMENU


:: =====================================================
:: RESTART
:: =====================================================

:RESTART_ALL

call :CHECK_DOCKER

call :HEADER

echo.
echo Restarting Containers...
echo.

cd /d "%DEPLOY%"

docker compose --env-file .env.docker restart

if errorlevel 1 (

    color 0C

    set LASTTASK=Restart Containers
    set LASTRESULT=FAILED

    echo.
    echo Restart Failed.

    pause

    color 0A

    goto STOPMENU
)

set LASTTASK=Restart Containers
set LASTRESULT=SUCCESS

echo.
echo =====================================
echo Restart Successful
echo =====================================

docker ps

pause

goto STOPMENU



:: =====================================================
:: TOOLS MENU
:: =====================================================

:TOOLMENU

call :HEADER

echo TOOLS MENU
echo.
echo A. Show Running Containers
echo B. Show All Containers
echo C. Show Docker Images
echo D. Backend Logs
echo E. Nginx Logs
echo F. Redis Logs
echo G. MySQL Logs
echo H. Docker Version
echo I. About
echo J. Back
echo K. Exit
echo.

set /p TOOLCHOICE=Select Option :

if "%TOOLCHOICE%"=="A" goto SHOW_RUNNING
if "%TOOLCHOICE%"=="B" goto SHOW_ALL
if "%TOOLCHOICE%"=="C" goto SHOW_IMAGES
if "%TOOLCHOICE%"=="D" goto BACKEND_LOGS
if "%TOOLCHOICE%"=="E" goto NGINX_LOGS
if "%TOOLCHOICE%"=="F" goto REDIS_LOGS
if "%TOOLCHOICE%"=="G" goto MYSQL_LOGS
if "%TOOLCHOICE%"=="H" goto DOCKER_VERSION
if "%TOOLCHOICE%"=="I" goto ABOUT
if "%TOOLCHOICE%"=="J" goto MAINMENU
if "%TOOLCHOICE%"=="K" exit

goto TOOLMENU


:: =====================================================
:: RUNNING CONTAINERS
:: =====================================================

:SHOW_RUNNING

call :HEADER

docker ps

pause

goto TOOLMENU


:: =====================================================
:: ALL CONTAINERS
:: =====================================================

:SHOW_ALL

call :HEADER

docker ps -a

pause

goto TOOLMENU


:: =====================================================
:: IMAGES
:: =====================================================

:SHOW_IMAGES

call :HEADER

docker images

pause

goto TOOLMENU


:: =====================================================
:: BACKEND LOGS
:: =====================================================

:BACKEND_LOGS

call :HEADER

docker logs -f school-backend

pause

goto TOOLMENU


:: =====================================================
:: NGINX LOGS
:: =====================================================

:NGINX_LOGS

call :HEADER

docker logs -f school-nginx

pause

goto TOOLMENU


:: =====================================================
:: REDIS LOGS
:: =====================================================

:REDIS_LOGS

call :HEADER

docker logs -f school-redis

pause

goto TOOLMENU


:: =====================================================
:: MYSQL LOGS
:: =====================================================

:MYSQL_LOGS

call :HEADER

docker logs -f school-mysql

pause

goto TOOLMENU


:: =====================================================
:: DOCKER VERSION
:: =====================================================

:DOCKER_VERSION

call :HEADER

docker version

echo.

docker compose version

pause

goto TOOLMENU


:: =====================================================
:: ABOUT
:: =====================================================

:ABOUT

call :HEADER

echo.
echo ==========================================
echo        SCHOOL ERP DEPLOYMENT TOOL
echo ==========================================
echo.
echo Version 1.0
echo.
echo Features
echo.
echo   - Backend Build
echo   - Frontend Build
echo   - Nginx Build
echo   - Docker Deployment
echo   - Local MySQL
echo   - Docker MySQL
echo   - Restart Containers
echo   - Container Logs
echo   - Docker Utilities
echo.
echo Developed By Ravi
echo.

pause

goto TOOLMENU