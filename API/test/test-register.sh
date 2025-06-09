#!/bin/bash
# This script tests the registration endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test/test-register.sh
# Usage: ./test/test-register.sh
# Test the registration endpoint with a valid request
#!/bin/bash

# ✅ Registro correcto (como admin)s
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Michelangelo","password":"testpass2","code":"ADm1nX78"}'

# ❌ Registro: falta code
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"testpass2"}'

# ❌ Registro: falta password
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser3","code":"ALma2233"}'

# ❌ Registro: falta username
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"password":"123456","code":"ALma2233"}'

# ❌ Registro: código inválido
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass","code":"almacen"}' 
# ❌ Registro: usuario ya existe
curl -X POST http://localhost:3050/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Michelangelo","password":"testpass2","code":"ADm1nX78"}'
