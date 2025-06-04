#!/bin/bash
# This script tests the user delete endpoint of the API.
# Make sure the API is running before executing this script.
# Para dar permiso chmod +x test-deleteUser.sh
# Usage: ./test-deleteUser.sh
# Test the delete user endpoint with a valid request
curl -X DELETE http://localhost:3000/api/delete-user \
  -H "Content-Type: application/json" \
  -d '{"username":"Miguel"}'
# Test delete user with a non-existent user
curl -X DELETE http://localhost:3000/api/delete-user \
  -H "Content-Type: application/json" \
  -d '{"username":"NonExistentUser"}'
# Test delete user without username
curl -X DELETE http://localhost:3000/api/delete-user \
  -H "Content-Type: application/json" \
  -d '{}'
