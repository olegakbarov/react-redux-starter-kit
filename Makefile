NB = ./node_modules/.bin
ESLINT = $(NB)/eslint
WEBPACK = $(NB)/webpack
BABEL_NODE = $(NB)/babel-node
NODEMON = $(NB)/nodemon
CLIENT = public
SERVER = app/server-bundle.js

build: $(CLIENT) $(SERVER)

$(CLIENT):
	BUNDLE=client NODE_ENV=production $(WEBPACK) --config ./webpack/prod.config.babel.js

$(SERVER):
	BUNDLE=server NODE_ENV=production $(WEBPACK) --config ./webpack/prod.config.babel.js

dev:
	$(NODEMON) -x $(BABEL_NODE) -w ./api ./api & \
	$(BABEL_NODE) ./dev-server & \
	wait

lint:
	$(ESLINT) api app

test:
	echo THERE ARE NO TESTS YET

clean:
	rm -rf $(CLIENT) $(SERVER)

.PHONY: build dev lint test clean
