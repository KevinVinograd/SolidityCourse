import {ethers} from "hardhat";

async function deployHelloWorld() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    return await HelloWorld.deploy();
}

// @ts-ignore
async function sayHello(hello) {
    console.log("Say Hello:", await hello.hello());
}

deployHelloWorld().then(sayHello);