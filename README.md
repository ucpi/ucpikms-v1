𝐔𝐂𝐏𝐈𝐃𝐊𝐌𝐒-𝐮𝐜𝐩𝐢 𝐝𝐞𝐜𝐞𝐧𝐭𝐫𝐚𝐥𝐢𝐳𝐞𝐝 𝐤𝐦𝐬 𝐛𝐮𝐢𝐥𝐝 𝐨𝐧 𝐬𝐞𝐜𝐫𝐞𝐭 𝐛𝐥𝐨𝐜𝐤𝐜𝐡𝐚𝐢𝐧
</br>
#𝗳𝗲𝗮𝘁𝘂𝗿𝗲𝘀</br>
web3 alternative for key management</br>
fully decentralized kms</br>
no root access</br>
controled by user</br>
login and signup by google </br>
can be used for encrypting and decrypting data</br>
#𝗛𝗼𝘄 𝗶𝘁 𝘄𝗼𝗿𝗸𝘀?</br>
(First time user signup)</br>
1)user authenticate him/her on frontend</br>
2)ID token is received(in form of JWT)</br>
3)temporary private/public pair generated</br>
4)faucet supplies some scrt so that user can interact with secret blockchain</br>
5)new secret smartcontract is intialized and mapped to users email address</br>
6)this mapping of address is saved to main ucpi mapping for future reference</br>
7)a new private key is generated and stored in smartcontract along with hash of jwt</br>
8)jwt is send to different nodes which verify the jwt and votes it yes if it is true and no if is wrong</br>
9)if more than 50% votes are for yes private key is saved</br>

(login if user has alredy signup)</br>
1)user authenticate him/her on frontend</br>
2)ID token is received(in form of JWT)</br>
3)temporary private/public pair generated</br>
4)faucet supplies some scrt so that user can interact with secret blockchain</br>
5)ucpi mapping gives the address of the email address as it will be saved on ucpi smartcontract</br>
6)hash of JWT is send and mapped from temp address and send to smartcontract of user.</br>
8)jwt is send to different nodes which verify the jwt and votes it yes if it is true and no if is wrong</br>
9)if more than 50% votes are for yes private key is retrived in the frontend</br>

#𝐇𝐨𝐰 𝐭𝐨 𝐠𝐞𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝?</br>
𝗦𝗘𝗧𝗨𝗣 𝗡𝗢𝗗𝗘𝗦</br>


𝐒𝐄𝐓𝐔𝐏 𝐑𝐄𝐀𝐂𝐓 𝐀𝐏𝐏</br>
1)clone this repository</br>
2)replace the localhost:4200,localhost:4300,localhost:4400 with your node address</br>
3)replace the process.env.REACT_APP_CLIENT_ID by your google client id</br>
4)npm i --force</br>
5)npm start</br>
