import algoliasearch from "algoliasearch/lite";

export default async function useSearch(
  query,
  hitsPerPage,
  filters,
  tagFilters
) {
  const algoliaClient = algoliasearch(
    "JESZ3NCHL8",
    "b3dbc69bf4fe58469fd77203a872549d"
  );
  const algoliaIndex = algoliaClient.initIndex("templates");

  try {
    const { hits, nbHits } = await algoliaIndex.search(query, {
      hitsPerPage: hitsPerPage,
      filters: filters || "",
      tagFilters: tagFilters || "",
    });

    return { hits, nbHits };
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
