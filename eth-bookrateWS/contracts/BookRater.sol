pragma solidity >=0.5.16;

//aim is to create a CRUD Ap
contract BookRater {
    uint256 public taskCount = 0;

    struct Rater {
        uint256 id;
        string content;
        uint256 rating;
    }

    mapping(uint256 => Rater) public ratedBooks;

    event BooksUpdated(string bookName, uint256 rating);

    event BookDeleted(uint256 task);

    //create fn
    function createTask(string memory _content, uint256 rating) public {
        taskCount++;
        ratedBooks[taskCount] = Rater(taskCount, _content, rating);
    }

    constructor() public {
        createTask("The Seven Husbands of Evelyn Hugo", 8);
        createTask("The Vanishing Half", 9);
    }

    //update fn
    function changeRating(uint256 taskno, uint256 rating) public {
        if (taskno > taskCount) {
            revert(("Invalid Book ID no"));
        } else {
            Rater storage b1 = ratedBooks[taskno];
            b1.rating = rating;
            emit BooksUpdated(b1.content, b1.rating);
        }
    }

    //delete fn
    function deleteRating(uint256 taskno) public {
        if (taskno > taskCount){
            revert("Invalid Book ID no.");
        }else{
            delete ratedBooks[taskno];
            emit BookDeleted(taskno);
        }
    }
}
