.PHONY: snapshot

snapshot:
	rm -rf build
	npm run build
	cd docker && ./build.sh local-SNAPSHOT
