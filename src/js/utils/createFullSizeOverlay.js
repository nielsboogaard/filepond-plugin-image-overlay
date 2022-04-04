import { getImageSize } from './getImageSize';

/**
 * Register the full size overlay so that it will be instantiated upon clicking the image preview wrapper
 */
export const registerFullSizeOverlay = (item, el, labelButtonOverlay) => {
    const info = el.querySelector('.filepond--file-info'),
          mainInfo = el.querySelector('.filepond--file-info-main'),
          magnifyIcon = getMagnifyIcon(labelButtonOverlay);

    let container = el.querySelector('.filepond--file-info-main-container')
    if (!container) {
        container = document.createElement('div');
        container.className = 'filepond--file-info-main-container'
        container.append(mainInfo);
        info.prepend(container);
    }

    container.prepend(magnifyIcon);
    magnifyIcon.addEventListener("click", () => createFullSizeOverlay(item));

    // in case the image preview plugin is loaded, make the preview clickable as well.
    // we don't have a hook to determine whether that plugin is loaded, as listening to FilePond:pluginloaded doesn't work
    window.setTimeout(() => {
        const imagePreview = el.querySelector('.filepond--image-preview');
        if (imagePreview) {
            imagePreview.classList.add('clickable');
            imagePreview.addEventListener("click", () => createFullSizeOverlay(item));
        }
    },1000);
}

export const getMagnifyIcon = (labelButtonOverlay) => {
    let icon = document.createElement('span');
    icon.className = 'filepond--magnify-icon';
    icon.title = labelButtonOverlay;
    return icon;
}

/**
 * Generate the full size overlay and present the image in it.
 */
export const createFullSizeOverlay = (item) => {
    const overlay = document.createElement('div');
    overlay.className = 'filepond--fullsize-overlay';

    const imgContainer = document.createElement('div');
    const imgUrl = URL.createObjectURL(item.file);
    imgContainer.className = 'image-container';
    imgContainer.style.backgroundImage = 'url(' + imgUrl + ')';

    determineImageOverlaySize(imgUrl, imgContainer);

    let body = document.getElementsByTagName("body")[0];

    overlay.appendChild(imgContainer);
    body.appendChild(overlay);

    overlay.addEventListener("click",() => overlay.remove());
}

/**
 * Determines whether the image is larger than the viewport.
 * If so, set the backgroundSize to 'contain' to scale down the image so it fits the overlay.
 */
export const determineImageOverlaySize = (imgUrl, imgContainer) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    getImageSize(imgUrl, (width, height) => {
        if (width > w || height > h) {
            imgContainer.style.backgroundSize = 'contain';
        }
    });
}