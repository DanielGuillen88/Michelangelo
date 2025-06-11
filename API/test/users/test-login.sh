#!/bin/bash
# This script tests the login endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test/users/test-login.sh
# Usage: ./test/users/test-login.sh

echo "✅ Logeamos con testuser"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba1","password":"testpass1"}'
echo ""
echo "✅ Logeamos con Miguel"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba2","password":"testpass2"}'
echo ""
echo "❌ Provocamos error, contraseña incorrecta"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba1","password":"wrongpass"}'
echo ""
echo "❌ Provocamos error, usuario incorrecto"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba","password":"testpass1"}'
echo ""
echo "❌ Provocamos error, falta usuario"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "", "password":"testpass"}'
echo ""
echo "❌ Provocamos error, falta contraseña"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser", "password": ""}'
echo ""
echo "❌ Provocamos error, faltan datos"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "", "password": ""}'
  