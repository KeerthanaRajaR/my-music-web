import { TitleSeeAll } from "@components/Image";
import { ContainerWithoutScrollbar, RootContainer } from "@components/styledComponents";
import { Box, CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import ItemCategoryList from "./utilityComp/ItemCategoryList";
import ItemArtistAlbumsList from "./utilityComp/ItemArtistAlbumsList";
import ItemSongList from "./utilityComp/ItemSongList";
import useSearchController from "./search.controller";

const Search = () => {
  const {
    lastCategoryItemRef,
    listenerSeeAllTracks,
    listenerSeeAllArtists,
    listenerSeeAllAlbums,
    listenerSeeAllPlaylists,
    searchQuery,
    isSearchDataLoading,
    searchData,
    isCategoriesLoading,
    categories,
  } = useSearchController();

  const renderCategoriesData = () => {
    if (searchQuery != "") return;
    if (categories.length == 0 && !isCategoriesLoading) {
      return (
        <Typography variant="h3" my={"20px"}>
          No Category Found
        </Typography>
      );
    }
    return (
      <>
        <Typography variant="h1" my={"20px"}>
          Browse All
        </Typography>
        <Grid container spacing={2}>
          {categories.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box key={item.id} component={"div"} ref={index === categories.length - 1 ? lastCategoryItemRef : null}>
                <ItemCategoryList key={item.id} category={item} />
              </Box>
            </Grid>
          ))}

          {isCategoriesLoading &&
            Array.from({ length: 20 }, (_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box key={index} sx={{ width: "100%", borderRadius: "8px", aspectRatio: 2 / 1, overflow: "hidden" }}>
                  <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: `100%` }} />
                </Box>
              </Grid>
            ))}
        </Grid>
      </>
    );
  };
  const renderSearchResultData = () => {
    if (searchQuery == "") return;
    if (isSearchDataLoading) {
      return <CircularProgress size={30} thickness={5} sx={{ color: "loader.main", alignSelf: "center", margin: "0 auto" }} />;
    }
    if (searchData == null) return;
    return (
      <>
        {renderTracksData()}
        {renderArtistsData()}
        {renderAlbumsData()}
        {renderPlaylistData()}
      </>
    );
  };
  const renderTracksData = () => {
    if (searchData?.tracks?.items?.length == 0) return;
    return (
      <>
        <TitleSeeAll title="Songs" onSeeAllClick={listenerSeeAllTracks} />
        <Grid container spacing={1} mb={"10px"}>
          {searchData?.tracks?.items?.map((item, _) => (
            <Grid item xs={12} lg={6}>
              <ItemSongList track={item} key={item.id} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };
  const renderArtistsData = () => {
    if (searchData?.artists?.items?.length == 0) return;
    return (
      <>
        <TitleSeeAll title="Artist" onSeeAllClick={listenerSeeAllArtists} />
        <ContainerWithoutScrollbar>
          {searchData?.artists?.items?.map((item, _) => (
            <ItemArtistAlbumsList key={item.id} subtitle={item.type} title={item.name} img={(item.images && item?.images[0]?.url) || ""} isArtist={true} />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderAlbumsData = () => {
    if (searchData?.albums?.items?.length == 0) return;
    return (
      <>
        <TitleSeeAll title="Album" onSeeAllClick={listenerSeeAllAlbums} />
        <ContainerWithoutScrollbar>
          {searchData?.albums?.items?.map((item, _) => (
            <ItemArtistAlbumsList key={item.id} subtitleArr={item.artists} subtitle={item.release_date?.slice(0, 4)} title={item.name} img={(item.images && item?.images[0]?.url) || ""} />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderPlaylistData = () => {
    if (searchData?.playlists?.items?.length == 0) return;
    return (
      <>
        <TitleSeeAll title="Playlist" onSeeAllClick={listenerSeeAllPlaylists} />
        <ContainerWithoutScrollbar>
          {searchData?.playlists?.items?.map((item, _) => (
            <ItemArtistAlbumsList key={item.id} subtitle={`By ${item.owner?.display_name}`} title={item.name} img={(item.images && item?.images[0]?.url) || ""} />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  return (
    <>
      <RootContainer>
        {renderCategoriesData()}
        {renderSearchResultData()}
      </RootContainer>
    </>
  );
};

export default Search;
