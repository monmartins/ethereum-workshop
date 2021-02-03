// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Voter{

    ///lista de quem ja votou 
    mapping(address => bool) hasVoted;

    ///lista de candidatos 
    struct Option {
        uint pos;
        bool exists;
    }

    mapping(string => Option) posOption;

    //Quantidade de votos
    uint[] public votes;

    //Opcoes
    string[] public options;
    
    constructor(string[] memory _options ) public{
        options = _options;
        votes.length=_options.length;
        for(uint i=0; i<_options.length;i++ ){
            Option memory option = Option(i,true);
            posOption[_options[i]] = option;
        }        
    }

    function vote(uint option) public {
        require(0 < option && option < _options.length,"Invalid option" );
        require(!posOption[option].exists,"Option doesn't exist");
        require(!hasVoted[msg.sender],"Account has already voted");

        hasVoted[msg.sender] = true;
        votes[option] = votes[option]+1; 

    }
    function vote(string memory option) public {
        require(!hasVoted[msg.sender],"Account has already voted");
        // Option memory option = posOption[option];
        require(!posOption[option].exists,"Option doesn't exist");
        hasVoted[msg.sender] = true;
        votes[option] = votes[option]+1;        
    }
    function geOptions() public view returns (string[] memory) {
        return options;
    }
    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}