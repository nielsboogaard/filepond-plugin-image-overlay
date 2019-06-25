import { isImage } from './utils/isImage';
import { registerFullSizeOverlay } from './utils/createFullSizeOverlay';

/**
 * Image Overlay Plugin
 */
const plugin = fpAPI => {

    const { addFilter, utils } = fpAPI;
    const { Type, createRoute } = utils;

    // called for each view that is created right after the 'create' method
    addFilter('CREATE_VIEW', viewAPI => {
        
        // get reference to created view
        const { is, view, query } = viewAPI;

        // only hook up to item view
        if (!is('file')) {
            return;
        }

        // create the image overlay plugin, but only do so if the item is an image
        const didLoadItem = ({ root, props }) => {
            const { id } = props;
            const item = query('GET_ITEM', id);

            if (!item || item.archived || (!isImage(item.file))) {
                return;
            }

            const labelButtonOverlay = root.query('GET_LABEL_BUTTON_IMAGE_OVERLAY');
            registerFullSizeOverlay(item, root.element, labelButtonOverlay);

            // now ready
            root.dispatch('DID_MEDIA_PREVIEW_CONTAINER_CREATE', { id });
        };

        // start writing
        view.registerWriter(
            createRoute({
                DID_LOAD_ITEM: didLoadItem
            }, ({ root, props }) => {
                const { id } = props;
                const item = query('GET_ITEM', id);

                // don't do anything while not an image file or hidden
                if ((!isImage(item.file)) || root.rect.element.hidden) return;
            })
        );
    });

    // expose plugin
    return {
        options: {
            labelButtonImageOverlay: ['Open image in overlay', Type.STRING]
        }
    };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
    document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;