#!/bin/bash
# This script tests the user delete endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso: chmod +x test/users/test-deleteUser.sh
# Usage: ./test/users/test-deleteUser.sh

echo "✅ Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Michelangelo","password":"clave123","code":"ALma2233"}'
echo ""
echo "✅ Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Ramon","password":"clave123","code":"ALma2233"}'
echo ""
echo "✅ Eliminamos usuario..."
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{"username":"Ramon"}'
echo ""
echo "❌Provocamos error, no existe usuario..."
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{"username":"NonExistentUser"}'
echo ""
echo "❌ Provocamos error, solicitud vacia"
curl -X DELETE http://localhost:3050/users/delete \
  -H "Content-Type: application/json" \
  -d '{"username": ""}'
echo ""
echo "✅ Eliminamos usuario con ID QuhVZHIvuIzBgmoeVsPv..."
curl -X DELETE http://localhost:3050/users/delete/QuhVZHIvuIzBgmoeVsPv
echo ""
