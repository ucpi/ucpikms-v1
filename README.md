𝐔𝐂𝐏𝐈𝐃𝐊𝐌𝐒-𝐮𝐜𝐩𝐢 𝐝𝐞𝐜𝐞𝐧𝐭𝐫𝐚𝐥𝐢𝐳𝐞𝐝 𝐤𝐦𝐬 𝐛𝐮𝐢𝐥𝐝 𝐨𝐧 𝐬𝐞𝐜𝐫𝐞𝐭 𝐛𝐥𝐨𝐜𝐤𝐜𝐡𝐚𝐢𝐧

#𝗳𝗲𝗮𝘁𝘂𝗿𝗲𝘀
web3 alternative for key management
fully decentralized kms
no root access
controled by user
login and signup by google 
can be used for encrypting and decrypting data
#𝗛𝗼𝘄 𝗶𝘁 𝘄𝗼𝗿𝗸𝘀?
(First time user signup)
1)user authenticate him/her on frontend
2)ID token is received(in form of JWT)
3)temporary private/public pair generated
4)faucet supplies some scrt so that user can interact with secret blockchain
5)new secret smartcontract is intialized and mapped to users email address
6)this mapping of address is saved to main ucpi mapping for future reference
7)a new private key is generated and stored in smartcontract along with hash of jwt
8)jwt is send to different nodes which verify the jwt and votes it yes if it is true and no if is wrong
9)if more than 50% votes are for yes private key is saved

(login if user has alredy signup)
1)user authenticate him/her on frontend
2)ID token is received(in form of JWT)
3)temporary private/public pair generated
4)faucet supplies some scrt so that user can interact with secret blockchain
5)ucpi mapping gives the address of the email address as it will be saved on ucpi smartcontract
6)hash of JWT is send and mapped from temp address and send to smartcontract of user.
8)jwt is send to different nodes which verify the jwt and votes it yes if it is true and no if is wrong
9)if more than 50% votes are for yes private key is retrived in the frontend

#𝐇𝐨𝐰 𝐭𝐨 𝐠𝐞𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝?
𝗦𝗘𝗧𝗨𝗣 𝗡𝗢𝗗𝗘𝗦


𝐒𝐄𝐓𝐔𝐏 𝐑𝐄𝐀𝐂𝐓 𝐀𝐏𝐏
1)clone this repository
2)replace the localhost:4200,localhost:4300,localhost:4400 with your node address
3)replace the process.env.REACT_APP_CLIENT_ID by your google client id
4)npm i --force
5)npm start
