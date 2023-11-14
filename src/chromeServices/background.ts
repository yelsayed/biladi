import {DomainInfo, DOMMessage, DOMMessageTypes} from '../types/';
import {fetchBlockInformation} from "../utils";
import Tab = chrome.tabs.Tab;

const blockedSiteCallback = (tabInfo: Tab | undefined, sendResponse: any) => async (blockedSiteTuple?: [DomainInfo| undefined, boolean]) => {
  const [blockedSite, fromCache] = blockedSiteTuple || [undefined, false];

  if (blockedSite) {
    if (!fromCache) {
      sendResponse({
        type: DOMMessageTypes.LANDED_ON_BLOCKED_SITE,
        siteName: blockedSite?.name,
        description: blockedSite?.description
      });
    }

    await chrome.action.setBadgeText({tabId: tabInfo?.id, text: "!"});
    await chrome.action.setIcon({tabId: tabInfo?.id, path: "/images/danger38.png"});
  } else {
    await chrome.action.setBadgeText({tabId: tabInfo?.id, text: ""});
    await chrome.action.setIcon({tabId: tabInfo?.id, path: "/images/success38.png"});
  }
}

chrome.runtime.onMessage.addListener(function (msg: DOMMessage, sender, sendResponse) {
  if (msg.type !== DOMMessageTypes.FETCH_DOMAIN_INFO) return true;
  const senderTabUrl = sender.tab?.url;

  fetchBlockInformation(senderTabUrl).then(blockedSiteCallback(sender.tab, sendResponse));
  return true;
});
