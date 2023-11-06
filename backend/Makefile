server:
	node --require ./instrumentation.js server.js
worker:
	node --require ./instrumentation.js worker.js
add:
	curl -X POST -H "Content-Type: application/json" -d '{"name":"test","age":18}' http://localhost:8080/add

