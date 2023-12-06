import { BrandInfo, DOMMessage, DOMMessageTypes } from '../types/';
import { bulkFetchBrandInformation, fetchDomainInformation } from "../utils";
import Tab = chrome.tabs.Tab;

/**
 * Will be called when the user lands on a blocked site.
 * @param tabInfo
 * @param sendResponse
 */
const blockedSiteCallback = (tabInfo: Tab | undefined, sendResponse: any) => async (blockedSiteTuple?: [BrandInfo| undefined, boolean]) => {
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
  if (msg.type === DOMMessageTypes.FETCH_DOMAIN_INFO) {
    const senderTabUrl = sender.tab?.url;
    fetchDomainInformation(senderTabUrl).then(blockedSiteCallback(sender.tab, sendResponse));
  }

  if (msg.type === DOMMessageTypes.FETCH_BRAND_INFO) {
    if (!msg.brandNames) return;

    console.log("fetching brand info", msg.brandNames);
    bulkFetchBrandInformation(msg.brandNames).then((response) => {
      console.log("response from bulk fetch", response);
      sendResponse(response);
    });
  }
  return true;
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        type: DOMMessageTypes.URL_CHANGED,
      })
    }
  }
);
