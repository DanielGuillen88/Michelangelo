#!/bin/bash
# This script tests the waste registration endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso: chmod +x test/waste/test-createWaste.sh
# Usage: ./test/waste/test-createWaste.sh

API_URL="http://localhost:3050/waste/create"
JSON_HEADER="Content-Type: application/json"

echo ""
echo -e "\n✅ Test 1: Registrar residuo en Almacén (Área A1)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000001",
    "name": "RESIDUO TEST PLASTICO",
    "container": "PALET",
    "weight": "100",
    "month": "01",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": "A1"
    }
  }'
echo ""
echo -e "\n✅ Test 2: Registrar residuo en Salida (Referencia personalizada)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000002",
    "name": "RESIDUO TEST METALICO",
    "container": "B200",
    "weight": "250",
    "month": "02",
    "year": "2025",
    "status": "ESTANCADO",
    "location": {
      "type": "SALIDA",
      "reference": "Contenedor Azul-001"
    }
  }'
echo ""
echo -e "\n❌ Test 3: ERROR - Almacén sin 'area' (debería lanzar ContentError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000003",
    "name": "RESIDUO ALMACEN SIN AREA",
    "container": "GRG",
    "weight": "50",
    "month": "03",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": ""
    }
  }'
echo ""
echo -e "\n❌ Test 4: ERROR - Almacén con 'area' nula (debería lanzar ContentError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000004",
    "name": "RESIDUO ALMACEN AREA NULA",
    "container": "BIGBAG",
    "weight": "75",
    "month": "04",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": null
    }
  }'
echo ""
echo -e "\n❌ Test 5: ERROR - Almacén con 'area' inválida (debería lanzar ValidationError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000005",
    "name": "RESIDUO ALMACEN AREA INVALIDA",
    "container": "B<200",
    "weight": "30",
    "month": "05",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": "Z9"
    }
  }'
echo ""
echo -e "\n❌ Test 6: ERROR - Salida sin 'reference' (debería lanzar ContentError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000006",
    "name": "RESIDUO SALIDA SIN REF",
    "container": "PALET",
    "weight": "150",
    "month": "06",
    "year": "2025",
    "status": "ESTANCADO",
    "location": {
      "type": "SALIDA",
      "reference": ""
    }
  }'
echo ""
echo -e "\n❌ Test 7: ERROR - Salida con 'reference' nula (debería lanzar ContentError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000007",
    "name": "RESIDUO SALIDA REF NULA",
    "container": "GRG",
    "weight": "200",
    "month": "07",
    "year": "2025",
    "status": "ESTANCADO",
    "location": {
      "type": "SALIDA",
      "reference": null
    }
  }'
echo ""
echo -e "\n❌ Test 8: ERROR - Salida con 'reference' vacía (debería lanzar ValidationError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000008",
    "name": "RESIDUO SALIDA REF VACIA",
    "container": "B200",
    "weight": "180",
    "month": "08",
    "year": "2025",
    "status": "ESTANCADO",
    "location": {
      "type": "SALIDA",
      "reference": ""
    }
  }'
echo ""
echo -e "\n❌ Test 9: ERROR - Tipo de ubicación desconocido (debería lanzar ValidationError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000009",
    "name": "RESIDUO TIPO UBICACION DESCONOCIDO",
    "container": "BIGBAG",
    "weight": "60",
    "month": "09",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "OTRO_TIPO",
      "area": "Z1"
    }
  }'
echo ""
echo -e "\n❌ Test 10: ERROR - Almacen con 'reference' no permitida (debería lanzar ValidationError)"
curl -X POST "${API_URL}" \
  -H "${JSON_HEADER}" \
  -d '{
    "code": "000010",
    "name": "RESIDUO ALMACEN CON REF",
    "container": "PALET",
    "weight": "110",
    "month": "10",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": "B1",
      "reference": "Referencia Inesperada"
    }
  }'
echo ""