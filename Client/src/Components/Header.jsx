import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import SailingIcon from '@mui/icons-material/Sailing';
import { logout } from "./features/users/userSlice"; // שנה לפי הנתיב שלך

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserStatus = useSelector((state) => state.userReducer.status);
  const cartItemsCount = useSelector((state) => state.cartReducer.cartItems?.length || 0);

  const categories = ["צלילה", "שחייה", "גלישה", "חוף"];

  const handleLoginClick = () => {
    if (currentUserStatus === "loggedIn") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const goToCategory = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <AppBar position="fixed" color="primary" elevation={3} sx={{ direction: "rtl" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* לוגו ושם החנות */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <SailingIcon sx={{ mr: 1, fontSize: 42, color: "#64b5f6" }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "900",
              color: "#bbdefb",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: "none",
            }}
          >
            SeaSports
          </Typography>
        </Box>

        {/* קטגוריות */}
        <Stack
          direction="row"
          spacing={4}
          sx={{
            fontWeight: "600",
            fontSize: "1.15rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {categories.map((cat) => (
            <Typography
              key={cat}
              onClick={() => goToCategory(cat)}
              sx={{
                cursor: "pointer",
                color: "#90caf9",
                userSelect: "none",
                letterSpacing: 1,
                padding: "8px 14px",
                borderRadius: 3,
                transition: "background-color 0.25s ease, color 0.25s ease",
                "&:hover": {
                  backgroundColor: "#1e88e5",
                  color: "#e3f2fd",
                  textDecoration: "none",
                },
              }}
              variant="button"
            >
              {cat}
            </Typography>
          ))}
        </Stack>

        {/* עגלת קניות + כפתור התחברות */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge badgeContent={cartItemsCount} color="secondary" overlap="circular" sx={{ mr: 1 }}>
            <Typography
              onClick={() => {
                if (currentUserStatus === "loggedIn") {
                  navigate("/productById");
                } else {
                  navigate("/login");
                }
              }}
              sx={{
                fontSize: "1.9rem",
                cursor: "pointer",
                userSelect: "none",
                color: "#0d47a1",
                filter: "drop-shadow(0 0 1px rgba(0,0,0,0.3))",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#1976d2",
                },
              }}
              title="עבור לסל קניות"
            >
              🛒
            </Typography>
          </Badge>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleLoginClick}
            sx={{
              ml: 3,
              fontWeight: "700",
              textTransform: "none",
              boxShadow: "0 2px 6px rgba(25, 118, 210, 0.5)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.7)",
              },
            }}
          >
            {currentUserStatus === "loggedIn" ? "יציאה" : "התחבר"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
