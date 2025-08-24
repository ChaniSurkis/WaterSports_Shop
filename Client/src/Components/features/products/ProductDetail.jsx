import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useSelector((state) => state.productReducer.listProducts);
  const user = useSelector((state) => state.userReducer.status);

  const product = products.find((p) => Number(p.id) === Number(id));

  if (!product) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">
          לא נמצא מוצר עם מזהה {id}
        </Typography>
      </Box>
    );
  }

  const addToCart = () => {
    if (user === "loggedIn") {
      navigate(`/addToCart/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2 }}>
      <Grid container spacing={4}>
        {/* תמונה */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={`/images/${product.image}`}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* פרטים */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              קטגוריה: {product.category}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              ₪{product.price}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={addToCart}  // כאן מחברים את הפונקציה
            >
              הוסף לעגלה 🛒
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
