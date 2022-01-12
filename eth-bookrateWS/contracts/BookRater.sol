pragma solidity >=0.5.16;

contract BookRater {
    uint256 public taskCount = 0;

    struct Rater {
        uint256 id;
        string content;
        uint256 rating;
    }

    mapping(uint256 => Rater) public ratedBooks;

    function createTask(string memory _content, uint rating) public {
        taskCount++;
        ratedBooks[taskCount] = Rater(taskCount, _content, rating);
    }

    constructor() public{
        createTask("The Seven Husbands of Evelyn Hugo",8);
        createTask("The Vanishing Half",9);
      }
}
