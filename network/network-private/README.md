## Execute project

```
    docker network create ethereum_public 
    docker-compose scale ethereum-node-light=2 ethereum-node-full=2 ethereum-node-miner=4
```



# Explain more about genesis.json

* **mixhash**

> A 256-bit hash which proves, combined with the nonce, that a sufficient amount of computation has been carried out on this block: the Proof-of-Work (PoF).

> The combination of nonce and mixhash must satisfy a mathematical condition described in the Yellowpaper, 4.3.4. Block Header Validity, (44). It allows to verify that the Block has really been cryptographically mined, thus, from this aspect, is valid.

> The value is a reduced representation (using a simple Fowler–Noll–Vo hash function) of the set of values selected from the DAG data file during mining calculation. This selection pick follows the implemented Estah' Hashimoto algorithm, which depends on the given Block header. The applied mixhash is re-determined for each hash operation that a Miner performs while searching for the correct Block nonce (cf. ASIC resistance, high IO). The final Block mixhash is the value leading to the valid Block. The reason why this value is part of the Block descriptor is that it becomes part of the //parentHash// of the next Block. By this, a potential attacker would need correct DAG data files to create illegal Blocks.

* **nonce**

> A scalar value equal to the number of transactions sent by the sender.

> A 64-bit hash which proves combined with the mix-hash that a sufficient amount of computation has been carried out on this block.

> The nonce is the cryptographically secure mining proof-of-work that proves beyond reasonable doubt that a particular amount of computation has been expended in the determination of this token value. (Yellowpager, 11.5. Mining Proof-of-Work).

> Since Ethereum uses proof of work, it’s used to prove that a sufficient amount of computation has been carried out on this block. Both of them combined must satisfy the mathematical condition described in the Yellowpaper, in the paragraph describing Block Header Validity. According to that paper, the mining proof of work exists as a cryptographically secure nonce which proves, beyond reasonable doubt, that a particular amount of computation has been expended in the determination of some token value n.

> The final nonce value is the result of the the mining process iteration, in which the algorithm was able to discover a nonce value that satisfies the Mining Target. The Mining Target is a cryptographically described condition that strongly depends on the applied . Just by using the nonce Proof-of-Work, the validity of a Block can verified very quickly.

* **difficulty**

> A scalar value corresponding to the difficulty level applied during the nonce discovering of this block. It defines the Mining Target, which can be calculated from the previous block’s difficulty level and the timestamp. The higher the difficulty, the statistically more calculations a Miner must perform to discover a valid block. This value is used to control the Block generation time of a Blockchain, keeping the Block generation frequency within a target range. On the test network, we keep this value low to avoid waiting during tests since the discovery of a valid Block is required to execute a transaction on the Blockchain.

* **alloc**

> Allows to define a list of pre-filled wallets. That's a Ethereum specific functionality to handle the "Ether pre-sale" period. Since we can mine local Ether quickly, we don't use this option.

* **coinbase**

> The 160-bit address to which all rewards (in Ether) collected from the successful mining of this block have been transferred. They are a sum of the mining reward itself and the Contract transaction execution refunds. Often named "beneficiary" in the specifications, sometimes "etherbase" in the online documentation. This can be anything in the Genesis Block since the value is set by the setting of the Miner when a new Block is created.

* **timestamp**

> A scalar value equal to the reasonable output of Unix’ time() function at this block inception.

> This mechanism enforces a homeostasis in terms of the time between blocks. A smaller period between the last two blocks results in an increase in the difficulty level and thus additional computation required to find the next valid block. If the period is too large, the difficulty, and expected time to the next block, is reduced.

> The timestamp also allows to verify the order of block within the chain (Yellowpaper, 4.3.4. (43)).

> Note: Homeostasis is the property of a system in which variables are regulated so that internal conditions remain stable and relatively constant.

* **parentHash**

> The Keccak 256-bit hash of the entire parent block’s header (including its nonce and mixhash). Pointer to the parent block, thus effectively building the chain of blocks. In the case of the Genesis block, and only in this case, it's 0.

* **extraData**

> An optional free, but max. 32 byte long space to conserve smart things for ethernity on the Blockchain.

* **gasLimit**

> A scalar value equal to the current chain-wide limit of Gas expenditure per block. High in our case to avoid being limited by this threshold during tests. Note: this does not indicate that we should not pay attention to the Gas consumption of our Contracts.
