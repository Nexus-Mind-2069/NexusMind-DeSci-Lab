// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResearchPaper {
    struct Paper {
        string title;
        string ipfsHash;
        address author;
        uint256 timestamp;
        PaperStatus status;
    }

    enum PaperStatus { Submitted, UnderReview, Accepted, Rejected }

    Paper[] public papers;
    mapping(uint256 => mapping(address => bool)) public reviewers;

    event PaperSubmitted(uint256 indexed paperId, string title, address author);
    event PeerReviewStarted(uint256 indexed paperId);
    event PaperStatusUpdated(uint256 indexed paperId, PaperStatus newStatus);

    function submitPaper(string memory _title, string memory _ipfsHash) public {
        uint256 paperId = papers.length;
        papers.push(Paper({
            title: _title,
            ipfsHash: _ipfsHash,
            author: msg.sender,
            timestamp: block.timestamp,
            status: PaperStatus.Submitted
        }));
        emit PaperSubmitted(paperId, _title, msg.sender);
    }

    function startPeerReview(uint256 _paperId) public {
        require(_paperId < papers.length, "Paper does not exist");
        require(papers[_paperId].status == PaperStatus.Submitted, "Paper is not in submitted state");
        papers[_paperId].status = PaperStatus.UnderReview;
        emit PeerReviewStarted(_paperId);
    }

    function submitReview(uint256 _paperId, bool _accepted) public {
        require(_paperId < papers.length, "Paper does not exist");
        require(papers[_paperId].status == PaperStatus.UnderReview, "Paper is not under review");
        require(!reviewers[_paperId][msg.sender], "Reviewer has already submitted");

        reviewers[_paperId][msg.sender] = true;

        // Simple majority voting system
        if (_accepted && papers[_paperId].status != PaperStatus.Rejected) {
            papers[_paperId].status = PaperStatus.Accepted;
        } else {
            papers[_paperId].status = PaperStatus.Rejected;
        }

        emit PaperStatusUpdated(_paperId, papers[_paperId].status);
    }

    function getPaperCount() public view returns (uint256) {
        return papers.length;
    }

    function getPaperStatus(uint256 _paperId) public view returns (PaperStatus) {
        require(_paperId < papers.length, "Paper does not exist");
        return papers[_paperId].status;
    }
}
