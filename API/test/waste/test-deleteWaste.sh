#!/bin/bash
# Make sure the API is running before executing this script.
# Para dar permiso: chmod +x test/waste/test-deleteWaste.sh
# Usage: ./test/waste/test-deleteWaste.sh

echo ""
echo -e "\n✅ Test 1: Registrar residuo en Almacén (Área A1)"
curl -X POST http://localhost:3050/waste/create \
  -H "Content-Type: application/json" \
  -d '{
    "code": "150110",
    "name": "RESIDUO TEST PLASTICO",
    "container": "PALET",
    "weight": "300",
    "month": "01",
    "year": "2025",
    "status": "CORRECTO",
    "location": {
      "type": "ALMACEN",
      "area": "A1"
    }
  }'
echo ""
# id= "55bCQer4SM5D5aBpVnz6"
echo -e "\n✅ Test 2: Eliminar residuo por id"
curl -X DELETE http://localhost:3050/waste/delete/55bCQer4SM5D5aBpVnz6
echo ""
echo -e "\n✅ Test 3: Error al eliminar residuo por id incorrecta"
curl -X DELETE http://localhost:3050/waste/delete/siIdtamDsT3YT7eVdvUY 
echo ""
