# Database backup script for Windows
# Requires MySQL to be installed and accessible via command line

# Configuration
$DB_NAME = "app_database"
$BACKUP_DIR = "C:\Backups\DB"
$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$FILENAME = Join-Path $BACKUP_DIR "${DB_NAME}_${DATE}.sql.gz"

# Create backup directory if it doesn't exist
if (-not (Test-Path $BACKUP_DIR)) {
    try {
        New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
        Write-Host "Created directory $BACKUP_DIR"
    }
    catch {
        Write-Error "Failed to create directory $BACKUP_DIR"
        exit 1
    }
}

# Perform the backup
Write-Host "Starting backup of $DB_NAME..."

try {
    # Using 7-Zip for compression (make sure 7-Zip is installed)
    # If 7-Zip is not installed, you can use .NET's GZipStream or remove compression
    mysqldump -u root -p $DB_NAME | & 'C:\Program Files\7-Zip\7z.exe' a -si$FILENAME -tgzip
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backup successful: $FILENAME"
    }
    else {
        throw "mysqldump or compression failed with exit code $LASTEXITCODE"
    }
}
catch {
    Write-Error "Backup failed: $_"
    exit 1
}

# Alternative version without 7-Zip (using .NET GZipStream)
<#
try {
    $dump = mysqldump -u root -p $DB_NAME
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($dump)
    $ms = New-Object System.IO.MemoryStream
    $gzip = New-Object System.IO.Compression.GZipStream($ms, [System.IO.Compression.CompressionMode]::Compress)
    $gzip.Write($bytes, 0, $bytes.Length)
    $gzip.Close()
    [System.IO.File]::WriteAllBytes($FILENAME, $ms.ToArray())
    Write-Host "Backup successful: $FILENAME"
}
catch {
    Write-Error "Backup failed: $_"
    exit 1
}
#>
