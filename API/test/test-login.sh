#!/bin/bash
# This script tests the login endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test/test-login.sh
# Usage: ./test/test-login.sh

# ✅ Test usuario correcto
echo "📝 Logeamos con testuser"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# ✅ Test usuario correcto
echo "📝 Logeamos con Miguel"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass"}'

# ❌ Test contraseña incorrecta
echo "📝 Provocamos error, contraseña incorrecta"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"wrongpass"}'

# ❌ Test usuario no existe
echo "📝 Provocamos error, usuario incorrecto"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguelito","password":"wrongpass"}'

# ❌ Test falta username
echo "📝 Provocamos error, falta usuario"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"password":"testpass"}'

# ❌ Test falta password
echo "📝 Provocamos error, falta contraseña"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'

# ❌ Test falta username y password
echo "📝 Provocamos error, faltan datos"
curl -X POST http://localhost:3050/users/login \
  -H "Content-Type: application/json" \
  -d '{}'
  