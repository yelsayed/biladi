import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import "./Global.css";
import { BrandInfo } from "./types";
import { fetchDomainInformation } from "./utils/api";
import  SupportTypePill from "./popupComponents/SupportTypePill";
import Navbar from "./popupComponents/Navbar";
import BlockInfoList from "./popupComponents/BlockInfoList";

const Container = styled.div`
  text-align: center;
  height: 100%;

  .container__inner {
    padding: 16px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    
    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .header {
      font-size: 22px;
      font-weight: 600;
      text-align: left;
      margin-bottom: 0;
    }
    .subheader {
      margin: 0;
      font-size: 15px;
      text-align: left;
    }
  }
`;

function App() {
  const currentUrl = window.location.href;
  const [isLoading, setIsLoading] = useState(false);
  const [domainInfo, setDomainInfo] = useState<BrandInfo | undefined>();

  useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, async (tabs) => {
      setIsLoading(true);
      const domain = await fetchDomainInformation(tabs[0].url || '');
      setDomainInfo(domain?.body);
      setIsLoading(false);
    });
  }, [currentUrl]);

  return (
    <Container>
      <div className="container__inner">
        <Navbar />
        <div className="text-wrapper">
        {
          isLoading ? "Loading..." : (
          domainInfo ? (
            <>
              <SupportTypePill brandInfo={domainInfo} />
              <header className="header">
                🩸 {domainInfo.name} supports Apartheid.
              </header>
              <p className="subheader">
                {domainInfo.description}
              </p>
            </>
          ) : (
              <>
                <header className="header">
                  ✅ This site does not support apartheid.
                </header>
                <p className="subheader">
                  Shop ethically online.
                </p>
                <BlockInfoList />
              </>
            )
          )
        }
        </div>
      </div>
    </Container>
  );
}

export default App;
