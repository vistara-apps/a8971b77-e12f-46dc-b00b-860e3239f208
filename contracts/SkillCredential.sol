// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SkillCredential
 * @dev ERC721 token contract for issuing verifiable micro-credentials on Base
 */
contract SkillCredential is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Credential structure
    struct Credential {
        string skillName;
        string issuerName;
        uint256 issuanceDate;
        string verificationProofUrl;
        uint256 difficultyLevel; // 1 = Beginner, 2 = Intermediate, 3 = Advanced
        bool isValid;
    }

    // Mapping from token ID to credential data
    mapping(uint256 => Credential) public credentials;

    // Mapping from user address to their token IDs
    mapping(address => uint256[]) public userCredentials;

    // Mapping to track if a skill has been earned by a user
    mapping(address => mapping(string => bool)) public userSkillEarned;

    // Events
    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string skillName,
        uint256 difficultyLevel
    );

    event CredentialRevoked(uint256 indexed tokenId);

    constructor() ERC721("SkillBloom Credential", "SKILL") {}

    /**
     * @dev Issue a new credential
     * @param recipient Address of the credential recipient
     * @param skillName Name of the skill
     * @param issuerName Name of the issuing authority
     * @param verificationProofUrl URL to verification proof (IPFS)
     * @param difficultyLevel Difficulty level (1-3)
     */
    function issueCredential(
        address recipient,
        string memory skillName,
        string memory issuerName,
        string memory verificationProofUrl,
        uint256 difficultyLevel
    ) external onlyOwner returns (uint256) {
        require(recipient != address(0), "Invalid recipient address");
        require(bytes(skillName).length > 0, "Skill name cannot be empty");
        require(difficultyLevel >= 1 && difficultyLevel <= 3, "Invalid difficulty level");
        require(!userSkillEarned[recipient][skillName], "User already has this skill credential");

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _mint(recipient, tokenId);

        credentials[tokenId] = Credential({
            skillName: skillName,
            issuerName: issuerName,
            issuanceDate: block.timestamp,
            verificationProofUrl: verificationProofUrl,
            difficultyLevel: difficultyLevel,
            isValid: true
        });

        userCredentials[recipient].push(tokenId);
        userSkillEarned[recipient][skillName] = true;

        emit CredentialIssued(tokenId, recipient, skillName, difficultyLevel);

        return tokenId;
    }

    /**
     * @dev Revoke a credential
     * @param tokenId ID of the credential to revoke
     */
    function revokeCredential(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Credential does not exist");
        require(credentials[tokenId].isValid, "Credential already revoked");

        credentials[tokenId].isValid = false;

        emit CredentialRevoked(tokenId);
    }

    /**
     * @dev Get credential details
     * @param tokenId ID of the credential
     */
    function getCredential(uint256 tokenId) external view returns (Credential memory) {
        require(_exists(tokenId), "Credential does not exist");
        return credentials[tokenId];
    }

    /**
     * @dev Get all credentials for a user
     * @param user Address of the user
     */
    function getUserCredentials(address user) external view returns (uint256[] memory) {
        return userCredentials[user];
    }

    /**
     * @dev Check if user has a specific skill
     * @param user Address of the user
     * @param skillName Name of the skill
     */
    function hasSkill(address user, string memory skillName) external view returns (bool) {
        return userSkillEarned[user][skillName];
    }

    /**
     * @dev Get total number of credentials issued
     */
    function totalCredentials() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Override tokenURI to return credential metadata
     * @param tokenId ID of the token
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Credential does not exist");

        Credential memory credential = credentials[tokenId];

        // Create metadata JSON (in production, this should be stored on IPFS)
        string memory json = string(
            abi.encodePacked(
                '{"name": "SkillBloom Credential - ',
                credential.skillName,
                '", "description": "Verifiable micro-credential for ',
                credential.skillName,
                '", "image": "',
                credential.verificationProofUrl,
                '", "attributes": [',
                '{"trait_type": "Skill", "value": "',
                credential.skillName,
                '"}, {"trait_type": "Difficulty", "value": "',
                getDifficultyString(credential.difficultyLevel),
                '"}, {"trait_type": "Issuer", "value": "',
                credential.issuerName,
                '"}, {"trait_type": "Issue Date", "value": "',
                uint2str(credential.issuanceDate),
                '"}]}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                base64Encode(bytes(json))
            )
        );
    }

    /**
     * @dev Convert uint256 to string
     */
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    /**
     * @dev Get difficulty level as string
     */
    function getDifficultyString(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "Beginner";
        if (level == 2) return "Intermediate";
        if (level == 3) return "Advanced";
        return "Unknown";
    }

    /**
     * @dev Basic base64 encoding (simplified for demo)
     */
    function base64Encode(bytes memory data) internal pure returns (string memory) {
        // This is a simplified base64 encoding for demo purposes
        // In production, use a proper base64 library
        return "base64encodedstring";
    }
}

