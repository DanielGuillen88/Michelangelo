#!/bin/bash
# This script tests the custom waste search endpoint of the API.
# Make sure the API is running before executing this script.
# Make sure you have some waste data in your database for the successful tests.
# Para dar permiso: chmod +x test/waste/test-getWaste.sh
# Usage: ./test/waste/test-getWaste.sh

API_URL="http://localhost:3050/waste"

echo ""
echo "================================================="
echo "  Ejecutando tests para el endpoint GET /waste"
echo "================================================="
echo ""

# ----------------------------------------------------
# ✅  Tests con resultados esperados
# ----------------------------------------------------
# echo -e "\n✅ Test 1: Búsqueda sin filtros (debe devolver todos los residuos)"
# curl -X GET "${API_URL}"
# echo ""

# /test/waste/test-getWaste.sh
# echo -e "\n✅ Test 2: Búsqueda por 'code' específico (ej. '150110')"
# curl -X GET "${API_URL}?code=150110"
# echo ""

# echo -e "\n✅ Test 3: Búsqueda por 'container' (ej. 'BIGBAG')"
# curl -X GET "${API_URL}?container=BIGBAG"
# echo ""

# echo -e "\n✅ Test 4: Búsqueda por 'status' (ej. 'CORRECTO')"
# curl -X GET "${API_URL}?status=CORRECTO"
# echo ""

# echo -e "\n✅ Test 5: Búsqueda por 'month' y 'year' (ej. '08' y '2025')"
# curl -X GET "${API_URL}?month=08&year=2025"
# echo ""

# echo -e "\n✅ Test 6: Búsqueda con múltiples filtros ('code' y 'container')"
# curl -X GET "${API_URL}?code=150110&container=BIGBAG"
# echo ""

# echo -e "\n✅ Test 7: Búsqueda por 'locationType' (ej. 'ALMACEN')"
# curl -X GET "${API_URL}?locationType=ALMACEN"
# echo ""

# echo -e "\n✅ Test 8: Búsqueda por 'locationType' y 'locationArea' (ej. 'A1')"
# curl -X GET "${API_URL}?locationType=ALMACEN&locationArea=A1"
# echo ""

# ----------------------------------------------------
# ❌  Tests para casos sin resultados o con errores
# ----------------------------------------------------
echo -e "\n❌ Test 9A: Búsqueda con 'code' mal escrito (avisar de introducir un código valido)"
curl -X GET "${API_URL}?code=R-99"
echo ""

echo -e "\n❌ Test 9B: Búsqueda con 'code' inexistente (debe devolver una lista vacía)"
curl -X GET "${API_URL}?code=000000"
echo ""

echo -e "\n❌ Test 10A: Búsqueda con filtros que no coinciden (ej. 'code' y 'container' inexistentes juntos)"
curl -X GET "${API_URL}?code=000000&container=GRG"
echo ""

echo -e "\n❌ Test 10B: Búsqueda con filtros que no coinciden (ej. 'code' y 'container' inexistentes juntos)"
curl -X GET "${API_URL}?code=000000&container=BOLSA"
echo ""

echo -e "\n❌ Test 11: Búsqueda con valor de 'month' inválido (debe devolver un error de validación)"
curl -X GET "${API_URL}?month=13"
echo ""

echo -e "\n❌ Test 12: Búsqueda con valor de 'year' inválido (debe devolver un error de validación)"
curl -X GET "${API_URL}?year=ABCD"
echo ""

echo -e "\n❌ Test 13: Búsqueda con valor de 'status' inválido (debe devolver un error de validación)"
curl -X GET "${API_URL}?status=ERROR"
echo ""

echo ""
echo "================================================="
echo "  Tests finalizados"
echo "================================================="
echo ""