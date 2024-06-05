import Web3 from 'web3';
import Auth from './build/contracts/Auth.json';

export const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
    }
};

export const loadBlockchainData = async () => {
    const web3 = window.web3;
    if (!web3) {
        console.error('Web3 not loaded');
        return null;
    }

    // Load account
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        console.error('No accounts found');
        return null;
    }

    // Network ID
    const networkId = await web3.eth.net.getId();

    // Network data
    const networkData = Auth.networks[networkId];
    if (networkData) {
        const auth = new web3.eth.Contract(Auth.abi, networkData.address);
        return { auth, account: accounts[0] };
    } else {
        console.error('Auth contract not deployed on detected network');
        return null;
    }
};
