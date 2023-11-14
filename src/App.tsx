import React, {useEffect, useState} from 'react';
import {fetchBlockInformation} from "./utils";
import styled from "styled-components";
import "./Global.css";
import {DomainInfo} from "./types";

const Container = styled.div`
  text-align: center;
  height: 100%;

  .container__inner {
    padding: 16px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    .header {
      font-weight: 600;
      font-size: 24px;
    }
    .subheader {
      font-size: 15px;
      margin: 7px 0;
    }
  }
`;

function App() {
  const currentUrl = window.location.href;
  const [isLoading, setIsLoading] = useState(false);
  const [domainInfo, setDomainInfo] = useState<DomainInfo | undefined>();

  useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, async (tabs) => {
      setIsLoading(true);
      const [domain, ] = await fetchBlockInformation(tabs[0].url || '');
      setDomainInfo(domain);
      setIsLoading(false);
    });
  }, [currentUrl]);

  return (
    <Container>
      <div className="container__inner">
        {
          isLoading ? "Loading..." : (
            domainInfo ? (
              <>
                <img src="/images/cross.svg" alt="Bad"/>
                <div>
                  <header className="header">
                    {domainInfo.name} supports Israel.
                  </header>
                  <p className="subheader">
                    {domainInfo.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <img src="/images/tick.svg" alt="Good"/>
                <header className="header">
                  This site does not support Israel.
                </header>
              </>
            )
          )
        }
      </div>
    </Container>
  );
}

export default App;
