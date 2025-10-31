

create a planet - 
curl -Method POST -Uri http://localhost:8000/apis/planet -ContentType 'application/json' -Body '{"keplerName":"Kepler-452b"}'

list planets -
curl http://localhost:8000/apis/planets

create customer -
curl -Method POST -Uri http://localhost:8000/apis/customer -ContentType 'application/json' -Body '{"name":"Alice","email":"alice@example.com"}'

list customers - 
curl http://localhost:8000/apis/customers

