import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByUserId, deleteFromCart, clearCart } from "./CartSlice";
import { updateProductStock } from "../products/productSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ProductById() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.currentUser);
  const listCart = useSelector((state) => state.cartReducer.cartItems);
  const listProduct = useSelector((state) => state.productReducer.listProducts);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (user?.id) {
      dispatch(getProductsByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  const productsInCart = listProduct.filter((product) =>
    listCart.some((item) => Number(item.productId) === product.id)
  );

  useEffect(() => {
    if (productsInCart.length === 0) return;

    if (Object.keys(quantities).length === 0) {
      const initialQuantities = {};
      productsInCart.forEach((product) => {
        const cartItem = listCart.find(
          (item) => Number(item.productId) === product.id
        );
        initialQuantities[product.id] = cartItem?.quantity || 1;
      });
      setQuantities(initialQuantities);
    }
  }, [productsInCart, quantities, listCart]);

  const increase = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] - 1),
    }));
  };

  const handleDelete = (productId) => {
    dispatch(deleteFromCart({ productId, userId: user.id }));
  };

  const handleClearCart = async () => {
    if (user?.id) {
      await dispatch(clearCart({ userId: user.id }));
      dispatch(getProductsByUserId(user.id)); // רענון העגלה אחרי ניקוי
      setQuantities({});
    }
  };

  const totalPrice = productsInCart.reduce((sum, product) => {
    const qty = quantities[product.id] || 1;
    return sum + product.price * qty;
  }, 0);

  const handleCheckout = () => {
    navigate("/payment", { state: { total: totalPrice } });
  };

  return (
    <Box sx={{ display: "flex", p: 0 }}>
      {/* טור שמאלי - סה"כ לתשלום וכפתורים */}
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          ml: 0,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 3, textAlign: "left", width: "100%" }}
        >
          סה"כ לתשלום: ₪{totalPrice}
        </Typography>

        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: "1.2rem", py: 2, width: "100%", textAlign: "left" }}
          onClick={handleCheckout}
          disabled={productsInCart.length === 0}
        >
          לתשלום
        </Button>

        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2, fontSize: "1rem", width: "100%" }}
          onClick={handleClearCart}
          disabled={productsInCart.length === 0}
        >
          רוקן עגלה
        </Button>
      </Box>

      {/* טור ימני - רשימת מוצרים */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          סל הקניות שלך 🛒
        </Typography>

        {productsInCart.length === 0 && (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            העגלה שלך ריקה
          </Typography>
        )}

        {productsInCart.map((product) => (
          <Card
            key={product.id}
            sx={{
              mb: 2,
              position: "relative",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                מחיר: ₪{product.price}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
              >
                <IconButton
                  onClick={() => decrease(product.id)}
                  color="primary"
                >
                  <Remove />
                </IconButton>
                <Typography>{quantities[product.id] || 1}</Typography>
                <IconButton
                  onClick={() => increase(product.id)}
                  color="primary"
                >
                  <Add />
                </IconButton>
              </Box>

              <IconButton
                onClick={() => handleDelete(product.id)}
                sx={{ position: "absolute", top: 8, right: 8 }}
                color="error"
              >
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ProductById;
