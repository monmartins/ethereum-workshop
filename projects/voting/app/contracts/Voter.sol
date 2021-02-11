// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


contract Voter{


    mapping(address => bool) hasVoted;


    struct Option {
        uint pos;
        bool exists;
    }

    mapping(string => Option) posOption;


    uint[9] public votes;
    string[] public options;
    
    constructor(string[] memory _options ){
        options = _options;
        // votes.length=options.length;
        for(uint i=0; i<options.length;i++ ){
            Option memory option = Option(i,true);
            posOption[options[i]] = option;
        }        
    }

    function vote(uint option) public {
        require(0 < option && option < options.length,"Invalid option" );
        string memory id = options[option];
        require(posOption[id].exists,"Option doesn't exist");
        require(!hasVoted[msg.sender],"Account has already voted");

        hasVoted[msg.sender] = true;
        votes[option] = votes[option]+1; 

    }
    function vote(string memory option) public {
        require(!hasVoted[msg.sender],"Account has already voted");
        Option memory op = posOption[option];
        require(op.exists,"Option doesn't exist");
        hasVoted[msg.sender] = true;
        votes[op.pos] = votes[op.pos]+1;        
    }
    function getOptions() public view returns (string[] memory) {
        return options;
    }
    function getVotes() public view returns (uint[9] memory) {
        return votes;
    }
}