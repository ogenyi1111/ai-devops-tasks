#!/bin/bash
# Simple database backup script

DB_NAME="app_database"
BACKUP_DIR="/var/backups/db"
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME="${BACKUP_DIR}/${DB_NAME}_${DATE}.sql.gz"

# Check if the directory exists
if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
  echo "Created directory $BACKUP_DIR"
fi

# Perform the backup
echo "Starting backup of $DB_NAME..."
mysqldump -u root -p "$DB_NAME" | gzip > "$FILENAME"

if [ $? -eq 0 ]; then
  echo "Backup successful: $FILENAME"
else
  echo "Backup failed!"
  exit 1
fi
