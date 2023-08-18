import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import Azure from "../../assets/bnt-logo--colored.svg";
import { CopyRegular, ShareRegular } from "@fluentui/react-icons";
import { Dialog, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";

const Layout = () => {
    const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false);
    const [copyClicked, setCopyClicked] = useState<boolean>(false);
    const [copyText, setCopyText] = useState<string>("Copy URL");

    const handleShareClick = () => {
        setIsSharePanelOpen(true);
    };

    const handleSharePanelDismiss = () => {
        setIsSharePanelOpen(false);
        setCopyClicked(false);
        setCopyText("Copy URL");
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopyClicked(true);
    };

    useEffect(() => {
        if (copyClicked) {
            setCopyText("Copied URL");
        }
    }, [copyClicked]);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Stack horizontal verticalAlign="center" style={{width: "100%"}} className="{styles.headerStack}">
                        <table width="100%">
                            <tr>
                                <td>
                                    <img
                                        src={Azure}
                                        className={styles.headerIcon}
                                        aria-hidden="true"
                                    />
                                </td>
                                <td>
                                    &nbsp;
                                </td>
                                <td align="right">
                                    <div className={styles.headerTitlePoweredBy}>
                                        <div className={styles.headerTitleChatBNT}>ChatBNT</div>
                                        CCoE and BioNData
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        {/* 
                        <div className={styles.shareButtonContainer} role="button" tabIndex={0} aria-label="Share" onClick={handleShareClick} onKeyDown={e => e.key === "Enter" || e.key === " " ? handleShareClick() : null}>
                            <ShareRegular className={styles.shareButton} />
                            <span className={styles.shareButtonText}>Share</span>
                        </div> 
                        */}
                    </Stack>
                </div>
            </header>
            <Outlet />
            <Dialog 
                onDismiss={handleSharePanelDismiss}
                hidden={!isSharePanelOpen}
                styles={{
                    
                    main: [{
                        selectors: {
                          ['@media (min-width: 480px)']: {
                            maxWidth: '600px',
                            background: "#FFFFFF",
                            boxShadow: "0px 14px 28.8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.2)",
                            borderRadius: "8px",
                            maxHeight: '200px',
                            minHeight: '100px',
                          }
                        }
                      }]
                }}
                dialogContentProps={{
                    title: "Share the web app",
                    showCloseButton: true
                }}
            >
                <Stack horizontal verticalAlign="center" style={{gap: "8px"}}>
                    <TextField className={styles.urlTextBox} defaultValue={window.location.href} readOnly/>
                    <div 
                        className={styles.copyButtonContainer} 
                        role="button" 
                        tabIndex={0} 
                        aria-label="Copy" 
                        onClick={handleCopyClick}
                        onKeyDown={e => e.key === "Enter" || e.key === " " ? handleCopyClick() : null}
                    >
                        <CopyRegular className={styles.copyButton} />
                        <span className={styles.copyButtonText}>{copyText}</span>
                    </div>                    
                </Stack>                
            </Dialog>
            <div className={styles.dismissRegular}>DISCLAIMER: Please avoid entering personal and secret business information.</div>            
        </div>
    );
};

export default Layout;
