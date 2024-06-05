// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    uint public userCount = 0;

    mapping(uint => User) public usersList;
    mapping(string => bool) private usedEmails;

    struct User {
        string username;
        string email;
        string password;
    }

    // Events
    event UserCreated(
        string username,
        string email,
        string password
    );

    function createUser(string memory _username, string memory _email, string memory _password) public {
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");
        require(!usedEmails[_email], "Email is already registered");

        userCount++;
        usersList[userCount] = User(_username, _email, _password);
        usedEmails[_email] = true;

        emit UserCreated(_username, _email, _password);
    }
}
