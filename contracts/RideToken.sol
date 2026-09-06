// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/*
 * RideFi utility-token starter.
 *
 * Before real deployment we will replace
 * this with OpenZeppelin ERC20 +
 * AccessControl and full tests/audit.
 */

contract RideToken {

    string public constant
        name = "RideFi";

    string public constant
        symbol = "RIDE";

    uint8 public constant
        decimals = 18;

    uint256 public
        totalSupply;

    uint256 public immutable
        maxSupply;

    address public
        owner;

    address public
        treasury;

    mapping(
        address => uint256
    ) public balanceOf;

    mapping(
        address =>
        mapping(
            address => uint256
        )
    ) public allowance;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );

    event TreasuryUpdated(
        address indexed treasury
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "NOT_OWNER"
        );

        _;
    }

    constructor(
        address _treasury,
        uint256 _maxSupply,
        uint256 initialSupply
    ) {

        require(
            _treasury != address(0),
            "BAD_TREASURY"
        );

        require(
            initialSupply <=
            _maxSupply,
            "SUPPLY"
        );

        owner =
            msg.sender;

        treasury =
            _treasury;

        maxSupply =
            _maxSupply;

        _mint(
            _treasury,
            initialSupply
        );
    }

    function transfer(
        address to,
        uint256 amount
    )
        external
        returns (bool)
    {
        _transfer(
            msg.sender,
            to,
            amount
        );

        return true;
    }

    function approve(
        address spender,
        uint256 amount
    )
        external
        returns (bool)
    {
        allowance[
            msg.sender
        ][spender] =
            amount;

        emit Approval(
            msg.sender,
            spender,
            amount
        );

        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    )
        external
        returns (bool)
    {

        uint256 allowed =
            allowance[
                from
            ][msg.sender];

        require(
            allowed >= amount,
            "ALLOWANCE"
        );

        if (
            allowed !=
            type(uint256).max
        ) {
            allowance[
                from
            ][msg.sender] =
                allowed -
                amount;
        }

        _transfer(
            from,
            to,
            amount
        );

        return true;
    }

    function setTreasury(
        address nextTreasury
    )
        external
        onlyOwner
    {

        require(
            nextTreasury !=
            address(0),
            "BAD_TREASURY"
        );

        treasury =
            nextTreasury;

        emit TreasuryUpdated(
            nextTreasury
        );
    }

    function _mint(
        address to,
        uint256 amount
    )
        internal
    {

        require(
            totalSupply +
            amount <=
            maxSupply,
            "MAX_SUPPLY"
        );

        totalSupply +=
            amount;

        balanceOf[to] +=
            amount;

        emit Transfer(
            address(0),
            to,
            amount
        );
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    )
        internal
    {

        require(
            to != address(0),
            "BAD_TO"
        );

        require(
            balanceOf[from] >=
            amount,
            "BALANCE"
        );

        balanceOf[from] -=
            amount;

        balanceOf[to] +=
            amount;

        emit Transfer(
            from,
            to,
            amount
        );
    }
}
