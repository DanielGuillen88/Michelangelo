#!/bin/bash
# This script tests the registration endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test/test-register.sh
# Usage: ./test/test-register.sh
# Test the registration endpoint with a valid request
#!/bin/bash

echo "✅ Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba1","password":"testpass2","code":"ADm1nX78"}'
echo ""
echo "❌ Provocamos error, falta code"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"testpass2", "code":""}'
echo ""
echo "❌ Provocamos error, falta password"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser3","password":"","code":"ALma2233"}'
echo ""
echo "❌ Provocamos error, falta username"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "", "password":"12345a","code":"ALma2233"}'
echo ""
echo "❌ Provocamos error, codigo incorrecto"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguelaso","password":"12345a","code":"12345a"}' 
echo ""
echo "❌ Provocamos error, usuario duplicado"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba1","password":"testpass2","code":"ADm1nX78"}'
