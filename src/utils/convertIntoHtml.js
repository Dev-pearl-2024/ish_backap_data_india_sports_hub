import he from 'he';

export function decodeHtmlEntities(html) {
    return he.decode(html);
}