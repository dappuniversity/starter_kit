## What is Blockchain Based CIDS?

Collavorative intrusion detection systems (CIDS) are developed to allow single IDS nodes to exchange signatures and alerts for performance improvement reasons. CIDSs combine the knowledge of different IDSs and improve the accuracy of attack detection. These systems still have major challenges such as authenticity and maintaining trust. Combining blockchain with CIDS is proposed to overcome these challenges. 

Our blockchain based CIDS system is a web application where single IDSs can add suspicious signatures using smart contracts and vote for the signatures based on the result of their ML-based IDSs.

### System Requirements


| React Dependencies (npm install)  |  |
| :---: | :---: |
axios | babel-preset-es2015
babel-polyfill  | babel-preset-env
babel-preset-stage-2 | babel-preset-stage-3 
babel-register | bootstrap 
fs | react
chai | chai-as-promised 
chai-bignumber | express-fileupload
ipfs-http-client | js-sha256
react-bootstrap | ejs 
react-dom | react-router-dom 
react-scripts | react-uploader
truffle | web3 

| Backend Dependencies (pip install)  |  
| :---: | 
| django |
| djangorestframework |
| mysqlclient |


### Note
* Ganache should be installed on your system. You can download it from the following URL: https://trufflesuite.com/ganache/
* IPFS should be installed on your system as a command line tool. Follow the following tutorial: https://docs.ipfs.io/install/command-line/#official-distributions




### How to run the system

Run the following commands to allow the web3 app to use IPFS

```
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "["""http://localhost:3000""", """http://127.0.0.1:5001""", """https://webui.ipfs.io""", """http://127.0.0.1:3000"""]"
```

```
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "["""PUT""", """POST"""]"   
```

Run the following command to run IPFS

```
$ ipfs daemon
```

Go to the "src\backend" directory and run the following command to run the backend
```
$ python manage.py runserver
```
Open the Ganache app and create a new workspace. Link truffle-config.js file in the project's main directory to the Ganache workspace.
Go to the project's main directory and run the following commands to deploy the smart contract on the blockchain for the first time
```
$ truffle compile
```
```
$ truffle migrate
```
Go to the project's main directory and run the following command to run the web3 app
```
$ npm start
```


### Servers
* Ganache: http://127.0.0.1:7545
* Django backend: http://127.0.0.1:8000/api
* IPFS: http://127.0.0.1:5001/webui
* Web3 App: http://127.0.0.1:3000
