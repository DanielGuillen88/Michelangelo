#!/bin/bash
# This script tests the login endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test-login.sh
# Usage: ./test-login.sh
# Test the login endpoint with a valid request
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
# Test contraseña correcta
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass"}'
# Test contraseña incorrecta
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"wrongpass"}'
# Test usuario no existe
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguelito","password":"wrongpass"}'
# Test falta username
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"password":"testpass"}'
# Test falta password
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'
# Test falta username y password
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{}'
  