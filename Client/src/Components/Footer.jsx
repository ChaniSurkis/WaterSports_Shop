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
        py: 1.5,
        px: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: "700",
        boxShadow: "0 -3px 10px rgba(0,0,0,0.3)",
        zIndex: 1300,
        userSelect: "none",
        direction: "rtl",
      }}
    >
      {/* לוגו ושם - צד ימין */}
      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 }, cursor: "default" }}>
        <SailingIcon sx={{ ml: 1, fontSize: 30, color: "#90caf9" }} />
        <Typography variant="h6" component="div">
          SeaSports
        </Typography>
      </Box>

      {/* טקסט במרכז */}
      <Typography
        variant="body2"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontWeight: "600",
          letterSpacing: 0.5,
          userSelect: "none",
        }}
      >
        הכל לספורט הימי במקום אחד
      </Typography>

      {/* אייקוני מדיה חברתית וזכויות יוצרים - צד שמאל */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: { xs: 1, md: 0 } }}>
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
        <Typography variant="caption" sx={{ mt: 0.5, userSelect: "none" }}>
          © {new Date().getFullYear()} SeaSports, 🛑כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
}
// הלוגו מוזז פנימה מהקצה הימני עם pr: 2
// ריווח צדדי של הפוטר מותאם למסכים קטנים
