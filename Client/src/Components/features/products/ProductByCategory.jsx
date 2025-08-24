import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "./productSlice";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

export default function ProductsByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.productReducer.listProducts);
  const userStatus = useSelector((state) => state.userReducer.status);
  const userRole = useSelector((state) => state.userReducer.role); // הוספתי כאן קריאה לתפקיד המשתמש
  const { categoryName } = useParams();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // אתחול כמות 1 לכל מוצר
  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach((p) => {
        initialQuantities[p.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  const filteredProducts = categoryName
    ? products.filter((product) => product.category === categoryName)
    : products;

  const addToCart = (id) => {
    if (userStatus === "loggedIn") {
      navigate(`/addToCart/${id}`, { state: { quantity: quantities[id] } });
    } else {
      navigate("/login");
    }
  };

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // פונקציה למחיקת מוצר (את צריכה לממש את המחיקה בפועל לפי ה-API שלך)
  const handleDelete = (id) => {
    if (window.confirm("אתה בטוח שברצונך למחוק את המוצר?")) {
      // כאן יש לקרוא ל-API שמוחק את המוצר ואז לעדכן את הרשימה מחדש
      console.log("מחיקת מוצר עם id:", id);
      // לדוגמה: dispatch(deleteProduct(id));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,     // רוחב מקסימלי לבחירה (תוכל לשנות לפי הצורך)
        margin: "0 auto",
        padding: 3,
        paddingTop: 12,
        direction: "rtl",
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#0d47a1", fontWeight: "bold" }}
      >
        מוצרים בקטגוריה: {categoryName || "הכל"}
      </Typography>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  width: "280px", // ← הגדרה חדשה: כל כרטיס ימלא את הרוחב המוקצה לו ב-Grid

                  height: 470,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`/images/${product.image}`}
                  alt={product.name}
                  onClick={() => navigate(`/productDetail/${product.id}`)}
                  sx={{
                    width: "100%",       // להבטיח רוחב מלא
                    height: 200,         // גובה אחיד
                    objectFit: "cover",  // חיתוך לפי הצורך למלא את השטח
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    cursor: "pointer",
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 110,
                    paddingBottom: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "3.2rem",
                      color: "#0d47a1",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="600"
                    sx={{ mt: 1 }}
                  >
                    {product.price} ₪
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    px: 2,
                    mb: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => decrementQuantity(product.id)}
                    disabled={quantities[product.id] === 1}
                  >
                    -
                  </Button>
                  <Typography
                    sx={{ minWidth: 24, textAlign: "center", fontWeight: "bold" }}
                  >
                    {quantities[product.id] || 1}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => incrementQuantity(product.id)}
                  >
                    +
                  </Button>
                </Box>

                <CardActions sx={{ padding: "0 16px 16px 16px" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product.id)}
                    sx={{
                      fontWeight: "700",
                      paddingY: 1.2,
                      borderRadius: 2,
                      boxShadow: "0 3px 8px rgba(13,71,161,0.4)",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#0d47a1",
                        boxShadow: "0 6px 12px rgba(13,71,161,0.7)",
                      },
                    }}
                  >
                    הוסף לסל
                  </Button>
                </CardActions>

                {/* הוספתי כאן את כפתור המחיקה שיופיע רק למנהלים */}
                {userRole === "admin" && (
                  <CardActions sx={{ padding: "0 16px 16px 16px" }}>

                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                      sx={{
                        fontWeight: "700",
                        paddingY: 1.2,
                        borderRadius: 2,
                      }}
                    >
                      מחק מוצר
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "#0d47a1" }}>
            אין מוצרים בקטגוריה זו.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { getAllProducts } from "./productSlice";

// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
//   Box,
// } from "@mui/material";

// export default function ProductsByCategory() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const products = useSelector((state) => state.productReducer.listProducts);
//   const user = useSelector((state) => state.userReducer.status);
//   const { categoryName } = useParams();

//   const [quantities, setQuantities] = useState({});

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   // אתחול כמות 1 לכל מוצר
//   useEffect(() => {
//     if (products.length > 0) {
//       const initialQuantities = {};
//       products.forEach((p) => {
//         initialQuantities[p.id] = 1;
//       });
//       setQuantities(initialQuantities);
//     }
//   }, [products]);

//   const filteredProducts = categoryName
//     ? products.filter((product) => product.category === categoryName)
//     : products;

//   const addToCart = (id) => {
//     if (user === "loggedIn") {
//       navigate(`/addToCart/${id}`, { state: { quantity: quantities[id] } });
//     } else {
//       navigate("/login");
//     }
//   };

//   const incrementQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };

//   return (
//     <Box
//       sx={{
//         padding: 3,
//         paddingTop: 12,
//         direction: "rtl",
//         backgroundColor: "#e3f2fd",
//         minHeight: "100vh",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "#0d47a1", fontWeight: "bold" }}
//       >
//         מוצרים בקטגוריה: {categoryName || "הכל"}
//       </Typography>

//       <Grid container spacing={3}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//               <Card
//                 sx={{
//                   height: 470,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
//                   borderRadius: 3,
//                   transition: "transform 0.3s ease",
//                   backgroundColor: "#ffffff",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={`/images/${product.image}`}
//                   alt={product.name}
//                   onClick={() => navigate(`/productDetail/${product.id}`)}
//                   sx={{
//                     height: 220,
//                     objectFit: "cover",
//                     borderTopLeftRadius: 12,
//                     borderTopRightRadius: 12,
//                     cursor: "pointer",
//                   }}
//                 />
//                 <CardContent
//                   sx={{
//                     flexGrow: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     minHeight: 110,
//                     paddingBottom: 1,
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: "bold",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       minHeight: "3.2rem",
//                       color: "#0d47a1",
//                     }}
//                   >
//                     {product.name}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     color="primary"
//                     fontWeight="600"
//                     sx={{ mt: 1 }}
//                   >
//                     {product.price} ₪
//                   </Typography>
//                 </CardContent>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 1,
//                     px: 2,
//                     mb: 1,
//                   }}
//                 >
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => decrementQuantity(product.id)}
//                     disabled={quantities[product.id] === 1}
//                   >
//                     -
//                   </Button>
//                   <Typography
//                     sx={{ minWidth: 24, textAlign: "center", fontWeight: "bold" }}
//                   >
//                     {quantities[product.id] || 1}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => incrementQuantity(product.id)}
//                   >
//                     +
//                   </Button>
//                 </Box>

//                 <CardActions sx={{ padding: "0 16px 16px 16px" }}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     onClick={() => addToCart(product.id)}
//                     sx={{
//                       fontWeight: "700",
//                       paddingY: 1.2,
//                       borderRadius: 2,
//                       boxShadow: "0 3px 8px rgba(13,71,161,0.4)",
//                       backgroundColor: "#1976d2",
//                       "&:hover": {
//                         backgroundColor: "#0d47a1",
//                         boxShadow: "0 6px 12px rgba(13,71,161,0.7)",
//                       },
//                     }}
//                   >
//                     הוסף לסל
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ color: "#0d47a1" }}>
//             אין מוצרים בקטגוריה זו.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// }
