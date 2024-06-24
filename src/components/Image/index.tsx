import { Box } from "@mui/material";
import { IGlobleImageProps } from "@utils/globleTypes";

const ImageComp = ({ img, alt, style }: IGlobleImageProps) => {
  // return <img src={img} alt={alt} style={{ height: "auto", objectFit: "contain",
  //   // backgroundColor: mColors.red,
  //   ...style }} />;

  //      xl: 1536,
  //      lg: 1200,
  //      md: 900,
  //      sm: 600,
  //      xs: 0,

  return (
    <Box
      component="img"
      src={img}
      alt={alt}
      sx={{
        width: "30%",
        maxWidth: "90%",
        height: "auto",
        objectFit: "contain",
        ...style,
      }}
    />
  );
};

export default ImageComp;
