add:
	curl -X POST -H "Content-Type: application/json" -d '{"name":"test","age":18}' http://localhost:8080/add

random:
	curl -v http://localhost:8080/colors/random
