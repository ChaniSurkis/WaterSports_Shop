import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Cart/CartSlice"; // שנה את הנתיב בהתאם
import { updateProductStock } from "../products/productSlice";

import {
    Container,
    TextField,
    Typography,
    Button,
    Box,
    Alert,
    Divider
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PaymentForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");


    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.currentUser);
    const cart=useSelector((state)=>state.cartReducer.cartItems)
    console.log("cart",cart)

    const navigate = useNavigate();
    const location = useLocation();
    const totalPriceFromNav = location.state?.total;
    console.log("total:", totalPriceFromNav)
    const [totalPrice, setTotalPrice] = useState(totalPriceFromNav);
    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, "").substring(0, 16);
        const groups = digits.match(/.{1,4}/g);
        return groups ? groups.join(" ") : "";
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const formatExpiry = (value) => {
        const digits = value.replace(/\D/g, "").substring(0, 4);
        if (digits.length < 3) return digits;
        return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    };

    const handleExpiryChange = (e) => {
        setExpiry(formatExpiry(e.target.value));
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        const cardDigits = cardNumber.replace(/\s/g, "");
        if (cardDigits.length !== 16) {
            setError("מספר כרטיס חייב להכיל 16 ספרות");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            setError("תוקף הכרטיס חייב להיות בתבנית MM/YY");
            return;
        }

        const [monthStr] = expiry.split("/");
        const month = parseInt(monthStr, 10);
        if (month < 1 || month > 12) {
            setError("חודש בתוקף לא תקין");
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            setError("CVV חייב להיות 3 או 4 ספרות");
            return;
        }

        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !cardName.trim() ||
            !cardNumber.trim() ||
            !expiry.trim() ||
            !cvv.trim()
        ) {
            setError("אנא מלא/י את כל השדות לפני התשלום");
            return;
        }

        setError("");
        alert(`תודה על התשלום, ${fullName}!\nסכום לתשלום: ₪${totalPrice}`);

        // ניקוי סל הקניות לאחר תשלום מוצלח
        console.log(user.id)
        cart.forEach(item => {
            const productId = item.productId;
            const purchasedQuantity = item.quantity;

            dispatch(updateProductStock({
                productId,
                quantity: purchasedQuantity
            }));
        });

        dispatch(clearCart({ userId: user.id }));

        navigate("/");
    };

    return (
        <Container maxWidth="sm" dir="rtl">
            <Typography variant="h4" align="center" gutterBottom>
                טופס תשלום
            </Typography>

            <form onSubmit={handlePaymentSubmit}>
                <Typography variant="h6" gutterBottom>
                    פרטים אישיים
                </Typography>

                <TextField
                    label="שם מלא"
                    fullWidth
                    required
                    margin="normal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    label="אימייל"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="טלפון"
                    fullWidth
                    required
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <Box my={3}>
                    <Divider />
                </Box>

                <Typography variant="h6" gutterBottom>
                    פרטי אשראי
                </Typography>

                <TextField
                    label="שם על הכרטיס"
                    fullWidth
                    required
                    margin="normal"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                />
                <TextField
                    label="מספר כרטיס"
                    fullWidth
                    required
                    margin="normal"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    inputProps={{ maxLength: 19 }}
                    dir="ltr"
                />
                <TextField
                    label="(MM/YY)"
                    fullWidth
                    required
                    margin="normal"
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                    dir="ltr"
                />
                <TextField
                    label="CVV"
                    fullWidth
                    required
                    margin="normal"
                    value={cvv}
                    onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))
                    }
                    inputProps={{ maxLength: 4 }}
                    dir="ltr"
                />

                {error && (
                    <Box mt={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                <Box mt={3} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" type="submit">
                        שלם ₪{totalPrice}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PaymentForm;
