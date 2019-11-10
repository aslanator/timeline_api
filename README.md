# timeline_api

Перед использованием необходимо сконфигурировать .env файл.  
Базовая конфигурация:
```
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = user
TYPEORM_PASSWORD = pass
TYPEORM_DATABASE = db
TYPEORM_PORT = 35432
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = true
TYPEORM_ENTITIES_DIR = ./src/models/
TYPEORM_ENTITIES = ./src/models/*.ts
TYPEORM_MIGRATIONS_DIR = ./src/migrations/
TYPEORM_MIGRATIONS = ./src/migrations/*.ts
```
Далее необходимо запустить docker-compose и выполнить миграции командой `npm run migration:run`  
Для запуска api используйте команду: `npm run dev`
