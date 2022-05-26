//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KUSDCToken is ERC20 {
    constructor() ERC20("KUSDCToken", "KUSDC") {}

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
