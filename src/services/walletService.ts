// src/services/walletService.ts

import { api } from './api';
import { Wallet, Transaction } from '../types/api.types';

export const createWallet = async (walletData: Wallet): Promise<Wallet> => {
    try {
        const response = await api.post('/wallets', walletData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating wallet: ' + error.message);
    }
};

export const getWalletTransactions = async (walletId: string): Promise<Transaction[]> => {
    try {
        const response = await api.get(`/wallets/${walletId}/transactions`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching wallet transactions: ' + error.message);
    }
};

export const signTransaction = async (walletId: string, transactionId: string, signature: string): Promise<void> => {
    try {
        await api.post(`/wallets/${walletId}/transactions/${transactionId}/sign`, { signature });
    } catch (error) {
        throw new Error('Error signing transaction: ' + error.message);
    }
};