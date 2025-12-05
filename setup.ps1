# Quick Setup Script for Windows PowerShell

Write-Host "🚀 Portfolio 3D Setup Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# Check if PostgreSQL is running
Write-Host "`n📊 Checking PostgreSQL..." -ForegroundColor Yellow
$pgStatus = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue

if ($pgStatus) {
    Write-Host "✅ PostgreSQL service found" -ForegroundColor Green
} else {
    Write-Host "⚠️  PostgreSQL service not found. Please ensure PostgreSQL is installed and running." -ForegroundColor Red
}

# Check if Node.js is installed
Write-Host "`n📦 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit
}

# Database setup instructions
Write-Host "`n🗄️  Database Setup" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow
Write-Host "To set up the database, run these commands in psql or PgAdmin:" -ForegroundColor White
Write-Host ""
Write-Host "  psql -U postgres -c 'CREATE DATABASE portfolio;'" -ForegroundColor Cyan
Write-Host "  psql -U postgres -d portfolio -f database/schema.sql" -ForegroundColor Cyan
Write-Host "  psql -U postgres -d portfolio -f database/seed_data.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or use PgAdmin GUI to:" -ForegroundColor White
Write-Host "  1. Create database 'portfolio'" -ForegroundColor White
Write-Host "  2. Run schema.sql" -ForegroundColor White
Write-Host "  3. Run seed_data.sql" -ForegroundColor White

# Backend setup
Write-Host "`n⚙️  Backend Setup" -ForegroundColor Yellow
Write-Host "================" -ForegroundColor Yellow
$installBackend = Read-Host "Install backend dependencies? (y/n)"

if ($installBackend -eq "y" -or $installBackend -eq "Y") {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
}

# Instructions to run
Write-Host "`n🚀 Ready to Launch!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor White
Write-Host ""
Write-Host "1. Start Backend (in terminal 1):" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Start Frontend (in terminal 2):" -ForegroundColor Yellow
Write-Host "   npx live-server --port=3000" -ForegroundColor Cyan
Write-Host "   OR" -ForegroundColor White
Write-Host "   python -m http.server 3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Open browser:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Magenta
