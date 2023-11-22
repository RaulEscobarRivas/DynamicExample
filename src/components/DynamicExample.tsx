"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
  useEmbeddedWallet,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";
import { WalletClient, useSendTransaction, useSignMessage } from "wagmi";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { useEffect, useMemo, useState } from "react";

const EMAIL_SSO_VIEW = {
  type: SdkViewType.Login,
  sections: [
    {
      type: SdkViewSectionType.Email,
    },
    {
      type: SdkViewSectionType.Separator,
      label: "Or",
    },
    {
      type: SdkViewSectionType.Social,
      defaultItem: "google",
    },
  ],
};

const SignMessage = () => {
  const { user } = useDynamicContext();
  const {
    signMessage,
  } = useSignMessage({
    message: 'Sign in to Dynamic Labs',
  });

  return (
    user ? <button onClick={() => signMessage()}>Sign Message</button> : <span>Connect to sign message</span>
  )
}

const SendTransaction = () => {
  const { primaryWallet } = useDynamicContext();
  const { userHasEmbeddedWallet } = useEmbeddedWallet();

  const doesUserHaveEmbeddedWallet = userHasEmbeddedWallet();
  const [client, setClient] = useState<WalletClient>();

  useEffect(() => {
    if (primaryWallet && doesUserHaveEmbeddedWallet) {
      (async () => {
        const client = (await primaryWallet?.connector.getSigner()) as WalletClient;
        setClient(client);
      })();
    }
  }, [primaryWallet, doesUserHaveEmbeddedWallet]);

  const tx = useMemo<any>(() => {
    const account = client?.account;
    if (!account) {
      return undefined;
    }
    return {
      account,
      chain: 56,
      data: "0x2e1a7d4d000000000000000000000000000000000000000000000000002386f26fc10000869584cd0000000000000000000000009756abf797bf1d4972da8e86be5c40f8dfd56bc30000000000000000000000000000000080c8d225e4515c761ffe591ca50d7353",
      gasPrice: BigInt(5000000000),
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
      to: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      value: BigInt(0),
    }
  }, [client]);

  const { sendTransaction } = useSendTransaction(tx && tx);

  return (
    primaryWallet ? <button onClick={() => sendTransaction()}>Send Transaction</button> : <span>Connect to send transaction</span>
  )
}

const DynamicExample = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "3a07c090-e424-4e92-9ca2-d45e8bcb7986",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { views: [EMAIL_SSO_VIEW] },
      }}
    >
      <DynamicWagmiConnector>
        <DynamicWidget />
        <SignMessage />
        <SendTransaction />
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};

export default DynamicExample;
