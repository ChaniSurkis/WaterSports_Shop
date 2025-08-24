import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AddToCart() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.userReducer.currentUser);

  // מקבל את הכמות שהועברה עם הניווט, אם לא הועברה - ברירת מחדל 1
  const quantityFromState = location.state?.quantity || 1;
  console.log("quantityFromState:", quantityFromState);

  const [formData] = useState({
    userId: user.id,
    productId: productId,
    quantity: quantityFromState,
  });

  const [open, setOpen] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/cart", formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("שגיאה בהוספת מוצר");
      } else {
        alert("אירעה שגיאה בהוספת המוצר");
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-to-cart-dialog-title"
        aria-describedby="add-to-cart-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="add-to-cart-dialog-title" sx={{ fontWeight: "bold" }}>
          הוספה לעגלה
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="add-to-cart-dialog-description" sx={{ fontSize: 18 }}>
            האם אתה בטוח שברצונך להוסיף את המוצר לעגלה בכמות {quantityFromState}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem 1.5rem" }}>
          <Button onClick={handleClose} variant="outlined" color="error">
            ביטול
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success" autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showSuccess} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          המוצר נוסף לעגלה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
}
