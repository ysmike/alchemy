import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo that we'll take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read the # of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items and there aren't enough items to satisfy how many
      // were requested and we're on the last page, then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, we fetch from the network
        return false;
      }
      // if there are items, just return from cache (no network needed)
      if (items.length) {
        return items;
      }
      return false; // fallback to network
      // asks the read function for those items
      // we can either do one of two things:
      // first thing to do is return the items bc they're already in the cache
      // the other thing to do is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      // this runs when the apollo client comes back from the network
      // with our products
      const merged = existing ? existing.slice(0) : [];
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
