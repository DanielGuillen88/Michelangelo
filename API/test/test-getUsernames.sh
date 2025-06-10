#!/bin/bash
# This script tests the getUsername and getAllUsernames endpoints of the API.
# Make sure the API is running before executing this script.
# Para dar permiso: chmod +x test/test-getUsernames.sh
# Usage: ./test/test-getUsernames.sh

# 📝 Primero registramos un par de usuarios si no existen
echo "📝 Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"UserOne","password":"pass123","code":"ALma2233"}'
# ✅ Test traer para traer usuario UserOne
echo ""
echo "🔎 Test 1: Traemos a UserOne"
curl -X GET http://localhost:3050/users/username/UserOne
echo ""
# ✅ Test traer para traer usuario Miguel
echo ""
echo "🔎 Test 2: Traemos a Miguel"
curl -X GET http://localhost:3050/users/username/Miguel
echo ""
# ❌ Test traer para traer usuario no existente
echo ""
echo "🧍‍♂️ Test 3: Provocamos error con usuario no existente"
curl -X GET http://localhost:3050/users/username/NoExiste
echo ""
# ❌ Test traer todos los usuarios
echo ""
echo "📋 Test 4: Traemos a todos los usuarios"
curl -X GET http://localhost:3050/users/usernames
echo ""
