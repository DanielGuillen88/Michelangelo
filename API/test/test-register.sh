#!/bin/bash
# This script tests the registration endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test/test-register.sh
# Usage: ./test/test-register.sh
# Test the registration endpoint with a valid request
#!/bin/bash

# ✅ Registro correcto (como admin)
echo "📝 Registramos usuario..."
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Prueba1","password":"testpass2","code":"ADm1nX78"}'

# ❌ Registro: falta code
echo "📝 Provocamos error, falta code"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"testpass2"}'

# ❌ Registro: falta password
echo "📝 Provocamos error, falta password"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser3","code":"ALma2233"}'

# ❌ Registro: falta username
echo "📝 Provocamos error, falta username"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"password":"123456","code":"ALma2233"}'

# ❌ Registro: código inválido
echo "📝 Provocamos error, codigo incorrecto"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass","code":"almacen"}' 

# ❌ Registro: usuario ya existe
echo "📝 Provocamos error, usuario incorrecto"
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Michelangelo","password":"testpass2","code":"ADm1nX78"}'
