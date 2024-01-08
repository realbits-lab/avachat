"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNetwork, useAccount, useDisconnect, useConnect } from "wagmi";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export default function WalletConnect() {
  const [openConnectorsDialog, setOpenConnectorsDialog] = useState(false);
  const [isWalletNetworkConnect, setIsWalletNetworkConnect] = useState();
  const { chains, chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const {
    connect,
    connectors,
    error: errorConnect,
    isLoading: isLoadingConnect,
    pendingConnector,
  } = useConnect();

  useEffect(() => {
    console.log("call useEffect()");
    console.log("chain: ", chain);
    console.log("isConnected: ", isConnected);

    if (chain?.network === "maticmum") {
      setIsWalletNetworkConnect(true);
    } else {
      setIsWalletNetworkConnect(false);
    }
  }, [isConnected, chain]);

  function CheckingConnection() {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Button
            variant="contained"
            onClick={() => {
              setOpenConnectorsDialog(true);
            }}
          >
            CONNECT
          </Button>
        </Box>

        <Dialog
          onClose={() => setOpenConnectorsDialog(false)}
          open={openConnectorsDialog}
        >
          <DialogTitle>Select connectors</DialogTitle>
          <List sx={{ pt: 0 }}>
            {connectors.map((connector, idx) => (
              <ListItem disableGutters key={connector.id}>
                <ListItemButton
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setOpenConnectorsDialog(false);
                  }}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoadingConnect &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <h1>Connect Wallet</h1>
      {isWalletNetworkConnect === true ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Button
            variant="contained"
            onClick={() => {
              disconnect();
            }}
          >
            DISCONNECT
          </Button>
        </Box>
      ) : (
        <CheckingConnection />
      )}
    </>
  );
}
