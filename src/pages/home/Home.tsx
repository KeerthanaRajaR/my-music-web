import ItemArtistAlbumsList from "@/pages/search/utilityComp/ItemArtistAlbumsList";
import { TitleSeeAll } from "@components/Image";
import ItemArtistAlbumListSkeleton from "@components/skeletons/ItemArtistAlbumsList.skeleton";
import { ContainerWithoutScrollbar, RootContainer } from "@components/styledComponents";
import { Box, Grid, Skeleton, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ItemSongList from "../search/utilityComp/ItemSongList";
import useHomeController from "./Home.controller";
import ItemSongListSkeleton from "@components/skeletons/ItemSongLIst.skeleton";
import { img1 } from "@assets/images";
import { MGradientsDarkTheme } from "@/theme/utils/mGredient";

const Home: React.FC = () => {
  const classes = useStyle();
  const {
    listenerGoToArtistDetails,
    listenerGoToAlbumDetails,
    listenerGoToPlaylistDetails,
    listenerSeeAllNewRelease,
    listenerSeeAllPopularPlaylist,
    isRecentPlayedTrackListError,
    isRecentPlayedTrackListLoading,
    recentPlayedTrackList,
    isNewReleaseAlbumListError,
    isNewReleaseAlbumListLoading,
    newReleaseAlbumList,
    isPopularPlaylistsError,
    isPopularPlaylistsLoading,
    popularPlaylists,
    isHindiTrackListError,
    isHindiTrackListLoading,
    hindiTrackList,
    isEnglishTrackListError,
    isEnglishTrackListLoading,
    englishTrackList,
    isPunjabiTrackListError,
    isPunjabiTrackListLoading,
    punjabiTrackList,
    isDailyMixListError,
    isDailyMixListLoading,
    dailyMixList,
  } = useHomeController();

  const renderMadeForYouList = () => {
    if (isDailyMixListLoading) return renderSkeletons();
    if ((dailyMixList.length == 0 && !isDailyMixListLoading && !isDailyMixListError) || isDailyMixListError) return;
    return (
      <>
        <Typography variant="h3" my={"10px"}>
          Made For You
        </Typography>
        {/* <TitleSeeAll title="Recent Played" /> */}
        <ContainerWithoutScrollbar>
          {dailyMixList.map((item, index) => (
            <ItemArtistAlbumsList
              key={item.id}
              onClick={() => listenerGoToPlaylistDetails(item.id)}
              subtitle={`By ${item.owner?.display_name}`}
              title={item.name}
              img={(item.images && item?.images[0]?.url) || ""}
            />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderHindiTracks = () => {
    if (isHindiTrackListLoading) return renderSkeletons(true);
    if (isHindiTrackListError) return;
    if (hindiTrackList.length == 0 && !isHindiTrackListError && !isHindiTrackListLoading) return;

    return (
      <Box className={classes.trendingContainer} sx={{ backgroundImage: `url(${hindiTrackList[0].track?.album?.images && hindiTrackList[0].track?.album?.images[0].url})` }}>
        <Box className={classes.trendingContainerBgImage} />
        <Typography variant="h4" m={"10px"}>
          Hindi
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {hindiTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                img={item?.track?.album?.images && item?.track?.album?.images[0]?.url}
                title={item?.track?.name}
                // track_no={index + 1}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderPunjabiTracks = () => {
    if (isPunjabiTrackListLoading) return renderSkeletons(true);
    if (isPunjabiTrackListError) return;
    if (punjabiTrackList.length == 0 && !isPunjabiTrackListLoading && !isPunjabiTrackListError) return;

    return (
      <Box className={classes.trendingContainer} sx={{ backgroundImage: `url(${punjabiTrackList[0].track?.album?.images && punjabiTrackList[0].track?.album?.images[0].url})` }}>
        <Box className={classes.trendingContainerBgImage} />
        <Typography variant="h4" m={"10px"}>
          Punjabi
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {punjabiTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                img={item?.track?.album?.images && item?.track?.album?.images[0]?.url}
                title={item?.track?.name}
                // track_no={index + 1}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderEnglishTracks = () => {
    if (isEnglishTrackListLoading) return renderSkeletons(true);
    if (isEnglishTrackListError) return;
    if (englishTrackList.length == 0 && !isEnglishTrackListError && !isEnglishTrackListLoading) return;
    return (
      <Box className={classes.trendingContainer} sx={{ backgroundImage: `url(${englishTrackList[0].track?.album?.images && englishTrackList[0].track?.album?.images[0].url})` }}>
        <Box className={classes.trendingContainerBgImage} />
        <Typography variant="h4" m={"10px"}>
          English
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {englishTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                img={item?.track?.album?.images && item?.track?.album?.images[0]?.url}
                title={item?.track?.name}
                // track_no={index + 1}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderRecentPlayedTrackList = () => {
    if (isRecentPlayedTrackListLoading) return renderSkeletons();
    if ((recentPlayedTrackList.length == 0 && !isRecentPlayedTrackListLoading) || isRecentPlayedTrackListError) return;
    return (
      <>
        <Typography variant="h3" my={"10px"}>
          Recent Played
        </Typography>
        {/* <TitleSeeAll title="Recent Played" /> */}
        <ContainerWithoutScrollbar>
          {recentPlayedTrackList.map((item, index) => (
            <ItemArtistAlbumsList
              key={`${item.track?.id}${index}`}
              subtitleArr={item.track?.artists}
              subtitle={"--"}
              title={item.track?.name}
              img={(item.track?.album?.images && item.track?.album?.images[0]?.url) || ""}
            />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderPopularPlaylistsList = () => {
    if (isPopularPlaylistsLoading) return renderSkeletons();
    if ((popularPlaylists.length == 0 && !isPopularPlaylistsLoading) || isPopularPlaylistsError) return;
    return (
      <>
        <TitleSeeAll title="Popular Playlist" onSeeAllClick={listenerSeeAllPopularPlaylist} />
        <ContainerWithoutScrollbar>
          {popularPlaylists.map((item, index) => (
            <ItemArtistAlbumsList
              key={item.id}
              onClick={() => listenerGoToPlaylistDetails(item.id)}
              subtitle={`By ${item.owner?.display_name}`}
              title={item.name}
              img={(item.images && item?.images[0]?.url) || ""}
            />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderNewReleaseAlbumsList = () => {
    if (isNewReleaseAlbumListLoading) return renderSkeletons();
    if ((newReleaseAlbumList.length == 0 && !isNewReleaseAlbumListLoading) || isNewReleaseAlbumListError) return;
    return (
      <>
        <TitleSeeAll title="New Release" onSeeAllClick={listenerSeeAllNewRelease} />
        <ContainerWithoutScrollbar>
          {newReleaseAlbumList.map((item, index) => (
            <ItemArtistAlbumsList
              key={`${item?.id}${index}`}
              subtitleArr={item?.artists}
              onClick={() => listenerGoToAlbumDetails(item.id)}
              subtitle={item.release_date?.slice(0, 4)}
              title={item?.name}
              img={(item?.images && item?.images[0]?.url) || ""}
            />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderSkeletons = (isTrack: boolean = false) => {
    if (isTrack) {
      return (
        <Box className={classes.trendingContainer}>
          <Skeleton variant="text" animation="wave" sx={{ width: "20%", height: `30px`, margin: "10px" }} />
          <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
            {Array.from({ length: 5 }, (_, index) => (
              <Grid item xs={12} key={index}>
                <ItemSongListSkeleton key={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" animation="wave" sx={{ width: "20%", height: `50px`, marginBottom: "10px" }} />
        <ContainerWithoutScrollbar sx={{ gap: "10px" }}>
          {Array.from({ length: 10 }, (_, index) => (
            <ItemArtistAlbumListSkeleton isArtist={false} key={index} />
          ))}
        </ContainerWithoutScrollbar>
      </Box>
    );
  };
  return (
    <RootContainer>
      {renderMadeForYouList()}
      <Typography variant="h3" my={"10px"}>
        Tranding Songs
      </Typography>
      <ContainerWithoutScrollbar sx={{ scrollSnapType: "x mandatory" }} gap={"10px"}>
        {renderHindiTracks()}

        {renderPunjabiTracks()}

        {renderEnglishTracks()}
      </ContainerWithoutScrollbar>
      {renderRecentPlayedTrackList()}

      {renderPopularPlaylistsList()}

      {renderNewReleaseAlbumsList()}
    </RootContainer>
  );
};

export default Home;

const useStyle = makeStyles((theme: Theme) => ({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
  },
  trendingContainer: {
    flex: 1,
    minWidth: "330px",
    // backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    padding: "10px",
    // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
    scrollSnapAlign: "start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    zIndex: 1,
  },
  trendingContainerBgImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    // opacity: 0.3,
    background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
  },
}));
