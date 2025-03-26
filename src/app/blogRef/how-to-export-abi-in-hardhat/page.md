+++
tags = "evm, hardhat"
date = "22 July, 2024"
+++

# How to export ABI in Hardhat?

This Typescript tutorial is to export the contract ABI by `hardhat-abi-exporter` in `hardhat.config.ts`. As the result, you will got an `abi` folder that contains your ABI.

## Installation

```bash label="NPM" group="install"
npm i -D hardhat-abi-exporter
```

```bash label="Yarn" group="install"
yarn add -D hardhat-abi-exporter
```

```bash label="PNPM" group="install"
pnpm add -D hardhat-abi-exporter
```

## hardhat.config.ts

For example, the `Counter.sol` contract:

```solidity label="Counter.sol" group="contract"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
  uint256 public counter;
  constructor(uint256 init) {
    counter = init;
  }
  function increase() public {
    counter = counter + 1;
  }
}

```

In the `only` option, you must write your contracts' name there. The `:` and `$` are regex patterns for the compiler to match your contracts' name.

```ts label="hardhat.config.ts" group="config"
import 'hardhat-abi-exporter'

const config: HardhatUserConfig = {
  ...
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [':Counter$'],
  },
}

export default config
```

## The result

On every compilation, the abi generator will rerun automatically. The `abi/Counter.json`:

```json label="Counter.json" group="abi"
[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "init",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "counter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

## Under the Hood

Let's say we modify the contract file `Counter.sol`

```solidity label="Counter.sol" group="new-contract"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract FirstCounter {
  uint256 public counter;
  constructor(uint256 init) {
    counter = init;
  }
  function increase() public {
    counter = counter + 1;
  }
}

contract SecondCounter {
  uint256 public counter;
  constructor(uint256 init) {
    counter = init;
  }
  function decrease() public {
    counter = counter - 1;
  }
}

```

Then the compiler will generate 2 artifacts `Counter.sol:FirstCounter` and `Counter.sol:SecondCounter`. From that, you can optionally generate your desired contract ABI. For example, `only: [':FirstCounter$']`, or `only: [':SecondCounter$']`, or even both contracts `only: [':FirstCounter$', ':SecondCounter$']`.
