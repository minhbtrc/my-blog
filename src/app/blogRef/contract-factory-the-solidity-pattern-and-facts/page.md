+++
tags = "evm, solidity"
date = "11 August, 2024"
+++

# Contract Factory: The Solidity Pattern and Facts

You are a developer, your boss asks you to deploy ERC20 token contract so many times and you're sick of it 🤮. Here is the factory pattern in Solidity to help you deploy contracts by a function call.

## Context

In this article, we will try to write a `Factory.sol` contract for the `Counter.sol` contract below.

```solidity label="Counter.sol" group="counter"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
  uint256 public counter;

  constructor(uint256 init) {
    counter = init;
  }

  function increase() public returns (uint256) {
    counter = counter + 1;
    return counter;
  }
}
```

With normal behaviors, you may deploy this contract manually by a Hardhat script, or Remix. However, let's deploy it through a factory.

## The factory

The factory will store the code of the `Counter.sol` contract so that we can call a function, `deploy` for example, to redeploy the code over time.

```solidity label="Factory.sol" group="factory"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import './Counter.sol';

contract Factory {
  function deploy(uint256 init) public returns (address) {
    Counter counter = new Counter(init);
    return address(counter);
  }
}
```

## Facts

### Contract Address

That's quite easy, right! Actually, you will realize the problem that "How can we get the new contract's address?"
Then my preferred method is using `event`.

```solidity label="Factory.sol" group="event"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import './Counter.sol';

contract Factory {
  event Deploy(address indexed counter);

  function deploy(uint256 init) public returns (address) {
    Counter counter = new Counter(init);
    emit Deploy(address(counter));
    return address(counter);
  }
}
```

The event is realtime and permenantly stored in the blockchain history so you can trace it back whenever you want.

### msg.sender

In many contract, we usually assign the contract's owner to `msg.sender`. However, you must be carefully consider it, because when you deploy the `Counter.sol` through the `Factory.sol`, `msg.sender` will be the facroty contract's address.

**`msg.sender` IS NOT THE TRANSACTION SIGNER. IT IS THE FACTORY CONTRACT'S ADDRESS WHEN YOU USE THE FACTORY PATTERN.**

To fix it, you can migrate `msg.sender` to `tx.origin`, which will be the transaction's signer.

```solidity label="Counter.sol" group="owner"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
  address public owner;
  uint256 public counter;

  constructor(uint256 init) {
    owner = msg.sender; // will be the factory's address
    counter = init;
  }

  function increase() public returns (uint256) {
    counter = counter + 1;
    return counter;
  }
}
```

```solidity label="FixedCounter.sol" group="owner"
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
  address public owner;
  uint256 public counter;

  constructor(uint256 init) {
    owner = tx.origin; // will be the transaction's signer
    counter = init;
  }

  function increase() public returns (uint256) {
    counter = counter + 1;
    return counter;
  }
}
```
