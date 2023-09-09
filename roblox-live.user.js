// ==UserScript==
// @name         Roblox Livestreams on Home Page
// @namespace    https://www.roblox.com/
// @version      1
// @description  Adds the most recent livestream on the Roblox Youtube channel to the home page as an embed.
// @author       NomnomPlays
// @match        https://www.roblox.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let top = false;

    const API_KEY = 'API KEY GOES HERE'; // API key for the script to work

    const CHANNEL_ID = 'UCjiPEaapiHbJMoAdi_L8fNA'; // Channel ID for Roblox

    const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&eventType=live&type=video&part=id`;

    var placelist = document.getElementById('place-list');
    var video = document.createElement('iframe');
    video.allow = 'autoplay; encrypted-media';
    video.style = 'aspect-ratio: 16 / 9; width: 100%; border: none; border-radius: 8px;';

     GM_xmlhttpRequest({
        method: 'GET',
        url: API_URL,
        onload: function (response) {
            const data = JSON.parse(response.responseText);
            if (data.items && data.items.length > 0) {
                const livestreamId = data.items[0].id.videoId;
                const livestreamUrl = `https://www.youtube.com/watch?v=${livestreamId}`;
                // Do something with the livestream URL, e.g., open it in a new tab
                video.src = `https://www.youtube.com/embed/${livestreamId}?autoplay=1&mute=1`;
                if (top) {
                    placelist.insertBefore(video, placelist.firstChild);
                } else {
                    placelist.appendChild(video);
                }
            }
        },
    });
})();
