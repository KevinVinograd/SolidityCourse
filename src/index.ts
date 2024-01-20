import { ethers } from "ethers";

async function hasSigners(): Promise<boolean> {
    //@ts-ignore
    const metamask = window.ethereum;
    const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
    return signers.length > 0;
}

async function requestAccess(): Promise<boolean> {
    //@ts-ignore
    const result = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
    return result && result.length > 0;
}

async function getContract() {
    if (!(await hasSigners()) && !(await requestAccess())) {
        console.log("You are in trouble, no one wants to play");
        return;
    }

    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
        console.log("Ethereum provider (like MetaMask) is not available.");
        return;
    }

    try {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            "0x5fbdb2315678afecb367f032d93f642f64180aa3",
            [
                "function hello() public pure returns(string memory)",
            ], // abi
            provider
        );

        console.log("We have done it, time to call");
        const response = await contract.hello();
        document.body.innerHTML = response;
    } catch (error) {
        console.error("Error in getContract:", error);
    }
}


getContract();