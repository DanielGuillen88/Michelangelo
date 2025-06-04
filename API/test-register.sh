#!/bin/bash
# This script tests the registration endpoint of the API.
# Make sure the API is running before executing this script.
# Usage: ./test-register.sh
# Test the registration endpoint with a valid request
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass","code":"ALma2233"}'
# Test registro falta code
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"testpass2"}'
# Test registro falta password
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser3","code":"ALma2233"}'
# Test registro falta username
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"password":"123456","code":"ALma2233"}'
  # Test registro error codigo
  curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel","password":"testpass","code":"almacen"}'
