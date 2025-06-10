#!/bin/bash
# This script tests the user delete endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso: chmod +x test/test-deleteUser.sh
# Usage: ./test/test-deleteUser.sh
# Test the delete user endpoint with a valid request

# 📝 Primero registramos un usuario para poder eliminarlo
echo "📝 Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Ramon","password":"clave123","code":"ALma2233"}'

# ✅ Test delete user with a valid username
echo "📝 Eliminamos usuario..."
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{"username":"Ramon"}'

# ❌ Test delete user with a non-existent user
echo "📝 Provocamos error, no existe usuario..."
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{"username":"NonExistentUser"}'

# ❌ Test delete user without username
echo "📝 Provocamos error, solicitud vacia"
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{}'
