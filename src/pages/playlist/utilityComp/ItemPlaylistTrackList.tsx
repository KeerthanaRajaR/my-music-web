import { IArtistSchema } from "@/schemas/artist.schema";
import { MGradientsDarkTheme } from "@/theme/utils/mGredient";
import { ImageCompWithLoader } from "@components/Image";
import { SingleLineTypo } from "@components/styledComponents";
import { AccessTimeRounded } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, Theme, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useIsSmallScreen } from "@utils/constants";
import { msToTimeConvert } from "@utils/genaralFunctions";
import { globleEaseInOutTransitionTime } from "@utils/globleStyle";
import React from "react";
import { useNavigate } from "react-router-dom";

type ItemPlaylistTrackListProps = {
  title?: string;
  subtitleArr?: IArtistSchema[];
  trackDuration?: number;
  img?: string;
  track_no?: number;
  onClick?: () => void;
  onAlbumClick?: () => void;
  albumName?: string;
  dateAdded?: string;
};

const ItemPlaylistTrackList = ({ title, track_no = 0, img, subtitleArr, onClick, onAlbumClick, trackDuration, albumName, dateAdded }: ItemPlaylistTrackListProps) => {
  const classes = useStyle();
  const navigate = useNavigate();

  const listenerGoToArtistDetails = (artistId?: string) => {
    artistId && navigate(`/artist/${artistId}`);
  };

  return (
    <Card sx={{ backgroundColor: "transparent", backgroundImage: "none", boxShadow: "none" }} className={classes.root}>
      <CardActionArea
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "12px",
          paddingY: "8px",
          paddingX: "20px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="subtitle1" color="text.primary" mr={"2px"} width={"20px"}>
          {track_no}
        </Typography>
        <ImageCompWithLoader
          img={img}
          alt={"track"}
          style={{
            width: "50px",
            aspectRatio: 1,
            borderRadius: "5px",
            boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
          }}
        />
        <CardContent sx={{ padding: 0, m: 0, flex: 1, width: "calc(100% - 80px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box component={"div"} sx={{ flex: 1, maxWidth: "40%" }}>
            <SingleLineTypo variant="subtitle1" color="text.primary" mb={"2px"}>
              {title}
            </SingleLineTypo>
            <SingleLineTypo variant="subtitle2" color="text.secondary">
              {subtitleArr?.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Box
                    component={"span"}
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      listenerGoToArtistDetails(item.id);
                    }}
                    sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline", color: "text.primary" } }}
                  >
                    {item.name}
                  </Box>
                  {subtitleArr.length - 1 == index ? `` : ` • `}
                </React.Fragment>
              ))}
            </SingleLineTypo>
          </Box>

          <SingleLineTypo
            variant="subtitle2"
            color="text.secondary"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onAlbumClick}
            sx={{ cursor: "pointer", flex: 1, maxWidth: "40%", "&:hover": { textDecoration: "underline", color: "text.primary" } }}
          >
            {albumName}
          </SingleLineTypo>

          <Typography variant="subtitle2" color="text.secondary" sx={{ flex: 1, maxWidth: "10%" }}>
            {dateAdded}
          </Typography>

          {/* <Typography variant="subtitle2" color="text.secondary">
            {msToTimeConvert(trackDuration || 0)}
          </Typography> */}
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <AccessTimeRounded sx={{ fontSize: "20px", color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {msToTimeConvert(trackDuration || 0)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemPlaylistTrackList;

const useStyle = makeStyles((_: Theme) => ({
  root: {
    width: "100%",
    transition: `transform ${globleEaseInOutTransitionTime},backgroundColor ${globleEaseInOutTransitionTime}`,
    boxSizing: "border-box",
    overFlow: "hidden",
    "&:hover": {
      // backgroundColor: theme.palette.secondary.main,
      backgroundImage: MGradientsDarkTheme.hoverBgColor,
      borderRadius: "5px",
    },
  },
}));
