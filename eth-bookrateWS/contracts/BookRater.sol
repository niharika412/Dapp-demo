pragma solidity >=0.5.16;

contract BookRater {
    uint256 public taskCount = 0;

    struct Rater {
        uint256 id;
        string content;
        bool rating;
    }

    mapping(uint256 => Rater) public ratedBooks;

    function createTask(string memory _content) public {
        taskCount++;
        ratedBooks[taskCount] = Rater(taskCount, _content, false);
    }

    constructor() public{
        createTask("Emma");
      }
}
