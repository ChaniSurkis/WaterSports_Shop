import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SailingIcon from '@mui/icons-material/Sailing';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        bgcolor: "#1976d2",
        color: "#bbdefb",
        py: 2,
        px: 6,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -3px 10px rgba(0,0,0,0.3)",
        zIndex: 1300,
        userSelect: "none",
        direction: "rtl",
        gap: { xs: 1.5, md: 0 }
      }}
    >
      {/* לוגו */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: { md: "200px" },
          justifyContent: { xs: "center", md: "flex-start" }
        }}
      >
        <SailingIcon sx={{ fontSize: 30, color: "#90caf9" }} />
        <Typography variant="h6">
          SeaSports
        </Typography>
      </Box>

      {/* טקסט מרכזי */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          flexGrow: 1,
          fontWeight: 600,
          letterSpacing: 0.5
        }}
      >
        הכל לספורט הימי במקום אחד
      </Typography>

      {/* אייקונים + זכויות */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-end" },
          minWidth: { md: "200px" }
        }}
      >
        <Box>
          <IconButton aria-label="facebook" href="#" sx={{ color: "#90caf9" }}>
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="instagram" href="#" sx={{ color: "#90caf9" }}>
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="twitter" href="#" sx={{ color: "#90caf9" }}>
            <TwitterIcon />
          </IconButton>
        </Box>

        <Typography variant="caption" sx={{ mt: 0.5 }}>
          © {new Date().getFullYear()} SeaSports, כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
}
