$ErrorActionPreference = "Stop"

$psqlPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
$dbUser = "postgres"
$dbPassword = "root"
$dbName = "portfolio"

Write-Host "Setting up PostgreSQL database..." -ForegroundColor Cyan

# Set password environment variable
$env:PGPASSWORD = $dbPassword

try {
    # Check if database exists
    $checkDb = & $psqlPath -U $dbUser -t -c "SELECT 1 FROM pg_database WHERE datname='$dbName'"
    
    if ($checkDb -match "1") {
        Write-Host "Database portfolio already exists. Dropping it..." -ForegroundColor Yellow
        & $psqlPath -U $dbUser -c "DROP DATABASE portfolio;"
    }
    
    # Create database
    Write-Host "Creating database..." -ForegroundColor Yellow
    & $psqlPath -U $dbUser -c "CREATE DATABASE $dbName;"
    Write-Host "Database created successfully" -ForegroundColor Green
    
    # Run schema
    Write-Host "Running schema.sql..." -ForegroundColor Yellow
    & $psqlPath -U $dbUser -d $dbName -f "database\schema.sql"
    Write-Host "Schema created successfully" -ForegroundColor Green
    
    # Run seed data
    Write-Host "Running seed_data.sql..." -ForegroundColor Yellow
    & $psqlPath -U $dbUser -d $dbName -f "database\seed_data.sql"
    Write-Host "Sample data inserted successfully" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Database setup complete!" -ForegroundColor Green
    
}
catch {
    Write-Host "Error occurred: $_" -ForegroundColor Red
    exit 1
}
finally {
    # Clear password
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}
