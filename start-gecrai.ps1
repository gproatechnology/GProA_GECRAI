# =============================================================================
# GECRAI - Script de Levantamiento Interactivo
# Sistema Inteligente para Memorias de Calculo Electrico v1.1 Pro
# =============================================================================

# Configuracion de rutas
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$FrontendDir = Join-Path $ScriptDir "frontend"
$BackendDir = Join-Path $ScriptDir "backend"
$LogsDir = Join-Path $ScriptDir "logs"

# Crear directorio de logs si no existe
if (!(Test-Path $LogsDir)) {
    New-Item -ItemType Directory -Path $LogsDir -Force | Out-Null
}

# Archivos de log
$FrontendLog = Join-Path $LogsDir "frontend.log"
$BackendLog = Join-Path $LogsDir "backend.log"

# Colores para consola
$ColorHeader = "Green"
$ColorInfo = "Cyan"
$ColorWarning = "Yellow"
$ColorError = "Red"
$ColorSuccess = "Green"

function Write-Header {
    Write-Host "`n=============================================================================" -ForegroundColor $ColorHeader
    Write-Host "  GECRAI - Sistema Inteligente para Memorias de Calculo Electrico v1.1 Pro" -ForegroundColor $ColorHeader
    Write-Host "  Desarrollado por GProA Technology" -ForegroundColor $ColorHeader
    Write-Host "=============================================================================`n" -ForegroundColor $ColorHeader
}

function Write-Info {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor $ColorInfo
}

function Write-Success {
    param($Message)
    Write-Host "[OK] $Message" -ForegroundColor $ColorSuccess
}

function Write-Warning {
    param($Message)
    Write-Host "[WARN] $Message" -ForegroundColor $ColorWarning
}

function Write-ErrorCustom {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $ColorError
}

function Check-Prerequisites {
    Write-Info "Verificando prerrequisitos..."
    
    $errors = @()
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version 2>&1
        if ($nodeVersion) {
            Write-Success "Node.js encontrado: $nodeVersion"
        } else {
            $errors += "Node.js no encontrado"
        }
    } catch {
        $errors += "Node.js no instalado o no esta en el PATH"
    }
    
    # Verificar npm
    try {
        $npmVersion = npm --version 2>&1
        if ($npmVersion) {
            Write-Success "npm encontrado: $npmVersion"
        } else {
            $errors += "npm no encontrado"
        }
    } catch {
        $errors += "npm no instalado o no esta en el PATH"
    }
    
    # Verificar Python
    try {
        $pythonVersion = python --version 2>&1
        if ($pythonVersion) {
            Write-Success "Python encontrado: $pythonVersion"
        } else {
            $errors += "Python no encontrado"
        }
    } catch {
        $errors += "Python no instalado o no esta en el PATH"
    }
    
    # Verificar directorio frontend
    if (Test-Path $FrontendDir) {
        Write-Success "Directorio frontend encontrado: $FrontendDir"
    } else {
        $errors += "Directorio frontend no encontrado: $FrontendDir"
    }
    
    if ($errors.Count -gt 0) {
        Write-Warning "Se encontraron los siguientes problemas:"
        $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor $ColorWarning }
        Write-Host ""
        return $false
    }
    
    return $true
}

function Start-Frontend {
    Write-Info "Iniciando frontend (Vite + React)..."
    
    if (!(Test-Path $FrontendDir)) {
        Write-ErrorCustom "Directorio frontend no existe: $FrontendDir"
        return
    }
    
    # Verificar node_modules
    if (!(Test-Path (Join-Path $FrontendDir "node_modules"))) {
        Write-Warning "Instalando dependencias de frontend (npm install)..."
        Push-Location $FrontendDir
        npm install 2>&1 | Tee-Object -FilePath $FrontendLog
        Pop-Location
    }
    
    # Iniciar servidor de desarrollo en segundo plano
    Write-Info "Levantando servidor de desarrollo en http://localhost:5173"
    Write-Info "Los logs se guardaran en: $FrontendLog"
    
    # En Windows, usar cmd /c para ejecutar npm.cmd y redirigir salida al log
    # Esto es mas confiable que Process.Start con npm directo porque npm.cmd es un .bat
    # que lanza node y termina; con cmd /c el proceso padre permanece vivo.
    $cmd = "cmd /c ""cd /d ""$FrontendDir"" && npm.cmd run dev > ""$FrontendLog"" 2>&1"""
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = "cmd.exe"
    $startInfo.Arguments = $cmd
    $startInfo.WorkingDirectory = $FrontendDir
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    
    try {
        $process = [System.Diagnostics.Process]::Start($startInfo)
    } catch {
        Write-ErrorCustom "No se pudo iniciar el proceso de frontend: $($_.Exception.Message)"
        Write-Info "Intenta ejecutar manualmente: cd $FrontendDir && npm run dev"
        return
    }
    
    # Guardar PID para poder detenerlo despues
    if ($process.Id) {
        $process.Id | Out-File -FilePath (Join-Path $LogsDir "frontend.pid")
        Write-Success "Frontend iniciado (PID: $($process.Id))"
    } else {
        Write-Warning "No se pudo obtener el PID del frontend"
    }
    Write-Info "Accede a: http://localhost:5173"
}

function Start-Backend {
    Write-Info "Iniciando backend (Python)..."
    
    if (!(Test-Path $BackendDir)) {
        Write-Warning "Directorio backend no existe aun: $BackendDir"
        Write-Info "El backend se creara en la siguiente fase de desarrollo."
        return
    }
    
    # Verificar requirements.txt
    $reqFile = Join-Path $BackendDir "requirements.txt"
    if (Test-Path $reqFile) {
        Write-Info "Instalando dependencias de Python en venv..."
        $venvPip = Join-Path $BackendDir "venv\Scripts\pip.exe"
        if (Test-Path $venvPip) {
            Push-Location $BackendDir
            & $venvPip install -r requirements.txt 2>&1 | Tee-Object -FilePath $BackendLog
            Pop-Location
        } else {
            Write-Warning "No se encontro venv. Instalando globalmente..."
            Push-Location $BackendDir
            python -m pip install -r requirements.txt 2>&1 | Tee-Object -FilePath $BackendLog
            Pop-Location
        }
    }
    
    # Buscar archivo principal del backend
    $mainFile = Join-Path $BackendDir "main.py"
    if (Test-Path $mainFile) {
        Write-Info "Levantando servidor backend..."
        
        $startInfo = New-Object System.Diagnostics.ProcessStartInfo
        # Usar python.exe del venv si existe, si no usar python global
        $venvPython = Join-Path $BackendDir "venv\Scripts\python.exe"
        if (Test-Path $venvPython) {
            $startInfo.FileName = $venvPython
        } else {
            $pythonExe = "python.exe"
            if (!(Get-Command $pythonExe -ErrorAction SilentlyContinue)) {
                $pythonExe = "python"
            }
            $startInfo.FileName = $pythonExe
        }
        $startInfo.Arguments = "main.py"
        $startInfo.WorkingDirectory = $BackendDir
        $startInfo.UseShellExecute = $false
        $startInfo.RedirectStandardOutput = $true
        $startInfo.RedirectStandardError = $true
        $startInfo.CreateNoWindow = $true
        
        try {
            $process = [System.Diagnostics.Process]::Start($startInfo)
        } catch {
            Write-ErrorCustom "No se pudo iniciar el proceso de backend: $($_.Exception.Message)"
            Write-Info "Intenta ejecutar manualmente: cd $BackendDir && venv\Scripts\python.exe main.py"
            return
        }
        
        $job = Start-Job -ScriptBlock {
            param($process, $logFile)
            while (!$process.HasExited) {
                $line = $process.StandardOutput.ReadLine()
                if ($line) {
                    Add-Content -Path $logFile -Value $line
                }
            }
            while ($line = $process.StandardError.ReadLine()) {
                if ($line) {
                    Add-Content -Path $logFile -Value $line
                }
            }
        } -ArgumentList $process, $BackendLog
        
        # Guardar PID para poder detenerlo despues
        if ($process.Id) {
            $process.Id | Out-File -FilePath (Join-Path $LogsDir "backend.pid")
            Write-Success "Backend iniciado (PID: $($process.Id))"
        } else {
            Write-Warning "No se pudo obtener el PID del backend"
        }
        } else {
        Write-Warning "No se encontro main.py en el backend"
    }
}

function Diagnose-Backend {
    Write-Host "`n=== DIAGNOSTICO DEL BACKEND ===" -ForegroundColor $ColorHeader
    
    # 1. Verificar directorio backend
    Write-Host "`n1. Directorio backend:" -ForegroundColor $ColorInfo
    if (Test-Path $BackendDir) {
        Write-Success "Directorio existe: $BackendDir"
    } else {
        Write-Warning "Directorio backend NO existe: $BackendDir"
        Write-Host "El backend se creara en la Fase 3 (Sprint 3.1)."
    }
    
    # 2. Verificar proceso
    Write-Host "`n2. Estado del proceso:" -ForegroundColor $ColorInfo
    $backendPidFile = Join-Path $LogsDir "backend.pid"
    if (Test-Path $backendPidFile) {
        $procPid = Get-Content $backendPidFile
        try {
            $proc = Get-Process -Id $procPid -ErrorAction Stop
            Write-Success "Proceso backend activo (PID: $procPid, Nombre: $($proc.ProcessName))"
        } catch {
            Write-Warning "Proceso backend NO activo (PID: $procPid no encontrado)"
        }
    } else {
        Write-Warning "No hay archivo backend.pid. El backend no se ha iniciado."
    }
    
    # 3. Verificar puerto 8000
    Write-Host "`n3. Puerto 8000:" -ForegroundColor $ColorInfo
    try {
        $conn = Get-NetTCPConnection -LocalPort 8000 -ErrorAction Stop
        Write-Success "Puerto 8000 en uso (Estado: $($conn.State), PID: $($conn.OwningProcess))"
    } catch {
        Write-Warning "Puerto 8000 NO esta en uso. El servidor backend no esta escuchando."
    }
    
    # 4. Verificar logs
    Write-Host "`n4. Logs:" -ForegroundColor $ColorInfo
    $backendLog = Join-Path $LogsDir "backend.log"
    if (Test-Path $backendLog) {
        $size = (Get-Item $backendLog).Length
        Write-Host "Archivo: $backendLog ($size bytes)"
        Get-Content $backendLog -Tail 20
    } else {
        Write-Warning "No hay archivo backend.log."
    }
    
    # 5. Probar respuesta HTTP
    Write-Host "`n5. Respuesta HTTP en http://localhost:8000:" -ForegroundColor $ColorInfo
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 5 -ErrorAction Stop
        Write-Success "Respuesta OK: $($resp.StatusCode) $($resp.StatusDescription)"
    } catch {
        Write-Warning "No se pudo conectar a http://localhost:8000: $($_.Exception.Message)"
    }
    
    # 6. Verificar main.py
    Write-Host "`n6. Archivo main.py:" -ForegroundColor $ColorInfo
    $mainFile = Join-Path $BackendDir "main.py"
    if (Test-Path $mainFile) {
        Write-Success "Archivo encontrado: $mainFile"
    } else {
        Write-Warning "No se encontro main.py en el backend"
    }
    
    Write-Host "`n=== FIN DEL DIAGNOSTICO ===" -ForegroundColor $ColorHeader
}

function Stop-Processes {
    Write-Info "Deteniendo procesos de GECRAI..."
    
    try {
        $pidFiles = @(
            "$LogsDir\frontend.pid",
            "$LogsDir\backend.pid"
        )
        
        foreach ($pidFile in $pidFiles) {
            if (Test-Path $pidFile) {
                $pidRaw = Get-Content $pidFile -ErrorAction SilentlyContinue
                $procPid = $null
                
                # Validar que sea un numero valido
                if ($pidRaw -match '^\d+$') {
                    $procPid = [int]$pidRaw
                }
                
                if ($procPid -ne $null) {
                    try {
                        Stop-Process -Id $procPid -Force -ErrorAction Stop
                        Write-Success "Proceso PID $procPid detenido"
                    } catch {
                        Write-Warning "No se pudo detener el proceso PID $procPid (ya puede estar detenido)"
                    }
                } else {
                    Write-Warning "PID invalido en archivo: $pidFile"
                }
                
                # Siempre intentar borrar el archivo PID
                try {
                    Remove-Item $pidFile -Force -ErrorAction Stop
                } catch {
                    Write-Warning "No se pudo borrar el archivo PID: $pidFile"
                }
            }
        }
        
        # Tambien intentar detener por nombre de proceso
        try {
            Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*vite*" } | Stop-Process -Force -ErrorAction SilentlyContinue
        } catch {}
        
        try {
            Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*backend*" } | Stop-Process -Force -ErrorAction SilentlyContinue
        } catch {}
        
        Write-Success "Todos los procesos detenidos"
    } catch {
        Write-Warning "Ocurrio un error deteniendo procesos: $($_.Exception.Message)"
    }
}

function Show-Logs {
    Write-Info "Mostrando logs recientes..."
    
    $logFiles = @(
        "$LogsDir\frontend.log",
        "$LogsDir\backend.log"
    )
    
    foreach ($logFile in $logFiles) {
        if (Test-Path $logFile) {
            Write-Host "`n=== Log: $logFile ===" -ForegroundColor $ColorHeader
            Get-Content $logFile -Tail 50
        } else {
            Write-Warning "Log no encontrado: $logFile"
        }
    }
}

function Diagnose-Frontend {
    Write-Host "`n=== DIAGNOSTICO DEL FRONTEND ===" -ForegroundColor $ColorHeader
    
    # 1. Verificar proceso
    Write-Host "`n1. Estado del proceso:" -ForegroundColor $ColorInfo
    $frontendPidFile = Join-Path $LogsDir "frontend.pid"
    if (Test-Path $frontendPidFile) {
        $procPid = Get-Content $frontendPidFile
        try {
            $proc = Get-Process -Id $procPid -ErrorAction Stop
            Write-Success "Proceso frontend activo (PID: $procPid, Nombre: $($proc.ProcessName))"
        } catch {
            Write-Warning "Proceso frontend NO activo (PID: $procPid no encontrado)"
        }
    } else {
        Write-Warning "No hay archivo frontend.pid. El frontend no se ha iniciado."
    }
    
    # 2. Verificar puerto 5173
    Write-Host "`n2. Puerto 5173:" -ForegroundColor $ColorInfo
    try {
        $conn = Get-NetTCPConnection -LocalPort 5173 -ErrorAction Stop
        Write-Success "Puerto 5173 en uso (Estado: $($conn.State), PID: $($conn.OwningProcess))"
    } catch {
        Write-Warning "Puerto 5173 NO esta en uso. El servidor no esta escuchando."
    }
    
    # 3. Verificar logs
    Write-Host "`n3. Logs:" -ForegroundColor $ColorInfo
    $frontendLog = Join-Path $LogsDir "frontend.log"
    if (Test-Path $frontendLog) {
        $size = (Get-Item $frontendLog).Length
        Write-Host "Archivo: $frontendLog ($size bytes)"
        Get-Content $frontendLog -Tail 20
    } else {
        Write-Warning "No hay archivo frontend.log. Revisa si el proceso escribio salida."
    }
    
    # 4. Probar respuesta HTTP
    Write-Host "`n4. Respuesta HTTP en http://localhost:5173:" -ForegroundColor $ColorInfo
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 5 -ErrorAction Stop
        Write-Success "Respuesta OK: $($resp.StatusCode) $($resp.StatusDescription)"
    } catch {
        Write-Warning "No se pudo conectar a http://localhost:5173: $($_.Exception.Message)"
    }
    
    Write-Host "`n=== FIN DEL DIAGNOSTICO ===" -ForegroundColor $ColorHeader
}

function Clear-Logs {
    Write-Info "Limpiando logs..."
    
    $logFiles = @(
        "$LogsDir\frontend.log",
        "$LogsDir\backend.log"
    )
    
    foreach ($logFile in $logFiles) {
        if (Test-Path $logFile) {
            Clear-Content $logFile -ErrorAction SilentlyContinue
            Write-Success "Log limpiado: $logFile"
        }
    }
}

function Show-Status {
    Write-Info "Estado actual de GECRAI..."
    
    Write-Host "`n--- Frontend ---" -ForegroundColor $ColorHeader
    $frontendPidFile = Join-Path $LogsDir "frontend.pid"
    if (Test-Path $frontendPidFile) {
        $procPid = Get-Content $frontendPidFile
        try {
            Get-Process -Id $procPid -ErrorAction Stop | Out-Null
            Write-Success "Frontend ejecutandose (PID: $procPid)"
        } catch {
            Write-Warning "Frontend no esta ejecutandose"
        }
    } else {
        Write-Warning "Frontend no esta ejecutandose"
    }
    
    Write-Host "`n--- Backend ---" -ForegroundColor $ColorHeader
    $backendPidFile = Join-Path $LogsDir "backend.pid"
    if (Test-Path $backendPidFile) {
        $procPid = Get-Content $backendPidFile
        try {
            Get-Process -Id $procPid -ErrorAction Stop | Out-Null
            Write-Success "Backend ejecutandose (PID: $procPid)"
        } catch {
            Write-Warning "Backend no esta ejecutandose"
        }
    } else {
        Write-Warning "Backend no esta ejecutandose o no se ha creado aun"
    }
    
    Write-Host "`n--- Logs ---" -ForegroundColor $ColorHeader
    foreach ($log in @($FrontendLog, $BackendLog)) {
        if (Test-Path $log) {
            $size = (Get-Item $log).Length
            Write-Host "  $log ($size bytes)"
        } else {
            Write-Host "  $log (no existe)"
        }
    }
}

function Show-Menu {
    Write-Header
    Write-Host "Selecciona una opcion:`n" -ForegroundColor $ColorInfo
    Write-Host "  1. Levantar solo el Frontend (Vite + React)" -ForegroundColor $ColorInfo
    Write-Host "  2. Levantar solo el Backend (Python)" -ForegroundColor $ColorInfo
    Write-Host "  3. Levantar todo (Frontend + Backend)" -ForegroundColor $ColorInfo
    Write-Host "  4. Detener todos los procesos" -ForegroundColor $ColorWarning
    Write-Host "  5. Ver estado actual" -ForegroundColor $ColorInfo
    Write-Host "  6. Ver logs recientes" -ForegroundColor $ColorInfo
    Write-Host "  7. Limpiar logs" -ForegroundColor $ColorWarning
    Write-Host "  8. Verificar prerrequisitos" -ForegroundColor $ColorInfo
    Write-Host "  9. Diagnosticar frontend (puerto 5173)" -ForegroundColor $ColorInfo
    Write-Host "  10. Diagnosticar backend (puerto 8000)" -ForegroundColor $ColorInfo
    Write-Host "  0. Salir" -ForegroundColor $ColorError
    Write-Host ""
}

# =============================================================================
# BUCLE PRINCIPAL
# =============================================================================

do {
    Show-Menu
    $option = Read-Host "Ingresa una opcion"
    
    switch ($option) {
        "1" {
            if (Check-Prerequisites) {
                Start-Frontend
            }
            Read-Host "`nPresiona Enter para continuar"
        }
        "2" {
            if (Check-Prerequisites) {
                Start-Backend
            }
            Read-Host "`nPresiona Enter para continuar"
        }
        "3" {
            if (Check-Prerequisites) {
                Start-Frontend
                Start-Sleep -Seconds 2
                Start-Backend
            }
            Read-Host "`nPresiona Enter para continuar"
        }
        "4" {
            try {
                Stop-Processes
            } catch {
                Write-Warning "Error deteniendo procesos: $($_.Exception.Message)"
            }
            Read-Host "`nPresiona Enter para continuar"
        }
        "5" {
            Show-Status
            Read-Host "`nPresiona Enter para continuar"
        }
        "6" {
            Show-Logs
            Read-Host "`nPresiona Enter para continuar"
        }
        "7" {
            Clear-Logs
            Read-Host "`nPresiona Enter para continuar"
        }
        "8" {
            Check-Prerequisites
            Read-Host "`nPresiona Enter para continuar"
        }
        "9" {
            Diagnose-Frontend
            Read-Host "`nPresiona Enter para continuar"
        }
        "10" {
            Diagnose-Backend
            Read-Host "`nPresiona Enter para continuar"
        }
        "0" {
            Write-Info "Saliendo del script..."
        }
        default {
            Write-Warning "Opcion no valida"
            Read-Host "`nPresiona Enter para continuar"
        }
    }
} while ($option -ne "0")

Write-Host "`nGracias por usar GECRAI Development Script" -ForegroundColor $ColorHeader
