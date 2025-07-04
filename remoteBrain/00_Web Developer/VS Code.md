
#### Chrome Debugger 

- 기존에 사용하던 `launch.json` 파일 
	```
	{
	    // Use IntelliSense to learn about possible attributes.
	    // Hover to view descriptions of existing attributes.
	    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
	    "version": "0.2.0",
	    "configurations": [
	        {
	            "type": "java",
	            "name": "E3Application",
	            "request": "launch",
	            "mainClass": "com.insighton.e3.E3Application",
	            "projectName": "backend-java"
	        },
	        {
	            "type": "chrome",
	            "name": "PARTNER",
	            "request": "launch",
	            "url": "http://localhost:6001",
	            "webRoot": "${workspaceFolder}/frontend"
	        },
	        {
	            "type": "chrome",
	            "name": "WEB",
	            "request": "launch",
	            "url": "http://localhost:7001",
	            "webRoot": "${workspaceFolder}",
	        },
	        {
	            "type": "chrome",
	            "name": "MOBILE",
	            "request": "launch",
	            "url": "http://localhost:8001",
	            "webRoot": "${workspaceFolder}/frontend"
	        },
	    ]
	}
	```

- 자동 launch 쪽이 정상적으로 동작되지 않아 수정
	1. Chrome을 디버깅 모드로 강제 실행
	```
	"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-dev-profile" --no-first-run no-default-browser-check
	```

	2. `launch.json` attach만 하도록 수정
	```
	{
	  "version": "0.2.0",
	  "configurations": [
	    {
	      "name": "Attach to Chrome",
	      "type": "chrome",
	      "request": "attach",
	      "port": 9222,
	      "webRoot": "${workspaceFolder}/frontend"
	    }
	  ]
	}
	```


